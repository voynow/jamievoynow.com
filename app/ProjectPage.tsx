import { useEffect, useState } from 'react';
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

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Navbar />
            <main className="flex-grow p-6 flex">
                <div className="w-1/3 pr-4">
                    <div className="shadow-lg rounded-lg bg-white p-6 h-full">
                        <h1 className="text-3xl font-bold mb-4 text-indigo-600">{project.name}</h1>
                        <p className="mb-4 text-gray-600">{project.description}</p>
                        <a href={project.url} className="text-indigo-600 underline">Visit GitHub Repository</a>
                    </div>
                </div>
                <div className="w-2/3 pl-4">
                    <div className="shadow-lg rounded-lg bg-white p-6 h-full">
                        <ChatInterface projectName={project.name} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProjectPage;
