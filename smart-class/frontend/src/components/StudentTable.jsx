import { Eye, Pencil, Trash2 } from "lucide-react";

export default function StudentTable({
  students = [],
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <table className="min-w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="px-4 py-3 text-left text-sm text-slate-300">Nom</th>

            <th className="px-4 py-3 text-left text-sm text-slate-300">
              Classe
            </th>

            <th className="px-4 py-3 text-left text-sm text-slate-300">
              Email
            </th>

            <th className="px-4 py-3 text-left text-sm text-slate-300">
              Statut
            </th>

            <th className="px-4 py-3 text-center text-sm text-slate-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="border-t border-slate-800 hover:bg-slate-800/40"
            >
              <td className="px-4 py-3 text-white">{student.name}</td>

              <td className="px-4 py-3 text-slate-300">{student.className}</td>

              <td className="px-4 py-3 text-slate-300">{student.email}</td>

              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs text-white ${
                    student.status === "Actif" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {student.status}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onView(student)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => onEdit(student)}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(student.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {students.length === 0 && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-slate-400">
                Aucun étudiant trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
