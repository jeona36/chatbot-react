import dayjs from 'dayjs';
import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
import './ChatMessage.css'

export function ChatMessage({ message, sender, time }){

       //in jsx we can't write (if) inside the html so instead we can use the operators.
        return (
          <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
            {sender === 'robot' && <img src= { RobotProfileImage } className='chat-message-profile' />}
            <div className='chat-message-text'>
               {message}
               <div className='chat-message-time'>
                 {dayjs(time).format('h:mm a ddd')}
               </div>
            </div>
            {sender === 'user' && <img src= { UserProfileImage } className='chat-message-profile' />}
          </div>
        );
     };
     