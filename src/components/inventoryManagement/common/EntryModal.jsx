import { useEffect, useMemo, useRef, useState } from "react";
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const baseInput =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-[#0F52BA] focus:ring-2 focus:ring-[#0F52BA]/20";

const fieldClass = {
  text: baseInput,
  number: baseInput,
  date: baseInput,
  select: `${baseInput} cursor-pointer`,
  textarea:
    "w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-[#0F52BA] focus:ring-2 focus:ring-[#0F52BA]/20",
};

const EntryModal = ({ open, onClose, title, submitLabel = "Save", fields = [], onSubmit }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const prevOpenRef = useRef(false);

  useEffect(() => {
    if (!prevOpenRef.current && open) {
      setValues(Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""])));
      setErrors({});
      setFeedback(null);
    }
    prevOpenRef.current = open;
  }, [open, fields]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const validationErrors = useMemo(() => {
    const result = {};
    fields.forEach((f) => {
      if (f.required && !String(values[f.name] ?? "").trim()) {
        result[f.name] = `${f.label} is required`;
      }
    });
    return result;
  }, [fields, values]);

  if (!open) return null;

  const updateField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setFeedback(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setFeedback(null);
    try {
      await onSubmit?.(values);
      setFeedback({ type: "success", message: "Submitted successfully." });
      setTimeout(onClose, 800);
    } catch {
      setFeedback({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const closeOnBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={closeOnBackdrop}
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form id="entry-modal-form" onSubmit={handleSubmit} className="overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fields.map((field) => {
              const hasError = Boolean(errors[field.name]);
              const classes = `${fieldClass[field.type] ?? baseInput} ${hasError ? "border-rose-400 focus:border-rose-400 focus:ring-rose-200" : ""} ${field.disabled ? "cursor-not-allowed bg-slate-50 text-slate-500" : ""}`;
              return (
                <div key={field.name} className={`${field.fullWidth ? "md:col-span-2" : ""} flex flex-col gap-1.5`}>
                  <label htmlFor={`entry-${field.name}`} className="text-sm font-medium text-slate-600">
                    {field.label}
                    {field.required && <span className="ml-0.5 text-rose-500">*</span>}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea id={`entry-${field.name}`} rows={field.rows ?? 3} placeholder={field.placeholder} value={values[field.name] ?? ""} onChange={(e) => updateField(field.name, e.target.value)} disabled={field.disabled || submitting} className={classes} />
                  ) : field.type === "select" ? (
                    <select id={`entry-${field.name}`} value={values[field.name] ?? ""} onChange={(e) => updateField(field.name, e.target.value)} disabled={field.disabled || submitting} className={classes}>
                      <option value="">{field.placeholder ?? "Select..."}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input id={`entry-${field.name}`} type={field.type} min={field.min} placeholder={field.placeholder} value={values[field.name] ?? ""} onChange={(e) => updateField(field.name, e.target.value)} disabled={field.disabled || submitting} className={classes} />
                  )}

                  {hasError && (
                    <p className="flex items-center gap-1 text-xs font-medium text-rose-600">
                      <AlertCircle size={13} />
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {feedback && (
            <div className={`mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${feedback.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`} role="status">
              {feedback.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {feedback.message}
            </div>
          )}
        </form>

        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button type="button" onClick={onClose} disabled={submitting} className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50">
            Cancel
          </button>
          <button type="submit" form="entry-modal-form" disabled={submitting} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#0F52BA] to-[#13B8A7] px-6 text-sm font-semibold text-white shadow-md shadow-blue-200/50 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60">
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting ? "Saving..." : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryModal;
