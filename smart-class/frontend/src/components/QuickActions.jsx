import {
  UserPlus,
  GraduationCap,
  BookOpen,
  ClipboardList,
} from "lucide-react";

const actions = [
  {
    title: "Ajouter un étudiant",
    icon: UserPlus,
  },
  {
    title: "Ajouter un enseignant",
    icon: GraduationCap,
  },
  {
    title: "Créer un cours",
    icon: BookOpen,
  },
  {
    title: "Publier une note",
    icon: ClipboardList,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Accès rapide
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="flex items-center gap-3 rounded-xl bg-blue-600 p-4 text-white transition hover:bg-blue-700"
            >
              <Icon size={20} />
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}