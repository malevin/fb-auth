import Layout from '../components/Layout'
import { AuthProvider } from '../context/auth'
import { CompanyProvider } from '../context/company'
import { UserProvider } from '../context/user'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserProvider>
        <CompanyProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CompanyProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default MyApp
