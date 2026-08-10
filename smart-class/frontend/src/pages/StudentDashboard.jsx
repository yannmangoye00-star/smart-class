import { Award, BookOpen, CircleCheckBig, Rocket } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import SectionCard from '../components/SectionCard.jsx';
import DataTable from '../components/DataTable.jsx';

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
  return (
    <section className="space-y-6 px-1 py-3">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-bold text-white">Espace Élève</h1>
        <p className="mt-1 text-sm text-slate-400">Suivi des résultats, cours et progression personnelle.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {studentStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Derniers cours" subtitle="Accès rapide à votre suivi d’apprentissage">
          <div className="space-y-3 text-sm text-slate-300">
            <div className="rounded-xl bg-slate-800 p-3">Mathématiques — Fonctions et dérivées</div>
            <div className="rounded-xl bg-slate-800 p-3">Physique — Mécanique et énergie</div>
            <div className="rounded-xl bg-slate-800 p-3">Histoire — Analyse de documents</div>
          </div>
        </SectionCard>

        <DataTable
          title="Gestion des devoirs"
          subtitle="Vos tâches et notes en cours"
          columns={columns}
          rows={assignments}
        />
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-4 flex items-center gap-2 text-white">
          <BookOpen size={18} className="text-blue-400" />
          <h2 className="font-semibold">Progression de la semaine</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-800 p-3 text-sm text-slate-300">Mathématiques : 89%</div>
          <div className="rounded-2xl bg-slate-800 p-3 text-sm text-slate-300">Sciences : 74%</div>
          <div className="rounded-2xl bg-slate-800 p-3 text-sm text-slate-300">Français : 82%</div>
        </div>
      </div>
    </section>
  );
}
