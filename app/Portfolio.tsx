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
            <h1 className="text-3xl lg:text-6xl font-bold text-gray-700 text-center">
                Portfolio
            </h1>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0">
                    {portfolio.map((project, index) => (
                        <Link href={`/project/${project.name}`} key={index} passHref>
                            <div className="rounded-xl border-2 border-gray-900 transition hover:scale-105 cursor-pointer hover:text-blue-200">
                                {project.imageUrl && (
                                    <div className={`h-48 md:h-64 lg:h-72 relative overflow-hidden border-2 border-gray-900 rounded-t-xl`}>
                                        <img src={`/images/${project.imageUrl}`} alt={project.name} className="absolute top-0 left-0 w-full h-full object-cover object-position:center portfolio-image hover:contrast-125" />
                                    </div>
                                )}
                                <div className="mt-2 p-4">
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-2">{project.name}</h2>
                                    <div className="text-gray-400 text-sm sm:text-base md:text-lg line-clamp-2">{project.description}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Portfolio;