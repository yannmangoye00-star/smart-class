import { useEffect, useState } from "react";
import { X, UserPlus, Mail, Phone, BookOpen, Building2, Save, Edit3 } from "lucide-react";

const initialForm = {
  name: "",
  subject: "",
  establishment: "",
  email: "",
  phone: "",
  status: "Actif",
};

export default function TeacherModal({
  isOpen,
  onClose,
  onSave,
  teacherToEdit = null, // Si transmis, le modal passe en mode Modification
}) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const isEditing = Boolean(teacherToEdit);

  // Pré-remplissage dynamique lors de l'ouverture
  useEffect(() => {
    if (isOpen) {
      if (teacherToEdit) {
        setForm({
          name: teacherToEdit.name || "",
          subject: teacherToEdit.subject || "",
          establishment: teacherToEdit.establishment || "",
          email: teacherToEdit.email || "",
          phone: teacherToEdit.phone || "",
          status: teacherToEdit.status || "Actif",
        });
      } else {
        setForm(initialForm);
      }
      setError("");
    }
  }, [isOpen, teacherToEdit]);

  if (!isOpen) return null;

  const handleChange = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.subject.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Veuillez saisir une adresse email valide.");
      return;
    }

    // Soumission des données
    onSave({
      ...(teacherToEdit?.id ? { id: teacherToEdit.id } : {}),
      name: form.name.trim(),
      subject: form.subject.trim(),
      establishment: form.establishment.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      status: form.status,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-xs"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl animate-in fade-in zoom-in-95 duration-150">

        {/* =====================================================
            EN-TÊTE DYNAMIQUE
        ====================================================== */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600/10 p-3 text-blue-400">
              {isEditing ? <Edit3 size={22} /> : <UserPlus size={22} />}
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                {isEditing ? "Modifier l'enseignant" : "Ajouter un enseignant"}
              </h2>
              <p className="text-xs text-slate-500">
                {isEditing
                  ? "Mettez à jour les informations de l'enseignant."
                  : "Ajoutez un nouvel enseignant à l'établissement."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        {/* =====================================================
            FORMULAIRE
        ====================================================== */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">

          {/* NOM COMPLET */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Nom complet *
            </label>
            <div className="relative">
              <UserPlus size={17} className="absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Ex : Jean Dupont"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>
          </div>

          {/* MATIÈRE & ÉTABLISSEMENT (Grid 2 colonnes sur écran moyen) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Matière enseignée *
              </label>
              <div className="relative">
                <BookOpen size={17} className="absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  value={form.subject}
                  onChange={handleChange("subject")}
                  placeholder="Ex : Mathématiques"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Établissement
              </label>
              <div className="relative">
                <Building2 size={17} className="absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  value={form.establishment}
                  onChange={handleChange("establishment")}
                  placeholder="Ex : Lycée Akwa"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Adresse email *
            </label>
            <div className="relative">
              <Mail size={17} className="absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="enseignant@smartclasse.cm"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>
          </div>

          {/* TÉLÉPHONE & STATUT */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Téléphone *
              </label>
              <div className="relative">
                <Phone size={17} className="absolute left-3 top-3 text-slate-500" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  placeholder="690 00 00 00"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Statut
              </label>
              <select
                value={form.status}
                onChange={handleChange("status")}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
              >
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>
          </div>

          {/* GESTION DES ERREURS */}
          {error && (
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3">
              <p className="text-xs font-medium text-rose-300">{error}</p>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-700"
            >
              {isEditing ? <Save size={17} /> : <UserPlus size={17} />}
              {isEditing ? "Enregistrer les modifications" : "Ajouter l'enseignant"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}