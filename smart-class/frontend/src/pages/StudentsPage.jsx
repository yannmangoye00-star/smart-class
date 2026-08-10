import { useEffect, useMemo, useState } from 'react';
import { Search, Plus, Pencil, Trash2, Filter } from 'lucide-react';
import SectionCard from '../components/SectionCard.jsx';
import { studentService } from '../services/studentService.js';

const pageSize = 3;

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    className: '',
    status: 'active',
    grade: '',
  });

  useEffect(() => {
    studentService.list().then((response) => setStudents(response));
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesQuery = [student.name, student.email, student.className]
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [students, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const paginatedStudents = filteredStudents.slice((page - 1) * pageSize, page * pageSize);

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      className: '',
      status: 'active',
      grade: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingId) {
      const updated = await studentService.update({ ...form, id: editingId });
      setStudents((current) => current.map((student) => (student.id === editingId ? updated : student)));
    } else {
      const created = await studentService.create(form);
      setStudents((current) => [created, ...current]);
    }

    resetForm();
  };

  const handleDelete = async (id) => {
    await studentService.delete({ id });
    setStudents((current) => current.filter((student) => student.id !== id));
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setForm({
      name: student.name,
      email: student.email,
      className: student.className,
      status: student.status,
      grade: student.grade,
    });
  };

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <section className="space-y-6 px-1 py-3">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <h1 className="text-2xl font-bold text-white">Gestion des étudiants</h1>
        <p className="mt-1 text-sm text-slate-400">Ajout, modification, filtre, recherche et pagination simulés.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="Ajouter / modifier" subtitle="Formulaire métier des étudiants">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              placeholder="Nom complet"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              placeholder="Email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              placeholder="Classe"
              value={form.className}
              onChange={(event) => setForm((current) => ({ ...current, className: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              placeholder="Note moyenne"
              value={form.grade}
              onChange={(event) => setForm((current) => ({ ...current, grade: event.target.value }))}
            />
            <select
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              value={form.status}
              onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>

            <div className="flex gap-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
              >
                <Plus size={16} />
                {editingId ? 'Mettre à jour' : 'Ajouter'}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200"
              >
                Réinitialiser
              </button>
            </div>
          </form>
        </SectionCard>

        <SectionCard title="Liste des étudiants" subtitle="Recherche, filtres et pagination">
          <div className="mb-4 flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-slate-500" size={16} />
              <input
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-500"
                placeholder="Rechercher un étudiant"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-3 text-slate-500" size={16} />
              <select
                className="rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-500"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">Tous</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {paginatedStudents.map((student) => (
              <div key={student.id} className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{student.name}</p>
                  <p className="text-xs text-slate-400">{student.email} • {student.className}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-200">
                    {student.grade}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleEdit(student)}
                    className="rounded-xl border border-slate-700 p-2 text-slate-300"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(student.id)}
                    className="rounded-xl border border-rose-500/30 p-2 text-rose-300"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 disabled:opacity-40"
            >
              Précédent
            </button>
            <span className="text-xs text-slate-400">Page {page} / {totalPages}</span>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
              className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 disabled:opacity-40"
            >
              Suivant
            </button>
          </div>
        </SectionCard>
      </div>
    </section>
  );
}
