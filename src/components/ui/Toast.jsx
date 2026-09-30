import { useEffect } from "react";
import { CheckCircle2, X, AlertCircle, Info } from "lucide-react";
import { cn } from "@/utils";

/**
 * Toast notification component with modern design
 * Types: success, error, info, warning
 */
export function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
  };

  const styles = {
    success: "border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-400 dark:bg-emerald-950/95 dark:text-emerald-100",
    error: "border-red-500 bg-red-50 text-red-900 dark:border-red-400 dark:bg-red-950/95 dark:text-red-100",
    info: "border-blue-500 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-950/95 dark:text-blue-100",
    warning: "border-amber-500 bg-amber-50 text-amber-900 dark:border-amber-400 dark:bg-amber-950/95 dark:text-amber-100",
  };

  return (
    <div className="fixed top-20 left-0 right-0 z-50 px-4 pointer-events-none animate-in slide-in-from-top-5 duration-300">
      <div className="mx-auto max-w-md pointer-events-auto">
        <div className={cn(
          "rounded-2xl border-2 p-4 shadow-2xl backdrop-blur-sm flex items-start gap-3",
          styles[type]
        )}>
          <div className="shrink-0 mt-0.5">
            {icons[type]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold leading-relaxed">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
