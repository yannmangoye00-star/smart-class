import { BarChart3, BookOpen, Shield, Users } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import CalendarWidget from '../components/CalendarWidget.jsx';
import DataTable from '../components/DataTable.jsx';

const adminStats = [
  { title: 'Comptes actifs', value: '1,284', change: '+42 ce mois', icon: Users, tone: 'blue' },
  { title: 'Cours publiés', value: '148', change: '+12 cette semaine', icon: BookOpen, tone: 'orange' },
  { title: 'Taux de réussite', value: '91%', change: '+3.4% vs cible', icon: BarChart3, tone: 'emerald' },
];

const students = [
  { id: 1, name: 'Amina K.', className: 'Terminale A', average: '16.8', status: 'Très bien' },
  { id: 2, name: 'Yasin M.', className: 'Seconde B', average: '14.9', status: 'À surveiller' },
  { id: 3, name: 'Sara L.', className: 'Première C', average: '17.4', status: 'Excellent' },
];

const columns = [
  { key: 'name', label: 'Étudiant' },
  { key: 'className', label: 'Classe' },
  { key: 'average', label: 'Moyenne' },
  { key: 'status', label: 'Statut' },
];

export default function AdminDashboard() {
  return (
    <section className="space-y-6 px-1 py-3">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <h1 className="text-2xl font-bold text-white">Espace Admin</h1>
        <p className="mt-1 text-sm text-slate-400">Supervision globale, gestion des accès et reporting institutionnel.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {adminStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DataTable
          title="Tableau des étudiants"
          subtitle="Suivi académique et niveau de performance"
          columns={columns}
          rows={students}
        />

        <CalendarWidget />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-rose-500/20 bg-slate-900 p-4">
          <Users className="text-rose-400" size={18} />
          <h2 className="mt-3 text-lg font-semibold text-white">Comptes</h2>
          <p className="mt-1 text-sm text-slate-400">Gestion et contrôle des profils.</p>
        </div>
        <div className="rounded-2xl border border-amber-500/20 bg-slate-900 p-4">
          <BarChart3 className="text-amber-400" size={18} />
          <h2 className="mt-3 text-lg font-semibold text-white">Statistiques</h2>
          <p className="mt-1 text-sm text-slate-400">Tableau de bord pédagogique et business.</p>
        </div>
        <div className="rounded-2xl border border-emerald-500/20 bg-slate-900 p-4">
          <Shield className="text-emerald-400" size={18} />
          <h2 className="mt-3 text-lg font-semibold text-white">Sécurité</h2>
          <p className="mt-1 text-sm text-slate-400">Sécurisation des niveaux d’accès et des flux.</p>
        </div>
      </div>
    </section>
  );
}
