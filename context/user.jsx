import { createContext, useContext, useState, useEffect } from 'react'
import { db, useAuth } from '../context/auth'
import { onSnapshot, collection, query, where } from 'firebase/firestore'

const UserContext = createContext({ settings: null })

const UserProvider = ({ children }) => {
  const [settings, setSettings] = useState(null)
  const { user } = useAuth()
  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'users'), where('useruid', '==', user.uid))
      const unSub = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length > 0) {
          const userSettings = snapshot.docs[0].data()
          setSettings(userSettings)
          console.log('User Settings Extracted')
        }
      })
      return unSub
    }
  }, [user])

  return <UserContext.Provider value={{ settings: settings }}>{children}</UserContext.Provider>
}

const useUser = () => useContext(UserContext)
export { UserProvider, useUser }
