import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div
      className="min-h-screen bg-[#F4F4F4] flex flex-col items-center justify-center px-4"
      style={{ fontFamily: 'Open Sans, sans-serif' }}
    >
      {/* Card de login */}
      <div className="bg-white rounded-lg shadow-md w-full max-w-md px-10 py-12">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-[#1E2A5E] rounded-full p-4 mb-4 shadow">
            <Shield className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h1
            className="text-[#1E2A5E] text-2xl text-center"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
          >
            Metaindústria Safety
          </h1>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Sistema de Gestão de EPIs e Segurança Industrial
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Campo de e-mail */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              E-mail
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                strokeWidth={2}
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full pl-12 pr-4 rounded-lg border border-gray-300 bg-[#F4F4F4] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A5E] focus:border-transparent transition"
                style={{ height: '48px' }}
              />
            </div>
          </div>

          {/* Campo de senha */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Senha
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                strokeWidth={2}
              />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-14 rounded-lg border border-gray-300 bg-[#F4F4F4] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A5E] focus:border-transparent transition"
                style={{ height: '48px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <Eye className="w-5 h-5" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>

          {/* Lembrar-me + esqueci a senha */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-[#1E2A5E] rounded"
              />
              <span className="text-sm text-gray-600">Lembrar-me</span>
            </label>
            <button
              type="button"
              className="text-sm text-gray-400 hover:text-[#1E2A5E] underline transition"
            >
              Esqueceu a senha?
            </button>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="w-full bg-[#1E2A5E] hover:bg-[#162044] text-white rounded-lg font-semibold text-base shadow-md transition-all hover:shadow-lg active:scale-95 flex items-center justify-center"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif' }}
          >
            Entrar
          </button>
        </form>
      </div>

      {/* Rodapé */}
      <p className="mt-8 text-xs text-gray-400 text-center">
        Versão 1.0 &copy; {new Date().getFullYear()} Metaindústria Safety
      </p>
    </div>
  );
}
