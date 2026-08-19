import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  name: "",
  email: "",
  className: "",
  phone: "",
  password: "",
  status: "Actif",
};

export default function StudentModal({
  isOpen,
  onClose,
  onSave,
  student = null,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (student) {
      setForm({
        ...emptyForm,
        ...student,
      });
    } else {
      setForm(emptyForm);
    }
  }, [student, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      id: student?.id ?? Date.now(),
      ...form,
    });

    setForm(emptyForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 p-6 shadow-2xl">
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {student ? "Modifier l'étudiant" : "Ajouter un étudiant"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 transition hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulaire */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nom complet"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="className"
            placeholder="Classe"
            value={form.className}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="phone"
            placeholder="Téléphone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
          </select>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-700 px-5 py-3 text-white transition hover:bg-slate-600"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
            >
              {student ? "Mettre à jour" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
