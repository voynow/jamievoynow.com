export default function Navbar() {
  return (
    <nav className="bg-blue-600 py-4 px-6 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <span role="img" aria-label="emoji">🚀</span> Portfolio
        </div>
        <div className="flex space-x-6">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
            Twitter
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
            LinkedIn
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
            GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}
