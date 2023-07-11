import { useRouter } from 'next/router';
import ProjectPage from '../../app/ProjectPage';

const ProjectRoute = () => {
  const router = useRouter();
  const { name } = router.query;

  if (typeof name !== 'string') {
    return <div>Loading...</div>;
  }

  return <ProjectPage projectName={name} />;
};

export default ProjectRoute;
