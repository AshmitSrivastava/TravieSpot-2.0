import React, { useState } from 'react';
import 'src/App.css';

function Faq() {
  const [selected, setSelected] = useState(null);

  const faqs = [
    {
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces.'
    },
    {
      question: 'How do I install React?',
      answer: 'You can install React by using npm or yarn: npm install react or yarn add react'
    },
    {
      question: 'What is JSX?',
      answer: 'JSX is a syntax extension for JavaScript used with React to describe what the UI should look like.'
    }
  ];

  const handleToggle = (index) => {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };

  return (
    <div className="faq-container">
      {faqs.map((faq, index) => (
        <div key={index} className="faq-card">
          <div className="faq-question text-white" onClick={() => handleToggle(index)}>
            {faq.question}
          </div>
          {selected === index && (
            <div className="faq-answer text-white">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Faq;
