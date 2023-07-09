"use client";

import { useEffect, useState } from 'react';

interface PortfolioProps {
  className: string;
}

const Portfolio = ({ className }: PortfolioProps) => {
    const [portfolio, setPortfolio] = useState<Project[]>([]);
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/portfolio' : '/api/portfolio';

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPortfolio(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className={`${className} bg-white flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8`}>
            <h1 className="text-5xl font-extrabold text-blue-600 flex-grow-0">Portfolio</h1>
            <div className="mt-6 flex flex-wrap justify-center items-start gap-6 flex-grow">
                {portfolio.map((project, index) => (
                    <div key={index} className="w-full sm:w-64 bg-gray-100 rounded-xl p-4 shadow-lg transform transition duration-200 hover:scale-105 flex-grow-0">
                        <h2 className="text-xl font-semibold text-blue-600 mb-2">{project.name}</h2>
                        <p className="text-gray-700">{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Portfolio;
