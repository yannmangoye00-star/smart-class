import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import Chart from "chart.js/auto";
import {
  BookOpen,
  GraduationCap,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";

const stats = [
  {
    label: "Élèves suivis",
    value: "128",
    icon: Users,
  },
  {
    label: "Moyenne générale",
    value: "14.2 / 20",
    icon: GraduationCap,
  },
  {
    label: "Cours publiés",
    value: "42",
    icon: BookOpen,
  },
  {
    label: "Tendance",
    value: "+18%",
    icon: BarChart3,
  },
];

export default function Dashboard() {
  const chartRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["Jan", "Fév", "Mars", "Avr", "Mai", "Juin"],
        datasets: [
          {
            label: "Performance",
            data: [12, 16, 14, 18, 19, 17],
            backgroundColor: [
              "#3b82f6",
              "#60a5fa",
              "#2563eb",
              "#93c5fd",
              "#1d4ed8",
              "#38bdf8",
            ],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Dashboard Smart Classe
          </h1>

          <p className="mt-2 text-slate-400">
            Accès centralisé et visualisation des performances.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>

      {/* Cartes */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    {item.label}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-white">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Graphique */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Évolution de la performance
          </h2>

          <canvas ref={chartRef}></canvas>
        </div>

        {/* Tâches */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            À suivre
          </h2>

          <ul className="mt-5 space-y-4">
            <li className="rounded-xl bg-slate-800 p-4 text-slate-300">
              📘 Révision Maths – 3 exercices restants
            </li>

            <li className="rounded-xl bg-slate-800 p-4 text-slate-300">
              📄 Bulletins à finaliser – 5 dossiers
            </li>

            <li className="rounded-xl bg-slate-800 p-4 text-slate-300">
              🤖 Session IA de suivi planifiée
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}