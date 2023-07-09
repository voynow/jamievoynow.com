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
    const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/portfolio' : '/api/portfolio';
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setPortfolio(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className={`${className} bg-white py-12 px-4 sm:px-6 lg:px-8`}>
            <h1 className="text-5xl font-extrabold text-blue-600">Portfolio</h1>
            <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {portfolio.map((project, index) => (
                    <div key={index} className="bg-gray-100 rounded-xl p-4 shadow-lg transform transition duration-200 hover:scale-105">
                        {project.imageUrl && (
                            <div className="relative overflow-hidden rounded-t-xl">
                                <img src={`${baseUrl}${project.imageUrl}`} alt={project.name} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold text-blue-600 mb-2">{project.name}</h2>
                            <p className="text-gray-700">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Portfolio;
