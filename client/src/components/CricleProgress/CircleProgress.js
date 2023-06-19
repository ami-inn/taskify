import React from 'react'

function CircleProgress() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="circle-progress">
    <circle className="circle-progress-circle" cx="50" cy="50" r="47" fill="none" stroke="#ddd" strokeWidth="8"></circle>
    <path d="M 50 3 A 47 47 0 0 1 97 50" className="circle-progress-value" fill="none" stroke="#00E699" strokeWidth="8"></path>
    <text className="circle-progress-text" x="50" y="50" font="16px Arial, sans-serif" textAnchor="middle" fill="#999" dy="0.4em">25%</text>
  </svg>
  )
}

export default CircleProgress


