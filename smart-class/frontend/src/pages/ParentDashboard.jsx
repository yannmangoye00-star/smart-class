import { useState } from "react";
import { Users, CheckSquare, Award, BookOpen, Calendar, Clock, MessageSquare, X, ChevronRight, AlertCircle, Bot, Sparkles } from "lucide-react";
import ParentAIAssistant from "../components/ParentAIAssistant.jsx";

const childrenList = [
  { id: 1, name: "Marc Floyd", class: "Terminale C", avg: "86%", homeworkCount: 4 },
  { id: 2, name: "Sarah Floyd", class: "3ème A", avg: "91%", homeworkCount: 3 },
];

const pendingHomeworks = [
  { id: 101, subject: "Mathématiques", title: "Exercices sur les Intégrales", dueDate: "Demain", urgent: true },
  { id: 102, subject: "Physique", title: "Compte-rendu TP Optique", dueDate: "22 Août", urgent: true },
  { id: 103, subject: "Philosophie", title: "Dissertation : La Liberté", dueDate: "25 Août", urgent: false },
];

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(childrenList[0]);
  const [activeModal, setActiveModal] = useState(null); // 'homework' | 'event' | null
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <section className="space-y-6 px-1 py-3 text-white">
      {/* Selector d'enfant & En-tête */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Espace Parent</h1>
          <p className="mt-1 text-sm text-slate-400">Suivi de la scolarité et activités académiques.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Bouton pour lancer l'Assistant IA */}
          <button
            onClick={() => setIsAIOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-500 hover:to-indigo-500 cursor-pointer"
          >
            <Bot size={18} />
            <span>Assistant IA</span>
            <Sparkles size={14} className="text-amber-300" />
          </button>

          {/* Choix de l'enfant */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-2">
            <Users size={18} className="ml-2 text-blue-400" />
            <select
              value={selectedChild.id}
              onChange={(e) => setSelectedChild(childrenList.find((c) => c.id === Number(e.target.value)))}
              className="bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer pr-2"
            >
              {childrenList.map((child) => (
                <option key={child.id} value={child.id} className="bg-slate-900 text-white">
                  {child.name} ({child.class})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Enfants suivis</span>
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-2 text-3xl font-bold">02</div>
          <p className="mt-1 text-xs text-emerald-400">+1 ce mois</p>
        </div>

        <button
          onClick={() => setActiveModal("homework")}
          className="text-left rounded-3xl border border-rose-900/40 bg-gradient-to-br from-slate-900 to-rose-950/20 p-5 shadow-xl transition hover:border-rose-500/50 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Devoirs à valider</span>
            <div className="rounded-xl bg-rose-500/10 p-2.5 text-rose-400">
              <CheckSquare size={20} />
            </div>
          </div>
          <div className="mt-2 text-3xl font-bold text-white">07</div>
          <p className="mt-1 text-xs text-rose-400 font-medium">2 urgents (cliquer pour voir)</p>
        </button>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Moyenne générale</span>
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
              <Award size={20} />
            </div>
          </div>
          <div className="mt-2 text-3xl font-bold">{selectedChild.avg}</div>
          <p className="mt-1 text-xs text-emerald-400">+4.2% vs dernier trimestre</p>
        </div>
      </div>

      {/* Grille principale : Suivi des cours & Calendrier */}
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Progression par matière */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <h2 className="text-base font-bold">Suivi des cours ({selectedChild.name})</h2>
          <p className="text-xs text-slate-400">Progression hebdomadaire des compétences</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Mathématiques</span>
                <span className="text-blue-400">89%</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-800">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: "89%" }} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Sciences</span>
                <span className="text-emerald-400">76%</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-800">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: "76%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Événements & Rendez-vous */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <h2 className="text-base font-bold">Calendrier</h2>
          <p className="text-xs text-slate-400">Rendez-vous et événements à venir</p>

          <div className="mt-4 space-y-3">
            <div
              onClick={() => setActiveModal("event")}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-800/50 p-3.5 transition hover:bg-slate-800 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-600/20 p-2 text-blue-400">
                  <Calendar size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Réunion parents-enseignants</h4>
                  <p className="text-xs text-slate-400">Mardi 18h30 — Salle de conférence</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-500" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODALE DEVOIRS URGENTS ================= */}
      {activeModal === "homework" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold">Devoirs à valider</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="mt-4 space-y-3 max-h-80 overflow-y-auto pr-1">
              {pendingHomeworks.map((hw) => (
                <div key={hw.id} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-3.5">
                  <div>
                    <span className="text-xs font-semibold text-blue-400">{hw.subject}</span>
                    <h4 className="text-sm font-medium text-white">{hw.title}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <Clock size={12} /> À rendre pour le {hw.dueDate}
                    </p>
                  </div>
                  {hw.urgent && (
                    <span className="rounded-lg bg-rose-500/20 px-2.5 py-1 text-xs font-medium text-rose-400 flex items-center gap-1">
                      <AlertCircle size={12} /> Urgent
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODALE RENDEZ-VOUS ================= */}
      {activeModal === "event" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold">Détails du rendez-vous</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p><strong className="text-white">Événement :</strong> Réunion trimestrielle des parents</p>
              <p><strong className="text-white">Date & Heure :</strong> Mardi 25 Août à 18h30</p>
              <p><strong className="text-white">Lieu :</strong> Salle de conférence (Bâtiment A)</p>
              <p><strong className="text-white">Ordre du jour :</strong> Bilan pédagogique et préparation des examens.</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setActiveModal(null)} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODALE ASSISTANT IA ================= */}
      <ParentAIAssistant
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        childName={selectedChild.name}
      />
    </section>
  );
}