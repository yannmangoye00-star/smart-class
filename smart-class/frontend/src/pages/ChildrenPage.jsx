import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  BookOpen,
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function ChildrenPage() {
  // Structure de données incluant le filtre par année scolaire
  const childrenData = [
    {
      id: 'child-1',
      name: 'Yann Jr',
      schoolYears: {
        '2025-2026': {
          class: 'Terminales C',
          school: 'Lycée de Bépanda',
          overallAverage: 15.4,
          attendanceRate: 98,
          rank: '2ème / 42',
          trimesterProgress: [
            { term: 'Trimestre 1', Moyenne: 13.8, Classe: 11.5 },
            { term: 'Trimestre 2', Moyenne: 14.9, Classe: 11.8 },
            { term: 'Trimestre 3', Moyenne: 15.4, Classe: 12.0 },
          ],
          subjectDetails: [
            { subject: 'Mathématiques', T1: 14.0, T2: 16.0, T3: 17.0, status: 'En hausse' },
            { subject: 'Physique-Chimie', T1: 13.5, T2: 14.5, T3: 15.0, status: 'En hausse' },
            { subject: 'Informatique', T1: 16.0, T2: 17.5, T3: 18.5, status: 'Excellence' },
            { subject: 'Français / Philo', T1: 12.0, T2: 11.5, T3: 12.5, status: 'Stable' },
            { subject: 'Anglais', T1: 13.5, T2: 15.0, T3: 14.0, status: 'Légère baisse' },
          ],
          remarks: 'Excellente progression sur l\'ensemble de l\'année scolaire. Un engagement remarquable en informatique et sciences exactes.'
        },
        '2024-2025': {
          class: 'Première C',
          school: 'Lycée de Bépanda',
          overallAverage: 14.2,
          attendanceRate: 96,
          rank: '4ème / 45',
          trimesterProgress: [
            { term: 'Trimestre 1', Moyenne: 13.2, Classe: 11.0 },
            { term: 'Trimestre 2', Moyenne: 14.0, Classe: 11.2 },
            { term: 'Trimestre 3', Moyenne: 14.2, Classe: 11.5 },
          ],
          subjectDetails: [
            { subject: 'Mathématiques', T1: 13.0, T2: 14.5, T3: 15.0, status: 'En hausse' },
            { subject: 'Physique-Chimie', T1: 12.5, T2: 13.5, T3: 14.0, status: 'En hausse' },
            { subject: 'Informatique', T1: 15.0, T2: 16.0, T3: 16.5, status: 'Excellence' },
            { subject: 'Français', T1: 11.5, T2: 12.0, T3: 12.0, status: 'Stable' },
            { subject: 'Anglais', T1: 13.0, T2: 13.5, T3: 13.5, status: 'Stable' },
          ],
          remarks: 'Résultats très satisfaisants tout au long de l\'année. Passage en Terminale C accordé avec les félicitations.'
        }
      }
    },
    {
      id: 'child-2',
      name: 'Claire',
      schoolYears: {
        '2025-2026': {
          class: '3ème A',
          school: 'Collège Polyvalent',
          overallAverage: 13.2,
          attendanceRate: 95,
          rank: '8ème / 38',
          trimesterProgress: [
            { term: 'Trimestre 1', Moyenne: 11.5, Classe: 10.8 },
            { term: 'Trimestre 2', Moyenne: 12.4, Classe: 11.0 },
            { term: 'Trimestre 3', Moyenne: 13.2, Classe: 11.2 },
          ],
          subjectDetails: [
            { subject: 'Mathématiques', T1: 10.0, T2: 11.5, T3: 13.0, status: 'En hausse' },
            { subject: 'Physique-Chimie', T1: 11.0, T2: 12.0, T3: 13.5, status: 'En hausse' },
            { subject: 'Informatique', T1: 14.0, T2: 15.0, T3: 16.0, status: 'Excellence' },
            { subject: 'Français', T1: 12.0, T2: 12.5, T3: 13.0, status: 'En hausse' },
            { subject: 'SVT', T1: 10.5, T2: 11.0, T3: 10.5, status: 'Attention' },
          ],
          remarks: 'Belle remontée au 3ème trimestre. Poursuivre le travail régulier en SVT.'
        },
        '2024-2025': {
          class: '4ème A',
          school: 'Collège Polyvalent',
          overallAverage: 12.5,
          attendanceRate: 94,
          rank: '12ème / 40',
          trimesterProgress: [
            { term: 'Trimestre 1', Moyenne: 12.0, Classe: 10.5 },
            { term: 'Trimestre 2', Moyenne: 12.2, Classe: 10.8 },
            { term: 'Trimestre 3', Moyenne: 12.5, Classe: 11.0 },
          ],
          subjectDetails: [
            { subject: 'Mathématiques', T1: 11.0, T2: 11.0, T3: 12.0, status: 'En hausse' },
            { subject: 'Physique-Chimie', T1: 10.5, T2: 11.5, T3: 12.0, status: 'En hausse' },
            { subject: 'Informatique', T1: 13.0, T2: 14.0, T3: 14.5, status: 'En hausse' },
            { subject: 'Français', T1: 12.5, T2: 12.0, T3: 12.5, status: 'Stable' },
            { subject: 'SVT', T1: 11.0, T2: 11.5, T3: 11.0, status: 'Stable' },
          ],
          remarks: 'Année équilibrée avec de bons efforts. Passage en classe de 3ème.'
        }
      }
    }
  ];

  const availableYears = ['2025-2026', '2024-2025'];
  const [selectedChildId, setSelectedChildId] = useState(childrenData[0].id);
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);

  const activeChildObj = childrenData.find((c) => c.id === selectedChildId) || childrenData[0];
  const activeChild = activeChildObj.schoolYears[selectedYear] || activeChildObj.schoolYears[availableYears[0]];

  const getSvgPoint = (value, index, totalPoints = 3) => {
    const x = 50 + index * ((700 - 100) / (totalPoints - 1));
    const y = 220 - (value / 20) * 180;
    return `${x},${y}`;
  };

  const childPoints = activeChild.trimesterProgress.map((p, i) => getSvgPoint(p.Moyenne, i)).join(' ');
  const classPoints = activeChild.trimesterProgress.map((p, i) => getSvgPoint(p.Classe, i)).join(' ');

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* En-tête avec Sélecteur Enfant & Filtre Année */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Suivi d'Évolution de l'Enfant</h1>
            <p className="mt-1 text-slate-400">
              Analyse détaillée des performances académiques et progression par trimestre.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Menu Déroulant : Année Scolaire */}
            <div className="flex items-center gap-2 rounded-2xl bg-[#161c2e] px-3 py-1.5 border border-slate-800">
              <Calendar size={16} className="text-blue-400" />
              <span className="text-xs font-semibold text-slate-400 uppercase">Année :</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer pr-1"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year} className="bg-[#161c2e] text-white">
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Onglets : Sélection de l'enfant */}
            <div className="flex items-center gap-2 rounded-2xl bg-[#161c2e] p-1.5 border border-slate-800">
              {childrenData.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChildId(child.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    selectedChildId === child.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {child.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cartes Métriques */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4 rounded-2xl bg-[#161c2e]/80 p-5 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Moyenne Générale (T3)</p>
              <p className="text-2xl font-bold text-white">{activeChild.overallAverage} <span className="text-sm font-normal text-slate-400">/ 20</span></p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-[#161c2e]/80 p-5 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Rang dans la classe</p>
              <p className="text-2xl font-bold text-white">{activeChild.rank}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-[#161c2e]/80 p-5 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Taux d'Assiduité</p>
              <p className="text-2xl font-bold text-white">{activeChild.attendanceRate}%</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-[#161c2e]/80 p-5 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Classe & Établissement</p>
              <p className="text-base font-bold text-white">{activeChild.class}</p>
              <p className="text-xs text-slate-500">{activeChild.school}</p>
            </div>
          </div>
        </div>

        {/* Graphique SVG Sombre */}
        <div className="rounded-3xl bg-[#161c2e]/80 p-6 border border-slate-800/80 backdrop-blur-sm">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="text-blue-500" size={22} />
                Progression Trimestrielle Globale ({selectedYear})
              </h2>
              <p className="text-sm text-slate-400">Évolution de la moyenne générale au fil des trimestres.</p>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                <span className="text-slate-300">Élève ({activeChildObj.name})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-600"></span>
                <span className="text-slate-500">Moyenne Classe</span>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 750 260" className="w-full min-w-[500px]">
              {[0, 5, 10, 15, 20].map((val) => {
                const y = 220 - (val / 20) * 180;
                return (
                  <g key={val}>
                    <line x1="40" y1={y} x2="720" y2={y} stroke="#1e293b" strokeWidth="1.5" />
                    <text x="15" y={y + 4} fill="#64748b" fontSize="11" fontWeight="500">{val}</text>
                  </g>
                );
              })}

              <polyline fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="6 6" points={classPoints} />
              <polyline fill="none" stroke="#3b82f6" strokeWidth="3.5" points={childPoints} />

              {activeChild.trimesterProgress.map((item, idx) => {
                const [cx, cy] = getSvgPoint(item.Moyenne, idx).split(',');
                return (
                  <g key={idx}>
                    <circle cx={cx} cy={cy} r="6" fill="#3b82f6" stroke="#0b0f19" strokeWidth="3" />
                    <rect x={parseFloat(cx) - 22} y={parseFloat(cy) - 28} width="44" height="20" rx="6" fill="#334155" />
                    <text x={cx} y={parseFloat(cy) - 14} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                      {item.Moyenne}
                    </text>
                    <text x={cx} y="245" fill="#94a3b8" fontSize="12" fontWeight="600" textAnchor="middle">
                      {item.term}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Détails par Matière & Synthèse */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          
          <div className="rounded-3xl bg-[#161c2e]/80 p-6 border border-slate-800/80 backdrop-blur-sm">
            <h2 className="mb-1 text-xl font-bold text-white">Performances au Trimestre 3</h2>
            <p className="mb-6 text-sm text-slate-400">Niveau atteint par matière principale ({selectedYear}).</p>

            <div className="space-y-5">
              {activeChild.subjectDetails.slice(0, 4).map((sub, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-300">{sub.subject}</span>
                    <span className="font-bold text-blue-400">{sub.T3} / 20</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        sub.T3 >= 16 ? 'bg-emerald-500' : sub.T3 >= 13 ? 'bg-blue-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${(sub.T3 / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#161c2e]/80 p-6 border border-slate-800/80 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h2 className="mb-4 text-xl font-bold text-white">Synthèse par Matière</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="border-b border-slate-800 text-xs font-semibold uppercase text-slate-500">
                    <tr>
                      <th className="py-2">Matière</th>
                      <th className="py-2 text-center">T1</th>
                      <th className="py-2 text-center">T2</th>
                      <th className="py-2 text-center">T3</th>
                      <th className="py-2 text-right">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {activeChild.subjectDetails.map((sub, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 font-medium text-slate-200">{sub.subject}</td>
                        <td className="py-2.5 text-center text-slate-400">{sub.T1}</td>
                        <td className="py-2.5 text-center text-slate-400">{sub.T2}</td>
                        <td className="py-2.5 text-center font-bold text-blue-400">{sub.T3}</td>
                        <td className="py-2.5 text-right">
                          <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-blue-950/40 p-4 border border-blue-800/40 flex items-start gap-3">
              <AlertCircle className="mt-0.5 text-blue-400 shrink-0" size={18} />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">Avis du Conseil ({selectedYear})</h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">"{activeChild.remarks}"</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}