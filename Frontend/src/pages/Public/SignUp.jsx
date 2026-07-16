import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Btn from '../../components/Btn';
import API from '../../components/API';

const SignUp = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [form, setForm] = useState({
      name: "" ,
      email : "",
      password : "",
    })

    const [error, setError] = useState({
      name: "" ,
      email : "",
      password : "",
    })

    const [apiSucess, setApiSucess] = useState(false);
    const [apiError, setApiError] = useState("");

    const handleChange = (e) => {
      setForm({...form,[e.target.name]: e.target.value});
      setError({...error,[e.target.value]: ""});
      setApiSucess(false);
      setApiError("");
    };

    const handleSubmit = async(e) => {
      e.preventDefault();

      setApiError("");
      setApiSucess(false);
      setError({...error, [e.target.value]: ""});

      const checker = ({
        name: "",
        email: "",
        password: "",
      });

      if(!form.name || form.name.length === 0){
        checker.name = "Name Is Required";
      }

      if(form.name && form.name.length < 3){
        checker.name = "Name Should Be Atleast 3 Letter";
      }

      if(!form.email || form.email.length === 0){
        checker.email ="Email Is Required";
      }

      if(!form.password || form.password === 0){
        checker.password = "Password Is Required";
      }

      if(form.password && form.password.length < 8){
        checker.password = "Password Should Be Atleast 8 Letter";
      }

      if(checker.name !== "" || checker.email !== "" || checker.password !== ""){
        setError(checker);
        return
      }

      try {
        setisLoading(true);
        const response = await API("POST", "auth/Signup", form);
        setApiSucess(true);
      } catch (error) {
        console.log(error.response?.data?.message);
        setApiError(error.response?.data?.message);
      } finally {
        setisLoading(false);
      };
    }
  return (
    <form className='AuthForm' onSubmit={handleSubmit}>
    <h2 className='heading'>Welcome</h2>
    <p>Sign up to Start Taskiqo</p>

    <div className='field'>
      <label htmlFor="name">Name: </label>
      <input type="text" placeholder='User Name' name='name' id='name' value={form.name} onChange={handleChange}/>
      {error.name && <p className='error'>{error.name}</p>}
    </div>

    <div className='field'>
    <label htmlFor="email">Email: </label>
    <input type='email' placeholder='User Email' name='email' id='email' value={form.email} onChange={handleChange}/>
    {error.email && <p className='error'>{error.email}</p>}
    </div>

    <div className='field'>
    <label htmlFor="password">Password: </label>
    <input type='password' placeholder='User Password' name='password' id='password' value={form.password} onChange={handleChange}/>
    {error.password && <p className='error'>{error.password}</p>} 
    </div>

    <div className='ApiWaitingBtn'>
    <Btn type={"submit"} text={isLoading ? "Authenticating...": "Sign Up"} className={"auth-btn"} disabled={isLoading}/>
    {isLoading && <div className='loader'></div>}
    </div>

    {apiError && <p className='apiError'>{apiError}</p> }
    {apiSucess && <p className='apiSucess'>{"Signed Up Sucessfully"}</p>}

    <div>Signed Up Sucessfully? <br />
    <span className="link-text" onClick={() => navigate("/")}>Log in</span></div>
    </form>
  )
}

export default SignUp
