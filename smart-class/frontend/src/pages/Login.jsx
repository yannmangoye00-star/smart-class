import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LockKeyhole, Mail, GraduationCap } from 'lucide-react';

const roles = [
  { id: 'student', label: 'Élève' },
  { id: 'teacher', label: 'Enseignant' },
  { id: 'admin', label: 'Admin' },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ role: selectedRole, email });
    navigate('/dashboard');
  };

  return (
    <section className="flex min-h-[75vh] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-blue-500/20 bg-slate-900 p-8 shadow-2xl shadow-blue-950/40">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 inline-flex rounded-2xl bg-blue-600 p-3 text-white">
            <GraduationCap size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white">Connexion Smart Classe</h1>
          <p className="mt-2 text-xs text-slate-400">Sélectionnez votre rôle et connectez-vous.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-300">Votre rôle</label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-600 text-white'
                      : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-500" size={16} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white outline-none ring-0 focus:border-blue-500"
                placeholder="utilisateur@smartclass.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">Mot de passe</label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-3 text-slate-500" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white outline-none ring-0 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
          >
            Se connecter
          </button>
        </form>
      </div>
    </section>
  );
}
