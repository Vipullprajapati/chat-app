import { useEffect, useRef } from "react";
import Chat from "./Chat";


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
    <div className="bg-green-400 text-white  w-full">
      <div className="container mx-auto flex flex-row justify-between items-center sm:px-5 py-2 px-2">
      <h1>VipuL tech</h1>
      <ul className="flex flex-row gap-2">
        <h4>Network :</h4>
        <li>online</li>
      </ul>
      </div>
    </div>
    
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