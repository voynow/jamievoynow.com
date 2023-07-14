// pages/index.tsx

import '../app/globals.css'
import Navbar from '../app/Navbar'
import Portfolio from '../app/Portfolio'
import Skills from '../app/Skills'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary text-white">
      <Navbar />
      <Portfolio className="flex-grow" />
      <Skills />
    </div>
  )
}