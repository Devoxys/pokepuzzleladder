import { useState, useEffect } from 'react'
import puzzleService from './services/puzzleService'
import Puzzle from './components/Puzzle'

const App = () => {
  const [puzzlet, setPuzzlet] = useState(null)

  useEffect(() => {
    console.log("test")
    
    puzzleService.getPuzzle().then(puzzleObj =>
      setPuzzlet(puzzleObj)
    )
  }, [])

  return (
    <div className="App">
      <Puzzle puzzle={puzzlet} />
    </div>
  )
}

export default App