import { useRouter } from 'next/router'
import { useAuth } from '../context/auth'

const Login = () => {
  const { user, loading, login } = useAuth()
  const router = useRouter()

  const loginHandler = async () => {
    await login()

    router.push('/')
  }

  if (loading) return <h1>Loading</h1>
  if (user)
    return (
      <div>
        <h1>You are logged in as {user.email}</h1>
        <button onClick={loginHandler}>Login as another account</button>
      </div>
    )

  return (
    <div>
      <h1>Login to use this app</h1>
      <button onClick={loginHandler}>Login</button>
    </div>
  )
}

export default Login
