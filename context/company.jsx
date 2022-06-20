import { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../context/auth'
import { useUser } from '../context/user'
import { collection, doc, getDocs, onSnapshot, query } from 'firebase/firestore'

const CompanyContext = createContext({ company: null })

const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(null)
  const [projects, setProjects] = useState([])
  const [budgetGroups, setBudgetGroups] = useState([])

  const { settings } = useUser()
  useEffect(() => {
    if (settings) {
      const companyId = settings.companies[0]
      //   const unSub = onSnapshot(companyRef, (d) => {
      //     console.log(d.data())
      //   })
      const unSub = onSnapshot(doc(db, 'companies', companyId), async (companyDoc) => {
        const companyObject = companyDoc.data()

        const qProjects = query(collection(db, 'companies', companyId, 'projects'))
        const qProjectsSnapshot = await getDocs(qProjects)
        const projectsObject = []
        qProjectsSnapshot.forEach((p) => {
          projectsObject.push({ ...p.data(), id: p.id })
        })

        const qBG = query(collection(db, 'companies', companyId, 'BudgetGroups'))
        const qBGSnapshot = await getDocs(qBG)
        const bgObject = []
        qBGSnapshot.forEach((p) => {
          bgObject.push({ ...p.data(), id: p.id })
        })

        setCompany(companyObject)
        setProjects(projectsObject)
        setBudgetGroups(bgObject)

        console.log('Company info extracted')
      })

      return unSub
    }
  }, [settings])

  return <CompanyContext.Provider value={{ company: company, projects: projects, budgetGroups: budgetGroups }}>{children}</CompanyContext.Provider>
}

const useCompany = () => useContext(CompanyContext)
export { CompanyProvider, useCompany }
