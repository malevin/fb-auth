import Head from 'next/head'
import { useAuth } from '../context/auth'
import { useCompany } from '../context/company'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const { user, loading, logout } = useAuth()
  const { company, projects } = useCompany()
  const router = useRouter()

  if (!user && !loading) router.push('/login')

  useEffect(() => {
    if (company) {
      if (projects.length) {
        const firstProjectId = projects[0].id
        router.push(`/projects/${firstProjectId}`)
      } else {
        router.push('/projects')
      }
    }
    // eslint-disable-next-line
  }, [company, projects])

  return (
    <>
      <div>
        <Head>
          <title>ПП</title>
        </Head>
      </div>

      <div>
        <div className='w-full h-full p-4 m-8 overflow-y-auto'>
          <div className='flex items-center justify-center p-40 border-4 border-dotted'>
            <h1>Project page</h1>
          </div>
        </div>
      </div>
    </>
  )
}
