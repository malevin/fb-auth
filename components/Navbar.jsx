import Link from 'next/link'
import { useAuth } from '../context/auth'

const Navbar = () => {
  const { user, loading, logout } = useAuth()
  return (
    <div className='bg-slate-600'>
      <div>
        <Link href='/'>Home</Link>
        {!user && !loading && <Link href='/login'>Login</Link>}
        {user?.email && <button onClick={logout}>Logout</button>}
        {user?.email}
      </div>
    </div>
  )
}

export default Navbar
