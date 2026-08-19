import { useState } from "react";
import {
  BookOpen,
  FileText,
  Download,
  Search,
  Clock,
  User,
  CheckCircle2,
  ChevronRight,
  FolderDown,
  Video,
} from "lucide-react";

export default function StudentCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'in_progress', 'completed'
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Données de démonstration des cours
  const courses = [
    {
      id: "C-101",
      title: "Algorithmique & Programmation Java",
      category: "Informatique",
      teacher: "Dr. Kamga",
      email: "a.kamga@smartclasse.cm",
      room: "Labo Info 2",
      schedule: "Lundi 08h00 - 11h00",
      progress: 75,
      status: "in_progress",
      totalHours: "45h",
      completedHours: "34h",
      description: "Apprentissage approfondi de la POO en Java, structures de données complexes et gestion de la mémoire.",
      resources: [
        { name: "Chapitre 1 : Introduction à la POO.pdf", size: "2.4 MB", type: "pdf" },
        { name: "Chapitre 2 : Heritage et Polymorphisme.pdf", size: "3.1 MB", type: "pdf" },
        { name: "TP 1 : Systemes de gestion bancaire.zip", size: "5.8 MB", type: "archive" },
        { name: "Enregistrement Amphi - Seance 4.mp4", size: "120 MB", type: "video" },
      ],
    },
    {
      id: "C-102",
      title: "Bases de Données Relationnelles (SQL)",
      category: "Informatique",
      teacher: "M. Kouam",
      email: "p.kouam@smartclasse.cm",
      room: "Salle Labo 1",
      schedule: "Mercredi 10h00 - 13h00",
      progress: 60,
      status: "in_progress",
      totalHours: "30h",
      completedHours: "18h",
      description: "Conception de schémas relationnels (UML/Merise), écriture de requêtes SQL complexes et optimisation.",
      resources: [
        { name: "Cours - Modelisation Merise & UML.pdf", size: "4.2 MB", type: "pdf" },
        { name: "Script SQL - Creation de la base de donnees.sql", size: "45 KB", type: "code" },
      ],
    },
    {
      id: "C-103",
      title: "Développement Mobile avec Flutter",
      category: "Informatique",
      teacher: "M. Tagne",
      email: "c.tagne@smartclasse.cm",
      room: "Salle Info 1",
      schedule: "Mardi 08h00 - 12h00",
      progress: 40,
      status: "in_progress",
      totalHours: "40h",
      completedHours: "16h",
      description: "Création d'applications mobiles cross-platform iOS et Android avec Dart et Flutter.",
      resources: [
        { name: "Support de cours - Base de Dart & Widgets.pdf", size: "5.1 MB", type: "pdf" },
      ],
    },
    {
      id: "C-104",
      title: "Mathématiques pour l'Ingénieur",
      category: "Sciences",
      teacher: "Mme. Nguema",
      email: "f.nguema@smartclasse.cm",
      room: "Amphi A",
      schedule: "Lundi 11h15 - 13h15",
      progress: 100,
      status: "completed",
      totalHours: "36h",
      completedHours: "36h",
      description: "Algèbre linéaire, calcul matriciel, équations différentielles et intégrales multiples.",
      resources: [
        { name: "Recueil d'exercices corriges.pdf", size: "8.0 MB", type: "pdf" },
        { name: "Examen blanc et corriges 2025.pdf", size: "1.9 MB", type: "pdf" },
      ],
    },
  ];

  // Filtrage des cours
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "in_progress") return matchesSearch && course.status === "in_progress";
    if (filter === "completed") return matchesSearch && course.status === "completed";
    return matchesSearch;
  });

  return (
    <div className="space-y-6">

      {/* EN-TÊTE ET RECHERCHE */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Mes Cours</h2>
          <p className="text-xs text-slate-400">
            Consultez le programme de vos cours, la progression et vos supports pédagogiques.
          </p>
        </div>

        {/* BARRE DE RECHERCHE ET FILTRES */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Rechercher un cours, enseignant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 rounded-xl border border-slate-800 bg-slate-900 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900 p-1">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                filter === "all" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Tous ({courses.length})
            </button>
            <button
              onClick={() => setFilter("in_progress")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                filter === "in_progress" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              En cours
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                filter === "completed" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Terminés
            </button>
          </div>
        </div>
      </div>

      {/* GRILLE DES COURS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4 hover:border-slate-700 transition"
          >
            {/* HAUT DE CARTE */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
                  <BookOpen size={20} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                    {course.category}
                  </span>
                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-blue-400 transition">
                    {course.title}
                  </h3>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  course.status === "completed"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-blue-500/10 text-blue-400"
                }`}
              >
                {course.status === "completed" ? (
                  <>
                    <CheckCircle2 size={12} /> Terminé
                  </>
                ) : (
                  "En cours"
                )}
              </span>
            </div>

            {/* DESCRIPTION COURTE */}
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {course.description}
            </p>

            {/* INFORMATIONS PRATIQUES */}
            <div className="grid grid-cols-2 gap-2 text-xs border-y border-slate-800/80 py-3">
              <div className="flex items-center gap-2 text-slate-300">
                <User size={14} className="text-slate-500" />
                <span>{course.teacher}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock size={14} className="text-slate-500" />
                <span>{course.schedule}</span>
              </div>
            </div>

            {/* PROGRESSION DU COURS */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-400">Progression du programme</span>
                <span className="text-white">{course.progress}% ({course.completedHours}/{course.totalHours})</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    course.progress === 100 ? "bg-emerald-500" : "bg-blue-600"
                  }`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {/* BOUTON D'ACTION */}
            <div className="pt-1 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {course.resources.length} ressource(s) disponible(s)
              </span>

              <button
                onClick={() => setSelectedCourse(course)}
                className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition"
              >
                Accéder aux ressources
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODALE DETAILS ET RESSOURCES DE COURS */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-5 shadow-2xl">
            
            {/* EN-TÊTE MODALE */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-blue-600/10 p-3 text-blue-400 border border-blue-500/20">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedCourse.title}</h3>
                  <p className="text-xs text-slate-400">
                    Enseigné par <strong className="text-slate-200">{selectedCourse.teacher}</strong> • {selectedCourse.room}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCourse(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* DESCRIPTION COMPLETE */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">À propos du cours</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedCourse.description}</p>
            </div>

            {/* LISTE DES RESSOURCES TÉLÉCHARGEABLES */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Supports et Documents de cours ({selectedCourse.resources.length})
              </h4>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {selectedCourse.resources.map((res, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-3 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-slate-800 p-2 text-blue-400">
                        {res.type === "video" ? <Video size={18} /> : <FileText size={18} />}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">{res.name}</p>
                        <p className="text-[10px] text-slate-500">{res.size}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Téléchargement de : ${res.name}`)}
                      className="flex items-center gap-1.5 rounded-xl bg-blue-600/10 px-3 py-1.5 text-xs font-semibold text-blue-400 hover:bg-blue-600 hover:text-white transition"
                    >
                      <Download size={14} />
                      Télécharger
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* PIED DE MODALE */}
            <div className="pt-2 text-right border-t border-slate-800">
              <button
                onClick={() => setSelectedCourse(null)}
                className="rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
              >
                Fermer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}