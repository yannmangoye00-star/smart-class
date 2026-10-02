import { useEffect, useState } from "react";
import { BookOpen, ExternalLink, FileText } from "lucide-react";
import courseQuizService from "../services/courseQuizService";

export default function StudentCourseLibrary() {
  const [courses, setCourses] = useState([]);
  const [subsystem, setSubsystem] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    courseQuizService.getCourses(subsystem || undefined)
      .then((data) => {
        if (active) setCourses(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError?.response?.data?.message || "Impossible de charger les cours.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [subsystem]);

  return (
    <section className="space-y-5 text-white">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">Mes cours</h2>
          <p className="text-sm text-slate-400">Cours publiés pour votre classe et votre sous-système.</p>
        </div>
        <select value={subsystem} onChange={(event) => setSubsystem(event.target.value)} className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200">
          <option value="">Tous les sous-systèmes</option>
          <option value="FRANCOPHONE">Francophone</option>
          <option value="ANGLOPHONE">Anglophone</option>
        </select>
      </div>
      {loading && <p className="text-sm text-slate-400">Chargement des cours...</p>}
      {error && <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <article key={course.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <BookOpen className="mt-1 text-blue-400" size={20} />
                <div>
                  <h3 className="font-semibold text-white">{course.title}</h3>
                  <p className="text-xs text-blue-400">{course.subjectName} · {course.className}</p>
                </div>
              </div>
              <span className="text-[10px] uppercase text-slate-500">{course.resourceType}</span>
            </div>
            {course.description && <p className="mt-3 text-sm text-slate-400">{course.description}</p>}
            {course.contentText && <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">{course.contentText}</p>}
            {course.pdfUrl && (
              <button type="button" onClick={() => courseQuizService.openPdf(course.id)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white">
                <FileText size={16} /> Ouvrir le PDF <ExternalLink size={14} />
              </button>
            )}
          </article>
        ))}
      </div>
      {!loading && !courses.length && <p className="text-sm text-slate-500">Aucun cours disponible.</p>}
    </section>
  );
}
