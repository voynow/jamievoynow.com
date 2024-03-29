import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="py-2 px-10">
            <div className="flex items-center justify-between">
                <Link href="/">
                    <div className="text-white text-2xl font-bold hover:text-blue-300 flex items-center">
                        <img src="/images/headshot.jpg" alt="Jamie Voynow" className=" mr-1 w-8y h-12 rounded-full object-cover"/>
                        <span className="text-2xl">Jamie Voynow</span>
                    </div>
                </Link>
                <div className="flex space-x-4">
                    <a href="https://twitter.com/JamieVoynow" target="_blank" rel="noopener noreferrer" className="nav-icon">
                        <FontAwesomeIcon icon={faTwitter} className="text-white hover:text-blue-300 " />
                    </a>
                    <a href="https://www.linkedin.com/in/voynow/" target="_blank" rel="noopener noreferrer" className="nav-icon">
                        <FontAwesomeIcon icon={faLinkedin} className="text-white hover:text-blue-300" />
                    </a>
                    <a href="https://github.com/voynow" target="_blank" rel="noopener noreferrer" className="nav-icon">
                        <FontAwesomeIcon icon={faGithub} className="text-white hover:text-blue-300" />
                    </a>
                </div>
            </div>
        </nav>
    );
}
