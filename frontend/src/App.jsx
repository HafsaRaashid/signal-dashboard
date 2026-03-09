import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Signals from "./components/Signals";

export default function App() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100">
      <button
        className="md:hidden fixed top-4 left-4 z-0 p-2 bg-zinc-800 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
      
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-10">
          <Sidebar
            onSelectAccount={(account) => {
              setSelectedAccount(account);
              setSidebarOpen(false);
            }}
            selectedAccount={selectedAccount}
          />
        </div>
      )}

      {/* Sidebar always visible on desktop */}
      <div className="hidden md:block">
        <Sidebar onSelectAccount={setSelectedAccount} selectedAccount={selectedAccount} />
      </div>     

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