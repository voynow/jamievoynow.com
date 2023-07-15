import ChatInterface from './ChatInterface';
import Navbar from './Navbar';

interface ProjectPageProps {
    project: any;
}

const ProjectPage = ({ project }: ProjectPageProps) => {
    if (!project) return <div>Loading...</div>;

    return (
        <div className="flex flex-col h-screen bg-gradient-to-r from-secondary to-tertiary text-white">
            <Navbar />
            <main className="flex-grow p-4 flex overflow-hidden justify-center space-x-4">
            <div className="w-full sm:w-2/3 border border-gray-800 shadow-lg rounded-lg">
                    <ChatInterface project={project} />
                </div>
            </main>
        </div>
    );
}


export default ProjectPage;
