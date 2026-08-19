import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function DataTable({
  title,
  subtitle,
  columns,
  rows,
  searchable = true,
  actions = true,
  onView,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [direction, setDirection] = useState("asc");

  const filteredRows = useMemo(() => {
    let data = [...rows];

    // Recherche
    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(keyword)
        )
      );
    }

    // Tri
    if (sortKey) {
      data.sort((a, b) => {
        const A = a[sortKey];
        const B = b[sortKey];

        if (A < B) return direction === "asc" ? -1 : 1;
        if (A > B) return direction === "asc" ? 1 : -1;

        return 0;
      });
    }

    return data;
  }, [rows, search, sortKey, direction]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setDirection(direction === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setDirection("asc");
    }
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl">

      {/* Header */}

      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>

          {subtitle && (
            <p className="text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {searchable && (
          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72 rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500"
            />

          </div>
        )}

      </div>

      {/* Tableau */}

      <div className="overflow-x-auto rounded-2xl border border-slate-800">

        <table className="min-w-full">

          <thead className="bg-slate-950">

            <tr>

              {columns.map((column) => (

                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className="cursor-pointer px-5 py-4 text-left text-sm font-semibold text-slate-300"
                >

                  <div className="flex items-center gap-2">

                    {column.label}

                    {sortKey === column.key ? (
                      direction === "asc" ? (
                        <ChevronUp size={15} />
                      ) : (
                        <ChevronDown size={15} />
                      )
                    ) : null}

                  </div>

                </th>

              ))}

              {actions && (
                <th className="px-5 py-4 text-center text-sm text-slate-300">
                  Actions
                </th>
              )}

            </tr>

          </thead>

          <tbody>

            {filteredRows.map((row) => (

              <tr
                key={row.id}
                className="border-t border-slate-800 hover:bg-slate-800/50"
              >

                {columns.map((column) => (

                  <td
                    key={column.key}
                    className="px-5 py-4 text-slate-300"
                  >

                    {column.render
                      ? column.render(row)
                      : row[column.key]}

                  </td>

                ))}

                {actions && (

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => onView?.(row)}
                        className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => onEdit?.(row)}
                        className="rounded-lg bg-amber-500 p-2 text-white hover:bg-amber-600"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => onDelete?.(row)}
                        className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                )}

              </tr>

            ))}

            {filteredRows.length === 0 && (

              <tr>

                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="py-10 text-center text-slate-400"
                >
                  Aucun résultat trouvé.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}