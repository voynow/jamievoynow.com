import ChatInterface from './ChatInterface';
import Navbar from './Navbar';
import { FiExternalLink } from 'react-icons/fi';

interface Project {
    name: string;
    description: string;
    url: string;
    imageUrl?: string;
}

interface ProjectPageProps {
    projectName: string;
    project: Project;
}

const ProjectPage = ({ projectName, project }: ProjectPageProps) => {
    if (!project) return <div>Loading...</div>;

    return (
        <div className="flex flex-col h-screen bg-gradient-to-r from-secondary to-tertiary text-white">
            <Navbar />
            <main className="flex-grow p-4 flex overflow-hidden justify-center space-x-4">
            <div className="w-full sm:w-2/3 border border-gray-800 shadow-lg rounded-lg">
                    <ChatInterface projectName={project.name} />
                </div>
                <div className="w-1/4 pr-4 border border-gray-800 shadow-lg rounded-lg">
                    <div className="bg-tertiary p-6 h-full overflow-y-auto">
                        <div className="justify-center text-center">
                            <a href={project.url} className="text-primary flex flex-col items-center justify-center hover:text-blue-300">
                                <div>
                                    <h1 className="text-4xl font-extrabold">{project.name}</h1>
                                </div>
                                <div className="flex items-center">
                                    <p>Link to Github</p>
                                    <FiExternalLink />
                                </div>
                            </a>
                        </div>
                        <p className="mt-4 mb-4 text-gray-400 text-center font-bold">{project.description}</p>
                    </div>
                </div>
            </main>
        </div>
    );
}


export default ProjectPage;

