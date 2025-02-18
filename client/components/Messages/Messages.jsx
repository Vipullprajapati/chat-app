import { useEffect, useRef } from "react";
import Chat from "./Chat";
import { Camera, ArrowLeft, Video, Phone } from "lucide-react";

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

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

export default function Messages({ messages, id }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* {  // navbar} */}
      <div className="bg-blue-400 text-white  w-full">
        <div className="container flex flex-row justify-between items-center sm:px-5 py-2 px-2">
          {" "}
          {/* Changed justify-space-between to justify-between>
          {/* Back button */}
          <div className="flex items-center">
            <ArrowLeft
              className="w-5 h-5 cursor-pointer"
              aria-label="Go back"
            />
            {/* Team network */}
            <h1 className="flex gap-2">Network : {useOnlineStatus ? "online" : "offline"}</h1>
            <ul className="flex flex-row gap-2 items-center">
              <li className="flex items-center gap-6">
                {/* Changed <div> to <li> for semantic correctness */}
                <Video
                  className="w-5 h-5 cursor-pointer"
                  aria-label="Start video call"
                />
                <Phone
                  className="w-5 h-5 cursor-pointer"
                  aria-label="Start audio call"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* scrolling */}
      <div className="container mx-auto pt-5 min-h-[85vh] max-h-[85vh] overflow-scroll scrollbar-hidden px-5 py-3">
        <section className="flex gap-1 flex-col">
          {messages.map((message, index) => (
            <Chat
              key={message.id || `${message.timestamp}-${index}`}
              own={message.user.id === id}
              name={message.user.name}
              type={message.type}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
        </section>

        <div ref={scrollRef}></div>
      </div>
    </>
  );
}
