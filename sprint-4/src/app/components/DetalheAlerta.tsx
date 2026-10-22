import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, MapPin, Clock, AlertTriangle, Camera } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export function DetalheAlerta() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [justificativa, setJustificativa] = useState('');

  // Dados mockados do alerta
  const alerta = {
    id: Number(id),
    tipo: 'EPI Ausente',
    epiAusente: 'Capacete',
    zona: 'Zona C - Área de Produção',
    dataHora: '19/05/2026 10:35:42',
    duracao: '2 minutos 15 segundos',
    status: 'Pendente',
    urgencia: 'Alta',
  };

  const handleConfirmar = () => {
    alert('Alerta confirmado com sucesso!');
    navigate('/alertas');
  };

  const handleDescartar = () => {
    if (!justificativa.trim()) {
      alert('Por favor, forneça uma justificativa para descartar o alerta.');
      return;
    }
    alert('Alerta descartado com sucesso!');
    navigate('/alertas');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Header */}
      <header className="bg-[#1E2A5E] text-white px-8 py-6 shadow-md">
        <h1 className="text-3xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
          Detalhes do Alerta #{alerta.id}
        </h1>
        <p className="text-sm mt-1 opacity-90">Informações completas sobre a ocorrência</p>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Status do Alerta */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-6 border-[#E74C3C]">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8 text-[#E74C3C]" strokeWidth={2.5} />
            <div>
              <h2 className="text-2xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                {alerta.tipo}
              </h2>
              <p className="text-sm text-gray-600">Urgência: {alerta.urgencia}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Imagem da Câmera */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-6 h-6 text-[#1E2A5E]" strokeWidth={2.5} />
              <h3 className="text-xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Captura da Câmera
              </h3>
            </div>
            <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video">
              {/* Placeholder para imagem com desfoque facial */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-3" strokeWidth={2} />
                  <p className="text-gray-600 font-semibold">Imagem da Câmera</p>
                  <p className="text-sm text-gray-500 mt-1">(Rosto desfocado - LGPD)</p>
                </div>
              </div>
              {/* Simulação de área desfocada */}
              <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(200,200,200,0.4) 100%)',
                  backdropFilter: 'blur(20px)',
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              ⚠️ Imagem processada com proteção de dados pessoais (LGPD)
            </p>
          </div>

          {/* Informações do Alerta */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Informações
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-[#E74C3C] mt-1 flex-shrink-0" strokeWidth={2.5} />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-semibold">EPI Ausente</p>
                  <p className="text-lg font-semibold text-gray-800">{alerta.epiAusente}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-[#1E2A5E] mt-1 flex-shrink-0" strokeWidth={2.5} />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-semibold">Zona</p>
                  <p className="text-lg font-semibold text-gray-800">{alerta.zona}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-[#E67E22] mt-1 flex-shrink-0" strokeWidth={2.5} />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-semibold">Data e Hora</p>
                  <p className="text-lg font-semibold text-gray-800">{alerta.dataHora}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-[#27AE60] mt-1 flex-shrink-0" strokeWidth={2.5} />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-semibold">Duração da Violação</p>
                  <p className="text-lg font-semibold text-gray-800">{alerta.duracao}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 font-semibold mb-1">Status Atual</p>
                <span className="inline-block px-4 py-2 bg-[#FCE5CD] text-[#E67E22] rounded-lg font-semibold">
                  {alerta.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Área de Justificativa */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-xl mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
            Justificativa (opcional ao descartar)
          </h3>
          <textarea
            value={justificativa}
            onChange={(e) => setJustificativa(e.target.value)}
            placeholder="Digite a justificativa para descartar este alerta..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1E2A5E] resize-none"
            rows={4}
          />
        </div>

        {/* Botões de Ação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <button
            onClick={handleConfirmar}
            className="bg-[#27AE60] hover:bg-[#229954] text-white rounded-lg shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-3"
            style={{ height: '56px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '18px' }}
          >
            <CheckCircle className="w-6 h-6" strokeWidth={2.5} />
            Confirmar Alerta
          </button>
          <button
            onClick={handleDescartar}
            className="bg-[#E74C3C] hover:bg-[#C0392B] text-white rounded-lg shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-3"
            style={{ height: '56px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '18px' }}
          >
            <XCircle className="w-6 h-6" strokeWidth={2.5} />
            Descartar
          </button>
        </div>

        {/* Botão Voltar */}
        <div className="mt-6">
          <button
            onClick={() => navigate('/alertas')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 rounded-lg shadow-md transition-all hover:shadow-lg flex items-center gap-2"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
            Voltar aos Alertas
          </button>
        </div>
      </div>
    </div>
  );
}
