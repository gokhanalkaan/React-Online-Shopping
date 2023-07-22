import React, { useState } from 'react'
import styled from 'styled-components'
import { publicRequest } from '../request'

import { Link, useNavigate } from 'react-router-dom'
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url('https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/fmwu27sbkwcorjovlpow/sportswear-essential-frans%C4%B1z-havlu-kuma%C5%9F%C4%B1-grafikli-kap%C3%BC%C5%9Fonlu-sweatshirt%C3%BC-MpDpPQ.png');
  display: flex;
  background-repeat: no-repeat;
  background-size: cover;

  align-items: center;
  justify-content: center;
`

const Form = styled.div`
  height: 50%;
  width: 50%;

  padding: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormHeader = styled.h1`
  font-weight: 500;
  margin-bottom: 5px;
`

const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const Input = styled.input`
  background-color: transparent;
  padding: 8px;
  width: 50%;
  margin: 10px auto;

  border: none;
  //border-bottom: 2px solid #dd33cf;
  outline: none;

  &::focus {
    border: 4px solid #dd33cf;
  }
`

const Button = styled.button`
  width: 50%;
  padding: 8px;
  background-color: #b6510e;
  color: white;
  border: none;
  cursor: pointer;
`

const Error = styled.p`
  color: red;
  margin-bottom: 3px;
`

const Span = styled.span`
  font-size: smaller;
  margin-top: 3px;
`

const Register = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePhoto, setProfilePhoto] = useState('')
  const [error, setError] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()

    const user = {
      username,
      email,
      password,
    }

    console.log(user)

    try {
      await publicRequest.post('auth/register', user)

      navigate('/login')
    } catch (error) {
      setError(true)
    }
  }

  return (
    <Container>
      <Form>
        <FormHeader>Register</FormHeader>
        {error && <Error>Something went wrong.</Error>}
        <FormInputs>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type={'email'}
            placeholder="Email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type={'password'}
            placeholder="Password"
          />

          <Button onClick={handleRegister}>Register</Button>
          <Span>
            Do you have an account? Go to{' '}
            <Link
              to={`/login`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {' '}
              <strong> Login Page.</strong>{' '}
            </Link>{' '}
          </Span>
        </FormInputs>
      </Form>
    </Container>
  )
}

export default Register
