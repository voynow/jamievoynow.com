import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-indigo-700 py-4 px-16 sticky top-0 z-50">
            <div className="flex items-center justify-between">
                <div className="text-white text-2xl font-bold hover:text-blue-300">
                    <Link href="/">
                        <span role="img" aria-label="emoji">🚀</span> Jamie Voynow
                    </Link>
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
