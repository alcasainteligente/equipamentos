import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, DEVICES, IDEAS } from './data';
import { DeviceCounter } from './components/DeviceCounter';
import { Check, ChevronRight, Send, ShoppingCart, Home, Settings, Info, Mail, MessageCircle } from 'lucide-react';

type Quantities = Record<string, number>;

export default function App() {
  const [quantities, setQuantities] = useState<Quantities>({});
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [view, setView] = useState<'configurator' | 'summary'>('configurator');
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', notes: '' });
  const [switchBrand, setSwitchBrand] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems = (Object.values(quantities) as number[]).reduce((a, b) => a + b, 0);

  const handleEmailSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    window.location.href = generateMailtoLink();
    setSubmitted(true);
  };

  const handleWhatsappSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    window.open(generateWhatsappLink(), '_blank');
    setSubmitted(true);
  };

  const generateMailtoLink = () => {
    const itemsList = Object.entries(quantities)
      .map(([id, count]) => {
        const device = DEVICES.find(d => d.id === id);
        return `- ${count}x ${device?.name}`;
      })
      .join('\n');

    const body = `Olá,\n\nA título de exemplo e para agilizar o contacto, envio lista de equipamentos:\n\n${itemsList}\n\nMarca/Série dos interruptores: ${switchBrand}`;

    return `mailto:al.casa.inteligente@proton.me?subject=${encodeURIComponent('Validação de Equipamentos')}&body=${encodeURIComponent(body)}`;
  };

  const generateWhatsappLink = () => {
    const itemsList = Object.entries(quantities)
      .map(([id, count]) => {
        const device = DEVICES.find(d => d.id === id);
        return `- ${count}x ${device?.name}`;
      })
      .join('\n');

    const text = `Olá,\n\nA título de exemplo e para agilizar o contacto, envio lista de equipamentos:\n\n${itemsList}\n\nMarca/Série dos interruptores: ${switchBrand}`;

    return `https://wa.me/351917807428?text=${encodeURIComponent(text)}`;
  };

  const getCategoryCount = (catId: string) => {
    return Object.entries(quantities)
      .filter(([k]) => DEVICES.find(d => d.id === k)?.category === catId)
      .reduce((acc, [, count]) => acc + (count as number), 0);
  };

  return (
    <div className="min-h-screen bg-[#030712] font-sans text-white relative overflow-x-hidden flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0"></div>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]"></div>
        {/* Outer Blue Ring - Clockwise */}
        <div className="absolute w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full border border-cyan-500/5 border-t-cyan-500/30 animate-[spin_60s_linear_infinite]"></div>
        {/* Inner Orange Ring - Counter-clockwise */}
        <div className="absolute w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full border border-orange-500/5 border-b-orange-500/30 animate-[spin_45s_linear_infinite_reverse]"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('configurator')}>
            {/* Logo */}
            <div className="relative w-10 h-10 flex items-center justify-center rounded-full">
              <div className="absolute inset-0 rounded-full border border-cyan-500/30 border-t-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)] animate-[spin_10s_linear_infinite]"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,1)]"></div>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              AL <span className="text-cyan-400 font-normal">Casa Inteligente</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end leading-tight">
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase">Casa Inteligente</span>
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-cyan-400 uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">Sem Obras</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 flex-1 w-full">
        <AnimatePresence mode="wait">

          {/* CONFIGURATOR VIEW */}
          {view === 'configurator' && (
            <motion.div
              key="configurator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col md:flex-row gap-12 py-8"
            >
              {/* Sidebar Navigation */}
              <nav className="md:w-72 shrink-0 pt-[120px]">
                <div className="sticky top-32 space-y-2">
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-4 border-b border-white/10 pb-2">Categorias do Sistema</h2>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded border transition-all group ${activeCategory === cat.id
                          ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                          : 'bg-white/5 border-transparent hover:border-white/10 text-gray-400 hover:text-white'
                        }`}
                    >
                      <cat.icon size={20} className={activeCategory === cat.id ? 'text-cyan-400' : 'text-gray-500 group-hover:text-white'} />
                      <span className="font-medium tracking-wide text-sm">{cat.label}</span>
                      {/* Count badge per category */}
                      {getCategoryCount(cat.id) > 0 && (
                        <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${activeCategory === cat.id ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white'}`}>
                          {getCategoryCount(cat.id)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Main Content */}
              <div className="flex-1 space-y-8">
                <div className="flex items-end justify-between border-b border-white/10 pb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {CATEGORIES.find(c => c.id === activeCategory)?.label}
                    </h2>
                    <p className="text-gray-400 text-sm">Selecione os equipamentos para a sua instalação.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {activeCategory === 'lighting' ? (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-white/10 pb-2 mb-4">
                          Substituir Interruptores
                        </h3>
                        <div className="grid gap-4">
                          {DEVICES.filter(d => d.category === 'lighting' && d.subCategory === 'replace').map(device => (
                            <DeviceCounter
                              key={device.id}
                              device={device}
                              count={(quantities[device.id] as number) || 0}
                              onIncrement={() => updateQuantity(device.id, 1)}
                              onDecrement={() => updateQuantity(device.id, -1)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-white/10 pb-2 mb-4">
                          Manter Interruptores Existentes
                        </h3>
                        <div className="grid gap-4">
                          {DEVICES.filter(d => d.category === 'lighting' && d.subCategory === 'module').map(device => (
                            <DeviceCounter
                              key={device.id}
                              device={device}
                              count={(quantities[device.id] as number) || 0}
                              onIncrement={() => updateQuantity(device.id, 1)}
                              onDecrement={() => updateQuantity(device.id, -1)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {DEVICES.filter(d => d.category === activeCategory).map(device => (
                        <DeviceCounter
                          key={device.id}
                          device={device}
                          count={(quantities[device.id] as number) || 0}
                          onIncrement={() => updateQuantity(device.id, 1)}
                          onDecrement={() => updateQuantity(device.id, -1)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-8 flex justify-end">
                  <button
                    onClick={() => setView('summary')}
                    className="bg-white text-black px-8 py-4 rounded font-bold tracking-widest uppercase text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    Ver Resumo ({totalItems} itens) <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SUMMARY VIEW */}
          {view === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto py-8"
            >
              {!submitted ? (
                <>
                  <button
                    onClick={() => setView('configurator')}
                    className="text-gray-400 hover:text-white flex items-center gap-2 mb-8 text-xs font-bold tracking-widest uppercase"
                  >
                    ← Voltar à seleção
                  </button>

                  <h2 className="text-4xl font-bold mb-2 text-white">Resumo do Pedido</h2>
                  <p className="text-gray-400 mb-8">Confirme os equipamentos e solicite o seu orçamento.</p>

                  <div className="mb-12">
                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                      Marca/Série dos seus interruptores
                    </label>
                    <input
                      type="text"
                      value={switchBrand}
                      onChange={(e) => setSwitchBrand(e.target.value)}
                      placeholder="Ex: Efapel Logus 90, Legrand Valena..."
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>

                  {totalItems === 0 ? (
                    <div className="text-center py-16 bg-white/5 rounded border border-dashed border-white/10">
                      <ShoppingCart className="mx-auto text-gray-600 mb-6" size={48} />
                      <p className="text-gray-400 mb-6">Ainda não selecionou nenhum equipamento.</p>
                      <button
                        onClick={() => setView('configurator')}
                        className="text-cyan-400 font-bold text-sm tracking-widest uppercase hover:text-cyan-300 border-b border-cyan-400/30 pb-1"
                      >
                        Começar a adicionar
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="space-y-4">
                        {CATEGORIES.map(category => {
                          const categoryDevices = DEVICES.filter(d => d.category === category.id);
                          const selectedDevices = categoryDevices.filter(d => quantities[d.id] > 0);

                          if (selectedDevices.length === 0) return null;

                          return (
                            <div key={category.id} className="bg-white/5 rounded border border-white/10 overflow-hidden flex flex-col md:flex-row">
                              <div className="bg-white/5 px-6 py-4 md:w-56 border-b md:border-b-0 md:border-r border-white/10 flex md:flex-col items-center md:justify-center gap-3 md:text-center shrink-0">
                                <div className="text-cyan-400 p-2 bg-cyan-500/10 rounded-lg">
                                  <category.icon size={24} />
                                </div>
                                <h3 className="font-bold text-xs uppercase tracking-widest text-white">
                                  {category.label}
                                </h3>
                              </div>
                              <div className="p-4 flex-1 flex flex-wrap gap-3 items-center content-center">
                                {selectedDevices.map(device => (
                                  <div key={device.id} className="flex items-center gap-3 bg-black/20 border border-white/5 rounded-lg px-4 py-2 hover:border-white/20 transition-colors">
                                    <span className="font-medium text-gray-300 text-sm">{device.name}</span>
                                    <span className="font-bold text-cyan-400 text-xs bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                                      x{quantities[device.id]}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex flex-col md:flex-row items-center justify-end gap-6 pt-4">
                        <div className="bg-white/5 px-8 py-4 flex flex-col justify-center items-center border border-white/10 rounded text-center min-w-[200px]">
                          <span className="text-gray-400 font-medium text-xs uppercase tracking-wider mb-1">Equipamentos</span>
                          <span className="text-3xl font-bold text-white">{totalItems}</span>
                        </div>

                        <div className="flex flex-col gap-3 w-full md:w-auto">
                          <button
                            onClick={handleEmailSubmit}
                            disabled={isSubmitting}
                            className="bg-orange-500 text-white px-8 py-3 rounded font-bold text-sm tracking-widest uppercase hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(249,115,22,0.2)] w-full"
                          >
                            <Mail size={18} />
                            Enviar Email
                          </button>
                          <button
                            onClick={handleWhatsappSubmit}
                            disabled={isSubmitting}
                            className="bg-[#25D366] text-white px-8 py-3 rounded font-bold text-sm tracking-widest uppercase hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,211,102,0.2)] w-full"
                          >
                            <MessageCircle size={18} />
                            Enviar WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-24 px-4"
                >
                  <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                    <Check size={48} strokeWidth={2} />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Configuração Validada</h2>
                  <p className="text-gray-400 max-w-md mx-auto mb-12 leading-relaxed">
                    A sua configuração foi registada com sucesso.
                  </p>

                  <div className="flex flex-col gap-4 max-w-xs mx-auto">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setQuantities({});
                        setView('configurator');
                        setContactInfo({ name: '', email: '', phone: '', notes: '' });
                      }}
                      className="bg-white text-black px-8 py-4 rounded font-bold text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors"
                    >
                      Nova Configuração
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-50 border-t border-white/5 bg-[#030712]/80 backdrop-blur-md py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
            <span className="font-bold text-lg tracking-tight text-white">
              AL <span className="font-normal">Casa Inteligente</span>
            </span>
          </div>

          <div className="text-center md:text-right text-xs text-white space-y-1">
            <p>© 2026 AL Casa Inteligente. Todos os direitos reservados.</p>
            <p>Montijo • Margem Sul • Lisboa</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
