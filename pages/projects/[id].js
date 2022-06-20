import { useRouter } from 'next/router'
import { useCompany } from '../../context/company'

const Project = () => {
  const router = useRouter()
  const { id } = router.query
  const { projects, budgetGroups } = useCompany()
  const project = projects.find((r) => r.id === id)
  const budgetGroup = budgetGroups.find((r) => r.id === project.budgetgroup)
  return (
    <div>
      <h1>Project {id}</h1>
      <h2>{JSON.stringify(project, null, 2)}</h2>
      <h2>{JSON.stringify(budgetGroup, null, 2)}</h2>
    </div>
  )
}

export default Project
