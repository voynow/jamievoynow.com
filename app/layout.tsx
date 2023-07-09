import './globals.css'
import Navbar from './Navbar'
import Skills from './Skills'
import Portfolio from './Portfolio'

export default function RootLayout() {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <Portfolio className="flex-grow" />
        <Skills />
      </body>
    </html>
  )
}
