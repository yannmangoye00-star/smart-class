import { useState } from "react";
import {
  BookOpen,
  Plus,
  Trash2,
  Eye,
  Users,
  FileText,
  Search,
  X,
  FileUp,
  FileCode,
  Download,
} from "lucide-react";

const initialCourses = [
  {
    id: 1,
    title: "Mathématiques",
    classLevel: "Terminale A",
    studentsCount: 35,
    lessonsCount: 12,
    assignmentsCount: 8,
    documents: [
      { id: 101, name: "Chapitre_1_Derivees.pdf", size: "1.2 MB" },
      { id: 102, name: "Exercices_Corriges.pdf", size: "850 KB" },
    ],
  },
  {
    id: 2,
    title: "Physique",
    classLevel: "Première C",
    studentsCount: 28,
    lessonsCount: 9,
    assignmentsCount: 5,
    documents: [{ id: 201, name: "TP_Electricite.pdf", size: "2.1 MB" }],
  },
];

export default function TeacherCourses() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: "",
    classLevel: "",
  });

  // Gestion de la sélection du fichier PDF
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Veuillez sélectionner un fichier au format PDF uniquement.");
      e.target.value = null;
    }
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.classLevel) return;

    const initialDocs = selectedFile
      ? [
          {
            id: Date.now(),
            name: selectedFile.name,
            size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
          },
        ]
      : [];

    const createdCourse = {
      id: Date.now(),
      title: newCourse.title,
      classLevel: newCourse.classLevel,
      studentsCount: 0,
      lessonsCount: initialDocs.length,
      assignmentsCount: 0,
      documents: initialDocs,
    };

    setCourses([createdCourse, ...courses]);
    setNewCourse({ title: "", classLevel: "" });
    setSelectedFile(null);
    setIsModalOpen(false);
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleDeleteDocument = (courseId, docId) => {
    setCourses(
      courses.map((course) => {
        if (course.id === courseId) {
          const updatedDocs = course.documents.filter((doc) => doc.id !== docId);
          return {
            ...course,
            documents: updatedDocs,
            lessonsCount: updatedDocs.length,
          };
        }
        return course;
      })
    );
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.classLevel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestion des Cours</h1>
          <p className="mt-1 text-sm text-slate-400">
            Créez vos cours et déposez des supports pédagogiques au format PDF.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Créer un nouveau cours
        </button>
      </div>

      {/* Recherche */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Rechercher par matière ou classe..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Cartes des cours */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                  {course.classLevel}
                </span>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                  title="Supprimer le cours"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <h3 className="mt-4 text-xl font-bold text-white">{course.title}</h3>

              <div className="mt-4 space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-blue-400" />
                  <span>{course.studentsCount} élèves inscrits</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-emerald-400" />
                  <span>{course.documents.length} document(s) PDF</span>
                </div>
              </div>

              {/* LISTE DES DOCUMENTS PDF DU COURS */}
              <div className="mt-5 space-y-2 border-t border-slate-800/80 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Fichiers joint(s)
                </p>
                {course.documents.length === 0 ? (
                  <p className="text-xs italic text-slate-500">Aucun PDF déposé pour le moment</p>
                ) : (
                  course.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-300"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCode size={16} className="shrink-0 text-red-400" />
                        <span className="truncate">{doc.name}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteDocument(course.id, doc.id)}
                        className="ml-2 shrink-0 text-slate-500 hover:text-red-400"
                        title="Supprimer ce document"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 border-t border-slate-800 pt-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-700">
                <Eye size={16} />
                Consulter les détails
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modale de création avec dépôt PDF */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white">Nouveau cours</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Nom de la matière / cours
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mathématiques, Algorithmique"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">Classe</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Terminale A, Licence 1"
                  value={newCourse.classLevel}
                  onChange={(e) => setNewCourse({ ...newCourse, classLevel: e.target.value })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* CHAMP DÉPÔT DE FICHIER PDF */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Support de cours (PDF)
                </label>
                <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-800 bg-slate-950 p-4 transition hover:border-slate-700">
                  <FileUp className="mb-2 text-blue-400" size={24} />
                  <p className="text-xs text-slate-400">
                    {selectedFile ? selectedFile.name : "Cliquez pour sélectionner un fichier PDF"}
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Créer le cours
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}