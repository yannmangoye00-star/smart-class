import { useEffect, useState } from "react";
import adminService from "../services/adminService";

const initialClass = { name: "", level: "", subsystem: "FRANCOPHONE" };
const initialSubject = { name: "", classId: "", subsystem: "FRANCOPHONE" };

function getRequestErrorMessage(requestError, fallback) {
  const responseData = requestError?.response?.data;
  const backendMessage = typeof responseData === "string"
    ? responseData
    : responseData?.message || responseData?.detail;
  const validationMessages = responseData?.errors && typeof responseData.errors === "object"
    ? Object.values(responseData.errors).join("; ")
    : "";
  const status = requestError?.response?.status;
  const endpoint = requestError?.config?.url || requestError?.response?.config?.url;
  const requestLabel = [requestError?.config?.method?.toUpperCase(), endpoint]
    .filter(Boolean)
    .join(" ");
  const details = [backendMessage, validationMessages].filter(Boolean).join(" ");

  if (details || status || requestLabel) {
    return [requestLabel, status ? `HTTP ${status}` : "", details]
      .filter(Boolean)
      .join(" : ");
  }

  return requestError?.message || fallback;
}

function ErrorMessage({ message }) {
  return message ? <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{message}</p> : null;
}

export default function AdminManagement() {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classForm, setClassForm] = useState(initialClass);
  const [subjectForm, setSubjectForm] = useState(initialSubject);
  const [editingClassId, setEditingClassId] = useState(null);
  const [parentId, setParentId] = useState("");
  const [childId, setChildId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [nextUsers, nextClasses, nextSubjects] = await Promise.all([
        adminService.getUsers(),
        adminService.getClasses(),
        adminService.getSubjects(),
      ]);
      setUsers(nextUsers);
      setClasses(nextClasses);
      setSubjects(nextSubjects);
      setSubjectForm((current) => ({ ...current, classId: current.classId || nextClasses[0]?.id || "" }));
    } catch (requestError) {
      setError(getRequestErrorMessage(requestError, "Impossible de charger les données administratives."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateUser = async (userId, payload) => {
    setError("");
    try {
      const updated = payload.role
        ? await adminService.updateUserRole(userId, payload.role)
        : await adminService.setUserEnabled(userId, payload.enabled);
      setUsers((current) => current.map((user) => user.id === updated.id ? updated : user));
    } catch (requestError) {
      setError(getRequestErrorMessage(requestError, "Modification utilisateur impossible."));
    }
  };

  const submitClass = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (editingClassId) {
        const updated = await adminService.updateClass(editingClassId, classForm);
        setClasses((current) => current.map((item) => item.id === updated.id ? updated : item));
      } else {
        const created = await adminService.createClass(classForm);
        setClasses((current) => [...current, created]);
      }
      setClassForm(initialClass);
      setEditingClassId(null);
    } catch (requestError) {
      setError(getRequestErrorMessage(requestError, "Enregistrement de la classe impossible."));
    }
  };

  const submitSubject = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const payload = {
        name: subjectForm.name.trim(),
        subsystem: subjectForm.subsystem,
        classId: Number(subjectForm.classId),
      };
      const created = await adminService.createSubject(payload);
      setSubjects((current) => [...current, created]);
      setSubjectForm((current) => ({ ...initialSubject, classId: current.classId }));
    } catch (requestError) {
      setError(getRequestErrorMessage(requestError, "Enregistrement de la matière impossible."));
    }
  };

  const assignStudent = async (event, studentId) => {
    const classId = event.target.value;
    if (!classId) return;
    try {
      const updated = await adminService.assignStudent(Number(classId), studentId);
      setUsers((current) => current.map((user) => user.id === updated.id ? updated : user));
    } catch (requestError) {
      setError(getRequestErrorMessage(requestError, "Affectation impossible."));
    }
  };

  const linkParent = async (event) => {
    event.preventDefault();
    if (!parentId || !childId) return;
    try {
      await adminService.linkChild(Number(parentId), Number(childId));
      setParentId("");
      setChildId("");
    } catch (requestError) {
      setError(getRequestErrorMessage(requestError, "Lien parent-enfant impossible."));
    }
  };

  return (
    <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div>
        <h2 className="text-xl font-bold text-white">Administration</h2>
        <p className="mt-1 text-sm text-slate-400">Utilisateurs, classes bilingues, matières et affectations.</p>
      </div>
      <ErrorMessage message={error} />
      {loading ? <p className="text-sm text-slate-400">Chargement...</p> : (
        <>
          <div className="grid gap-6 xl:grid-cols-2">
            <form onSubmit={submitClass} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <h3 className="font-semibold text-white">{editingClassId ? "Modifier une classe" : "Créer une classe"}</h3>
              <input required value={classForm.name} onChange={(event) => setClassForm({ ...classForm, name: event.target.value })} placeholder="Nom" className="w-full rounded-xl bg-slate-900 p-3 text-sm text-white" />
              <input required value={classForm.level} onChange={(event) => setClassForm({ ...classForm, level: event.target.value })} placeholder="Niveau" className="w-full rounded-xl bg-slate-900 p-3 text-sm text-white" />
              <select value={classForm.subsystem} onChange={(event) => setClassForm({ ...classForm, subsystem: event.target.value })} className="w-full rounded-xl bg-slate-900 p-3 text-sm text-white">
                <option value="FRANCOPHONE">Francophone</option>
                <option value="ANGLOPHONE">Anglophone</option>
              </select>
              <div className="flex gap-2">
                <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white" type="submit">Enregistrer</button>
                {editingClassId && <button type="button" onClick={() => { setEditingClassId(null); setClassForm(initialClass); }} className="rounded-xl bg-slate-800 px-4 py-2 text-sm text-slate-300">Annuler</button>}
              </div>
            </form>

            <form onSubmit={submitSubject} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <h3 className="font-semibold text-white">Créer une matière</h3>
              <input required value={subjectForm.name} onChange={(event) => setSubjectForm({ ...subjectForm, name: event.target.value })} placeholder="Nom de la matière" className="w-full rounded-xl bg-slate-900 p-3 text-sm text-white" />
              <select required value={subjectForm.classId} onChange={(event) => setSubjectForm({ ...subjectForm, classId: event.target.value })} className="w-full rounded-xl bg-slate-900 p-3 text-sm text-white">
                <option value="">Classe</option>
                {classes.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.level}</option>)}
              </select>
              <select value={subjectForm.subsystem} onChange={(event) => setSubjectForm({ ...subjectForm, subsystem: event.target.value })} className="w-full rounded-xl bg-slate-900 p-3 text-sm text-white">
                <option value="FRANCOPHONE">Francophone</option>
                <option value="ANGLOPHONE">Anglophone</option>
              </select>
              <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white" type="submit">Ajouter la matière</button>
            </form>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Classes</h3>
              {classes.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm">
                  <span className="text-slate-200">{item.name} · {item.level} <span className="text-blue-400">{item.subsystem}</span></span>
                  <button type="button" onClick={() => { setEditingClassId(item.id); setClassForm({ name: item.name, level: item.level, subsystem: item.subsystem }); }} className="text-xs text-blue-400">Modifier</button>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Matières</h3>
              {subjects.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200">{item.name} · {item.schoolClass?.name || `Classe #${item.schoolClass?.id || "?"}`}</div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">Utilisateurs et affectations</h3>
            {users.map((user) => (
              <div key={user.id} className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm md:grid-cols-[1.2fr_1fr_1fr_1fr] md:items-center">
                <div><p className="font-semibold text-white">{user.name}</p><p className="text-xs text-slate-500">{user.email}</p></div>
                <select value={user.role} onChange={(event) => updateUser(user.id, { role: event.target.value })} className="rounded-lg bg-slate-900 p-2 text-slate-200"><option>STUDENT</option><option>TEACHER</option><option>PARENT</option><option>ADMIN</option></select>
                <button type="button" onClick={() => updateUser(user.id, { enabled: !user.enabled })} className={`rounded-lg p-2 text-xs ${user.enabled ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>{user.enabled ? "Actif" : "Désactivé"}</button>
                {user.role === "STUDENT" && <select defaultValue={user.classId || ""} onChange={(event) => assignStudent(event, user.id)} className="rounded-lg bg-slate-900 p-2 text-slate-200"><option value="">Affecter à une classe</option>{classes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>}
              </div>
            ))}
          </div>

          <form onSubmit={linkParent} className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label className="text-xs text-slate-400">Parent
              <select required value={parentId} onChange={(event) => setParentId(event.target.value)} className="mt-1 w-full rounded-lg bg-slate-900 p-2 text-sm text-slate-200">
                <option value="">Sélectionner</option>
                {users.filter((user) => user.role === "PARENT").map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
              </select>
            </label>
            <label className="text-xs text-slate-400">Enfant
              <select required value={childId} onChange={(event) => setChildId(event.target.value)} className="mt-1 w-full rounded-lg bg-slate-900 p-2 text-sm text-slate-200">
                <option value="">Sélectionner</option>
                {users.filter((user) => user.role === "STUDENT").map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
              </select>
            </label>
            <button className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white" type="submit">Lier parent et enfant</button>
          </form>
        </>
      )}
    </section>
  );
}
