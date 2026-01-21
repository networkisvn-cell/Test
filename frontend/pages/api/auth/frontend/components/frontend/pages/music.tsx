import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSession } from "next-auth/react";

let socket: any;

export default function MusicPage() {
  const { data: session } = useSession();
  const [connected, setConnected] = useState(false);
  const [track, setTrack] = useState<{ title?: string; author?: string; playing?: boolean }>({});

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_BOT_API_URL || "http://localhost:4000", {
      autoConnect: false,
    });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("playerUpdate", (data: any) => setTrack(data));

    socket.connect();
    return () => socket.disconnect();
  }, []);

  function send(cmd: string, payload = {}) {
    socket.emit("command", { cmd, payload });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Music</h1>

        <div className="p-6 bg-white/6 rounded shadow">
          <div className="mb-4">
            <div className="text-sm text-slate-300">Current</div>
            <div className="text-xl">{track.title ?? "No track"}</div>
            <div className="text-sm text-slate-400">{track.author ?? ""}</div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-indigo-600 rounded" onClick={() => send("play", { query: "Never Gonna Give You Up" })}>Play</button>
            <button className="px-4 py-2 bg-gray-700 rounded" onClick={() => send("pause")}>Pause</button>
            <button className="px-4 py-2 bg-gray-700 rounded" onClick={() => send("skip")}>Skip</button>
            <div className="ml-auto text-sm">{connected ? "Connected" : "Disconnected"}</div>
          </div>

          <div className="mt-4 text-xs text-slate-400">You must be signed in and have permissions for some commands (enforced by bot-api).</div>
        </div>
      </div>
    </div>
  );
}
