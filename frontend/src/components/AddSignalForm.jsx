import { useState } from "react";
const API = import.meta.env.VITE_API_URL;

const PAYLOAD_FIELDS = {
  intent:    [{ key: "score", placeholder: "Score (e.g. 87)" }, { key: "topic", placeholder: "Topic" }],
  web_visit: [{ key: "page", placeholder: "Page (e.g. pricing)" }],
  form_fill: [{ key: "form", placeholder: "Form name" }],
  linkedin:  [{ key: "campaign", placeholder: "Campaign name" }],
};

export default function AddSignalForm({ account, onSignalAdded }) {
  const [form, setForm] = useState({ type: "", payload: {} });

  const handleSubmit = async () => {
    if (!form.type || Object.keys(form.payload).length === 0) return;
    const res = await fetch(`${API}/api/signals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account_id: account.id, type: form.type, payload: form.payload }),
    });
    const newSignal = await res.json();
    onSignalAdded(newSignal);
    setForm({ type: "", payload: {} });
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-4">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">Add New Signal</h3>
      <div className="flex flex-col gap-3">
        <select
          value={form.type}
          onChange={(e) => setForm({ type: e.target.value, payload: {} })}
          className="bg-zinc-800 text-zinc-300 px-3 py-2 rounded-lg text-sm"
        >
          <option value="">Select Type</option>
          <option value="intent">Intent</option>
          <option value="web_visit">Web Visit</option>
          <option value="form_fill">Form Fill</option>
          <option value="linkedin">LinkedIn</option>
        </select>

        {form.type && PAYLOAD_FIELDS[form.type].map(({ key, placeholder }) => (
          <input
            key={key}
            value={form.payload[key] || ""}
            onChange={(e) => setForm({ ...form, payload: { ...form.payload, [key]: e.target.value } })}
            placeholder={placeholder}
            className="bg-zinc-800 text-zinc-300 px-3 py-2 rounded-lg text-sm"
          />
        ))}

        <button
          onClick={handleSubmit}
          className="bg-sky-600 hover:bg-sky-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          Add Signal
        </button>
      </div>
    </div>
  );
}