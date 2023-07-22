import React, { useState } from 'react'
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { publicRequest } from '../request';
import { loginFail, loginStart, loginSuccess } from '../redux/authRedux';
//import { login } from '../redux/apiCalls';

const Container=styled.div `
height: 100vh;
width: 100vw;
display: flex;

background-image:url("https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/6f9a7cb9-02d1-49d4-98da-65ea23babb77/jordan-flight-mvp-fleece-sweatshirt%C3%BC-FHxj7S.png") ;
background-repeat: no-repeat;
background-size: cover;
align-items: center;
justify-content: center;



`;

const Form=styled.div `


height: 50%;
width: 50%;


display: flex;
flex-direction: column;
align-items: center;




`;

const FormHeader=styled.h1 `
font-weight: 500;
margin-bottom: 5px;

`;

const FormInputs=styled.div `
display: flex;
flex-direction: column;
align-items: center;
width: 100%;



`;
const Input=styled.input`
padding: 8px;
width: 50%;
margin: 10px auto;
border: none;
//border-bottom: 2px solid #322c3b;
outline: none;


&::focus{
    border: 4px solid #dd33cf;
}


`;

const Button=styled.button`
width: 50%;
padding: 8px;
background-color:#b6510e;
color:white;
border:none;
cursor: pointer;




`;

const Error=styled.p`

color: red;
margin-bottom: 3px;

`;

const Span=styled.span`
font-size: smaller;
margin-top: 3px;



`;



const Login = () => {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");

    const navigate=useNavigate();
    const dispatch=useDispatch();
  

    const handleLogin= async(e)=>{
       e.preventDefault();

       dispatch(loginStart());

       try {

       
        
       const res= await publicRequest.post("auth/login",{username,password},{withCredentials: true, credentials: 'include'});
        dispatch(loginSuccess(res.data))
      
        navigate("/");
        
        
       } catch (error) {
        dispatch(loginFail())
        
       }
      
      


    }

  return (
    <Container>
        <Form>
            <FormHeader>Login</FormHeader>
           
            <FormInputs>
                <Input  onChange={e => setUsername(e.target.value)} placeholder='Username'/>
              
                <Input onChange={e => setPassword(e.target.value)} type={'password'} placeholder='Password'/>
                
                <Button onClick={handleLogin}>Login</Button>

                <Span>Don't you have an account? Go to  <Link to={`/register`} style={{ textDecoration: 'none' ,color:'inherit' }}> <strong> Register Page.</strong> </Link> </Span>
                
            </FormInputs>

        </Form>
        
    </Container>
  )
}

export default Login