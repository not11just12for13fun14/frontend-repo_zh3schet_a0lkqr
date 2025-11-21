import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-16 py-8 text-center text-slate-400">
      <p className="text-sm">© {new Date().getFullYear()} Sharp & Fresh Barbers · All rights reserved</p>
    </footer>
  )
}
