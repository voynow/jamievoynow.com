import { useState, useEffect, useRef } from 'react';

interface ChatInterfaceProps {
    projectName: string;
}

const ChatInterface = ({ projectName }: ChatInterfaceProps) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSend = () => {
        if (message.trim() !== '') {
            setMessages(prevMessages => [...prevMessages, message]);
            setMessage('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Chat Interface for {projectName}</h2>
            <p>Welcome to the chat interface. You can ask me questions about the {projectName} project.</p>
            <div className="border-t border-gray-200 mt-4 p-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className="p-2 rounded bg-blue-200 text-white max-w-xs mb-2">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="flex mt-4 border-t border-gray-200 pt-4">
                <input 
                    ref={inputRef}
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow rounded-l-lg px-4 py-2 border-t-0 border-r-0 border-b-0 border-l-2 outline-none"
                    placeholder="Chat with this project..."
                    // className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                />

                <button onClick={handleSend} className="bg-blue-600 hover:bg-indigo-700 rounded-r-lg text-white px-4 py-2 border-t-0 border-r-2 border-b-0 border-l-0 outline-none">
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatInterface;
