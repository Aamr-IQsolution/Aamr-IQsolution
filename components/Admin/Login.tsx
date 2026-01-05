/**
 * واجهة تسجيل الدخول للمسؤولين؛ توفر نموذجاً لادخال اسم المستخدم وكلمة المرور 
 * للتحقق من الصلاحيات ومنح حق الوصول إلى لوحة تحكم الإدارة (CMS).
 */
import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

interface LoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
  const { admins, setCurrentUser } = useContent();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = admins.find(a => a.username === username && a.password === password);
    if (user) {
      setCurrentUser(user);
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl w-full max-w-md shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
            <Lock className="w-8 h-8 text-brand-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          <p className="text-slate-400 mt-2">Access Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-brand-primary focus:outline-none"
              placeholder="Password"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;