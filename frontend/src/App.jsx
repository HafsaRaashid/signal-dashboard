import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Signals from "./components/Signals";

export default function App() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100">
      <Sidebar onSelectAccount={setSelectedAccount} selectedAccount={selectedAccount} />
      <div className="flex-1 overflow-y-auto p-8">
        {selectedAccount ? (
          <Signals account={selectedAccount} />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500">
            Select an account to view signals
          </div>
        )}
      </div>
    </div>
  );
}