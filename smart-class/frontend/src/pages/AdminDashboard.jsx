import {
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

import StatCard from "../components/StatCard";
import DashboardChart from "../components/DashboardChart";
import ActivityCard from "../components/ActivityCard";
import QuickActions from "../components/QuickActions";

const adminStats = [
  {
    title: "Étudiants",
    value: "1 284",
    change: "+35 ce mois",
    icon: Users,
    tone: "blue",
    link: "/admin/students",
  },
  {
    title: "Enseignants",
    value: "82",
    change: "+4 ce mois",
    icon: GraduationCap,
    tone: "emerald",
    link: "/admin/teachers",
  },
  {
    title: "Cours",
    value: "148",
    change: "+12 cette semaine",
    icon: BookOpen,
    tone: "orange",
  },
  {
    title: "Notes publiées",
    value: "5 462",
    change: "+214 aujourd'hui",
    icon: ClipboardList,
    tone: "purple",
  },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <section className="space-y-6">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

        <h1 className="text-3xl font-bold text-white">
          Bienvenue {user?.name || "Administrateur"} 👋
        </h1>

        <p className="mt-2 text-slate-400">
          Gérez toute la plateforme Smart Classe depuis ce tableau de bord.
        </p>

      </div>

      {/* =====================================================
          STATISTIQUES
      ====================================================== */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {adminStats.map((item) => {

          const card = (
            <StatCard
              key={item.title}
              {...item}
            />
          );

          if (item.link) {
            return (
              <Link
                key={item.title}
                to={item.link}
                className="block transition hover:-translate-y-1"
              >
                {card}
              </Link>
            );
          }

          return card;
        })}

      </div>

      {/* =====================================================
          GESTION RAPIDE
      ====================================================== */}

      <div className="grid gap-5 md:grid-cols-2">

        <Link
          to="/admin/students"
          className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-blue-500/50 hover:bg-slate-800"
        >

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <Users size={24} />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Gestion des étudiants
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Ajouter, modifier et consulter les étudiants.
              </p>
            </div>

          </div>

        </Link>

        <Link
          to="/admin/teachers"
          className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-emerald-500/50 hover:bg-slate-800"
        >

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
              <GraduationCap size={24} />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Gestion des enseignants
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Ajouter et gérer les enseignants de l'établissement.
              </p>
            </div>

          </div>

        </Link>

      </div>

      {/* =====================================================
          GRAPHIQUE + ACTIVITÉS
      ====================================================== */}

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">

        <DashboardChart />

        <ActivityCard />

      </div>

      {/* =====================================================
          ACCÈS RAPIDE
      ====================================================== */}

      <QuickActions />

    </section>
  );
}