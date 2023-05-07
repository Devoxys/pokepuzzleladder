import { useState, useEffect } from 'react'
import puzzleService from './services/puzzleService'
import Puzzle from './components/Puzzle'
import Rules from './components/Rules'

const App = () => {
  const [nrows, setNRows] = useState(4)
  const [daily, setDaily] = useState(false)
  const [puzzlet, setPuzzlet] = useState(null)
  const [modeText, setModeText] = useState('Freeplay 4')

  useEffect(() => {
    document.title = 'Pokémon Puzzle Ladder'
  }, [])

  useEffect(() => {
    if (daily) {
      puzzleService.getDaily(nrows).then(puzzleObj =>
        setPuzzlet(puzzleObj)
      )
      setModeText(`Daily ${nrows}`)
    } else {
      puzzleService.getPuzzle(nrows).then(puzzleObj =>
        setPuzzlet(puzzleObj)
      )
      setModeText(`Freeplay ${nrows}`)
    }
  }, [nrows, daily])

  const selectOptions = [3, 4, 5, 6, 7, 8, 9, 10]
  const selectNRows = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const newNRows = parseInt(formData.get('nrows'))
    setNRows(newNRows)
  }

  const playAgain = () => {
    puzzleService.getPuzzle(nrows).then(puzzleObj =>
      setPuzzlet(puzzleObj)
    )
  }

  const togglePlay = () => {
    const newNRows = parseInt(document.getElementById('nrows').value)
    console.log(newNRows)
    setNRows(newNRows)
    setDaily(!daily)
  }

  if (puzzlet === null) {
    return <div>Loading...</div>
  }

  console.log('Shoutouts to rabidragon!')

  return (
   <div className="App">
    <h1>Pokemon Puzzle Ladder!</h1>
    <div className="optionsBand">
      <div className='leftSpace'>{modeText}</div>
      <div className="selector" onSubmit={selectNRows}>
        <form id='nrowsForm'>
            Number of rows <select id="nrows" name="nrows" defaultValue={4}>
                {selectOptions.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
            <button id="nrowsButton" type="submit">Go!</button>
        </form>
      </div>
      <div className='dailySwitch'>
        <button id='dailyButton' disabled={daily} onClick={() => togglePlay()}>Daily</button>
        <button id='freeplayButton' disabled={!daily} onClick={() => togglePlay()}>Freeplay</button>
      </div>
    </div>
    <Puzzle puzzle={puzzlet} daily={daily} playAgain={playAgain}/>
    <Rules />
   </div>
  );
}

export default App
