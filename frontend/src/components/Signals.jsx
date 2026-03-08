import { useState, useEffect } from "react";
import SignalCard from "./SignalCard";
import AddSignalForm from "./AddSignalForm";

const API = import.meta.env.VITE_API_URL;


export default function SignalList({ account }) {
  const [signals, setSignals] = useState([]);
  const [filters, setFilters] = useState({ type: "", status: "" });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account) return;

    const params = new URLSearchParams();
    if (filters.type) params.set("type", filters.type);
    if (filters.status) params.set("status", filters.status);

    fetch(`${API}/api/accounts/${account.id}/signals?${params}`)
      .then((r) => r.json())
      .then((data) => {
      setSignals(data);
      setLoading(false);
    })
      .catch((err) => {
        console.error("Failed to load signals", err);
        setLoading(false);
    });
  }, [account, filters]);

  const handleArchive = async (id) => {
    await fetch(`${API}/api/signals/${id}/archive`, {
      method: "PATCH",
    });
    setSignals((prev) => prev.filter((signal) => signal.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{account.name}</h2>

      <div className="flex gap-4 mb-6">
        {/* Signal type filters */}
        <select
          className="bg-zinc-800 text-zinc-300 pl-2 pr-0 py-2 rounded-lg text-sm cursor-pointer"
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          <option value="">All Types</option>
          <option value="intent">Intent</option>
          <option value="web_visit">Web Visit</option>
          <option value="form_fill">Form Fill</option>
          <option value="linkedin">LinkedIn</option>
        </select>

        {/* Signal status filters */}
        <select
          className="bg-zinc-800 text-zinc-300 pl-2 pr-0 py-2 rounded-lg text-sm cursor-pointer"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>

        {/* Add signal button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-sky-600 hover:bg-sky-500 text-white text-sm px-4 py-2 rounded-lg">
          + Add Signal
        </button>
      </div>
      
      {/* Add Signal Form */}
      {showForm && (
        <AddSignalForm
          account={account}
          onSignalAdded={(newSignal) => {
            setSignals((prev) => [newSignal, ...prev ]);
            setShowForm(false);
          }}
        />
      )}

      {/* Signal Cards */}
      <div className="flex flex-col gap-3 mb-8">
        {loading && <p className="text-zinc-500">Loading signals...</p>}
        {signals.length === 0 && (
          <p className="text-zinc-500">No signals found.</p>
        )}
        {signals.map((signal) => (
          <SignalCard key={signal.id} signal={signal} handleArchive={handleArchive} />
        ))}
      </div>

    </div>
  );
}