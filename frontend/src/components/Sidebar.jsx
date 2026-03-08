import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Sidebar({ onSelectAccount, selectedAccount }) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch accounts on mount
  useEffect(() => {
    fetch(`${API}/api/accounts`)
      .then((r) => r.json())
      .then((data) => {
      setAccounts(data);
      setLoading(false);
    })
      .catch((err) => {
        console.error("Failed to load accounts", err);
        setLoading(false);
    });
  }, []);

  return (
    <div className="w-64 h-screen bg-zinc-900 border-r border-zinc-800 p-4">
      <h2 className="text-zinc-400 text-xs uppercase tracking-widest mb-4">Accounts</h2>
      {loading && <p className="text-zinc-500 text-sm">Loading...</p>}
      {accounts.map((account) => (
        <div
          key={account.id}
          onClick={() => onSelectAccount(account)}
          className={`p-3 rounded-lg cursor-pointer mb-2 transition-colors ${
            selectedAccount?.id === account.id
              ? "bg-zinc-700 text-white"
              : "text-zinc-400 hover:bg-zinc-800"
          }`}
        >
          {account.name}
        </div>
      ))}
    </div>
  );
}