import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-3 text-slate-400"
      />

      <input
        type="text"
        placeholder="Rechercher un étudiant..."
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500"
      />
    </div>
  );
}