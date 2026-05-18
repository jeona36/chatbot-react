import { useState, useEffect  } from 'react'
import { ChatInput } from './components/ChatInput'
import  ChatMessages  from './components/ChatMessages'
import { Chatbot } from 'supersimpledev'
import './App.css'
    

function App() {
 const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || []
  );

  //const chatMessages= array[0];
  //const setChatMessages= array[1];

  useEffect(() => {
    Chatbot.addResponses(
      {
        'good night': 'good night to you too'
      }
    );
  }, []);


    useEffect(() => {
      localStorage.setItem('messages', JSON.stringify(chatMessages));
    }, [chatMessages]);

    return (
      <div className='app-container'>
        {chatMessages.length === 0 && (
          <p className='welcome-message'>
              Welcome to the chatbot! Send a message using the textbox below.
          </p>
        )}
        <ChatMessages 
          chatMessages={chatMessages}
        />
        <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        />         
      </div>
    );
  };
      
      
export default App
