import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Layout
