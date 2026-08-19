import { useState, useMemo } from "react";
import { ClipboardCheck, FileUp, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const initialHomeworks = [
  {
    id: 1,
    title: "Exercices sur les fonctions dérivées",
    subject: "Mathématiques",
    dueDate: "2026-08-22",
    status: "pending", // pending, submitted, graded
    grade: null,
  },
  {
    id: 2,
    title: "TP1 - Structures de données en Java",
    subject: "Informatique",
    dueDate: "2026-08-25",
    status: "submitted",
    grade: null,
  },
  {
    id: 3,
    title: "Analyse de texte : Le Romantisme",
    subject: "Français",
    dueDate: "2026-08-10",
    status: "graded",
    grade: "16/20",
  },
];

export default function StudentHomeworks() {
  const [homeworks, setHomeworks] = useState(initialHomeworks);
  const [filter, setFilter] = useState("all");

  const filteredHomeworks = useMemo(() => {
    if (filter === "pending") return homeworks.filter((h) => h.status === "pending");
    if (filter === "completed") return homeworks.filter((h) => h.status !== "pending");
    return homeworks;
  }, [homeworks, filter]);

  const handleSubmitHomework = (id) => {
    setHomeworks((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: "submitted" } : h))
    );
  };

  return (
    <div className="space-y-6">
      {/* EN-TÊTE */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Mes Devoirs</h1>
            <p className="mt-1 text-sm text-slate-400">
              Consultez vos devoirs à rendre et vos notes reçues.
            </p>
          </div>

          {/* FILTRES */}
          <div className="flex gap-2 rounded-2xl border border-slate-800 bg-slate-950 p-1.5">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                filter === "all" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                filter === "pending" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              À faire
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                filter === "completed" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Rendus / Notés
            </button>
          </div>
        </div>
      </div>

      {/* LISTE DES DEVOIRS */}
      <div className="grid gap-4">
        {filteredHomeworks.map((hw) => (
          <div
            key={hw.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-1">
              <span className="inline-block rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400">
                {hw.subject}
              </span>
              <h3 className="text-lg font-semibold text-white">{hw.title}</h3>
              <p className="flex items-center gap-2 text-xs text-slate-400">
                <Clock size={14} /> Date limite : {hw.dueDate}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* STATUS BADGE */}
              {hw.status === "pending" && (
                <span className="flex items-center gap-1.5 rounded-xl bg-orange-500/10 px-3 py-1.5 text-xs font-medium text-orange-400">
                  <AlertCircle size={14} /> À rendre
                </span>
              )}
              {hw.status === "submitted" && (
                <span className="flex items-center gap-1.5 rounded-xl bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
                  <CheckCircle2 size={14} /> Soumis
                </span>
              )}
              {hw.status === "graded" && (
                <span className="flex items-center gap-1.5 rounded-xl bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400">
                  <ClipboardCheck size={14} /> Note : {hw.grade}
                </span>
              )}

              {/* ACTION BUTTON */}
              {hw.status === "pending" && (
                <button
                  onClick={() => handleSubmitHomework(hw.id)}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                >
                  <FileUp size={16} /> Rendre le devoir
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}