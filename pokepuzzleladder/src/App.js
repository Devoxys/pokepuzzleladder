import { useState, useEffect } from 'react'
import puzzleService from './services/puzzleService'
import Puzzle from './components/Puzzle'

const App = () => {
  const [nrows, setNRows] = useState(4)
  const [puzzlet, setPuzzlet] = useState(null)

  const selectOptions = [3, 4, 5, 6, 7, 8, 9, 10]
  const selectNRows = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const newNRows = parseInt(formData.get('nrows'))
    setNRows(newNRows)
  }

  useEffect(() => {
    puzzleService.getPuzzle(nrows).then(puzzleObj =>
      setPuzzlet(puzzleObj)
    )
  }, [nrows])

  if (puzzlet === null) {
    return <div>Loading...</div>
  }

  return (
   <div className="App">
    <h1>Pokemon Puzzle Ladder!</h1>
    <div className="selector" onSubmit={selectNRows}>
      <form id='nrowsForm'>
        Number of rows <select name="nrows" defaultValue={4}>
            {selectOptions.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
          <button id="nrowsButton" type="submit">Go!</button>
      </form>
    </div>
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
