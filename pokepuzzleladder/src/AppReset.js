import { useState, useEffect } from 'react'

const App = () => {

  useEffect(() => {
    console.log("test")
    
  }, [])

  return (
    <div className="App">
      test
    </div>
  )
}

export default App