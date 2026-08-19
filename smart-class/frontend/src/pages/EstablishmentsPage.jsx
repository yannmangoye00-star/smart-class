import { useState } from "react";
import {
  Building2,
  Plus,
  Mail,
  Database,
  Hash,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import establishmentService from "../services/establishmentService.js";

export default function EstablishmentsPage() {
  const [form, setForm] = useState({
    name: "",
    code: "",
    email: "",
    databaseName: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (!form.name.trim()) {
        throw new Error("Le nom de l'établissement est requis.");
      }

      if (!form.code.trim()) {
        throw new Error("Le code de l'établissement est requis.");
      }

      if (!form.databaseName.trim()) {
        throw new Error("Le nom de la base de données est requis.");
      }

      const response = await establishmentService.create({
        name: form.name.trim(),
        code: form.code.trim().toUpperCase(),
        email: form.email.trim(),
        databaseName: form.databaseName.trim(),
      });

      setMessage(
        `L'établissement "${response.name}" a été créé avec succès.`
      );

      setForm({
        name: "",
        code: "",
        email: "",
        databaseName: "",
      });
    } catch (err) {
      const backendMessage =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Impossible de créer l'établissement.";

      setError(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">

      {/* EN-TÊTE */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-600/10 p-4 text-blue-400">
              <Building2 size={32} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                Gestion des établissements
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Créez et gérez les établissements utilisant Smart Classe.
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            <Building2 size={17} />
            Multi-tenant
          </div>

        </div>

      </div>

      {/* FORMULAIRE */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <div className="mb-6">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <Plus size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                Nouvel établissement
              </h2>

              <p className="text-sm text-slate-400">
                Enregistrez un nouvel établissement dans Smart Classe.
              </p>
            </div>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 md:grid-cols-2"
        >

          {/* NOM */}
          <div className="space-y-2">

            <label className="text-sm font-medium text-slate-300">
              Nom de l'établissement
            </label>

            <div className="relative">

              <Building2
                size={17}
                className="absolute left-3 top-3.5 text-slate-500"
              />

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Collège La Référence"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-3 text-sm text-white outline-none transition focus:border-blue-500"
              />

            </div>

          </div>

          {/* CODE */}
          <div className="space-y-2">

            <label className="text-sm font-medium text-slate-300">
              Code établissement
            </label>

            <div className="relative">

              <Hash
                size={17}
                className="absolute left-3 top-3.5 text-slate-500"
              />

              <input
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="CLR001"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-3 text-sm uppercase text-white outline-none transition focus:border-blue-500"
              />

            </div>

          </div>

          {/* EMAIL */}
          <div className="space-y-2">

            <label className="text-sm font-medium text-slate-300">
              Email de l'établissement
            </label>

            <div className="relative">

              <Mail
                size={17}
                className="absolute left-3 top-3.5 text-slate-500"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="contact@etablissement.cm"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-3 text-sm text-white outline-none transition focus:border-blue-500"
              />

            </div>

          </div>

          {/* DATABASE */}
          <div className="space-y-2">

            <label className="text-sm font-medium text-slate-300">
              Nom de la base de données
            </label>

            <div className="relative">

              <Database
                size={17}
                className="absolute left-3 top-3.5 text-slate-500"
              />

              <input
                name="databaseName"
                value={form.databaseName}
                onChange={handleChange}
                placeholder="smartclass_clr001"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-3 text-sm text-white outline-none transition focus:border-blue-500"
              />

            </div>

          </div>

          {/* MESSAGE */}
          {message && (
            <div className="md:col-span-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {message}
            </div>
          )}

          {error && (
            <div className="md:col-span-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* BOUTON */}
          <div className="md:col-span-2 flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-orange-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus size={18} />

              {loading
                ? "Création en cours..."
                : "Créer l'établissement"}
            </button>

          </div>

        </form>

      </div>

    </section>
  );
}