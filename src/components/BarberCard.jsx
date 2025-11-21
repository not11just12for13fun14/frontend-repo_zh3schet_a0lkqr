import React from 'react'

export default function BarberCard({ barber, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(barber)}
      className={`group w-full text-left rounded-xl border transition-all p-4 bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 hover:border-emerald-500/60 ${selected ? 'ring-2 ring-emerald-500' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold text-lg">{barber.name}</h3>
          {barber.bio && (
            <p className="text-slate-300/80 text-sm mt-1">{barber.bio}</p>
          )}
          {barber.specialties?.length > 0 && (
            <p className="text-slate-400 text-xs mt-2">Specialties: {barber.specialties.join(', ')}</p>
          )}
        </div>
      </div>
    </button>
  )
}
