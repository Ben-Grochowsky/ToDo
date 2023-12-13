import React from 'react'
//Each time we import a value from our context, we need 3 steps.
//Step 1 - Import useAuth from the AuthContext
import { useAuth } from '../../contexts/AuthContext'
//Below we bring in some UI components from react-bootstrap
import { Container, Card } from 'react-bootstrap'
//THe function useNavigate below allow us to redirect a user with react-router-dom
import { useNavigate } from 'react-router-dom'

export default function Login() {
  //Step 2 - destructure the needed properties from useAuth()
  const { login } = useAuth()
  //Below we write a hook to store the useNavigate functionality
  const navigate = useNavigate()

  async function handleAuth() {
    //Await keyword pauses code from executing until we recieve a response from firebase
    await login()

    //return the user home using useNavigate hook from react-router-dom
    return navigate('/')
    
  }

  return (
    //Step 3 - Implement the AuthContext object(s) in our components UI
    <div className='login'>
      <article className="bg-info mb-5 text-dark">
        <h1 className="text-center">Welcome to ResourcePlus!</h1>
      </article>
      <Container>
        <Card className='m-2 border-dark text-center'>
          <Card.Header className='bg-dark text-white'>
            <h2>Login for full functionality</h2>
          </Card.Header>
          <Card.Body>
            <button className="btn btn-success" onClick={() => handleAuth()}>
              Login w/ GitHub
            </button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}