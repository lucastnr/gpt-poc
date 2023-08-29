import { useCallback, useRef, useState } from "react";
import { getCompletionStream } from "../utils/api";

export function Index() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [result, setResult] = useState("");

  const sendPrompt = useCallback(async () => {
    const prompt = inputRef.current?.value;

    if (!prompt) return;

    getCompletionStream(prompt, {
      onMessage: (completion) => {
        setResult(completion.message);
      },
      onOpen: () => {
        setResult("");
      },
    });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      >
        <textarea ref={inputRef} />
        <button onClick={sendPrompt}>Send</button>
      </div>
      <p>Result: {result}</p>
    </div>
  );
}

export default Index;
