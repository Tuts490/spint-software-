import { useState } from 'react';
import { Shield, Edit2, Eye, X, ArrowLeft, PlusCircle, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

type RiskLevel = 'alto' | 'médio' | 'baixo';

interface Zone {
  id: number;
  name: string;
  sector: string;
  risk: RiskLevel;
  epis: string[];
}

const ALL_EPIS = [
  'Capacete',
  'Luva',
  'Óculos de Proteção',
  'Bota de Segurança',
  'Protetor Auricular',
  'Máscara Respiratória',
  'Colete Refletivo',
  'Avental',
];

const RISK_CONFIG: Record<RiskLevel, { label: string; bg: string; text: string; border: string }> = {
  alto: { label: 'Alto', bg: '#E74C3C', text: '#fff', border: '#E74C3C' },
  médio: { label: 'Médio', bg: '#E67E22', text: '#fff', border: '#E67E22' },
  baixo: { label: 'Baixo', bg: '#27AE60', text: '#fff', border: '#27AE60' },
};

const INITIAL_ZONES: Zone[] = [
  {
    id: 1,
    name: 'Zona A',
    sector: 'Produção',
    risk: 'alto',
    epis: ['Capacete', 'Luva', 'Óculos de Proteção', 'Bota de Segurança'],
  },
  {
    id: 2,
    name: 'Zona B',
    sector: 'Manutenção',
    risk: 'médio',
    epis: ['Capacete', 'Luva', 'Protetor Auricular'],
  },
  {
    id: 3,
    name: 'Zona C',
    sector: 'Almoxarifado',
    risk: 'baixo',
    epis: ['Colete Refletivo', 'Bota de Segurança'],
  },
  {
    id: 4,
    name: 'Zona D',
    sector: 'Laboratório',
    risk: 'médio',
    epis: ['Óculos de Proteção', 'Máscara Respiratória', 'Avental', 'Luva'],
  },
];

interface ViewModalProps {
  zone: Zone;
  onClose: () => void;
}

function ViewModal({ zone, onClose }: ViewModalProps) {
  const risk = RISK_CONFIG[zone.risk];
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: 'Open Sans, sans-serif' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl text-[#1E2A5E]"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
          >
            {zone.name} — {zone.sector}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-600">Nível de Risco:</span>
          <span
            className="ml-2 px-3 py-1 rounded-full text-sm font-semibold"
            style={{ backgroundColor: risk.bg, color: risk.text }}
          >
            {risk.label}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2">EPIs Obrigatórios:</p>
          <ul className="space-y-1">
            {zone.epis.map((epi) => (
              <li key={epi} className="flex items-center gap-2 text-sm text-gray-800">
                <Shield className="w-4 h-4 text-[#1E2A5E]" strokeWidth={2.5} />
                {epi}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition flex items-center justify-center"
          style={{ height: '48px', fontFamily: 'Montserrat, sans-serif' }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

interface EditModalProps {
  zone: Zone;
  onClose: () => void;
  onSave: (updated: Zone) => void;
}

function EditModal({ zone, onClose, onSave }: EditModalProps) {
  const [name, setName] = useState(zone.name);
  const [sector, setSector] = useState(zone.sector);
  const [risk, setRisk] = useState<RiskLevel>(zone.risk);
  const [selectedEpis, setSelectedEpis] = useState<string[]>(zone.epis);

  const toggleEpi = (epi: string) => {
    setSelectedEpis((prev) =>
      prev.includes(epi) ? prev.filter((e) => e !== epi) : [...prev, epi]
    );
  };

  const handleSave = () => {
    onSave({ ...zone, name, sector, risk, epis: selectedEpis });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: 'Open Sans, sans-serif' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl text-[#1E2A5E]"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
          >
            Editar Zona
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nome da Zona
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 rounded-lg border border-gray-300 bg-[#F4F4F4] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A5E] transition"
              style={{ height: '48px' }}
            />
          </div>

          {/* Setor */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Setor
            </label>
            <input
              type="text"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full px-4 rounded-lg border border-gray-300 bg-[#F4F4F4] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A5E] transition"
              style={{ height: '48px' }}
            />
          </div>

          {/* Nível de risco */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nível de Risco
            </label>
            <div className="flex gap-3">
              {(['alto', 'médio', 'baixo'] as RiskLevel[]).map((level) => {
                const cfg = RISK_CONFIG[level];
                const active = risk === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setRisk(level)}
                    className="flex-1 rounded-lg border-2 font-semibold text-sm transition"
                    style={{
                      height: '48px',
                      backgroundColor: active ? cfg.bg : '#fff',
                      color: active ? cfg.text : cfg.bg,
                      borderColor: cfg.border,
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* EPIs obrigatórios */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              EPIs Obrigatórios
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ALL_EPIS.map((epi) => (
                <label
                  key={epi}
                  className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-700 bg-[#F4F4F4] rounded-lg px-3 py-2 border border-gray-200 hover:border-[#1E2A5E] transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedEpis.includes(epi)}
                    onChange={() => toggleEpi(epi)}
                    className="w-4 h-4 accent-[#1E2A5E]"
                  />
                  {epi}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif' }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-[#27AE60] hover:bg-[#229954] text-white rounded-lg font-semibold transition shadow-md"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif' }}
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

interface NewZoneModalProps {
  onClose: () => void;
  onSave: (zone: Zone) => void;
  nextId: number;
}

function NewZoneModal({ onClose, onSave, nextId }: NewZoneModalProps) {
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const [risk, setRisk] = useState<RiskLevel>('baixo');
  const [selectedEpis, setSelectedEpis] = useState<string[]>([]);

  const toggleEpi = (epi: string) => {
    setSelectedEpis((prev) =>
      prev.includes(epi) ? prev.filter((e) => e !== epi) : [...prev, epi]
    );
  };

  const handleSave = () => {
    if (!name.trim() || !sector.trim()) return;
    onSave({ id: nextId, name, sector, risk, epis: selectedEpis });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: 'Open Sans, sans-serif' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl text-[#1E2A5E]"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
          >
            Nova Zona
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nome da Zona *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Zona E"
              className="w-full px-4 rounded-lg border border-gray-300 bg-[#F4F4F4] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A5E] transition"
              style={{ height: '48px' }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Setor *
            </label>
            <input
              type="text"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              placeholder="Ex: Expedição"
              className="w-full px-4 rounded-lg border border-gray-300 bg-[#F4F4F4] text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A5E] transition"
              style={{ height: '48px' }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nível de Risco
            </label>
            <div className="flex gap-3">
              {(['alto', 'médio', 'baixo'] as RiskLevel[]).map((level) => {
                const cfg = RISK_CONFIG[level];
                const active = risk === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setRisk(level)}
                    className="flex-1 rounded-lg border-2 font-semibold text-sm transition"
                    style={{
                      height: '48px',
                      backgroundColor: active ? cfg.bg : '#fff',
                      color: active ? cfg.text : cfg.bg,
                      borderColor: cfg.border,
                      fontFamily: 'Montserrat, sans-serif',
                    }}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              EPIs Obrigatórios
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ALL_EPIS.map((epi) => (
                <label
                  key={epi}
                  className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-700 bg-[#F4F4F4] rounded-lg px-3 py-2 border border-gray-200 hover:border-[#1E2A5E] transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedEpis.includes(epi)}
                    onChange={() => toggleEpi(epi)}
                    className="w-4 h-4 accent-[#1E2A5E]"
                  />
                  {epi}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif' }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || !sector.trim()}
            className="flex-1 bg-[#27AE60] hover:bg-[#229954] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition shadow-md"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif' }}
          >
            Criar Zona
          </button>
        </div>
      </div>
    </div>
  );
}

export function GerenciamentoZonas() {
  const navigate = useNavigate();
  const [zones, setZones] = useState<Zone[]>(INITIAL_ZONES);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);
  const [viewingZone, setViewingZone] = useState<Zone | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const handleSaveEdit = (updated: Zone) => {
    setZones((prev) => prev.map((z) => (z.id === updated.id ? updated : z)));
    setEditingZone(null);
  };

  const handleCreateZone = (zone: Zone) => {
    setZones((prev) => [...prev, zone]);
    setShowNewModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Header */}
      <header className="bg-[#1E2A5E] text-white px-8 py-6 shadow-md flex items-center justify-between">
        <div>
          <h1 className="text-3xl" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
            Metaindústria Safety
          </h1>
          <p className="text-sm mt-1 opacity-90">Gerenciamento de Zonas</p>
        </div>
        <MapPin className="w-8 h-8 opacity-70" strokeWidth={2} />
      </header>

      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Barra de ações */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl text-[#1E2A5E]"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
          >
            Zonas Cadastradas
          </h2>
          <button
            onClick={() => setShowNewModal(true)}
            className="bg-[#27AE60] hover:bg-[#229954] text-white rounded-lg shadow-md font-semibold transition-all hover:shadow-lg flex items-center gap-2 px-5"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif' }}
          >
            <PlusCircle className="w-5 h-5" strokeWidth={2.5} />
            Nova Zona
          </button>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {zones.map((zone) => {
            const risk = RISK_CONFIG[zone.risk];
            return (
              <div
                key={zone.id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow"
                style={{ borderLeftColor: risk.bg }}
              >
                {/* Cabeçalho do card */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3
                      className="text-xl text-[#1E2A5E]"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                    >
                      {zone.name}
                    </h3>
                    <p className="text-sm text-gray-500">{zone.sector}</p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{ backgroundColor: risk.bg, color: risk.text }}
                  >
                    {risk.label}
                  </span>
                </div>

                {/* Lista de EPIs */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    EPIs Obrigatórios
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {zone.epis.map((epi) => (
                      <span
                        key={epi}
                        className="flex items-center gap-1 bg-[#F4F4F4] border border-gray-200 text-gray-700 text-xs rounded-full px-3 py-1"
                      >
                        <Shield className="w-3 h-3 text-[#1E2A5E]" strokeWidth={2.5} />
                        {epi}
                      </span>
                    ))}
                    {zone.epis.length === 0 && (
                      <span className="text-xs text-gray-400 italic">Nenhum EPI cadastrado</span>
                    )}
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingZone(zone)}
                    className="flex-1 bg-[#1E2A5E] hover:bg-[#162044] text-white rounded-lg font-semibold text-sm transition shadow flex items-center justify-center gap-2"
                    style={{ height: '48px', fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Edit2 className="w-4 h-4" strokeWidth={2.5} />
                    Editar
                  </button>
                  <button
                    onClick={() => setViewingZone(zone)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2"
                    style={{ height: '48px', fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <Eye className="w-4 h-4" strokeWidth={2.5} />
                    Visualizar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botão voltar */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-white hover:bg-gray-50 text-[#1E2A5E] border-2 border-[#1E2A5E] rounded-lg font-semibold transition shadow flex items-center gap-2 px-8"
            style={{ height: '48px', fontFamily: 'Montserrat, sans-serif' }}
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
            Voltar ao Dashboard
          </button>
        </div>
      </div>

      {/* Modais */}
      {editingZone && (
        <EditModal zone={editingZone} onClose={() => setEditingZone(null)} onSave={handleSaveEdit} />
      )}
      {viewingZone && (
        <ViewModal zone={viewingZone} onClose={() => setViewingZone(null)} />
      )}
      {showNewModal && (
        <NewZoneModal
          onClose={() => setShowNewModal(false)}
          onSave={handleCreateZone}
          nextId={zones.length + 1}
        />
      )}
    </div>
  );
}
