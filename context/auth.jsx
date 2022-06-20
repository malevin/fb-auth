import { createContext, useContext, useState, useEffect } from 'react'
import app from '../services/firebase'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getFirestore } from 'firebase/firestore'

const auth = getAuth(app)
const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} })
const db = getFirestore(app)

const AuthProvider = ({ children }) => {
  //   const [user, setUser] = useState(null)
  //   useEffect(() => {
  //     const listener = onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         setUser(user)
  //       } else {
  //         setUser(null)
  //       }
  //     })
  //     return listener
  //   }, [])
  const [user, loading] = useAuthState(auth)

  const login = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
    } catch (err) {
      console.log(err)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.log(err)
    }
  }
  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)
export { AuthProvider, useAuth, db }
