import { CalendarDays, Users, BookOpen, Trophy } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import SectionCard from '../components/SectionCard.jsx';
import { useTranslation } from "react-i18next";

const parentStats = [
  { title: 'Enfants suivis', value: '02', change: '+1 ce mois', icon: Users, tone: 'blue' },
  { title: 'Devoirs à valider', value: '07', change: '2 urgents', icon: BookOpen, tone: 'orange' },
  { title: 'Moyenne générale', value: '86%', change: '+4.2% vs dernier trimestre', icon: Trophy, tone: 'emerald' },
];

export default function ParentDashboard() {
  return (
    <div className="space-y-6 px-4 py-4 md:px-0">
      <div className="grid gap-4 md:grid-cols-3">
        {parentStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Suivi des cours" subtitle="Progression hebdomadaire des enfants">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm font-semibold text-white">Mathématiques</p>
              <p className="mt-1 text-xs text-slate-400">Progression : 89%</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm font-semibold text-white">Sciences</p>
              <p className="mt-1 text-xs text-slate-400">Progression : 76%</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Calendrier" subtitle="Rendez-vous et événements">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center gap-2 text-orange-300">
              <CalendarDays size={16} />
              <span className="text-sm font-semibold">Réunion parents</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">Mardi 18h30 — salle de conférence</p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
