import React, { useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function BookingForm() {
  const [services, setServices] = useState([])
  const [barbers, setBarbers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [selectedService, setSelectedService] = useState(null)
  const [selectedBarber, setSelectedBarber] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const [svcRes, barbRes] = await Promise.all([
          fetch(`${API_BASE}/api/services`).then(r => r.json()),
          fetch(`${API_BASE}/api/barbers`).then(r => r.json()),
        ])
        setServices(svcRes)
        setBarbers(barbRes)
      } catch (e) {
        setError('Failed to load data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const availableTimes = useMemo(() => {
    // 10:00 to 18:00 every 30 minutes
    const times = []
    for (let h = 10; h <= 17; h++) {
      for (let m of [0, 30]) {
        const hh = String(h).padStart(2, '0')
        const mm = String(m).padStart(2, '0')
        times.push(`${hh}:${mm}`)
      }
    }
    return times
  }, [])

  async function submit(e) {
    e.preventDefault()
    setError('')
    setSuccess(null)

    if (!selectedService || !selectedBarber || !date || !time || !name || !phone) {
      setError('Please complete all required fields.')
      return
    }
    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: name,
          customer_phone: phone,
          customer_email: email || undefined,
          service_id: selectedService.id,
          barber_id: selectedBarber.id,
          date,
          time,
        })
      })
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}))
        throw new Error(msg.detail || 'Booking failed')
      }
      const data = await res.json()
      setSuccess(data)
      // reset minimal
      setTime('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="relative max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Choose a service</h2>
          {loading ? (
            <p className="text-slate-300">Loading...</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map(s => (
                <div key={s.id}>
                  <button onClick={() => setSelectedService(s)} className={`w-full rounded-xl border p-4 bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 transition ${selectedService?.id===s.id ? 'ring-2 ring-blue-500' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold">{s.name}</p>
                        <p className="text-slate-300/80 text-sm">~{s.duration_minutes} min</p>
                      </div>
                      <p className="text-white font-bold">${s.price.toFixed(2)}</p>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}

          <h2 className="text-2xl font-bold text-white pt-4">Pick a barber</h2>
          {loading ? (
            <p className="text-slate-300">Loading...</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {barbers.map(b => (
                <div key={b.id}>
                  <button onClick={() => setSelectedBarber(b)} className={`w-full rounded-xl border p-4 bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 transition ${selectedBarber?.id===b.id ? 'ring-2 ring-emerald-500' : ''}`}>
                    <p className="text-white font-semibold">{b.name}</p>
                    {b.specialties?.length>0 && (
                      <p className="text-slate-300/80 text-sm mt-1">Specialties: {b.specialties.join(', ')}</p>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-xl mb-4">Book your appointment</h3>
          {error && <p className="text-red-400 mb-3">{error}</p>}
          {success && (
            <div className="mb-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-emerald-200">
              Booked for {success.date} at {success.time} with {barbers.find(b=>b.id===success.barber_id)?.name || 'selected barber'}.
            </div>
          )}
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-1">Date</label>
                <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" required />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-1">Time</label>
                <select value={time} onChange={e=>setTime(e.target.value)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" required>
                  <option value="">Select time</option>
                  {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm mb-1">Full name</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-1">Phone</label>
                <input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" placeholder="(555) 555-5555" required />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-1">Email (optional)</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white" placeholder="you@example.com" />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg py-3 transition">Book appointment</button>
          </form>
        </div>
      </div>
    </section>
  )
}
