import { FiExternalLink } from 'react-icons/fi';
import ChatInterface from './ChatInterface';
import Navbar from './Navbar';

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
            <main className="flex-grow p-6 flex overflow-y-scroll">
                <div className="w-1/4 pr-4">
                    <div className="shadow-lg rounded-lg bg-tertiary p-6 h-full overflow-y-auto">
                        <div className="justify-center text-center">
                            <a href={project.url} className="text-primary flex items-center justify-center hover:text-white transition-colors duration-200">
                                <h1 className="text-4xl font-extrabold text-primary">{project.name}</h1>
                            </a>
                        </div>
                        <p className="mt-4 mb-4 text-gray-400 text-lg text-center font-bold">{project.description}</p>
                    </div>
                </div>
                <div className="w-2/3">
                    <ChatInterface projectName={project.name} />
                </div>
            </main>
        </div>
    );
}

export default ProjectPage;
