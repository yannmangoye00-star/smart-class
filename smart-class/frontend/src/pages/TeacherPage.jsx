import { useMemo, useState } from "react";
import {
  GraduationCap,
  Search,
  UserPlus,
  MoreVertical,
  CheckCircle,
  XCircle,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

const initialTeachers = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@smartclass.cm",
    subject: "Mathématiques",
    establishment: "Lycée SmartClass",
    status: "ACTIF",
  },
  {
    id: 2,
    name: "Marie Ngono",
    email: "marie.ngono@smartclass.cm",
    subject: "Physique",
    establishment: "Lycée SmartClass",
    status: "ACTIF",
  },
  {
    id: 3,
    name: "Paul Kamga",
    email: "paul.kamga@smartclass.cm",
    subject: "Informatique",
    establishment: "Collège SmartClass",
    status: "INACTIF",
  },
];

export default function TeacherPage() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [search, setSearch] = useState("");
  const [establishmentFilter, setEstablishmentFilter] = useState("TOUS");
  const [openMenu, setOpenMenu] = useState(null);

  const establishments = [
    ...new Set(teachers.map((teacher) => teacher.establishment)),
  ];

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        teacher.name.toLowerCase().includes(searchValue) ||
        teacher.email.toLowerCase().includes(searchValue) ||
        teacher.subject.toLowerCase().includes(searchValue);

      const matchesEstablishment =
        establishmentFilter === "TOUS" ||
        teacher.establishment === establishmentFilter;

      return matchesSearch && matchesEstablishment;
    });
  }, [teachers, search, establishmentFilter]);

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "ACTIF"
  ).length;

  const inactiveTeachers = teachers.filter(
    (teacher) => teacher.status === "INACTIF"
  ).length;

  const toggleStatus = (id) => {
    setTeachers((current) =>
      current.map((teacher) =>
        teacher.id === id
          ? {
              ...teacher,
              status: teacher.status === "ACTIF" ? "INACTIF" : "ACTIF",
            }
          : teacher
      )
    );

    setOpenMenu(null);
  };

  const deleteTeacher = (id) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet enseignant ?"
    );

    if (!confirmed) return;

    setTeachers((current) =>
      current.filter((teacher) => teacher.id !== id)
    );

    setOpenMenu(null);
  };

  const editTeacher = (teacher) => {
    const newName = window.prompt(
      "Nom de l'enseignant :",
      teacher.name
    );

    if (!newName?.trim()) return;

    setTeachers((current) =>
      current.map((item) =>
        item.id === teacher.id
          ? {
              ...item,
              name: newName.trim(),
            }
          : item
      )
    );

    setOpenMenu(null);
  };

  const addTeacher = () => {
    const name = window.prompt("Nom complet de l'enseignant :");

    if (!name?.trim()) return;

    const email = window.prompt("Adresse e-mail :");

    if (!email?.trim()) return;

    const subject = window.prompt("Matière enseignée :");

    if (!subject?.trim()) return;

    const establishment = window.prompt(
      "Établissement :",
      establishments[0] || ""
    );

    if (!establishment?.trim()) return;

    const newTeacher = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      establishment: establishment.trim(),
      status: "ACTIF",
    };

    setTeachers((current) => [...current, newTeacher]);
  };

  return (
    <section className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-8 md:flex-row md:items-center">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-500/10 p-4">
            <GraduationCap
              size={32}
              className="text-blue-400"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Gestion des enseignants
            </h1>

            <p className="mt-2 text-slate-400">
              Gérez les enseignants de votre établissement.
            </p>
          </div>

        </div>

        <button
          onClick={addTeacher}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          <UserPlus size={19} />
          Ajouter un enseignant
        </button>

      </div>

      {/* STATISTIQUES */}

      <div className="grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Total enseignants
              </p>

              <p className="mt-2 text-3xl font-bold text-white">
                {teachers.length}
              </p>
            </div>

            <Users className="text-blue-400" size={30} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Enseignants actifs
              </p>

              <p className="mt-2 text-3xl font-bold text-emerald-400">
                {activeTeachers}
              </p>
            </div>

            <CheckCircle
              className="text-emerald-400"
              size={30}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Enseignants inactifs
              </p>

              <p className="mt-2 text-3xl font-bold text-red-400">
                {inactiveTeachers}
              </p>
            </div>

            <XCircle
              className="text-red-400"
              size={30}
            />
          </div>
        </div>

      </div>

      {/* FILTRES */}

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 md:flex-row">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher un enseignant..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-blue-500"
          />

        </div>

        <select
          value={establishmentFilter}
          onChange={(event) =>
            setEstablishmentFilter(event.target.value)
          }
          className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
        >
          <option value="TOUS">
            Tous les établissements
          </option>

          {establishments.map((establishment) => (
            <option
              key={establishment}
              value={establishment}
            >
              {establishment}
            </option>
          ))}
        </select>

      </div>

      {/* TABLE */}

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="border-b border-slate-800 bg-slate-950/50">

              <tr className="text-left text-sm text-slate-400">

                <th className="px-6 py-4">
                  Enseignant
                </th>

                <th className="px-6 py-4">
                  Matière
                </th>

                <th className="px-6 py-4">
                  Établissement
                </th>

                <th className="px-6 py-4">
                  Statut
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-800">

              {filteredTeachers.map((teacher) => (

                <tr
                  key={teacher.id}
                  className="transition hover:bg-slate-800/40"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/10 font-bold text-blue-400">
                        {teacher.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>

                        <p className="font-semibold text-white">
                          {teacher.name}
                        </p>

                        <p className="text-sm text-slate-400">
                          {teacher.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {teacher.subject}
                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {teacher.establishment}
                  </td>

                  <td className="px-6 py-5">

                    {teacher.status === "ACTIF" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                        <CheckCircle size={14} />
                        Actif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                        <XCircle size={14} />
                        Inactif
                      </span>
                    )}

                  </td>

                  <td className="relative px-6 py-5 text-right">

                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === teacher.id
                            ? null
                            : teacher.id
                        )
                      }
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {openMenu === teacher.id && (

                      <div className="absolute right-6 z-20 mt-2 w-52 rounded-xl border border-slate-700 bg-slate-800 p-2 text-left shadow-xl">

                        <button
                          onClick={() =>
                            editTeacher(teacher)
                          }
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-slate-700"
                        >
                          <Pencil size={16} />
                          Modifier
                        </button>

                        <button
                          onClick={() =>
                            toggleStatus(teacher.id)
                          }
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-slate-700"
                        >
                          {teacher.status === "ACTIF" ? (
                            <>
                              <XCircle size={16} />
                              Désactiver
                            </>
                          ) : (
                            <>
                              <CheckCircle size={16} />
                              Activer
                            </>
                          )}
                        </button>

                        <button
                          onClick={() =>
                            deleteTeacher(teacher.id)
                          }
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                          Supprimer
                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {filteredTeachers.length === 0 && (

          <div className="p-12 text-center">

            <GraduationCap
              size={40}
              className="mx-auto text-slate-600"
            />

            <p className="mt-4 text-slate-400">
              Aucun enseignant trouvé.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}