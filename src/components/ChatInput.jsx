import dayjs from 'dayjs';
import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import LoadingSpinnerGif from '../assets/loading-spinner.gif';
import './ChatInput.css';

  export function ChatInput({chatMessages, setChatMessages}){
      const [inputText, setInputText] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      function saveInputText(event){
        setInputText(event.target.value);
      };

      async function sendMessage(){
        if(isLoading || inputText.trim() === ''){
          return;
        };

        setIsLoading(true);

        const newChatMessages = [
          ...chatMessages,
          {
           message: inputText,
           sender:'user',
           id: crypto.randomUUID(),
           time: dayjs()
          }
        ];
        

        setChatMessages([
          ...newChatMessages,
         {
           message: (
            <img src= {LoadingSpinnerGif} 
            className="loading-spinner" 
            />),
           sender:'robot',
           id: crypto.randomUUID() 
         }
        ]);
        

        setInputText('');

        const response = await Chatbot.getResponseAsync(inputText);

         setChatMessages([
          ...newChatMessages,
          {
           message: response,
           sender:'robot',
           id: crypto.randomUUID(),
           time: dayjs()
          }
        ]);

        setIsLoading(false);
        
      };
      
      
      function handleKeyDown(event){
        if(event.key === 'Enter'){
          sendMessage();
        }
      };


      function clearChat(){
        setChatMessages([]);
      };


      return (
        /*in jsx all elements need a closing tag, and if there is nothing inside an element we can use a shortcut <... />.

        <> </> is called a fragment and it helps us to group elements without using too many divs.we can use fragments only with react.*/

        <div className='chat-input-container'>
          <input 
            placeholder="send a message to chatbot" 
            size="30" 
            onChange={saveInputText}
            onKeyDown={handleKeyDown}
            value={inputText}
            className='chat-input'
          />
          <button 
          onClick={sendMessage}
          className='send-button'
          >send</button>

          <button 
          onClick={clearChat}
          className='clear-button'
          >Clear</button>
        </div>
      )
     };