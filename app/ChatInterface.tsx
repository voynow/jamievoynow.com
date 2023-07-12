import { useEffect, useRef, useState } from 'react';

interface ChatInterfaceProps {
    projectName: string;
}

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const ChatInterface = ({ projectName }: ChatInterfaceProps) => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSend = async () => {
        if (message.trim()) {
            console.log('Sending message:', message);
            setIsLoading(true);
            setMessages(prevMessages => [...prevMessages, { text: message, sender: 'user' }]);
            setMessage('');
            const response = await fetch('/api/send_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message, project: projectName })
            });
            if (!response.ok) {
                console.error('Error sending message:', response.status, response.statusText);
                setIsLoading(false);
                return;
            }
            const responseData = await response.json();
            console.log('Received response:', responseData);
            setMessages(prevMessages => [...prevMessages, { text: responseData, sender: 'bot' }]);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoading) inputRef.current?.focus();
    }, [isLoading]);

    return (
        <div className="h-full flex flex-col bg-white shadow overflow-hidden sm:rounded-lg p-4">
            <div className="flex-grow overflow-y-auto pb-4">
                <h2 className="text-2xl font-bold text-gray-400 mb-4">Chat with {projectName}</h2>
                <p className='text-gray-400 mb-4'>Learn about {projectName} in a natural language interface</p>
                <div className="border-t border-gray-200 mt-4 p-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`p-2 rounded-lg max-w-xs mb-2 ml-2 mr-2 ${msg.sender === 'user' ? 'bg-blue-200 text-white ml-auto' : 'bg-gray-200 text-black mr-auto'}`}>
                            <p className={`px-4 py-2 ${msg.sender === 'user' ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                                {msg.text}
                            </p>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="self-start text-gray-500 flex items-center mb-2 ml-4 space-x-1">
                            <div className="dot-typing"></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex mt-4 border-t border-gray-200 pt-4">
                <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
                    className="text-gray-600 flex-grow rounded-l-lg px-4 py-2 border-t-0 border-r-0 border-b-0 outline-none"
                    placeholder="Enter your query here..."
                    disabled={isLoading}
                />

                <button onClick={handleSend} disabled={isLoading} className="bg-blue-600 hover:bg-blue-300 rounded-r-lg text-white px-4 py-2 border-t-0 border-r-2 border-b-0 border-l-0 outline-none">
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatInterface;
