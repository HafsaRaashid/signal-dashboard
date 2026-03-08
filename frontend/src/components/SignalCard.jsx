   
 export default function SignalCard({ signal, handleArchive }) {
    return (
        <div key={signal.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex justify-between items-start">
            <div>
                <span className="text-xs uppercase tracking-widest text-sky-400">{signal.type}</span>
                <div className="flex flex-wrap gap-2 mt-1">
                    {Object.entries(signal.payload ?? {}).map(([key, value]) => (
                        <span key={key} className="text-sm text-zinc-300">
                        {key} : {String(value)}
                        </span>
                    ))}
                </div>
                <p className="text-xs text-zinc-500 mt-1">{new Date(signal.created_at).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-sm ${signal.status === "active" ? "bg-emerald-500/15 text-emerald-400" : "bg-zinc-500/15 text-zinc-400"}`}>
                    {signal.status}
                </span>
                {signal.status === "active" && (
                    <button
                    onClick={() => handleArchive(signal.id)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                    >
                    Archive
                    </button>
                )}
            </div>
        </div>
    )
}