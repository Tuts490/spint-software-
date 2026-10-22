import { useState } from 'react';
import { ArrowLeft, Download, FileText, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Relatorios() {
  const navigate = useNavigate();
  const [setor, setSetor] = useState('todos');
  const [periodo, setPeriodo] = useState('30');

  const dadosGrafico = [
    { setor: 'Produção', conformidade: 85, naoConformidade: 15 },
    { setor: 'Logística', conformidade: 92, naoConformidade: 8 },
    { setor: 'Manutenção', conformidade: 78, naoConformidade: 22 },
    { setor: 'Qualidade', conformidade: 95, naoConformidade: 5 },
    { setor: 'Almoxarifado', conformidade: 88, naoConformidade: 12 },
  ];

  const indices = [
    { setor: 'Produção', totalEventos: 127, confirmados: 108, falsosPositivos: 19 },
    { setor: 'Logística', totalEventos: 89, confirmados: 82, falsosPositivos: 7 },
    { setor: 'Manutenção', totalEventos: 156, confirmados: 122, falsosPositivos: 34 },
    { setor: 'Qualidade', totalEventos: 43, confirmados: 41, falsosPositivos: 2 },
    { setor: 'Almoxarifado', totalEventos: 68, confirmados: 60, falsosPositivos: 8 },
  ];

  const handleExportarPDF = () => {
    alert('Relatório PDF em desenvolvimento...');
  };

  const handleExportarCSV = () => {
    alert('Exportação CSV em desenvolvimento...');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Header */}
      <header className="bg-[#1E2A5E] text-white px-8 py-6 shadow-md">
        <h1 className="text-3xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
          Relatórios de Conformidade
        </h1>
        <p className="text-sm mt-1 opacity-90">Análise de Desempenho e Indicadores de Segurança</p>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
            Filtros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Setor</label>
              <select
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1E2A5E]"
              >
                <option value="todos">Todos os Setores</option>
                <option value="producao">Produção</option>
                <option value="logistica">Logística</option>
                <option value="manutencao">Manutenção</option>
                <option value="qualidade">Qualidade</option>
                <option value="almoxarifado">Almoxarifado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Período</label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1E2A5E]"
              >
                <option value="7">Últimos 7 dias</option>
                <option value="30">Últimos 30 dias</option>
                <option value="90">Últimos 90 dias</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gráfico de Conformidade */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-[#1E2A5E]" strokeWidth={2.5} />
            <h2 className="text-xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Conformidade por Setor
            </h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="setor" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px' }} />
                <YAxis style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    fontFamily: 'Open Sans, sans-serif',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600 }}
                  iconType="square"
                />
                <Bar dataKey="conformidade" fill="#27AE60" name="Conformidade (%)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="naoConformidade" fill="#E74C3C" name="Não Conformidade (%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabela de Índices */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-[#1E2A5E]" strokeWidth={2.5} />
              <h2 className="text-xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Índices Detalhados
              </h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1E2A5E] text-white">
                <tr>
                  <th className="px-6 py-4 text-left" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    Setor
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    Total de Eventos
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    Confirmados
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    Falsos Positivos
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    Taxa de Precisão
                  </th>
                </tr>
              </thead>
              <tbody>
                {indices.map((item, index) => {
                  const precisao = ((item.confirmados / item.totalEventos) * 100).toFixed(1);
                  return (
                    <tr
                      key={item.setor}
                      className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="px-6 py-4 font-semibold">{item.setor}</td>
                      <td className="px-6 py-4">{item.totalEventos}</td>
                      <td className="px-6 py-4 text-[#27AE60] font-semibold">{item.confirmados}</td>
                      <td className="px-6 py-4 text-[#E74C3C] font-semibold">{item.falsosPositivos}</td>
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-white font-semibold"
                          style={{
                            backgroundColor: Number(precisao) >= 85 ? '#27AE60' : '#E67E22',
                          }}
                        >
                          {precisao}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botões de Exportação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleExportarPDF}
            className="bg-[#E74C3C] hover:bg-[#C0392B] text-white rounded-lg shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-3"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            <Download className="w-5 h-5" strokeWidth={2.5} />
            Exportar PDF
          </button>
          <button
            onClick={handleExportarCSV}
            className="bg-[#27AE60] hover:bg-[#229954] text-white rounded-lg shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-3"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            <Download className="w-5 h-5" strokeWidth={2.5} />
            Exportar CSV
          </button>
        </div>

        {/* Botão Voltar */}
        <div>
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
