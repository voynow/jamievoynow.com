"use client";

import { useEffect, useState } from 'react';

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
    const URL = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
    : "http://localhost:3000/api";

    useEffect(() => {
        fetch(`${URL}/portfolio`)
            .then(res => res.text())
            .then(text => {
                try {
                    return JSON.parse(text);
                } catch {
                    throw new Error(`Invalid JSON response: ${text}`);
                }
            })
            .then(data => {
                setPortfolio(data);
            })
            .catch(err => {
                console.error('Error fetching portfolio data:', err);
            });
    }, []);

    return (
        <div className={`${className} bg-white py-12 px-4 sm:px-6 lg:px-8`}>
            <h1 className="text-5xl font-extrabold text-indigo-600">Portfolio</h1>
            <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {portfolio.map((project, index) => (
                    <div key={index} className="bg-gray-100 rounded-xl shadow-lg transform transition duration-200 hover:scale-105 p-0">
                        {project.imageUrl && (
                            <div className="relative overflow-hidden rounded-t-xl image-container">
                                <img src={`/images/${project.imageUrl}`} alt={project.name} className="w-full h-full object-cover portfolio-image" />
                            </div>
                        )}
                        <div className="mt-4 p-4">
                            <h2 className="text-xl font-semibold text-indigo-600 mb-2">{project.name}</h2>
                            <div className="description-container text-gray-600">{project.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Portfolio;
