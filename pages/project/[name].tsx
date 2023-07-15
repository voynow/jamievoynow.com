import { GetServerSideProps } from 'next';
import ProjectPage from '../../app/ProjectPage';


interface ProjectRouteProps {
    project: any;
}

const ProjectRoute = ({ project }: ProjectRouteProps) => {
    return <ProjectPage project={project} />;
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

    return { props: { project } };
};

export default ProjectRoute;
