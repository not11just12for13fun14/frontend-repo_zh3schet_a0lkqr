import React from 'react'
import Header from './components/Header'
import BookingForm from './components/BookingForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.06),transparent_40%)] pointer-events-none" />
      <div className="relative">
        <Header />
        <BookingForm />
        <Footer />
      </div>
    </div>
  )
}

export default App
