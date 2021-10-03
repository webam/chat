/** @jsx h */
import { h, IS_BROWSER, PageConfig, useState, useEffect, useCallback } from "../deps.ts";

interface Message {
  text: string,

}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  const getMessages = useCallback(async() => {
    const res = await fetch("https://webam-deno-server.deno.dev/messages");
    const data = await res.json();
    setMessages(data);
  },[])
  useEffect(() => {
    getMessages() 
  }, [])
const onSendMessage = useCallback(async () => {
  await fetch("https://webam-deno-server.deno.dev/messages", {
    method: "POST",
    headers: {
      "content-type" : "application/json"
    },
    body: JSON.stringify({text})
  });
  setText("");
  getMessages();
},[text])

  return (
    <div>
      <div>
        <input type="text" value={text} onChange={(evt: Event) => 
          setText((evt.target as HTMLInputElement).value)} />
         <button onClick={onSendMessage}>add</button>
      {JSON.stringify(messages)}
      </div>
    </div>
  );
}

// function Counter() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={() => setCount(count - 1)} disabled={!IS_BROWSER}>
//         -1
//       </button>
//       <button onClick={() => setCount(count + 1)} disabled={!IS_BROWSER}>
//         +1
//       </button>
//     </div>
//   );
// }

export const config: PageConfig = { runtimeJS: true };

