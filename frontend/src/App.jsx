import { useEffect, useState } from "react";

export default function App() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("backend unreachable"));
  }, []);

  return (
    <main>
      <h1>DeskSpot</h1>
      <p>API status: {status}</p>
    </main>
  );
}
