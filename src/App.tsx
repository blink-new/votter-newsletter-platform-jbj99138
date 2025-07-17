import { useState, useEffect } from 'react'
import { HomePage } from './components/HomePage'
import { Editor } from './components/Editor'

function App() {
  const [currentView, setCurrentView] = useState('home')

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      setCurrentView(hash || 'home')
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleCloseEditor = () => {
    window.location.hash = ''
    setCurrentView('home')
  }

  if (currentView === 'editor') {
    return <Editor onClose={handleCloseEditor} />
  }

  return <HomePage />
}

export default App