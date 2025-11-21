import React from 'react'

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.15),transparent_35%)]" />
      <div className="relative max-w-6xl mx-auto px-6 py-12 sm:py-16 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
          Sharp & Fresh Barbers
        </h1>
        <p className="mt-4 text-blue-100 text-lg">
          Book your next cut in seconds. Choose a service, pick your barber, lock a time.
        </p>
      </div>
    </header>
  )
}
