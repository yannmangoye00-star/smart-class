import { useState } from "react";
import { Plus } from "lucide-react";

import StudentTable from "../components/StudentTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import StudentModal from "../components/StudentModal";

export default function StudentsPage() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Gestion des étudiants
          </h1>

          <p className="text-slate-400">
            Gérez tous les étudiants de Smart Classe.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={20} />

          Nouvel étudiant
        </button>

      </div>

      {/* Recherche */}

      <SearchBar />

      {/* Tableau */}

      <StudentTable />

      {/* Pagination */}

      <Pagination />

      {/* Fenêtre Ajouter */}

      {openModal && (
        <StudentModal
          onClose={() => setOpenModal(false)}
        />
      )}

    </div>
  );
}