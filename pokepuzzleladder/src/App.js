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

  if (puzzlet === null) {
    return <div>Loading...</div>
  }

  return (
    /*
    <div className="App">
      <HeadRow head={puzzlet.head} />
      <div className="grid">
          <Row key={0} defaultText={puzzlet.start} ncol={ncol}/>
          {keys.slice(1, -1).map(key => <Row key={key} ncol={ncol} />)}
          <Row key={puzzlet.nrow-1} defaultText={puzzlet.end} ncol={ncol}/>
      </div>
    </div>
    */
   <div className="App">
    <Puzzle puzzle={puzzlet} />
   </div>
  );
}

export default App
