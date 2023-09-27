import {useNavigate} from 'react-router-dom';
import React, { useEffect} from 'react';

const About = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('token')){

      navigate('/login');
    //calling getNotes in useEffect so that all notes will be fetched before loading data on web
    }
   
    
},)
  
  return (
   
    <div className="container">
      <h1 className="text-center my-5">About iNoteBook</h1>
      <div className="row">
        <div className="col-md-4">
          <h3 className='text-center my-3'>Services</h3>
          <p className='text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, impedit nostrum? Harum, enim perferendis perspiciatis aliquam illum sunt facere minima dicta, quam natus dolorem distinctio ab est? Iusto similique sunt iste. Quidem veniam veritatis nemo saepe quisquam repellendus, odio dolore minus, facere reprehenderit porro provident.</p>
        </div>
        <div className="col-md-4">
          <h3 className='text-center my-3'>MileStones</h3>
          <p className='text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, impedit nostrum? Harum, enim perferendis perspiciatis aliquam illum sunt facere minima dicta, quam natus dolorem distinctio ab est? Iusto similique sunt iste. Quidem veniam veritatis nemo saepe quisquam repellendus, odio dolore minus, facere reprehenderit porro provident.</p>
        </div>
        <div className="col-md-4">
          <h3 className='text-center my-3'>Contact</h3>
          <p className='text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, impedit nostrum? Harum, enim perferendis perspiciatis aliquam illum sunt facere minima dicta, quam natus dolorem distinctio ab est? Iusto similique sunt iste. Quidem veniam veritatis nemo saepe quisquam repellendus, odio dolore minus, facere reprehenderit porro provident.</p>
        </div>
        
      </div>
    </div>
   
  
  )
}

export default About

//nothing but only arrow function base components -same working like function components
