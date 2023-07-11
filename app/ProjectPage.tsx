import { useEffect, useState } from 'react';
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
}

const ProjectPage = ({ projectName }: ProjectPageProps) => {
    const [project, setProject] = useState<Project | null>(null);
    const URL = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
        : "http://localhost:3000/api";

    useEffect(() => {
        fetch(`${URL}/project/${projectName}`)
            .then(res => res.json())
            .then(data => {
                setProject(data);
            })
            .catch(err => {
                console.error('Error fetching project data:', err);
            });
    }, [projectName]);

    if (!project) return <div>Loading...</div>;

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Navbar />
            <main className="flex-grow p-6 flex overflow-y-scroll">
                <div className="w-1/4 pr-4">
                    <div className="shadow-lg rounded-lg bg-white p-6 h-full overflow-y-auto">
                        <div className="justify-center text-center">
                            <a href={project.url} className="text-indigo-600 flex items-center justify-center hover:text-indigo-500 transition-colors duration-200">
                                <h1 className="text-3xl font-bold text-indigo-600">{project.name}</h1>
                                <FiExternalLink className="ml-2 text-xl" />
                            </a>
                        </div>
                        <p className="mt-4 mb-4 text-gray-600 text-md text-center font-medium">{project.description}</p>
                        {project.imageUrl && (
                            <img src={`/images/${project.imageUrl}`} alt={project.name} className="mt-6 w-full h-auto object-cover" />
                        )}
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
