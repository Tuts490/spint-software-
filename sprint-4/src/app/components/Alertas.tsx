import { AlertTriangle, CheckCircle, XCircle, ArrowLeft, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Alerta {
  id: number;
  tipo: string;
  epiAusente: string;
  zona: string;
  dataHora: string;
  urgencia: 'alta' | 'media' | 'baixa';
  novo: boolean;
}

export function Alertas() {
  const navigate = useNavigate();

  const alertas: Alerta[] = [
    {
      id: 1,
      tipo: 'EPI Ausente',
      epiAusente: 'Capacete',
      zona: 'Zona C',
      dataHora: '19/05/2026 10:35',
      urgencia: 'alta',
      novo: true,
    },
    {
      id: 2,
      tipo: 'EPI Ausente',
      epiAusente: 'Óculos de Proteção',
      zona: 'Zona C',
      dataHora: '19/05/2026 10:22',
      urgencia: 'alta',
      novo: true,
    },
    {
      id: 3,
      tipo: 'EPI Ausente',
      epiAusente: 'Luvas',
      zona: 'Zona B',
      dataHora: '19/05/2026 09:48',
      urgencia: 'alta',
      novo: false,
    },
    {
      id: 4,
      tipo: 'EPI Ausente',
      epiAusente: 'Protetor Auricular',
      zona: 'Zona B',
      dataHora: '19/05/2026 09:15',
      urgencia: 'media',
      novo: false,
    },
    {
      id: 5,
      tipo: 'EPI Ausente',
      epiAusente: 'Colete Refletivo',
      zona: 'Zona A',
      dataHora: '19/05/2026 08:42',
      urgencia: 'media',
      novo: false,
    },
    {
      id: 6,
      tipo: 'EPI Ausente',
      epiAusente: 'Máscara',
      zona: 'Zona D',
      dataHora: '19/05/2026 08:10',
      urgencia: 'baixa',
      novo: false,
    },
  ];

  const getUrgenciaInfo = (urgencia: string) => {
    switch (urgencia) {
      case 'alta':
        return { color: '#E74C3C', label: 'Alta', bgColor: '#FADBD8' };
      case 'media':
        return { color: '#E67E22', label: 'Média', bgColor: '#FCE5CD' };
      case 'baixa':
        return { color: '#27AE60', label: 'Baixa', bgColor: '#D5F4E6' };
      default:
        return { color: '#95A5A6', label: 'Desconhecida', bgColor: '#ECF0F1' };
    }
  };

  const alertasOrdenados = [...alertas].sort((a, b) => {
    const urgenciaOrdem = { alta: 0, media: 1, baixa: 2 };
    return urgenciaOrdem[a.urgencia] - urgenciaOrdem[b.urgencia];
  });

  return (
    <div className="min-h-screen bg-[#F4F4F4]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Header */}
      <header className="bg-[#1E2A5E] text-white px-8 py-6 shadow-md">
        <h1 className="text-3xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
          Alertas e Notificações
        </h1>
        <p className="text-sm mt-1 opacity-90">Gerenciamento de Alertas de Segurança</p>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Resumo */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-[#E67E22]" strokeWidth={2.5} />
              <div>
                <h2 className="text-2xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                  {alertas.length} Alertas Ativos
                </h2>
                <p className="text-sm text-gray-600">
                  {alertas.filter((a) => a.novo).length} não visualizados
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Alertas */}
        <div className="space-y-4">
          {alertasOrdenados.map((alerta) => {
            const urgenciaInfo = getUrgenciaInfo(alerta.urgencia);
            return (
              <div
                key={alerta.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                style={{ borderLeft: `6px solid ${urgenciaInfo.color}` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {alerta.tipo}
                        </h3>
                        {alerta.novo && (
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            NOVO
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600 font-semibold">EPI Ausente:</span>
                          <p className="text-gray-800">{alerta.epiAusente}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 font-semibold">Zona:</span>
                          <p className="text-gray-800">{alerta.zona}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 font-semibold">Data/Hora:</span>
                          <p className="text-gray-800">{alerta.dataHora}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="px-4 py-2 rounded-lg font-semibold text-sm ml-4"
                      style={{ backgroundColor: urgenciaInfo.bgColor, color: urgenciaInfo.color }}
                    >
                      {urgenciaInfo.label}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/alerta/${alerta.id}`)}
                      className="flex-1 bg-[#1E2A5E] hover:bg-[#162044] text-white rounded-lg transition-all flex items-center justify-center gap-2"
                      style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                    >
                      <Eye className="w-5 h-5" strokeWidth={2.5} />
                      Ver Detalhes
                    </button>
                    <button
                      className="flex-1 bg-[#27AE60] hover:bg-[#229954] text-white rounded-lg transition-all flex items-center justify-center gap-2"
                      style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                    >
                      <CheckCircle className="w-5 h-5" strokeWidth={2.5} />
                      Confirmar
                    </button>
                    <button
                      className="flex-1 bg-[#E74C3C] hover:bg-[#C0392B] text-white rounded-lg transition-all flex items-center justify-center gap-2"
                      style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                    >
                      <XCircle className="w-5 h-5" strokeWidth={2.5} />
                      Descartar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botão Voltar */}
        <div className="mt-6">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 rounded-lg shadow-md transition-all hover:shadow-lg flex items-center gap-2"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
