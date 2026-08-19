import { Camera, LockKeyhole, UserCircle2, BellRing, Palette } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useTranslation } from "react-i18next";
import SectionCard from '../components/SectionCard.jsx';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <section className="space-y-6 px-1 py-3">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-orange-400 text-white shadow-lg shadow-blue-950/50">
                <UserCircle2 size={42} />
              </div>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 rounded-full border border-slate-800 bg-slate-950 p-2 text-slate-200"
              >
                <Camera size={14} />
              </button>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">Profil utilisateur</h1>
              <p className="text-sm text-slate-400">
                {user?.name || 'Utilisateur Smart Classe'} • {user?.role || 'student'}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-orange-400 px-4 py-2 text-sm font-semibold text-white"
          >
            Enregistrer les changements
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SectionCard title="Informations personnelles" subtitle="Données de base du profil">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              <span>Nom complet</span>
              <input
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-blue-500"
                defaultValue={user?.name || 'Jean Dupont'}
              />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Email</span>
              <input
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-blue-500"
                defaultValue={user?.email || 'jean@smartclasse.com'}
              />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Rôle</span>
              <input
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-blue-500"
                defaultValue={user?.role || 'student'}
              />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Téléphone</span>
              <input
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-blue-500"
                defaultValue="+33 6 12 34 56 78"
              />
            </label>
          </div>
        </SectionCard>

        <SectionCard title="Sécurité" subtitle="Changer le mot de passe et sécuriser l’accès">
          <div className="space-y-4">
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Mot de passe actuel</span>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-3 text-slate-500" size={16} />
                <input
                  type="password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-white outline-none focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </label>

            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Nouveau mot de passe</span>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-3 text-slate-500" size={16} />
                <input
                  type="password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-white outline-none focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </label>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SectionCard title="Préférences" subtitle="Personnaliser votre expérience">
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between rounded-2xl bg-slate-950 p-3">
              <div className="flex items-center gap-3">
                <BellRing size={16} className="text-orange-300" />
                <span>Notifications par email</span>
              </div>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-950 p-3">
              <div className="flex items-center gap-3">
                <Palette size={16} className="text-blue-300" />
                <span>Mode sombre</span>
              </div>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Résumé d’activité" subtitle="Vue rapide de votre usage">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Dernière connexion</p>
              <p className="mt-1 text-lg font-bold text-white">Aujourd’hui</p>
            </div>
            <div className="rounded-2xl bg-slate-950 p-4">
              <p className="text-xs text-slate-400">Sessions actives</p>
              <p className="mt-1 text-lg font-bold text-white">02</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </section>
  );
}
