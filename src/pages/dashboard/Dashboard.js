import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import ProjectList from '../../components/ProjectList'

// styles
import './Dashboard.css'
import ProjectFilter from './ProjectFilter'

export default function Dashboard() {
  const { documents, error } = useCollection('projects')
  const [currentFilter, setCurrentFilter] = useState('all')
  const { user } = useAuthContext()

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents ? documents.filter((document) => {
    switch (currentFilter) {
      // all projects
      case 'all':
        return true
      // my projects
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach((u) => {
          if (u.id === user.uid) {
            assignedToMe = true
          }
        })
        return assignedToMe
      // filter by category
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        console.log(document.category, currentFilter)
        return document.category === currentFilter
      // by default display all
      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      { error && <p className="error">{error}</p> }
      { documents && (
        <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} /> 
      )}
      { documents && <ProjectList projects={projects} /> }
    </div>
  )
}
