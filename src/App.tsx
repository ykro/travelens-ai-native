import { useState, useEffect, useCallback } from 'react';
import { destinations as initialDestinations, type Destination } from './data/destinations';
import './index.css';

type Tab = 'explorar' | 'itinerario' | 'favoritos';

function App() {
  const [tab, setTab] = useState<Tab>('explorar');
  const [search, setSearch] = useState('');
  const [favs, setFavs] = useState<Set<number>>(new Set());
  const [destinations] = useState(initialDestinations);
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.description.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFav = (id: number) => {
    setFavs(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const generateItinerary = () => {
    setAiLoading(true);
    setTimeout(() => setAiLoading(false), 2000);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') setFocusIndex(i => Math.min(i + 1, filtered.length - 1));
    if (e.key === 'ArrowLeft') setFocusIndex(i => Math.max(i - 1, 0));
    if (e.key === 'Enter' && filtered[focusIndex]) setSelectedDest(filtered[focusIndex]);
    if (e.key === 'Escape') setSelectedDest(null);
  }, [filtered, focusIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const favDestinations = destinations.filter(d => favs.has(d.id));

  return (
    <div className="min-h-screen text-white">
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            🌎 TraveLens
          </h1>
          <nav className="flex gap-1" role="tablist">
            {(['explorar', 'itinerario', 'favoritos'] as Tab[]).map(t => (
              <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${tab === t ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-white/10'}`}>
                {t === 'explorar' ? '🔍 Explorar' : t === 'itinerario' ? '📋 Itinerario' : '❤️ Favoritos'}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {tab === 'explorar' && (
          <>
            <div className="mb-6">
              <input type="text" role="searchbox" placeholder="Buscar destinos..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" />
            </div>

            {selectedDest ? (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 animate-fade-in">
                <button onClick={() => setSelectedDest(null)} className="text-gray-400 hover:text-white mb-4 cursor-pointer">← Volver</button>
                <img src={selectedDest.image} alt={selectedDest.name} className="w-full h-64 object-cover rounded-xl mb-4" />
                <h2 className="text-2xl font-bold mb-2">{selectedDest.name}</h2>
                <p className="text-gray-300 mb-4">{selectedDest.description}</p>
                <h3 className="font-semibold text-lg mb-2">Actividades</h3>
                <ul className="space-y-1">{selectedDest.activities.map((a, i) => <li key={i} className="text-gray-300">• {a}</li>)}</ul>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((d, idx) => (
                  <div key={d.id} className={`card bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 overflow-hidden hover:shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer ${idx === focusIndex ? 'ring-2 ring-cyan-400' : ''}`}
                    onClick={() => setSelectedDest(d)}>
                    <img src={d.image} alt={d.name} className="w-full h-44 object-cover" />
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="title font-bold text-lg">{d.name}</h3>
                          <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full">{d.category}</span>
                        </div>
                        <button onClick={e => { e.stopPropagation(); toggleFav(d.id); }}
                          className="text-xl cursor-pointer hover:scale-125 transition">{favs.has(d.id) ? '❤️' : '🤍'}</button>
                      </div>
                      <p className="text-gray-400 text-sm mt-2 line-clamp-2">{d.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'itinerario' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Tu Itinerario</h2>
              <button onClick={generateItinerary}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:opacity-90 transition cursor-pointer flex items-center gap-2">
                {aiLoading ? <span className="spinner animate-spin">⏳</span> : '✨'} Generar itinerario con Inteligencia Artificial
              </button>
            </div>
            {[1, 2, 3].map(day => (
              <div key={day} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-5">
                <h3 className="font-bold text-lg mb-3">Día {day}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-cyan-400">09:00</span>
                    <span>Actividad: {destinations[day - 1]?.name || 'Por definir'} — {destinations[day - 1]?.activities[0] || 'Exploración'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-cyan-400">14:00</span>
                    <span>Actividad: {destinations[day - 1]?.activities[1] || 'Almuerzo y descanso'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-cyan-400">17:00</span>
                    <span>Actividad: {destinations[day - 1]?.activities[2] || 'Tiempo libre'}</span>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-gray-500 text-sm">Plan generado con IA basado en tus destinos favoritos.</p>
          </div>
        )}

        {tab === 'favoritos' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Favoritos ({favDestinations.length})</h2>
            {favDestinations.length === 0 ? (
              <p className="text-gray-400">Aún no tienes favoritos. Marca destinos con ❤️ en Explorar.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favDestinations.map(d => (
                  <div key={d.id} className="card bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 overflow-hidden">
                    <img src={d.image} alt={d.name} className="w-full h-44 object-cover" />
                    <div className="p-4">
                      <h3 className="name font-bold text-lg">{d.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{d.description}</p>
                      <button onClick={() => toggleFav(d.id)} className="mt-2 text-sm text-red-400 cursor-pointer hover:text-red-300">Quitar de favoritos</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
