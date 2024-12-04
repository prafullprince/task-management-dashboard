import React, { memo } from 'react'

function CircularProgress({percentage}) {

    // restricted range of percentage
    const restrictedPercentRange = Math.min(Math.max(percentage,0),100)

  return (
    <div className="relative w-24 h-24 mt-8">
      {/* Circular Progress */}
      <div
        className="w-full h-full rounded-full bg-gray-300"
        style={{
          background: `conic-gradient(
            green ${restrictedPercentRange * 3.6}deg, 
            #404040 ${restrictedPercentRange * 3.6}deg
          )`,
        }}
      ></div>

      {/* Center Percentage */}
      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-yellow-50">
        {restrictedPercentRange}%
      </div>
    </div>
  )
}

export default memo(CircularProgress)
