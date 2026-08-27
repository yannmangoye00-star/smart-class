import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, BookOpen, CircleCheckBig, Rocket, ChevronRight, LayoutDashboard, LogOut } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import SectionCard from '../components/SectionCard.jsx';
import DataTable from '../components/DataTable.jsx';
import StudentCourses from '../components/StudentCourses.jsx';
import StudentAiTutor from '../components/StudentAiTutor.jsx';
import { useTranslation } from "react-i18next";

const studentStats = [
  { title: 'Classement', value: '#3', change: 'Top 10% de la classe', icon: Award, tone: 'blue' },
  { title: 'Moyenne', value: '16.5 / 20', change: '+0.8 depuis le dernier bulletin', icon: CircleCheckBig, tone: 'emerald' },
  { title: 'Progression', value: '78%', change: 'Objectif hebdomadaire atteint', icon: Rocket, tone: 'orange' },
];

const assignments = [
  { id: 1, task: 'Fiche de maths', due: 'Aujourd’hui', score: '14/20', status: 'À rendre' },
  { id: 2, task: 'Devoir d’histoire', due: 'Demain', score: '18/20', status: 'Corrigé' },
  { id: 3, task: 'TP sciences', due: 'Jeudi', score: '16/20', status: 'En cours' },
];

const columns = [
  { key: 'task', label: 'Devoir' },
  { key: 'due', label: 'Échéance' },
  { key: 'score', label: 'Note' },
  { key: 'status', label: 'Statut' },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <section className="space-y-6 px-1 py-3">

      {/* EN-TÊTE ET NAVIGATION PAR ONGLETS */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Espace Élève</h1>
          <p className="mt-1 text-sm text-slate-400">Suivi des résultats, cours et progression personnelle.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950 p-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard size={15} />
              Vue d'ensemble
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                activeTab === 'courses'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen size={15} />
              Mes Cours
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-600/10 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-600 hover:text-white"
          >
            <LogOut size={15} />
            Déconnexion
          </button>
        </div>
      </div>

      {/* CONTENU : ONGLET 1 - VUE D'ENSEMBLE */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* STATISTIQUES CLEFS */}
          <div className="grid gap-4 md:grid-cols-3">
            {studentStats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* SECTION COURS APERÇU + TABLEAU DEVOIRS */}
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <SectionCard title="Derniers cours" subtitle="Accès rapide à votre suivi d’apprentissage">
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-xl bg-slate-800 p-3 hover:bg-slate-750 transition">
                  <div>
                    <p className="font-semibold text-white">Mathématiques</p>
                    <p className="text-xs text-slate-400">Fonctions et dérivées</p>
                  </div>
                  <span className="text-xs text-blue-400 font-medium">89%</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-800 p-3 hover:bg-slate-750 transition">
                  <div>
                    <p className="font-semibold text-white">Physique</p>
                    <p className="text-xs text-slate-400">Mécanique et énergie</p>
                  </div>
                  <span className="text-xs text-blue-400 font-medium">74%</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-800 p-3 hover:bg-slate-750 transition">
                  <div>
                    <p className="font-semibold text-white">Histoire</p>
                    <p className="text-xs text-slate-400">Analyse de documents</p>
                  </div>
                  <span className="text-xs text-blue-400 font-medium">82%</span>
                </div>

                <button
                  onClick={() => setActiveTab('courses')}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600/10 border border-blue-500/20 py-2.5 text-xs font-semibold text-blue-400 hover:bg-blue-600 hover:text-white transition"
                >
                  Voir tous les cours et télécharger les supports
                  <ChevronRight size={14} />
                </button>
              </div>
            </SectionCard>

            <DataTable
              title="Gestion des devoirs"
              subtitle="Vos tâches et notes en cours"
              columns={columns}
              rows={assignments}
            />
          </div>

          {/* TUTEUR IA INTERACTIF */}
          <StudentAiTutor />

          {/* PROGRESSION DE LA SEMAINE */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-4 flex items-center gap-2 text-white">
              <BookOpen size={18} className="text-blue-400" />
              <h2 className="font-semibold">Progression de la semaine</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-800 p-3 text-sm text-slate-300">
                <div className="flex justify-between mb-1">
                  <span>Mathématiques</span>
                  <span className="font-bold text-white">89%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-800 p-3 text-sm text-slate-300">
                <div className="flex justify-between mb-1">
                  <span>Sciences</span>
                  <span className="font-bold text-white">74%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-800 p-3 text-sm text-slate-300">
                <div className="flex justify-between mb-1">
                  <span>Français</span>
                  <span className="font-bold text-white">82%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENU : ONGLET 2 - GESTION COMPLÈTE DES COURS */}
      {activeTab === 'courses' && (
        <div className="animate-fadeIn">
          <StudentCourses />
        </div>
      )}

    </section>
  );
}