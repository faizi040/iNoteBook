const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Faizisagoodb$oy";    //idealy thiswill come from our local.env or config file due to security reasons we don't want to show our secret

//Route-1:creating a user using post request on end-point '/api/auth/createUser'  Does'nt require authentication(login)
router.post('/createUser', [    //validation array---also send custom error message second value in validation
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleats 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const result = validationResult(req);   //picking errors of validation
    let success = false;
    if (result.isEmpty()) {
        
        //first way of adding data into mongo db

        try {


            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success,error: "soryy a user with this e-mail already exists" })
            }
            const salt = await bcrypt.genSalt(10);     //generating salt await as it also return a promise
            const secPassword = await bcrypt.hash(req.body.password, salt);   //generating hash
            //awaitbing bcypt.hash as it returns a promise
            //create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword
            })
            const data = {
                user: {
                    id: user.id,   //sending user id in data for token 
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);   //jwt sign is a sync method
            // console.log(token);
            success=true;
            res.json({ success,authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send(success,"some error occure");
        }
        // .then(user => res.json(user)).catch(err=>{console.log(err),res.json(err.msg)});
    }
    else {

        res.status(400).json({ success,errors: result.array() });
    }
})

//Route-2:Authenticate a user using post request on end-point '/api/auth/login'  Does'nt require authentication(login)
router.post('/login', [    //validation array---also send custom error message second value in validation
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    const result = validationResult(req);
    let success = false;
    if (result.isEmpty()) {
        const { email, password } = req.body;    //destructuring
        try {
            let user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ success,error: "Please try again with correct credentials" });
            }
            else {


                let comparePassword = await bcrypt.compare(password, user.password);   //asyncronous function
                if (!comparePassword) {
                    res.status(400).json({ success,error: "Please try again with correct credentials" });
                }
                else {


                    const data = {
                        user: {
                            id: user.id,   //sending user id in data for token 
                        }
                    }
                    const authToken = jwt.sign(data, JWT_SECRET);   //jwt sign is a sync method
                    success=true;
                    res.json({ success,authToken });
                }
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send(success,"some error occure");
        }
    }
    else {

        res.status(400).json({ success,errors: result.array() });
    }
})


//Route-3: get logged in user details using POST "api/auth/getuser" request.Login is required
router.post('/getuser',fetchUser, async (req, res) => {   //appling fetchUser middleware
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        //menas select all data only leave passowrd
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occure");
    }
})

module.exports = router;

//exporting router to use routes