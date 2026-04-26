import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Settings, 
  Activity, 
  Gauge, 
  Droplet, 
  Ruler, 
  Weight, 
  Info,
  Car,
  ChevronRight,
  TrendingUp,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VEHICLES_MOCK } from './data';
import { VehicleData } from './types';

const StatCard = ({ label, value, unit, delay = 0 }: { label: string, value: string | number, unit?: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="bg-brand-card border border-brand-border p-5 relative overflow-hidden"
  >
    <div className="absolute left-0 top-0 h-full w-[3px] bg-brand-red" />
    <div className="text-[10px] uppercase tracking-wider text-brand-text-dim mb-1 font-sans">{label}</div>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-bold font-mono text-white">{value}</span>
      {unit && <span className="text-sm font-mono text-zinc-500">{unit}</span>}
    </div>
  </motion.div>
);

const SpecTable = ({ title, subtitle, items, delay = 0 }: { title: string, subtitle: string, items: { key: string, val: string | number }[], delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="border border-brand-border bg-brand-card flex flex-col"
  >
    <div className="px-4 py-3 border-bottom border-brand-border flex justify-between items-center bg-zinc-900/50">
      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-dim">{title}</span>
      <span className="text-[10px] font-mono text-zinc-600 uppercase">{subtitle}</span>
    </div>
    <div className="p-1">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between px-3 py-2 border-b border-white/5 last:border-none text-sm">
          <span className="text-brand-text-dim">{item.key}</span>
          <span className="font-mono text-white">{item.val}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      const found = VEHICLES_MOCK.find(v => 
        v.plate.toLowerCase() === search.trim().toLowerCase() || 
        v.model.toLowerCase().includes(search.toLowerCase())
      );
      setSelectedVehicle(found || null);
      setIsSearching(false);
    }, 800);
  };

  useEffect(() => {
    setSelectedVehicle(VEHICLES_MOCK[0]);
    setSearch('QJP7G53');
  }, []);

  return (
    <div className="flex h-screen w-screen bg-brand-bg text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[320px] shrink-0 border-r border-brand-border flex flex-col p-8 bg-gradient-to-b from-brand-card to-brand-bg">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.2em] text-brand-text-dim mb-2 font-bold">Vehicle Analysis</p>
          <h1 className="text-4xl font-extrabold leading-none tracking-tighter mb-2 italic">
            GOL<br />1.0 MPI
          </h1>
          <span className="inline-block bg-brand-red text-white text-[11px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
            Last Edition Spec
          </span>
        </div>

        <div className="mb-auto">
          <p className="text-[10px] uppercase font-bold text-brand-text-dim mb-2">Market Context</p>
          <p className="text-sm text-brand-text-dim leading-relaxed mb-8">
            Brazilian-market specific performance data based on G8 iteration (2018-2022). Technical validation confirmed for EA211 engine architecture.
          </p>

          <form onSubmit={handleSearch} className="relative mb-4 group">
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value.toUpperCase())}
              placeholder="Digite a placa..."
              className="w-full bg-zinc-900 border border-brand-border rounded-lg py-3 px-10 text-sm font-mono focus:outline-none focus:border-brand-red transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-red transition-colors" size={16} />
            {isSearching && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />}
          </form>
        </div>

        {selectedVehicle && (
          <div className="bg-zinc-100 border-[3px] border-zinc-300 rounded-lg p-5 text-black text-center shadow-xl">
            <div className="flex justify-between items-center border-b-[2px] border-zinc-200 pb-1 mb-2">
              <span className="text-[10px] font-black text-blue-800">BRASIL</span>
              <div className="flex gap-0.5">
                {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-zinc-400 rounded-full" />)}
              </div>
            </div>
            <div className="font-mono text-3xl font-bold tracking-[0.1em]">{selectedVehicle.plate.slice(0,3)}<span className="text-zinc-300 mx-1">●</span>{selectedVehicle.plate.slice(3)}</div>
            <div className="text-[9px] font-bold text-zinc-400 mt-1 uppercase tracking-wider">{selectedVehicle.origin}</div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 scrollbar-hide">
        <AnimatePresence mode="wait">
          {selectedVehicle ? (
            <motion.div 
              key={selectedVehicle.plate}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-8 h-full"
            >
              <div className="grid grid-cols-4 gap-4">
                <StatCard label="Power (Ethanol)" value={selectedVehicle.specs.powerEthanol} unit="HP" delay={0.1} />
                <StatCard label="Max Torque" value={selectedVehicle.specs.torqueEthanol} unit="KGFM" delay={0.2} />
                <StatCard label="0-100 KM/H" value={selectedVehicle.specs.accelerationEthanol} unit="SEC" delay={0.3} />
                <StatCard label="Top Speed" value={selectedVehicle.specs.topSpeedEthanol} unit="KM/H" delay={0.4} />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <SpecTable 
                  title="Engine & Drivetrain" 
                  subtitle="EA211" 
                  delay={0.5}
                  items={[
                    { key: "Displacement", val: "999 cm³" },
                    { key: "Configuration", val: "3 Cyl / 12V" },
                    { key: "Fuel System", val: "MPI Total Flex" },
                    { key: "Transmission", val: "Manual 5MT" },
                    { key: "Power (Gasoline)", val: `${selectedVehicle.specs.powerGasoline} HP @ 6350 rpm` },
                    { key: "Torque (Gasoline)", val: `${selectedVehicle.specs.torqueGasoline} kgfm @ 3000 rpm` },
                  ]}
                />
                <SpecTable 
                  title="Dimensions & Weight" 
                  subtitle="Chassis" 
                  delay={0.6}
                  items={[
                    { key: "Curb Weight", val: `${selectedVehicle.specs.weight} kg` },
                    { key: "Wheelbase", val: `${selectedVehicle.specs.wheelbase} mm` },
                    { key: "Trunk Volume", val: `${selectedVehicle.specs.trunk} L` },
                    { key: "Fuel Tank", val: `${selectedVehicle.specs.tank} L` },
                    { key: "Overall Length", val: `${selectedVehicle.specs.length} mm` },
                    { key: "Width", val: "1656 mm" },
                  ]}
                />
              </div>

              <div className="h-32 bg-zinc-900 border border-brand-border rounded-lg relative overflow-hidden flex items-center justify-center grow">
                <div className="absolute top-2 left-6 text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Frontend Visualization</div>
                <div className="w-[80%] h-12 bg-black border border-zinc-800 rounded relative overflow-hidden group">
                  <div className="absolute top-1/2 left-0 w-full h-[3px] bg-brand-red -translate-y-1/2" />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    className="absolute top-1/2 left-0 h-[3px] bg-brand-red -translate-y-1/2" 
                  />
                </div>
                <div className="absolute bottom-4 right-8 text-[11px] font-bold italic text-brand-red uppercase tracking-wider animate-pulse">
                  Dynamic Edge Detailing // Estética GTI
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-brand-border flex justify-between items-center">
                <div className="flex gap-8">
                  <div className="flex gap-2 items-baseline text-sm">
                    <span className="text-brand-text-dim">Consumo Urbano:</span>
                    <span className="font-mono text-white underline decoration-brand-red/50">{selectedVehicle.specs.consumptionUrbanoEthanol} km/l (E)</span>
                  </div>
                  <div className="flex gap-2 items-baseline text-sm">
                    <span className="text-brand-text-dim">Consumo Rodoviário:</span>
                    <span className="font-mono text-white underline decoration-zinc-500/50">{selectedVehicle.specs.consumptionRodoviarioGasoline} km/l (G)</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-brand-text-dim uppercase tracking-wider">
                  Data Source: INMETRO PBEV 2022
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full text-zinc-600 uppercase font-bold tracking-[0.3em]"
            >
              No Results Found
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

