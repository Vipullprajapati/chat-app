import { Button, Input } from "@heroui/react";
import { SendHorizonalIcon } from "lucide-react";
import { useState } from "react";

export default function Inputs() {
  const [input, setInput] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    setInput("");
  };

  return (
    <form
      className="absolute bottom-0 left-0 w-full flex gap-0 sm:gap-1 mb-0 sm:mb-2 px-0 sm:px-8 max-w-5xl"
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        value={input}
        placeholder="Enter a message..."
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
      />
      <Button type="Submit" className="bg-blue-100">
        <SendHorizonalIcon />
      </Button>
    </form>
  );
}
