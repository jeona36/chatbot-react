import dayjs from 'dayjs';
import { useState } from 'react'
import LoadingSpinnerGif from '../assets/loading-spinner.gif';
import './ChatInput.css';

function getBotResponse(message) {
  const text = message.toLowerCase().trim();

  const watchList = JSON.parse(localStorage.getItem('watchList')) || {
    anime: [],
    drama: [],
    movie: []
  };

  /* this for adding */

  if (text.startsWith("save anime ") || text.startsWith("add anime ")) {
    const title = text.includes("save") ? message.slice(11) : message.slice(10);
    if (watchList.anime.includes(title)) {
      return `${title} is already saved 😭`;
    }
    watchList.anime.push(title);
    localStorage.setItem("watchList", JSON.stringify(watchList));
    return `Saved "${title}" to your anime list ✅`
  }

  if (text.startsWith("save drama ") || text.startsWith("add drama ")) {
    const title = text.includes("save") ? message.slice(11) : message.slice(10);
    if (watchList.drama.includes(title)) {
      return `${title} is already saved 😭`;
    }
    watchList.drama.push(title);
    localStorage.setItem("watchList", JSON.stringify(watchList));
    return `Saved "${title}" to your drama list ✅`
  }

  if (text.startsWith("save movie ") || text.startsWith("add movie ")) {
    const title = text.includes("save") ? message.slice(11) : message.slice(10);
    if (watchList.movie.includes(title)) {
      return `${title} is already saved 😭`;
    }
    watchList.movie.push(title);
    localStorage.setItem("watchList", JSON.stringify(watchList));
    return `Saved "${title}" to your movie list ✅`
  }

  /* this for showing */

  if (text.includes('show anime')) {
    return watchList.anime.length
      ? watchList.anime.map((anime, index) =>
        `${index + 1}- ${anime}`
      ).join('\n')
      : 'Your anime list is empty.';
  }

  if (text.includes("show drama")) {
    return watchList.drama.length
      ? watchList.drama.map((drama, index) =>
        `${index + 1}- ${drama}`
      ).join('\n')
      : "Your drama list is empty";
  }

  if (text.includes("show movie")) {
    return watchList.movie.length
      ? watchList.movie.map((movie, index) =>
        `${index + 1}- ${movie}`
      ).join('\n')
      : "Your movie list is empty"
  }

  if (text === "show all") {
    return `
    Anime: 
    ${watchList.anime.map((anime, index) =>
        `${index + 1}- ${anime}`
      ).join('\n') || "empty"}
      ___________________
    Drama: 
    ${watchList.drama.map((drama, index) =>
        `${index + 1}- ${drama}`
      ).join('\n') || "empty"}
      ___________________
    Movie: 
    ${watchList.movie.map((movie, index) =>
        `${index + 1}- ${movie}`
      ).join('\n') || "empty"}
    `
  }

  /* this for deleting */

  if (text.startsWith("delete anime ") || text.startsWith("remove anime ")) {
    const title = message.slice(13).trim();
    watchList.anime = watchList.anime.filter(anime =>
      anime.toLowerCase() !== title.toLowerCase()
    );
    localStorage.setItem("watchList", JSON.stringify(watchList));
    return `${title}, deleted from anime list 🗑️`;
  }

  if (text.startsWith("delete drama ") || text.startsWith("remove drama ")) {
    const title = message.slice(13).trim();
    watchList.drama = watchList.drama.filter(drama =>
      drama.toLowerCase() !== title.toLowerCase()
    );
    localStorage.setItem("watchList", JSON.stringify(watchList));
    return `${title}, deleted from drama list 🗑️`;
  }

  if (text.startsWith("delete movie ") || text.startsWith("remove movie ")) {
    const title = message.slice(13).trim();
    watchList.movie = watchList.movie.filter(movie =>
      movie.toLowerCase() !== title.toLowerCase()
    );
    localStorage.setItem("watchList", JSON.stringify(watchList));
    return `${title}, deleted from movie list 🗑️`;
  }

  /* this for editing */

  if (text.startsWith("edit anime ")) {
    const editText = message.slice(11);
    const [oldTitle, newTitle] = editText.split(" to ");
    const index = watchList.anime.findIndex(anime =>
      anime.toLowerCase() === oldTitle.trim().toLowerCase()
    );
    if (index === -1) return `${oldTitle} not found`;

    watchList.anime[index] = newTitle.trim();
    localStorage.setItem("watchList", JSON.stringify(watchList));

    return `${oldTitle} updated to ${newTitle} ✏`;
  }

  if (text.startsWith("edit drama ")) {
    const editText = message.slice(11);
    const [oldTitle, newTitle] = editText.split(" to ");
    const index = watchList.drama.findIndex(drama =>
      drama.toLowerCase() === oldTitle.trim().toLowerCase()
    );
    if (index === -1) return `${oldTitle} not found`;

    watchList.drama[index] = newTitle.trim();
    localStorage.setItem("watchList", JSON.stringify(watchList));

    return `${oldTitle} updated to ${newTitle} ✏`;
  }

  if (text.startsWith("edit movie ")) {
    const editText = message.slice(11);
    const [oldTitle, newTitle] = editText.split(" to ");
    const index = watchList.movie.findIndex(movie =>
      movie.toLowerCase() === oldTitle.trim().toLowerCase()
    );
    if (index === -1) return `${oldTitle} not found`;

    watchList.movie[index] = newTitle.trim();
    localStorage.setItem("watchList", JSON.stringify(watchList));

    return `${oldTitle} updated to ${newTitle} ✏`;
  }

  /* for random questions */

  if (text.includes('hello') || text.includes('hi')) {
    return 'Hey 👋 How can I help you?';
  }

  if (text.includes('how are you')) {
    return "I'm doing great 😄 What about you?";
  }

  if (text.includes("what can you do")) {
    return ` I can answer simple questions like (date, time) and make a list of 
    anime/drama/movie by using (save/delete/edit/show  anime/drama/movie) and then writing the title`
  }

  if (text.includes('date') || text.includes('today')) {
    return `Today is ${dayjs().format('MMMM D, YYYY')}`;
  }

  if (text.includes('time')) {
    return `The time is ${dayjs().format('h:mm A')}`;
  }

  if (text.includes('your name')) {
    return "I'm your chatbot 🤖";
  }

  if (text.includes('who made you')) {
    return "Naba made me";
  }

  if (text.includes('thank')) {
    return "You're welcome!";
  }

  if (text.includes("bye")) {
    return "bye, see U soon 👋";
  }

  return "Sorry, I don't understand that yet, or you probably just wrote some gibberish";
};

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  };

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  };

  async function sendMessage() {
    if (isLoading || inputText.trim() === '') {
      return;
    };

    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs()
      }
    ];


    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img src={LoadingSpinnerGif}
            className="loading-spinner"
          />),
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);


    setInputText('');

    await sleep(700);

    const response = getBotResponse(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs()
      }
    ]);

    setIsLoading(false);

  };


  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };


  function clearChat() {
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