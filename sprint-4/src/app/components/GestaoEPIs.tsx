import { useState } from 'react';
import { Search, Filter, Plus, ArrowLeft, CheckCircle, XCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Colaborador {
  id: number;
  nome: string;
  setor: string;
  episObrigatorios: string[];
  episRegistrados: string[];
  status: 'conforme' | 'pendente' | 'nao-conforme';
}

export function GestaoEPIs() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [setorFiltro, setSetorFiltro] = useState('todos');
  const [modalAberto, setModalAberto] = useState(false);
  const [detalheColaborador, setDetalheColaborador] = useState<Colaborador | null>(null);

  const colaboradores: Colaborador[] = [
    {
      id: 1,
      nome: 'João Silva',
      setor: 'Produção',
      episObrigatorios: ['Capacete', 'Luvas', 'Óculos', 'Protetor Auricular'],
      episRegistrados: ['Capacete', 'Luvas', 'Óculos', 'Protetor Auricular'],
      status: 'conforme',
    },
    {
      id: 2,
      nome: 'Maria Santos',
      setor: 'Logística',
      episObrigatorios: ['Capacete', 'Colete', 'Calçado de Segurança'],
      episRegistrados: ['Capacete', 'Colete'],
      status: 'pendente',
    },
    {
      id: 3,
      nome: 'Pedro Oliveira',
      setor: 'Produção',
      episObrigatorios: ['Capacete', 'Luvas', 'Máscara', 'Óculos'],
      episRegistrados: ['Capacete', 'Luvas'],
      status: 'nao-conforme',
    },
    {
      id: 4,
      nome: 'Ana Costa',
      setor: 'Manutenção',
      episObrigatorios: ['Capacete', 'Luvas', 'Cinto de Segurança', 'Óculos'],
      episRegistrados: ['Capacete', 'Luvas', 'Cinto de Segurança', 'Óculos'],
      status: 'conforme',
    },
    {
      id: 5,
      nome: 'Carlos Mendes',
      setor: 'Logística',
      episObrigatorios: ['Capacete', 'Colete', 'Calçado de Segurança'],
      episRegistrados: ['Capacete', 'Calçado de Segurança'],
      status: 'pendente',
    },
  ];

  const colaboradoresFiltrados = colaboradores.filter((c) => {
    const matchBusca = c.nome.toLowerCase().includes(busca.toLowerCase());
    const matchSetor = setorFiltro === 'todos' || c.setor === setorFiltro;
    return matchBusca && matchSetor;
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'conforme':
        return { color: '#27AE60', label: 'Conforme', icon: CheckCircle };
      case 'pendente':
        return { color: '#E67E22', label: 'Pendente', icon: XCircle };
      case 'nao-conforme':
        return { color: '#E74C3C', label: 'Não Conforme', icon: XCircle };
      default:
        return { color: '#95A5A6', label: 'Desconhecido', icon: XCircle };
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Header */}
      <header className="bg-[#1E2A5E] text-white px-8 py-6 shadow-md">
        <h1 className="text-3xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
          Gestão de EPIs
        </h1>
        <p className="text-sm mt-1 opacity-90">Gerenciamento de Equipamentos de Proteção Individual</p>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Controles */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Buscar colaborador..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1E2A5E]"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2.5} />
                <select
                  value={setorFiltro}
                  onChange={(e) => setSetorFiltro(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1E2A5E] appearance-none bg-white"
                  style={{ minWidth: '180px' }}
                >
                  <option value="todos">Todos os Setores</option>
                  <option value="Produção">Produção</option>
                  <option value="Logística">Logística</option>
                  <option value="Manutenção">Manutenção</option>
                </select>
              </div>
              <button
                onClick={() => setModalAberto(true)}
                className="bg-[#27AE60] hover:bg-[#229954] text-white px-6 rounded-lg shadow-md transition-all hover:shadow-lg flex items-center gap-2"
                style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
              >
                <Plus className="w-5 h-5" strokeWidth={2.5} />
                Novo EPI
              </button>
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1E2A5E] text-white">
                <tr>
                  <th className="px-6 py-4 text-left" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    Colaborador
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    Setor
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    EPIs Obrigatórios
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    EPIs Registrados
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {colaboradoresFiltrados.map((colaborador, index) => {
                  const statusInfo = getStatusInfo(colaborador.status);
                  const StatusIcon = statusInfo.icon;
                  return (
                    <tr
                      key={colaborador.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                      onClick={() => setDetalheColaborador(colaborador)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-5 h-5 text-gray-500" strokeWidth={2.5} />
                          <span className="font-semibold">{colaborador.nome}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{colaborador.setor}</td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{colaborador.episObrigatorios.length}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{colaborador.episRegistrados.length}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <StatusIcon className="w-5 h-5" style={{ color: statusInfo.color }} strokeWidth={2.5} />
                          <span className="font-semibold" style={{ color: statusInfo.color }}>
                            {statusInfo.label}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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

      {/* Modal Novo EPI */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
              Novo EPI
            </h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Tipo de EPI</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1E2A5E]"
                  placeholder="Ex: Capacete"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Código</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1E2A5E]"
                  placeholder="Ex: CAP-001"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setModalAberto(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all"
                style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
              >
                Cancelar
              </button>
              <button
                onClick={() => setModalAberto(false)}
                className="flex-1 bg-[#27AE60] hover:bg-[#229954] text-white rounded-lg transition-all"
                style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalhes do Colaborador */}
      {detalheColaborador && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-8 h-8 text-[#1E2A5E]" strokeWidth={2.5} />
              <h2 className="text-2xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                {detalheColaborador.nome}
              </h2>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Setor</p>
                <p className="text-lg">{detalheColaborador.setor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-2">EPIs Obrigatórios</p>
                <div className="flex flex-wrap gap-2">
                  {detalheColaborador.episObrigatorios.map((epi) => (
                    <span
                      key={epi}
                      className="px-3 py-1 bg-[#1E2A5E] text-white rounded-full text-sm"
                    >
                      {epi}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-2">EPIs Registrados</p>
                <div className="flex flex-wrap gap-2">
                  {detalheColaborador.episRegistrados.map((epi) => (
                    <span
                      key={epi}
                      className="px-3 py-1 bg-[#27AE60] text-white rounded-full text-sm"
                    >
                      {epi}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => setDetalheColaborador(null)}
              className="w-full bg-[#1E2A5E] hover:bg-[#162044] text-white rounded-lg transition-all"
              style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
