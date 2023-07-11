import { useEffect, useState } from 'react';
import ChatInterface from './ChatInterface';
import Navbar from './Navbar';

const ProjectPage = ({ projectName }) => {
    const [project, setProject] = useState(null);
    const URL = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
        : "http://localhost:3000/api";

    useEffect(() => {
        fetch(`${URL}/project/${projectName}`)
            .then(res => res.json())
            .then(setProject)
            .catch(err => console.error('Error fetching project data:', err));
    }, [projectName]);

    if (!project) return <div>Loading...</div>;

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Navbar />
            <main className="flex-grow p-6 flex overflow-y-scroll">
                <div className="w-1/3 pr-4">
                    <div className="shadow-lg rounded-lg bg-white p-6 h-full overflow-y-auto">
                        <h1 className="text-3xl font-bold mb-3 text-indigo-600">{project.name}</h1>
                        <p className="mb-4 text-gray-600">{project.description}</p>
                        <a href={project.url} className="text-indigo-600 underline">Visit GitHub Repository</a>
                        {project.imageUrl && (
                            <img src={project.imageUrl} alt={project.name} className="mt-6 w-full h-auto object-cover" />
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
