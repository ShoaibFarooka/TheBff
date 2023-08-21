import React from 'react'

const loading = () => {
  return (
    <div className="min-h-[70vh] center flex-col mt-24 text-white">
        <h2 className="text-3xl center gap-4">
            <span> Processing </span>
            <span className="border-t-transparent border-solid animate-spin rounded-full border-white border-2 h-8 w-8"></span>
        </h2>
    </div>
  )
}

export default loading