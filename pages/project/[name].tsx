import { GetServerSideProps } from 'next';
import ProjectPage from '../../app/ProjectPage';

interface ProjectRouteProps {
    projectName: string;
    project: any;  // replace with the type of your project data
}

const ProjectRoute = ({ projectName, project }: ProjectRouteProps) => {
    return <ProjectPage projectName={projectName} project={project} />;
};

export const getServerSideProps: GetServerSideProps<ProjectRouteProps> = async (context) => {
    const { name } = context.query;

    if (typeof name !== 'string') {
        return { notFound: true };
    }

    const URL = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
        : "http://localhost:3000/api";

    const response = await fetch(`${URL}/project/${name}`);
    const project = await response.json();

    return { props: { projectName: name, project } };
};

export default ProjectRoute;
