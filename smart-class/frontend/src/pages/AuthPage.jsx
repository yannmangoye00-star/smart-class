import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, LockKeyhole, Mail, UserPlus, KeyRound, BadgeCheck, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.jsx';
import Toast from '../components/Toast.jsx';
import useToast from '../hooks/useToast.js';

const tabs = [
  { id: 'login', label: 'Connexion' },
  { id: 'register', label: 'Inscription' },
  { id: 'forgot', label: 'Mot de passe oublié' },
  { id: 'reset', label: 'Réinitialiser' },
  { id: 'verify', label: 'Vérifier email' },
];

const roleOptions = [
  { value: 'ADMIN', label: 'Administrateur' },
  { value: 'TEACHER', label: 'Enseignant' },
  { value: 'STUDENT', label: 'Étudiant' },
  { value: 'PARENT', label: 'Parent' },
];

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'STUDENT',
  token: '',
  code: '',
};

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast, showToast } = useToast();
  const { isAuthenticated, login, register, forgotPassword, resetPassword, verifyEmail } = useAuth();

  const from = location.state?.from || '/dashboard';
  const roleRouteMap = {
    ADMIN: '/admin-dashboard',
    TEACHER: '/teacher-dashboard',
    STUDENT: '/student-dashboard',
    PARENT: '/parent-dashboard',
  };

  useEffect(() => {
    if (isAuthenticated) {
      const role = String(form.role || location.state?.role || 'STUDENT').toUpperCase();
      navigate(roleRouteMap[role] || from, { replace: true });
    }
  }, [from, form.role, isAuthenticated, location.state?.role, navigate]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (activeTab === 'login') {
        if (!form.email || !form.password) {
          throw new Error('L’email et le mot de passe sont requis.');
        }

        const response = await login({ email: form.email, password: form.password, role: form.role });
        showToast(response.message, 'success');
        navigate(roleRouteMap[response.user?.role?.toUpperCase()] || from, { replace: true });
      }

      if (activeTab === 'register') {
        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
          throw new Error('Tous les champs sont requis pour l’inscription.');
        }

        if (form.password !== form.confirmPassword) {
          throw new Error('Les mots de passe ne correspondent pas.');
        }

        const response = await register({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        });

        showToast(response.message, 'success');
        setActiveTab('login');
      }

      if (activeTab === 'forgot') {
        const response = await forgotPassword({ email: form.email });
        showToast(response.message, 'success');
        setActiveTab('reset');
      }

      if (activeTab === 'reset') {
        const response = await resetPassword({
          email: form.email,
          token: form.token,
          password: form.password,
        });
        showToast(response.message, 'success');
        setActiveTab('login');
      }

      if (activeTab === 'verify') {
        const response = await verifyEmail({ email: form.email, code: form.code });
        showToast(response.message, 'success');
        setActiveTab('login');
      }
    } catch (err) {
      const message = err?.message || 'Une erreur inattendue s’est produite.';
      setError(message);
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[75vh] items-center justify-center px-4 py-8">
      <Toast toast={toast} />

      <div className="grid w-full max-w-5xl gap-6 rounded-[28px] border border-slate-800 bg-slate-900/60 p-4 md:grid-cols-[1.1fr_0.9fr] md:p-6">
        <div className="rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-6">
          <div className="mb-4 flex items-center gap-3 text-blue-300">
            <GraduationCap size={22} />
            <span className="text-sm font-bold">Smart Classe Auth</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Accédez à votre espace scolaire sécurisé.</h1>
          <p className="mt-3 max-w-md text-sm text-slate-300">
            Une expérience moderne pensée pour les administrations, enseignants, étudiants et parents.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-xs text-slate-400">Accès multi-rôles</p>
              <p className="mt-1 text-lg font-bold text-white">4 profils</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-xs text-slate-400">Sécurité</p>
              <p className="mt-1 text-lg font-bold text-white">Session + JWT</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {(activeTab === 'login' || activeTab === 'register') && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-500" size={16} />
                  <input
                    value={form.email}
                    onChange={handleChange('email')}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-500"
                    placeholder="nom@smartclasse.com"
                    required
                  />
                </div>
              </div>
            )}

            {activeTab === 'register' && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Nom complet</label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-3 text-slate-500" size={16} />
                  <input
                    value={form.name}
                    onChange={handleChange('name')}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-500"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
              </div>
            )}

            {activeTab === 'login' || activeTab === 'register' || activeTab === 'reset' ? (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Mot de passe</label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-3 text-slate-500" size={16} />
                  <input
                    type="password"
                    value={form.password}
                    onChange={handleChange('password')}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            ) : null}

            {activeTab === 'register' && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Confirmation du mot de passe</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-3 text-slate-500" size={16} />
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-500"
                    placeholder="Confirmez votre mot de passe"
                    required
                  />
                </div>
              </div>
            )}

            {(activeTab === 'login' || activeTab === 'register') && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Choisir un rôle</label>
                <select
                  value={form.role}
                  onChange={handleChange('role')}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {activeTab === 'forgot' && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Récupération</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 text-slate-500" size={16} />
                  <input
                    value={form.email}
                    onChange={handleChange('email')}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-blue-500"
                    placeholder="Votre email pour recevoir le lien"
                    required
                  />
                </div>
              </div>
            )}

            {activeTab === 'reset' && (
              <>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">Token de réinitialisation</label>
                  <input
                    value={form.token}
                    onChange={handleChange('token')}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                    placeholder="Code reçu par email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">Nouveau mot de passe</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={handleChange('password')}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </>
            )}

            {activeTab === 'verify' && (
              <>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">Email à vérifier</label>
                  <input
                    value={form.email}
                    onChange={handleChange('email')}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                    placeholder="nom@smartclasse.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">Code de vérification</label>
                  <input
                    value={form.code}
                    onChange={handleChange('code')}
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                    placeholder="123456"
                    required
                  />
                </div>
              </>
            )}

            {error ? <p className="text-xs text-rose-300">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-orange-400 px-4 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? 'Chargement...'
                : activeTab === 'login'
                  ? 'Se connecter'
                  : activeTab === 'register'
                    ? 'Créer le compte'
                    : activeTab === 'forgot'
                      ? 'Envoyer le lien'
                      : activeTab === 'reset'
                        ? 'Réinitialiser le mot de passe'
                        : 'Vérifier l’email'}
            </button>
          </form>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <BadgeCheck size={14} className="text-emerald-400" />
            Session persistante, validation et notifications intégrées.
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Déjà connecté ? <Link to="/dashboard" className="text-blue-300">Accéder au dashboard</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
