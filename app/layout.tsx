import './globals.css'
import Navbar from './Navbar'
import Skills from './Skills'
import Portfolio from './Portfolio'

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Portfolio />
        <Skills />
      </body>
    </html>
  )
}
