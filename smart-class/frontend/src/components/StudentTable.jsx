import { Eye, Pencil, Trash2 } from "lucide-react";

const students = [
  {
    id: 1,
    name: "Yann Mangoye",
    email: "yann@test.com",
    class: "Licence 3 GL",
    phone: "+237 6 90 00 00 00",
    status: "Actif",
  },
  {
    id: 2,
    name: "Sarah Njoya",
    email: "sarah@test.com",
    class: "Licence 2 GL",
    phone: "+237 6 77 22 33 44",
    status: "Actif",
  },
  {
    id: 3,
    name: "Kevin Ndzi",
    email: "kevin@test.com",
    class: "Licence 1 GL",
    phone: "+237 6 55 44 33 22",
    status: "Suspendu",
  },
];

export default function StudentTable() {
  return (
    <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-lg">

      <table className="w-full">

        <thead className="bg-slate-800">

          <tr>

            <th className="px-6 py-4 text-left text-slate-300">Nom</th>

            <th className="px-6 py-4 text-left text-slate-300">Email</th>

            <th className="px-6 py-4 text-left text-slate-300">Classe</th>

            <th className="px-6 py-4 text-left text-slate-300">Téléphone</th>

            <th className="px-6 py-4 text-center text-slate-300">Statut</th>

            <th className="px-6 py-4 text-center text-slate-300">Actions</th>

          </tr>

        </thead>

        <tbody>

          {students.map((student) => (

            <tr
              key={student.id}
              className="border-t border-slate-800 hover:bg-slate-800/40"
            >

              <td className="px-6 py-4 text-white">
                {student.name}
              </td>

              <td className="px-6 py-4 text-slate-300">
                {student.email}
              </td>

              <td className="px-6 py-4 text-slate-300">
                {student.class}
              </td>

              <td className="px-6 py-4 text-slate-300">
                {student.phone}
              </td>

              <td className="px-6 py-4 text-center">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    student.status === "Actif"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {student.status}
                </span>

              </td>

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <button className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700">
                    <Eye size={18} />
                  </button>

                  <button className="rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-600">
                    <Pencil size={18} />
                  </button>

                  <button className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700">
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}