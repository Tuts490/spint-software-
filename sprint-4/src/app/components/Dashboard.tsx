import { AlertTriangle, Shield, FileText, Activity, TrendingUp, MapPin, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Dashboard() {
  const navigate = useNavigate();

  const zones = [
    { name: 'Zona A', risk: 'baixo', color: '#27AE60', count: 2 },
    { name: 'Zona B', risk: 'médio', color: '#E67E22', count: 5 },
    { name: 'Zona C', risk: 'alto', color: '#E74C3C', count: 8 },
    { name: 'Zona D', risk: 'baixo', color: '#27AE60', count: 1 },
  ];

  const activities = [
    { id: 1, text: 'Alerta confirmado - Zona C', time: '10:35', type: 'alert' },
    { id: 2, text: 'EPI cadastrado - Capacete Tipo A', time: '09:22', type: 'epi' },
    { id: 3, text: 'Relatório gerado - Conformidade Mensal', time: '08:45', type: 'report' },
    { id: 4, text: 'Novo alerta - Zona B', time: '08:12', type: 'alert' },
    { id: 5, text: 'Colaborador atualizado - João Silva', time: '07:58', type: 'update' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F4]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Header */}
      <header className="bg-[#1E2A5E] text-white px-8 py-6 shadow-md flex items-center justify-between">
        <div>
          <h1 className="text-3xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
            Metaindústria Safety
          </h1>
          <p className="text-sm mt-1 opacity-90">Sistema de Gestão de EPIs e Segurança Industrial</p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-white opacity-70 hover:opacity-100 transition text-sm"
          title="Sair"
        >
          <LogOut className="w-5 h-5" strokeWidth={2} />
          <span className="hidden md:inline" style={{ fontFamily: 'Montserrat, sans-serif' }}>Sair</span>
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Resumo de Alertas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-[#E67E22]" strokeWidth={2.5} />
              <h2 className="text-2xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Resumo de Alertas
              </h2>
            </div>
            <span className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm">
              3 urgentes
            </span>
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Risco por Zona */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Risco por Zona
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {zones.map((zone) => (
                  <div
                    key={zone.name}
                    className="border-2 rounded-lg p-4 hover:shadow-lg transition-shadow"
                    style={{ borderColor: zone.color }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {zone.name}
                      </h4>
                      <Shield className="w-6 h-6" style={{ color: zone.color }} strokeWidth={2.5} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                        style={{ backgroundColor: zone.color }}
                      >
                        {zone.risk}
                      </span>
                      <span className="text-2xl font-bold text-gray-700">{zone.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Últimas Atividades */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Últimas Atividades
              </h3>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-200 last:border-0">
                    <Activity className="w-5 h-5 text-[#1E2A5E] mt-1 flex-shrink-0" strokeWidth={2.5} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.text}</p>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-[#27AE60]" strokeWidth={2.5} />
              <div>
                <p className="text-sm text-gray-600">Conformidade</p>
                <p className="text-3xl font-bold text-[#27AE60]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  87%
                </p>
              </div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-[#E67E22]" strokeWidth={2.5} />
              <div>
                <p className="text-sm text-gray-600">Alertas hoje</p>
                <p className="text-3xl font-bold text-[#E67E22]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  12
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Navegação */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/alertas')}
            className="bg-[#E67E22] hover:bg-[#D35400] text-white rounded-lg shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-3"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            <AlertTriangle className="w-6 h-6" strokeWidth={2.5} />
            Ver Alertas
          </button>
          <button
            onClick={() => navigate('/epis')}
            className="bg-[#1E2A5E] hover:bg-[#162044] text-white rounded-lg shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-3"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            <Shield className="w-6 h-6" strokeWidth={2.5} />
            EPIs
          </button>
          <button
            onClick={() => navigate('/relatorios')}
            className="bg-[#27AE60] hover:bg-[#229954] text-white rounded-lg shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-3"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            <FileText className="w-6 h-6" strokeWidth={2.5} />
            Relatórios
          </button>
          <button
            onClick={() => navigate('/zonas')}
            className="bg-white hover:bg-gray-50 text-[#1E2A5E] border-2 border-[#1E2A5E] rounded-lg shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-3"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            <MapPin className="w-6 h-6" strokeWidth={2.5} />
            Zonas
          </button>
        </div>
      </div>
    </div>
  );
}
