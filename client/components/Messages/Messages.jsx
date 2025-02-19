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
      {/* Back button */}
      <div className="flex  justify-content-space-between bg-gradient-to-r from-green-200 to-gray-100 border border-green-200 rounded-lg shadow-md animate-slide-in max-w-100% px-5 py-3 gap-2">
        <div className="flex items-center ">
        <ArrowLeft className="w-5 h-5 cursor-pointer" aria-label="Go back" />
          <h1 className="flex gap-2">
            Network : {useOnlineStatus ? "online" : "offline"}
          </h1>
          </div>

          <div className="flex  items-center  justify-content-space-between bg-gradient-to-r from-green-200 to-gray-100 border border-green-200 rounded-lg shadow-md animate-slide-in max-w-100% px-5 py-3 gap-2">
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
