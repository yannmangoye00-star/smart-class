import { useState } from 'react';
import { ClipboardList, Users, NotebookPen, X, FileUp, Bell, CheckCircle2 } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import DataTable from '../components/DataTable.jsx';
import { useTranslation } from "react-i18next";

const teacherStats = [
  { title: 'Cours actifs', value: '12', change: '+2 ce trimestre', icon: NotebookPen, tone: 'blue' },
  { title: 'Devoirs à corriger', value: '43', change: '6 prioritaires', icon: ClipboardList, tone: 'orange' },
  { title: 'Classes suivies', value: '04', change: '320 élèves', icon: Users, tone: 'emerald' },
];

const courses = [
  { id: 1, course: 'Mathématiques', group: 'Terminale A', assignments: '08', notes: 'Très bon niveau' },
  { id: 2, course: 'Physique', group: 'Première C', assignments: '05', notes: 'Travail régulier' },
  { id: 3, course: 'Biologie', group: 'Seconde B', assignments: '07', notes: 'À soutenir' },
];

const columns = [
  { key: 'course', label: 'Cours' },
  { key: 'group', label: 'Classe' },
  { key: 'assignments', label: 'Devoirs' },
  { key: 'notes', label: 'Observation' },
];

export default function TeacherDashboard() {
  const [activeModal, setActiveModal] = useState(null); // 'course' | 'eval' | 'notify' | null
  const [selectedFile, setSelectedFile] = useState(null);

  const closeModal = () => {
    setActiveModal(null);
    setSelectedFile(null);
  };

  return (
    <section className="space-y-6 px-1 py-3">
      {/* En-tête */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-bold text-white">Espace Enseignant</h1>
        <p className="mt-1 text-sm text-slate-400">Gestion des cours, devoirs et suivi de la classe.</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid gap-4 md:grid-cols-3">
        {teacherStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Grille principale */}
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DataTable
          title="Tableau des cours"
          subtitle="Vue hebdomadaire de l’activité pédagogique"
          columns={columns}
          rows={courses}
        />

        {/* Section Actions Rapides */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/30">
          <h2 className="text-base font-bold text-white">Actions rapides</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <button
              onClick={() => setActiveModal('course')}
              className="w-full text-left rounded-2xl bg-slate-800 p-3 transition hover:bg-blue-600 hover:text-white cursor-pointer font-medium"
            >
              Créer un nouveau cours
            </button>

            <button
              onClick={() => setActiveModal('eval')}
              className="w-full text-left rounded-2xl bg-slate-800 p-3 transition hover:bg-blue-600 hover:text-white cursor-pointer font-medium"
            >
              Publier une évaluation
            </button>

            <button
              onClick={() => setActiveModal('notify')}
              className="w-full text-left rounded-2xl bg-slate-800 p-3 transition hover:bg-blue-600 hover:text-white cursor-pointer font-medium"
            >
              Notifier les parents
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODALE : CRÉER UN COURS ================= */}
      {activeModal === 'course' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold">Créer un nouveau cours</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); closeModal(); }} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">Matière / Intitulé</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Algorithmique"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">Classe concernée</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Licence 1 Informatique"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">Support de cours (PDF)</label>
                <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-800 bg-slate-950 p-4 transition hover:border-slate-700">
                  <FileUp className="mb-2 text-blue-400" size={24} />
                  <p className="text-xs text-slate-400">
                    {selectedFile ? selectedFile.name : "Sélectionner un fichier PDF"}
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm text-slate-400 hover:text-white">
                  Annuler
                </button>
                <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  Créer le cours
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODALE : PUBLIER UNE ÉVALUATION ================= */}
      {activeModal === 'eval' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold">Publier une évaluation</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); closeModal(); }} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">Titre de l'évaluation</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Controle Continu N°2"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">Date limite de rendu</label>
                <input
                  type="date"
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm focus:border-blue-500 focus:outline-none text-slate-300"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm text-slate-400 hover:text-white">
                  Annuler
                </button>
                <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODALE : NOTIFIER LES PARENTS ================= */}
      {activeModal === 'notify' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold">Notifier les parents</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); closeModal(); }} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">Classe destinataire</label>
                <select className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm focus:border-blue-500 focus:outline-none text-slate-300">
                  <option value="all">Toutes mes classes</option>
                  <option value="term-a">Terminale A</option>
                  <option value="prem-c">Première C</option>
                  <option value="sec-b">Seconde B</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">Message d'information</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Rédigez l'annonce transmise aux parents..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm text-slate-400 hover:text-white">
                  Annuler
                </button>
                <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  Envoyer la notification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}