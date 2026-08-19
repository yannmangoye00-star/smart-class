import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();

  // État du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN', // Valeur par défaut correspondant à l'Enum Backend
  });

  // États pour l'UI
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Mettre à jour les champs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Empêche le double-clic

    setError('');       // Réinitialise l'erreur précédente
    setLoading(true);   // Active le mode chargement

    try {
      const response = await axios.post('http://localhost:8080/register', formData);

      if (response.status === 200 || response.status === 201) {
        // Optionnel : Stocker le token reçu
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        // Redirection vers la page de connexion
        navigate('/login');
      }
    } catch (err) {
      // Capture du message d'erreur du backend
      const serverMessage = err.response?.data?.message || 'Erreur lors de la création du compte';
      setError(serverMessage);
    } finally {
      setLoading(false); // Réactive le bouton
    }
  };

  return (
    <div className="auth-container">
      <h2>Créer un compte</h2>

      {/* Affichage des erreurs du serveur */}
      {error && <div className="error-badge" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom complet</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ex: Admin Douala"
          />
        </div>

        <div className="form-group">
          <label>Adresse Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="exemple@email.com"
          />
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </div>

        <div className="form-group">
          <label>Rôle</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="ADMIN">Administrateur</option>
            <option value="TEACHER">Enseignant</option>
            <option value="STUDENT">Étudiant</option>
          </select>
        </div>

        <button type="submit" disabled={loading} style={{ marginTop: '15px' }}>
          {loading ? 'Création en cours...' : 'Créer le compte'}
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
};

export default Register;