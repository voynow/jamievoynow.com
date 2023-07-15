import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Project {
    name: string;
    description: string;
    imageUrl?: string;
}

interface PortfolioProps {
    className: string;
}

const Portfolio = ({ className }: PortfolioProps) => {
    const [portfolio, setPortfolio] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const URL = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
        : "http://localhost:3000/api";

    useEffect(() => {
        fetch(`${URL}/portfolio`)
            .then(res => res.json())
            .then(data => {
                setPortfolio(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching portfolio data:', err);
            });
    }, []);
    return (
        <div className={`${className} bg-secondary py-4 px-4 sm:px-6 lg:px-8`}>
            <h1 className="text-3xl lg:text-6xl font-bold text-gray-800 text-center">
                Portfolio
            </h1>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {portfolio.map((project, index) => (
                        <div key={index} className="bg-tertiary rounded-xl shadow-lg transform transition duration-200 hover:scale-105 hover:border-primary p-0">
                            {project.imageUrl && (
                                <div className="relative overflow-hidden rounded-t-xl image-container h-64">
                                    <img src={`/images/${project.imageUrl}`} alt={project.name} className="w-full h-full object-cover object-position:center portfolio-image hover:contrast-125" />
                                </div>
                            )}
                            <div className="mt-4 p-4">
                                <Link href={`/project/${project.name}`}>
                                    <h2 className="text-xl font-semibold text-primary mb-2 hover:text-blue-300">{project.name}</h2>
                                </Link>
                                <div className="description-container text-gray-500">{project.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Portfolio;
