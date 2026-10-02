import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  BookOpen,
  CircleCheckBig,
  Clock3,
  Rocket,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  TrendingUp,
} from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import SectionCard from '../components/SectionCard.jsx';
import StudentCourses from '../components/StudentCourseLibrary.jsx';
import StudentAiTutor from '../components/StudentAiTutor.jsx';
import { studentService } from '../services/studentService';
import { useAuth } from '../hooks/useAuth';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboard, setDashboard] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    Promise.all([studentService.getDashboard(), studentService.getStats()])
      .then(([dashboardData, statsData]) => {
        if (active) {
          setDashboard(dashboardData);
          setStats(statsData);
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError?.response?.data?.message || 'Impossible de charger votre tableau de bord.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const subjectScores = Object.entries(stats?.subjectScores || {});
  const weakSubjects = stats?.weakSubjects || [];
  const formatPercent = (value) => `${Number(value || 0).toFixed(0)}%`;
  const formatStudyTime = (minutes) => {
    const totalMinutes = Number(minutes || 0);
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return hours > 0 ? `${hours} h ${remainingMinutes} min` : `${remainingMinutes} min`;
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

      {loading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-300">
          Chargement de vos résultats...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          {error}
        </div>
      )}

      {/* CONTENU : ONGLET 1 - VUE D'ENSEMBLE */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* STATISTIQUES CLEFS */}
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard title="Score Moyen Global" value={formatPercent(stats?.globalScore)} change="Sur les quiz terminés" icon={CircleCheckBig} tone="emerald" />
            <StatCard title="Temps d'Étude" value={formatStudyTime(stats?.totalStudyTimeMinutes)} change="Temps cumulé estimé" icon={Clock3} tone="blue" />
            <StatCard title="Progression" value={formatPercent(stats?.overallProgress)} change="Progression globale" icon={TrendingUp} tone="orange" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <SectionCard title="Scores par matière" subtitle="Résultats moyens calculés à partir de vos quiz">
              <div className="space-y-4">
                {subjectScores.length > 0 ? subjectScores.map(([subject, score]) => (
                  <div key={subject} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{subject}</span>
                      <span className="font-semibold text-white">{formatPercent(score)}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-950">
                      <div
                        className={`h-full rounded-full ${Number(score) < 60 ? 'bg-rose-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(100, Math.max(0, Number(score) || 0))}%` }}
                      />
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-slate-500">Aucun score par matière disponible.</p>
                )}
              </div>
            </SectionCard>

            <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 shrink-0 text-amber-300" size={20} />
                <div>
                  <h2 className="font-semibold text-amber-100">Matières faibles</h2>
                  <p className="mt-1 text-sm text-amber-200/75">À revoir en priorité lorsque le score est inférieur à 60 %.</p>
                </div>
              </div>
              {weakSubjects.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {weakSubjects.map((subject) => (
                    <span key={subject} className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-sm font-medium text-amber-100">
                      {subject}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-emerald-300">Aucune matière faible détectée.</p>
              )}
            </div>
          </div>

          {/* SECTION COURS APERÇU + TABLEAU DEVOIRS */}
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <SectionCard title="Derniers cours" subtitle="Accès rapide à votre suivi d’apprentissage">
              <div className="space-y-3 text-sm text-slate-300">
                {(dashboard?.recentCourses || []).map((course) => (
                  <div key={course.id} className="flex items-center justify-between rounded-xl bg-slate-800 p-3">
                    <div>
                      <p className="font-semibold text-white">{course.title}</p>
                      <p className="text-xs text-slate-400">{course.subjectName}</p>
                    </div>
                    <span className="text-xs text-blue-400 font-medium">Cours</span>
                  </div>
                ))}
                {!dashboard?.recentCourses?.length && <p className="text-xs text-slate-500">Aucun cours récent.</p>}

                <button
                  onClick={() => setActiveTab('courses')}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600/10 border border-blue-500/20 py-2.5 text-xs font-semibold text-blue-400 hover:bg-blue-600 hover:text-white transition"
                >
                  Voir tous les cours et télécharger les supports
                  <ChevronRight size={14} />
                </button>
              </div>
            </SectionCard>

            <SectionCard title="Historique des notes" subtitle="Vos dernières évaluations">
              <div className="space-y-2 text-sm">
                {(dashboard?.scoreHistory || []).slice(0, 5).map((item) => (
                  <div key={item.attemptId} className="flex items-center justify-between border-b border-slate-800 py-2">
                    <span className="text-slate-300">{item.quizTitle}</span>
                    <span className="font-semibold text-emerald-400">{item.percentage}%</span>
                  </div>
                ))}
                {!dashboard?.scoreHistory?.length && <p className="text-xs text-slate-500">Aucune note disponible.</p>}
              </div>
            </SectionCard>
          </div>

          {/* TUTEUR IA INTERACTIF */}
          <StudentAiTutor />

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