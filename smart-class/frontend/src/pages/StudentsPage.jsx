import { useMemo, useState } from "react";
import { Plus, GraduationCap, Users, UserCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import ViewStudentModal from "../components/ViewStudentModal";
import StudentModal from "../components/StudentModal";
import StudentTable from "../components/StudentTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const initialStudents = [
  {
    id: 1,
    name: "Amina Kamga",
    className: "Terminale A",
    email: "amina@smartclasse.cm",
    status: "Actif",
  },
  {
    id: 2,
    name: "Yann Mbarga",
    className: "Première C",
    email: "yann@smartclasse.cm",
    status: "Actif",
  },
  {
    id: 3,
    name: "Sarah Ngono",
    className: "Seconde B",
    email: "sarah@smartclasse.cm",
    status: "Actif",
  },
  {
    id: 4,
    name: "Kevin Essomba",
    className: "Terminale D",
    email: "kevin@smartclasse.cm",
    status: "Actif",
  },
  {
    id: 5,
    name: "Marc Tchoumi",
    className: "Première A",
    email: "marc@smartclasse.cm",
    status: "Actif",
  },
  {
    id: 6,
    name: "Grâce Mballa",
    className: "Troisième",
    email: "grace@smartclasse.cm",
    status: "Actif",
  },
  {
    id: 7,
    name: "David Fongang",
    className: "Seconde C",
    email: "david@smartclasse.cm",
    status: "Actif",
  },
  {
    id: 8,
    name: "Esther Nguema",
    className: "Terminale A",
    email: "esther@smartclasse.cm",
    status: "Actif",
  },
  {
    id: 9,
    name: "Junior Mvondo",
    className: "Première D",
    email: "junior@smartclasse.cm",
    status: "Actif",
  },
  {
    id: 10,
    name: "Linda Atangana",
    className: "Seconde A",
    email: "linda@smartclasse.cm",
    status: "Actif",
  },
  {
    id: 11,
    name: "Paul Ekotto",
    className: "Terminale C",
    email: "paul@smartclasse.cm",
    status: "Actif",
  },
  {
    id: 12,
    name: "Nathalie Abena",
    className: "Première B",
    email: "nathalie@smartclasse.cm",
    status: "Actif",
  },
];

const ITEMS_PER_PAGE = 5;

export default function StudentsPage() {
  const { t } = useTranslation();

  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);

  /*
   * Recherche
   */
  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return students;
    }

    return students.filter((student) => {
      return [
        student.name,
        student.className,
        student.email,
        student.status,
      ].some((value) => String(value).toLowerCase().includes(query));
    });
  }, [students, search]);

  /*
   * Pagination
   */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /*
   * Gestion des actions
   */
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const handleNext = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleSaveStudent = (student) => {
    if (selectedStudent) {
      setStudents((previous) =>
        previous.map((s) => (s.id === student.id ? student : s))
      );
    } else {
      setStudents((previous) => [...previous, { ...student, id: Date.now() }]);
    }

    setIsModalOpen(false);
    setSelectedStudent(null);
    setCurrentPage(1);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm(t("confirm_delete_student") || "Supprimer cet étudiant ?")) {
      setStudents((previous) =>
        previous.filter((student) => student.id !== id)
      );
    }
  };

  const handleViewStudent = (student) => {
    setViewStudent(student);
    setIsViewModalOpen(true);
  };

  /*
   * Statistiques
   */
  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status?.toLowerCase() === "actif"
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status?.toLowerCase() === "inactif"
  ).length;

  return (
    <section className="space-y-6">
      {/* =====================================================
          EN-TÊTE
      ====================================================== */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-blue-600/10 p-4 text-blue-400">
              <GraduationCap size={32} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                {t("student_management") || "Gestion des étudiants"}
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                {t("student_management_subtitle") ||
                  "Consultez et gérez les étudiants de Smart Classe."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddStudent}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-700"
          >
            <Plus size={19} />
            {t("add_student") || "Ajouter un étudiant"}
          </button>
        </div>
      </div>

      {/* =====================================================
          STATISTIQUES
      ====================================================== */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                {t("total_students") || "Total étudiants"}
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {totalStudents}
              </p>
            </div>

            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <Users size={24} />
            </div>
          </div>
        </div>

        {/* Actifs */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                {t("active_students") || "Étudiants actifs"}
              </p>

              <p className="mt-2 text-3xl font-bold text-green-400">
                {activeStudents}
              </p>
            </div>

            <div className="rounded-xl bg-green-500/10 p-3 text-green-400">
              <UserCheck size={24} />
            </div>
          </div>
        </div>

        {/* Inactifs */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                {t("inactive_students") || "Étudiants inactifs"}
              </p>

              <p className="mt-2 text-3xl font-bold text-orange-400">
                {inactiveStudents}
              </p>
            </div>

            <div className="rounded-xl bg-orange-500/10 p-3 text-orange-400">
              <GraduationCap size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RECHERCHE
      ====================================================== */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-3">
          <h2 className="font-semibold text-white">
            {t("search_student") || "Rechercher un étudiant"}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            {t("search_student_hint") ||
              "Recherche par nom, classe, email ou statut."}
          </p>
        </div>

        <SearchBar value={search} onChange={handleSearch} />
      </div>

      {/* =====================================================
          INFORMATIONS RECHERCHE
      ====================================================== */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          {search ? (
            <>
              <span className="text-white">{filteredStudents.length}</span>{" "}
              {t("results_for") || "résultat(s) pour"}{" "}
              <span className="font-medium text-blue-400">"{search}"</span>
            </>
          ) : (
            <>
              <span className="text-white">{filteredStudents.length}</span>{" "}
              {t("students_count") || "étudiant(s)"}
            </>
          )}
        </p>

        <p className="text-sm text-slate-500">
          {t("page_info", { current: safeCurrentPage, total: totalPages }) ||
            `Page ${safeCurrentPage} sur ${totalPages}`}
        </p>
      </div>

      {/* =====================================================
          TABLEAU
      ====================================================== */}
      <StudentTable
        students={paginatedStudents}
        onView={handleViewStudent}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
      />

      {/* =====================================================
          PAGINATION
      ====================================================== */}
      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {/* =====================================================
          MODALES
      ====================================================== */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
        onSave={handleSaveStudent}
        student={selectedStudent}
      />

      <ViewStudentModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewStudent(null);
        }}
        student={viewStudent}
      />
    </section>
  );
}