import Link from 'next/link'
import { useCompany } from '../context/company'

const Sidebar = () => {
  const { company, projects } = useCompany()
  const clickHandler = async () => {
    // const col = collection(db, 'projects')
    // await addDoc(col, { name: 'Кедровый 2я оч.', shortname: 'КДР02', pl: 800 })
    // await addDoc(col, { name: 'Кедровый 3я оч.', shortname: 'КДР03', pl: 1000 })
    // await addDoc(col, { name: 'Ленинградская 1я оч.', shortname: 'ЛНГ01', pl: 1600 })
  }

  return (
    <div className='flex flex-col w-96 h-screen px-4 py-8 overflow-y-auto border-r'>
      <h2 className='text-3xl font-semibold text-center text-blue-800'>{company && company.name}</h2>
      <div className='flex flex-col justify-between mt-6'>
        {company &&
          projects.map((val, key) => {
            return (
              <div key={key} className='flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200'>
                <Link href={`/projects/${val.id}`}>{val.name}</Link>
              </div>
            )
          })}
        {/* <aside>
          <ul>
            {company &&
              projects.map((val, key) => {
                return (
                  <li key={key}>
                    <div className='flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200 cursor-pointer'>
                      <span className='mx-4 font-medium'>
                        <Link href={`/projects/${val.id}`}>{val.name}</Link>
                      </span>
                    </div>
                  </li>
                )
              })}
          </ul>
        </aside> */}
      </div>
      <div className='flex flex-col justify-between mt-6'>
        <Link href='/projects'>Новый проект</Link>
        {/* <input className='flex items-center px-4 py-2 mt-5 bg-gray-200 ' placeholder='Новый проект' /> */}
      </div>
    </div>
  )
}

export default Sidebar
