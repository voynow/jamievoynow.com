import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

interface ChatInterfaceProps {
    project: {
        name: string;
        description: string;
        url: string;
    };
}

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const ChatInterface = ({ project }: ChatInterfaceProps) => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [queryIndex, setQueryIndex] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const recommendedQueries = [
        "Choose an important feature and explain it like I'm five.",
        "What technologies were used in this project?",
        "How can I contribute to this project? Give one simple idea.",
        "What is the most interesting thing about this project?",
        "Which part of the project is technically challenging?",
    ];

    const [error, setError] = useState<string | null>(null);

    const handleSend = async () => {
        setError(null);
        if (message.trim()) {
            console.log('Sending message:', message);
            setIsLoading(true);
            setMessages(prevMessages => [...prevMessages, { text: message, sender: 'user' }]);
            setMessage('');
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: message, project: project.name })
                });
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                const responseData = await response.json();
                console.log('Received response:', responseData);
                setMessages(prevMessages => [...prevMessages, { text: responseData, sender: 'bot' }]);
                setIsLoading(false);
            } catch (error) {
                console.error('Error sending message:', error);
                setError('An error occurred while sending your message. Please try again.');
                setIsLoading(false);
            }
        }
    };

    const handleRecommendedQueryClick = async (query: string) => {
        setError(null);
        console.log('Sending message:', query);
        setIsLoading(true);
        setMessages(prevMessages => [...prevMessages, { text: query, sender: 'user' }]);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: query, project: project.name })
            });
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const responseData = await response.json();
            console.log('Received response:', responseData);
            setMessages(prevMessages => [...prevMessages, { text: responseData, sender: 'bot' }]);
            setIsLoading(false);
        } catch (error) {
            console.error('Error sending message:', error);
            setError('An error occurred while sending your message. Please try again or try a different query.');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoading) inputRef.current?.focus();
    }, [isLoading]);

    useEffect(() => {
        const interval = setInterval(() => {
            setQueryIndex((prevIndex) => (prevIndex + 1) % recommendedQueries.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full flex flex-col bg-gradient-to-r from-secondary to-tertiary text-white shadow overflow-hidden sm:rounded-lg p-4">
            <div className="flex-grow overflow-y-auto pb-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{project.name}</h2>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-blue-300 rounded-lg text-white px-3 py-2 border-2 border-gray-300 flex items-center">
                        <span>Github</span>
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2" />
                    </a>
                </div>
                <p className='text-gray-400 text-xs sm:text-sm md:text-base mb-4'>{project.description}</p>
                <div className="border-t border-tertiary mt-4 p-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                            <div className={`p-2 rounded-lg border border-gray-800 text-xs sm:text-sm md:text-base ${msg.sender === 'user' ? 'bg-primary text-white ml-20' : 'bg-tertiary text-white mr-20'}`}>
                                <ReactMarkdown className={`px-4 py-2 ${msg.sender === 'user' ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                                    {msg.text}
                                </ReactMarkdown >
                            </div>
                        </div>
                    ))}
                    {error && (
                        <div className="mt-2 text-sm text-red-500">
                            {error}
                        </div>
                    )}
                    {isLoading && (
                        <div className="self-start text-gray-400 flex items-center mb-2 ml-4 space-x-1">
                            <div className="dot-typing"></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex mt-4 border-t border-tertiary pt-2">
                <div className="text-xs sm:text-sm md:text-base text-gray-400">
                    Try asking: <button onClick={() => handleRecommendedQueryClick(recommendedQueries[queryIndex])} className="text-gray-200 underline hover:text-blue-300 focus:outline-none">{recommendedQueries[queryIndex]}</button>
                </div>
            </div>
            <div className="flex border-tertiary pt-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
                    className="text-s sm:text-m text-black flex-grow rounded-l-lg px-2 sm:px-4 py-1 sm:py-2 border-t-0 border-r-0 border-b-0 outline-none bg-gray-300 placeholder-gray-400"
                    placeholder="Enter your query here..."
                    disabled={isLoading}
                />
                <button onClick={handleSend} disabled={isLoading} className="bg-primary hover:bg-blue-300 rounded-r-lg text-white px-3 py-2 border-2 border-gray-300">
                    Send
                </button>
            </div>
        </div>

    );
}

export default ChatInterface;
