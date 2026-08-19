import { useMemo, useState } from "react";
import {
  Plus,
  GraduationCap,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

import TeacherModal from "../components/TeacherModal";
import TeacherTable from "../components/TeacherTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const initialTeachers = [
  {
    id: 1,
    name: "Jean Dupont",
    subject: "Mathématiques",
    email: "jean.dupont@smartclasse.cm",
    phone: "690 00 00 01",
    status: "Actif",
  },
  {
    id: 2,
    name: "Marie Ngono",
    subject: "Français",
    email: "marie.ngono@smartclasse.cm",
    phone: "690 00 00 02",
    status: "Actif",
  },
  {
    id: 3,
    name: "Paul Mbarga",
    subject: "Physique",
    email: "paul.mbarga@smartclasse.cm",
    phone: "690 00 00 03",
    status: "Actif",
  },
  {
    id: 4,
    name: "Sarah Kamga",
    subject: "Anglais",
    email: "sarah.kamga@smartclasse.cm",
    phone: "690 00 00 04",
    status: "Actif",
  },
  {
    id: 5,
    name: "David Essomba",
    subject: "Informatique",
    email: "david.essomba@smartclasse.cm",
    phone: "690 00 00 05",
    status: "Inactif",
  },
  {
    id: 6,
    name: "Esther Fongang",
    subject: "Chimie",
    email: "esther.fongang@smartclasse.cm",
    phone: "690 00 00 06",
    status: "Actif",
  },
  {
    id: 7,
    name: "Marc Tchoumi",
    subject: "Histoire",
    email: "marc.tchoumi@smartclasse.cm",
    phone: "690 00 00 07",
    status: "Actif",
  },
  {
    id: 8,
    name: "Linda Atangana",
    subject: "Géographie",
    email: "linda.atangana@smartclasse.cm",
    phone: "690 00 00 08",
    status: "Actif",
  },
  {
    id: 9,
    name: "Kevin Essomba",
    subject: "SVT",
    email: "kevin.essomba@smartclasse.cm",
    phone: "690 00 00 09",
    status: "Actif",
  },
  {
    id: 10,
    name: "Grâce Mballa",
    subject: "Philosophie",
    email: "grace.mballa@smartclasse.cm",
    phone: "690 00 00 10",
    status: "Actif",
  },
];

const ITEMS_PER_PAGE = 5;

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /*
   * ============================
   * RECHERCHE
   * ============================
   */

  const filteredTeachers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return teachers;
    }

    return teachers.filter((teacher) => {
      return [
        teacher.name,
        teacher.subject,
        teacher.email,
        teacher.phone,
        teacher.status,
      ].some((value) =>
        String(value).toLowerCase().includes(query)
      );
    });
  }, [teachers, search]);

  /*
   * ============================
   * PAGINATION
   * ============================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE)
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) * ITEMS_PER_PAGE;

  const paginatedTeachers = filteredTeachers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /*
   * ============================
   * RECHERCHE
   * ============================
   */

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  /*
   * ============================
   * PAGINATION
   * ============================
   */

  const handlePrevious = () => {
    setCurrentPage((page) =>
      Math.max(1, page - 1)
    );
  };

  const handleNext = () => {
    setCurrentPage((page) =>
      Math.min(totalPages, page + 1)
    );
  };

  /*
   * ============================
   * AJOUT ENSEIGNANT
   * ============================
   */

  const handleAddTeacher = () => {
    setIsModalOpen(true);
  };

  const handleSaveTeacher = (teacher) => {
    setTeachers((previousTeachers) => [
      ...previousTeachers,
      {
        ...teacher,
        id: Date.now(),
      },
    ]);

    setCurrentPage(1);
    setIsModalOpen(false);
  };

  /*
   * ============================
   * STATISTIQUES
   * ============================
   */

  const totalTeachers = teachers.length;

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "Actif"
  ).length;

  const inactiveTeachers = teachers.filter(
    (teacher) => teacher.status === "Inactif"
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
                Gestion des enseignants
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Consultez et gérez les enseignants de Smart Classe.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleAddTeacher}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-700"
          >
            <Plus size={19} />
            Ajouter un enseignant
          </button>

        </div>

      </div>

      {/* =====================================================
          STATISTIQUES
      ====================================================== */}

      <div className="grid gap-4 md:grid-cols-3">

        {/* TOTAL */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Total enseignants
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {totalTeachers}
              </p>
            </div>

            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <Users size={24} />
            </div>

          </div>

        </div>

        {/* ACTIFS */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Enseignants actifs
              </p>

              <p className="mt-2 text-3xl font-bold text-green-400">
                {activeTeachers}
              </p>
            </div>

            <div className="rounded-xl bg-green-500/10 p-3 text-green-400">
              <UserCheck size={24} />
            </div>

          </div>

        </div>

        {/* INACTIFS */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Enseignants inactifs
              </p>

              <p className="mt-2 text-3xl font-bold text-orange-400">
                {inactiveTeachers}
              </p>
            </div>

            <div className="rounded-xl bg-orange-500/10 p-3 text-orange-400">
              <UserX size={24} />
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
            Rechercher un enseignant
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Recherche par nom, matière, email, téléphone ou statut.
          </p>

        </div>

        <SearchBar
          value={search}
          onChange={handleSearch}
        />

      </div>

      {/* =====================================================
          INFORMATIONS RECHERCHE
      ====================================================== */}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-sm text-slate-400">

          {search ? (
            <>
              <span className="text-white">
                {filteredTeachers.length}
              </span>{" "}
              résultat(s) pour{" "}
              <span className="font-medium text-blue-400">
                "{search}"
              </span>
            </>
          ) : (
            <>
              <span className="text-white">
                {filteredTeachers.length}
              </span>{" "}
              enseignant(s)
            </>
          )}

        </p>

        <p className="text-sm text-slate-500">
          Page {safeCurrentPage} sur {totalPages}
        </p>

      </div>

      {/* =====================================================
          TABLEAU
      ====================================================== */}

      <TeacherTable
        teachers={paginatedTeachers}
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
          MODAL
      ====================================================== */}

      <TeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTeacher}
      />

    </section>
  );
}