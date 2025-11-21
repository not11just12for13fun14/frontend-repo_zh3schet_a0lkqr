import React from 'react'

export default function ServiceCard({ service, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(service)}
      className={`group w-full text-left rounded-xl border transition-all p-4 bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 hover:border-blue-500/60 ${selected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold text-lg">{service.name}</h3>
          {service.description && (
            <p className="text-slate-300/80 text-sm mt-1">{service.description}</p>
          )}
          <p className="text-slate-400 text-xs mt-2">~{service.duration_minutes} min</p>
        </div>
        <div className="text-right">
          <p className="text-white font-bold text-lg">${service.price.toFixed(2)}</p>
        </div>
      </div>
    </button>
  )
}
