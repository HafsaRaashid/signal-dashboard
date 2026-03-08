import { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100">
      <Sidebar onSelectAccount={setSelectedAccount} selectedAccount={selectedAccount} />
    </div>
  );
}