// src/pages/SuperAdminDashboard.jsx
import React from "react";
import { Building2, Plus, ShieldCheck, Server } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SuperAdminDashboard() {
  return (
    <div className="min-h-screen bg-[#070a14] p-8 text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Gestion des Établissements
          </h1>
          <p className="text-sm text-slate-400">
            Administration globale des tenants Smart Classe
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-700">
          <Plus size={18} />
          Nouvel Établissement
        </button>
      </div>

      {/* Cartes Établissements */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-[#0d1326] p-5">
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-mono text-indigo-400">
              LYCEE-JOSS
            </span>
            <span className="text-xs text-emerald-400 font-medium">Actif</span>
          </div>
          <h3 className="mt-3 text-lg font-bold">Lycée Joss</h3>
          <p className="mt-1 text-xs text-slate-400">
            Base BDD : smartclass_lycee_joss
          </p>
        </div>
      </div>
    </div>
  );
}
