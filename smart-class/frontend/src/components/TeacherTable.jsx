import { useState, useRef, useEffect } from "react";
import {
  Mail,
  Phone,
  MoreVertical,
  Edit,
  Power,
  Trash2,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

/* =========================================================================
   COMPOSANT DU MENU DÉROULANT (3 PETITS POINTS)
   ========================================================================= */
function ActionMenu({
  teacher,
  onEdit,
  onToggleStatus,
  onDelete,
  onViewStats,
  onFilterEstablishment,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Fermer le menu si l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (callback) => {
    setIsOpen(false);
    if (callback) callback(teacher);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Bouton 3 petits points */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none"
        title="Actions"
      >
        <MoreVertical size={18} />
      </button>

      {/* Popover / Menu d'options */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl ring-1 ring-black ring-opacity-5">
          <div className="space-y-1 py-1">

            {/* ✏️ Modifier */}
            <button
              type="button"
              onClick={() => handleAction(onEdit)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <Edit size={16} className="text-blue-400" />
              <span>Modifier</span>
            </button>

            {/* 🟢 / 🟠 Activer ou Désactiver */}
            <button
              type="button"
              onClick={() => handleAction(onToggleStatus)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <Power
                size={16}
                className={
                  teacher.status === "Actif"
                    ? "text-amber-400"
                    : "text-emerald-400"
                }
              />
              <span>
                {teacher.status === "Actif"
                  ? "Désactiver l'enseignant"
                  : "Activer l'enseignant"}
              </span>
            </button>

            {/* 📊 Statistiques */}
            <button
              type="button"
              onClick={() => handleAction(onViewStats)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <BarChart3 size={16} className="text-purple-400" />
              <span>Statistiques</span>
            </button>

            {/* 🔐 Filtrage automatique par établissement */}
            <button
              type="button"
              onClick={() => handleAction(onFilterEstablishment)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <ShieldCheck size={16} className="text-indigo-400" />
              <span>Filtrage établissement</span>
            </button>

            <div className="my-1 border-t border-slate-800" />

            {/* 🗑️ Supprimer */}
            <button
              type="button"
              onClick={() => handleAction(onDelete)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-rose-400 transition hover:bg-rose-500/10 hover:text-rose-300"
            >
              <Trash2 size={16} />
              <span>Supprimer</span>
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   COMPOSANT PRINCIPAL TABLEAU
   ========================================================================= */
export default function TeacherTable({
  teachers = [],
  onEdit,
  onToggleStatus,
  onDelete,
  onViewStats,
  onFilterEstablishment,
}) {
  if (teachers.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
        <p className="text-sm font-medium text-white">
          Aucun enseignant trouvé
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Essayez de modifier votre recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px] text-left">

          <thead className="border-b border-slate-800 bg-slate-950">

            <tr>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Enseignant
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Matière
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Téléphone
              </th>

              <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Statut
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-800">

            {teachers.map((teacher) => (

              <tr
                key={teacher.id}
                className="transition hover:bg-slate-800/40"
              >

                {/* ENSEIGNANT */}

                <td className="px-5 py-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 font-bold text-blue-400">
                      {teacher.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <div>
                      <p className="font-medium text-white">
                        {teacher.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        ID #{teacher.id}
                      </p>
                    </div>

                  </div>

                </td>

                {/* MATIÈRE */}

                <td className="px-5 py-4">

                  <span className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
                    {teacher.subject}
                  </span>

                </td>

                {/* EMAIL */}

                <td className="px-5 py-4">

                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Mail
                      size={15}
                      className="text-slate-500"
                    />

                    {teacher.email}
                  </div>

                </td>

                {/* TÉLÉPHONE */}

                <td className="px-5 py-4">

                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Phone
                      size={15}
                      className="text-slate-500"
                    />

                    {teacher.phone}
                  </div>

                </td>

                {/* STATUT */}

                <td className="px-5 py-4">

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      teacher.status === "Actif"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-orange-500/10 text-orange-400"
                    }`}
                  >
                    {teacher.status}
                  </span>

                </td>

                {/* ACTION (MENU 3 PETITS POINTS) */}

                <td className="px-5 py-4 text-right">

                  <ActionMenu
                    teacher={teacher}
                    onEdit={onEdit}
                    onToggleStatus={onToggleStatus}
                    onDelete={onDelete}
                    onViewStats={onViewStats}
                    onFilterEstablishment={onFilterEstablishment}
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}