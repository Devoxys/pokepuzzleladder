import { useState, useEffect } from 'react'
import puzzleService from './services/puzzleService'
import Puzzle from './components/Puzzle'

const App = () => {
  const [puzzlet, setPuzzlet] = useState(null)

  useEffect(() => {
    console.log("test")
    
    puzzleService.getPuzzle(3).then(puzzleObj =>
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
    <h1>Pokemon Puzzle Ladder!</h1>
    <Puzzle puzzle={puzzlet} />
    <h2>Rules:</h2>
    <ul id="rules">
      <li><p>The goal is to complete the ladder of Pokémon names.</p></li>
      <li><p>Each Pokémon name shares a "link" of 3 characters with the names above and/or below it. Each name is aligned in the columns by the link(s).</p></li>
      <li><p>The numbers in above each column specify the number of characters in that column.</p></li>
      <li><p>Unused boxes should be left blank.</p></li>
      <li><p>Use Pokédex names. Forms and regional variants are not included.</p></li>
      <li><p>Only alphanumerical characters are used. Spaces, hyphens, and dots are removed (i.e. mrmime, wochien)</p></li>
      <li><p>Both Nidoran-M and Nidoran-F are "nidoran".</p></li>
      <li><p>Flabébé is "flabebe".</p></li>
    </ul>
   </div>
  );
}

export default App
