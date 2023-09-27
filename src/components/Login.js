import React,{useState} from 'react';
// import { unstable_HistoryRouter } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email:"", password:"" });
  const handleChange = (e) => {

    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({ email:credentials.email, password:credentials.password }),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    if(json.success===true){
      // save auth-token and redirect
      localStorage.setItem('token',json.authToken);
      navigate('/');
      props.showAlert("Logged in Successfully", 'success');
    }
    else{
      props.showAlert("use correct credentials", 'danger');
    }
  }
  return (
    <form className="d-flex flex-column align-items-center my-5" onSubmit={handleSubmit}>
      <h1 className='text-center mb-5'>Login to iNoteBook</h1>
      <div className="mb-3 col-md-6">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={handleChange} required />
      </div>
      <div className="mb-3 col-md-6">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={handleChange}required />
      </div>
      <div className="d-flex justify-content-center col-md-6">
        <button type='submit' className="btn btn-primary">Login</button>
      </div>

    </form>
  )
}

export default Login
