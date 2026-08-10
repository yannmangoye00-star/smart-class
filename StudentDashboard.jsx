import React from "react";
import {
  Flame,
  Trophy,
  Zap,
  TrendingUp,
  BookOpen,
  Award,
  Clock,
  ChevronRight,
  Wifi,
} from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-10">
      {/* 1. Header Navigation */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-xl">
            <BookOpen className="w-6 h-6" />
            <span>SmartClass</span>
          </div>
          <nav className="flex space-x-6 text-sm font-medium text-slate-600">
            <button className="text-blue-600 border-b-2 border-blue-600 pb-1 font-semibold">
              Élève
            </button>
            <button className="hover:text-slate-900 transition">Parent</button>
            <button className="hover:text-slate-900 transition">
              Enseignant
            </button>
            <button className="hover:text-slate-900 transition">Quiz</button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
            En ligne
          </span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
            Essayer la démo
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 mt-6 space-y-6">
        {/* 2. Banner Profil Élève */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-blue-500/80 rounded-full flex items-center justify-center font-bold text-lg border-2 border-blue-300">
              AM
            </div>
            <div>
              <p className="text-blue-100 text-sm font-medium">Bienvenue,</p>
              <h1 className="text-2xl font-bold">Aïcha Mbarga</h1>
              <p className="text-blue-200 text-xs mt-0.5">
                Terminale C • Lycée Général Leclerc, Yaoundé
              </p>
            </div>
          </div>
          <div className="bg-blue-700/60 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-medium flex items-center space-x-2 border border-blue-500/30">
            <Wifi className="w-4 h-4 text-blue-200" />
            <span>Mode En Ligne</span>
          </div>
        </div>

        {/* 3. Statistiques Clés (4 Cartes) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center space-x-4 shadow-sm">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">12</div>
              <div className="text-xs text-slate-500 font-medium">
                Jours de série
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center space-x-4 shadow-sm">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-500">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">#3</div>
              <div className="text-xs text-slate-500 font-medium">
                Classement
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center space-x-4 shadow-sm">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">2480</div>
              <div className="text-xs text-slate-500 font-medium">Points</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center space-x-4 shadow-sm">
            <div className="p-3 bg-rose-50 rounded-xl text-rose-500">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">+18%</div>
              <div className="text-xs text-slate-500 font-medium">Ce mois</div>
            </div>
          </div>
        </div>

        {/* 4. Section Principale : Progression, Score IA & Devoirs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Carte 1 : Progression Globale */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-slate-900 text-base">
                Progression globale
              </h2>
            </div>

            <div className="my-6 flex items-center justify-center relative">
              {/* Cercle de progression SVG */}
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="#f1f5f9"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="#2563eb"
                  strokeWidth="12"
                  strokeDasharray="364"
                  strokeDashoffset="131"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-extrabold text-slate-900">
                  64%
                </span>
                <p className="text-[10px] text-slate-400 font-medium">
                  Complété
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-2"></span>
                  Cours terminés
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200 mr-2"></span>
                  Restant à faire
                </span>
              </div>
              <p className="text-slate-400 text-center pt-2 italic text-[11px]">
                Tu es sur la bonne voie !
              </p>
            </div>
          </div>

          {/* Carte 2 : Score d'IA */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Score d'IA</h2>
              <p className="text-xs text-slate-400">Évaluation personnalisée</p>
            </div>

            <div className="my-4 flex items-center justify-center relative">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="#f1f5f9"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="#f59e0b"
                  strokeWidth="10"
                  strokeDasharray="364"
                  strokeDashoffset="80"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-extrabold text-slate-900">
                  78
                </span>
                <p className="text-[10px] text-slate-400 font-medium">/ 100</p>
              </div>
            </div>

            <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100 text-xs">
              <div className="flex items-center space-x-1.5 font-semibold text-amber-700 mb-1">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Niveau avancé</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                L'IA recommande de revoir la chimie.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-blue-600 font-semibold mt-2 hover:underline text-[11px]"
              >
                Voir recommandations <ChevronRight className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>

          {/* Carte 3 : À faire (Échéances) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-slate-900 text-base">À faire</h2>
              <p className="text-xs text-slate-400">Échéances proches</p>
            </div>

            <div className="space-y-3 my-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="text-xs font-semibold text-slate-800">
                      Quiz: Limites
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 ml-4">
                    Mathématiques
                  </p>
                </div>
                <span className="text-[10px] text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md font-medium flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> Aujourd'hui
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-xs font-semibold text-slate-800">
                      Devoir: Optique
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 ml-4">Physique</p>
                </div>
                <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md font-medium flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> Demain
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span className="text-xs font-semibold text-slate-800">
                      Examen blanc Bac
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 ml-4">
                    Multi-matières
                  </p>
                </div>
                <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-medium flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> 12 Mars
                </span>
              </div>
            </div>

            <button className="w-full text-center text-xs text-slate-500 font-medium hover:text-slate-800 py-1 transition">
              Voir tout le calendrier
            </button>
          </div>
        </div>

        {/* 5. Cours récents */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-base">
              Cours récents
            </h2>
            <p className="text-xs text-slate-400">
              Continue là où tu t'es arrêté
            </p>
          </div>
          <button className="text-xs font-semibold text-blue-600 hover:underline">
            Tout voir
          </button>
        </div>
      </main>
    </div>
  );
}
