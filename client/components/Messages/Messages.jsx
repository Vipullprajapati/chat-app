import { useEffect, useRef } from "react";
import Chat from "./Chat";

// network status
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}


export default function Messages({ messages, id,teamName = "Vipul tech" }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  return (
    <>
    {/* {  // navbar} */}
    <div className="bg-green-400 text-white  w-full">
      <div className="container mx-auto flex flex-row justify-between items-center sm:px-5 py-2 px-2">
      <h1>😀{teamName}</h1>
      <ul className="flex flex-row gap-2">
         <h4>Network: {useOnlineStatus ? "online" : "offline"}</h4> {/* Display the value */}
      </ul>
      </div>
    </div>

    {/* scrolling */}
    <div className="container mx-auto pt-5 min-h-[85vh] max-h-[85vh] overflow-scroll scrollbar-hidden px-5 py-3">
      <section className="flex gap-1 flex-col">
        {messages.map((message, index) => (
          <Chat
            key={index}
            own={message.user.id === id}
            name={message.user.name}
            type={message.type}
            content={message.content}
          />
        ))}
      </section>

      <div className="auto-scroll" ref={scrollRef}></div>
    </div>
    </>
  );
}