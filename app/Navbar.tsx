import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 py-4 px-16 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <span role="img" aria-label="emoji">🚀</span> JamieVoynow.com
        </div>
        <div className="flex space-x-6">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 flex items-center">
            <div className="w-6 h-6">
              <FontAwesomeIcon icon={faTwitter} className="w-full h-full" />
            </div>
            Twitter
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 flex items-center">
            <div className="w-6 h-6">
              <FontAwesomeIcon icon={faLinkedin} className="w-full h-full" />
            </div>
            LinkedIn
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 flex items-center">
            <div className="w-6 h-6">
              <FontAwesomeIcon icon={faGithub} className="w-full h-full" />
            </div>
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
