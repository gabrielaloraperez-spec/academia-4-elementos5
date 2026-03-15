import React from 'react';

interface ElementImbalanceEventProps {
  kingdomName: string;
  onRestore: () => void;
}

export const ElementImbalanceEvent: React.FC<ElementImbalanceEventProps> = ({ kingdomName, onRestore }) => {
  return (
    <div className="max-w-3xl w-full bg-slate-950/70 border border-amber-300/40 rounded-3xl shadow-2xl p-8 text-center text-white">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-amber-200 mb-4">Desequilibrio de los Elementos</h1>
      <p className="text-amber-100 text-lg leading-relaxed whitespace-pre-line">
        {`Desequilibrio detectado en ${kingdomName}.\nLas fuerzas matemáticas han perdido estabilidad.\nDebes resolver los problemas para restaurar el equilibrio del elemento.`}
      </p>
      <button
        type="button"
        onClick={onRestore}
        className="mt-8 px-8 py-3 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
      >
        Restaurar equilibrio
      </button>
    </div>
  );
};
