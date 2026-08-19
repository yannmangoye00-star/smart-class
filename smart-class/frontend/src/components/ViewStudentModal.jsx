import { X, GraduationCap, Mail, Phone, Shield } from "lucide-react";

export default function ViewStudentModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Informations de l'étudiant
          </h2>

          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <GraduationCap className="text-blue-400" />
            <div>
              <p className="text-slate-400 text-sm">Nom complet</p>
              <p className="text-white font-semibold">{student.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-green-400" />
            <div>
              <p className="text-slate-400 text-sm">Email</p>
              <p className="text-white">{student.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-orange-400" />
            <div>
              <p className="text-slate-400 text-sm">Téléphone</p>
              <p className="text-white">{student.phone || "-"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Shield className="text-purple-400" />
            <div>
              <p className="text-slate-400 text-sm">Classe</p>
              <p className="text-white">{student.className}</p>
            </div>
          </div>

          <div>
            <p className="text-slate-400 text-sm">Statut</p>

            <span
              className={`mt-2 inline-block rounded-full px-4 py-1 text-white ${
                student.status === "Actif" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {student.status}
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
