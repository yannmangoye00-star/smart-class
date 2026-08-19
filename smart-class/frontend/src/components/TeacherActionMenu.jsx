import { useState, useRef, useEffect } from "react";
import { 
  MoreVertical, 
  Edit, 
  Power, 
  Trash2, 
  BarChart3, 
  ShieldCheck 
} from "lucide-react";

export default function TeacherActionMenu({ 
  teacher, 
  onEdit, 
  onToggleStatus, 
  onDelete, 
  onViewStats, 
  onFilterEstablishment 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Fermer le menu si on clique n'importe où ailleurs sur l'écran
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (actionCallback) => {
    setIsOpen(false);
    if (actionCallback) actionCallback(teacher);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Bouton Trois Petits Points */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none"
        title="Options"
      >
        <MoreVertical size={18} />
      </button>

      {/* Menu Déroulant Popover */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-60 origin-top-right rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in-95 duration-100">
          <div className="py-1 space-y-1">
            
            {/* ✏️ Modifier */}
            <button
              onClick={() => handleAction(onEdit)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <Edit size={16} className="text-blue-400" />
              <span>Modifier</span>
            </button>

            {/* 🟢 Activer / Désactiver */}
            <button
              onClick={() => handleAction(onToggleStatus)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <Power size={16} className={teacher?.status === "Actif" ? "text-emerald-400" : "text-amber-400"} />
              <span>
                {teacher?.status === "Actif" ? "Désactiver l'enseignant" : "Activer l'enseignant"}
              </span>
            </button>

            {/* 📊 Statistiques */}
            <button
              onClick={() => handleAction(onViewStats)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <BarChart3 size={16} className="text-purple-400" />
              <span>Statistiques</span>
            </button>

            {/* 🔐 Filtrage automatique par établissement */}
            <button
              onClick={() => handleAction(onFilterEstablishment)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <ShieldCheck size={16} className="text-indigo-400" />
              <span>Filtrage établissement</span>
            </button>

            <div className="my-1 border-t border-slate-800" />

            {/* 🗑️ Supprimer */}
            <button
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