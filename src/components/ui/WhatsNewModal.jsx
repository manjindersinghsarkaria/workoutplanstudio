import { X, Sparkles } from "lucide-react";

/**
 * What's New Panel - Shows changelog for new versions
 * Centered overlay with scrollable content
 */
export function WhatsNewModal({ changes, onClose }) {
  console.log('[WhatsNewModal] Rendering with changes:', changes);
  
  if (!changes || changes.length === 0) {
    console.log('[WhatsNewModal] No changes to display');
    return null;
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      console.log('[WhatsNewModal] Backdrop clicked, closing');
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onMouseDown={handleBackdropClick}
    >
      <div 
        className="w-full max-w-md max-h-[75vh] flex flex-col rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 px-4 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-black text-white">What's New</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {changes.map((entry) => (
            <div key={entry.version} className="rounded-2xl bg-slate-800/50 p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-blue-500/20 text-blue-300">
                  v{entry.version}
                </span>
                <span className="text-xs text-slate-400">
                  {entry.date}
                </span>
              </div>
              <h3 className="text-sm font-black text-white mb-2">
                {entry.title}
              </h3>
              <ul className="space-y-1.5">
                {entry.changes.map((change, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-300 leading-relaxed"
                  >
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
