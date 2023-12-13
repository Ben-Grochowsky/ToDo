//We will create a React Context in this file that will house all authentication info (currentUser, login, logout). React contexts allow us to store information and transport that info to the components that use it. We could store this info in the App component and just pass props to send the user information to other components but this isn't ideal for larger apps. Instead, we create the context and a component that will communicate this context to its children. Think of this much like Session storage in a .NET application.

//below we bring in useState and useEffect for React Hooks and automation
//we also need useContext to create the AuthContext
import React, { useState, useEffect, useContext } from 'react'
//let's also import the auth object exported from base.js
import { auth } from '../base'
//Below are firebase functions we need for use in our logic below
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

//Below we create a context (storage object) for all of our auth info
const AuthContext = React.createContext()

//Below we create a function that will allow us to use the context in components. We will import this function any time we want the currentUser, login, or logout functionality
export function useAuth() {
  return useContext(AuthContext)
}

//This component will provide the AuthContext to the children nested inside of it. See App.js where we call to an instance of this component and nest all other components inside of it
export default function AuthProvider({children}) {
  //Create hooks for currentUser and another custom hook to determine if the context has info to share with child components before rendering the child components to the screen.
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true);

  //Below is our login function
  //First we instantiate a GithubAuthProvider object
  const githubAuthProvider = new GithubAuthProvider()

  async function login(){
    return (signInWithPopup(auth, githubAuthProvider).then(authData => {
      console.log(authData)
      setCurrentUser(authData.user)
    }))
  }

  //Below is our logout function
  async function logout() {
    signOut(auth).then(setCurrentUser(null))
  }

  //The value object below will hold the currentUser, login and logout object/functions so we can use them in the child components. We will pass this value as a prop in the return below
  const value = { currentUser, login, logout}

  //Below we write a useEffect that will track whether this component has finished loading 
  useEffect(() => {
    //authChange will use Firebase functionality to get user info, set the currentUser hook to the value retrieved, and allow components to load in using the custom hook (loading).
    const authChange = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return authChange
  }, [])


  return (
    <AuthContext.Provider value={value}>
      {/* Below we are waiting for the AuthContext info to populate before loading the child components in the UI. */}
      {!loading && children}
    </AuthContext.Provider>
  )
}