import React, { useState } from 'react';
import './Chatbox.css';
import { GoChevronRight } from "react-icons/go";
import { FaRobot } from "react-icons/fa";

const Chatbox = () => {
    const [userMessage, setUserMessage] = useState('');
    const [chatbox, setChatbox] = useState([]);
    const api_key = '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';
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const generateResponse = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }]
            })
        };

        await fetch(API_URL, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const newChatbox = [...chatbox];
                newChatbox[newChatbox.length - 1].message = data.choices[0].message.content;
                setChatbox(newChatbox);
            })
            .catch((error) => {
                // const newChatbox = [...chatbox];
                // newChatbox[newChatbox.length - 1].message = 'Oops! Something went wrong!';
                // setChatbox(newChatbox);
                console.error(error);

            });
    };

    const handleChat = () => {
        const trimmedMessage = userMessage.trim();
        if (!trimmedMessage) return;

        // Appending the user's message to the chatbox
        setChatbox(prevChatbox => [...prevChatbox, { role: "user", message: trimmedMessage }]);

        // Add 'Thinking...' message to the chatbox
        setChatbox(prevChatbox => [...prevChatbox, { role: "chatbot", message: "Thinking...." }]);

        // Generate and update the response after a delay
        setTimeout(() => {
            generateResponse();
        }, 600);

        // Clear the input field
        setUserMessage('');
    };

    const chatLiList = chatbox.map((chat, index) => (
        <li key={index} className={`chat ${chat.role === "user" ? "outgoing" : "incoming"}`}>
            {chat.role === "user" ? (
                <p>{chat.message}</p>
            ) : (
                <>
                    <FaRobot />
                    <p>{chat.message}</p>
                </>
            )}
        </li>
    ));

    return (
        <>
            
    
            <button className="chatbot-toggle" onClick={() => document.body.classList.toggle("show_chatbot") }>
            🤖 </button>
            <div className="chatbot">
                <header>
                    <h2>Chatty The ChatBot 🤖</h2>
                </header>
                <ul className="chatbox">{chatLiList}</ul>
                <div className="chat-input">
                    <textarea
                        placeholder="Write your message..."
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        required
                    ></textarea>
                    <span  onClick={handleChat} id='chatbot_span'>
                        <GoChevronRight/>
                    </span>
                </div>
            </div>
        
       
        </>
    );
};

export default Chatbox;
