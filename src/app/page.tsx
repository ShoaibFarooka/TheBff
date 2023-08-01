import React from 'react'

const Home = () => {
  return (<>
    <main className='h-screen pt-24'>
      <div className="container">
        <div className="bg-gray-700/10 px-8 py-3 rounded max-w-max">
          <h1 className="text-4xl font-bold text-center text-gray-900">
            Welcome to <span className="text-blue-600">BFF</span>!
          </h1>
        </div>
        
        <div className="bg-gray-700/10 px-8 py-3 rounded max-w-max mt-8">
          <h1 className="text-4xl font-bold text-center text-gray-900">
            Shadcn UI <a href="https://ui.shadcn.com/docs" className="text-blue-600 underline" target="_blank">Docs</a>
          </h1>
        </div>
      </div>
    </main>
  </>)
}

export default Home