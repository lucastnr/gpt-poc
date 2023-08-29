import OpenAi from "openai";
import { useCallback, useRef, useState } from "react";
import { getCompletion } from "../utils/api";

export function Index() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [result, setResult] = useState<OpenAi.Chat.ChatCompletion>();

  const sendPrompt = useCallback(async () => {
    const prompt = inputRef.current?.value;

    if (!prompt) return;

    const result = await getCompletion(prompt);

    setResult(result.data);
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
      <p>Result: {result?.choices?.[0]?.message?.content || ""}</p>
    </div>
  );
}

export default Index;
