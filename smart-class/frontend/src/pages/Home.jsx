import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, GraduationCap, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function Home() {
  return (
    <section className="flex min-h-[75vh] items-center justify-center px-2 py-6 md:px-0">
      <div className="w-full rounded-[30px] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-blue-950/40 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
              <GraduationCap size={14} />
              Smart Classe SaaS
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Une plateforme scolaire moderne, claire et performante.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-300">
                Smart Classe connecte administration, enseignants, élèves, parents et réalité pédagogique dans une interface inspirée de Notion, Google Classroom et Canvas.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-orange-400 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Entrer dans l’application
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
              >
                <LayoutDashboard size={16} />
                Ouvrir le dashboard
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-blue-500/20 bg-slate-800/80 p-4">
              <ShieldCheck className="mb-3 text-blue-400" size={20} />
              <h2 className="text-sm font-bold text-white">Sécurité</h2>
              <p className="mt-1 text-xs text-slate-400">Contrôle par rôle, accès maîtrisé, connexion centralisée.</p>
            </div>
            <div className="rounded-2xl border border-orange-500/20 bg-slate-800/80 p-4">
              <BookOpen className="mb-3 text-orange-400" size={20} />
              <h2 className="text-sm font-bold text-white">Gestion scolaire</h2>
              <p className="mt-1 text-xs text-slate-400">Cours, devoirs, notes, calendrier et suivi en temps réel.</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-slate-800/80 p-4 sm:col-span-2">
              <LayoutDashboard className="mb-3 text-emerald-400" size={20} />
              <h2 className="text-sm font-bold text-white">Pilotage par tableau de bord</h2>
              <p className="mt-1 text-xs text-slate-400">Pour l’administration, les enseignants, les élèves et les parents.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
