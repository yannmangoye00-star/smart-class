import { ClipboardList, Users, NotebookPen } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import DataTable from '../components/DataTable.jsx';

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
  return (
    <section className="space-y-6 px-1 py-3">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-bold text-white">Espace Enseignant</h1>
        <p className="mt-1 text-sm text-slate-400">Gestion des cours, devoirs et suivi de la classe.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {teacherStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DataTable
          title="Tableau des cours"
          subtitle="Vue hebdomadaire de l’activité pédagogique"
          columns={columns}
          rows={courses}
        />

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/30">
          <h2 className="text-base font-bold text-white">Actions rapides</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="rounded-2xl bg-slate-800 p-3">Créer un nouveau cours</div>
            <div className="rounded-2xl bg-slate-800 p-3">Publier une évaluation</div>
            <div className="rounded-2xl bg-slate-800 p-3">Notifier les parents</div>
          </div>
        </div>
      </div>
    </section>
  );
}
