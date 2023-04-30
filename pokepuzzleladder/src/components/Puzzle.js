import { useState, useEffect } from 'react'
import puzzleService from '../services/puzzleService'
import HeadRow from "./HeadRow"
import Row from "./Row"

const Puzzle = ({ puzzle }) => {
    const ncol = puzzle.head.length
    const keys = [...Array(puzzle.nrow).keys()]
    const [rows, setRows] = useState([])
    
    useEffect(() => {
        let initialState = [puzzle.start.split('')]
        for (let i = 0; i < puzzle.nrow - 2; ++i) {
            initialState.push([...Array(ncol).fill('_')])
        }
        initialState.push(puzzle.end.split(''))
        setRows(initialState)
    }, [ncol, puzzle.nrow, puzzle.start, puzzle.end])

    const setCell = (row, col, nc) => {
        const initialRow = rows[row]
        const newRow = initialRow.map((c, i) => i === col ? nc : c)
        const newRows = rows.map((r, i) => i === row ? newRow : r)
        setRows(newRows)
    }

    const checkLadder = async (event) => {
        event.preventDefault()
        const ladderRows = rows.map(r => r.join(''))
        const ladderObj = {
            head: puzzle.head,
            ncol: ncol,
            nrow: puzzle.nrow,
            ladder: ladderRows
        }
        const res = await puzzleService.checkAnswer(ladderObj)
        console.log(res)
    }

    return (
        <div className="puzzle">
            <div className="grid">
                <HeadRow head={puzzle.head}/>
                <form onSubmit={checkLadder}>
                    <Row key={0} defaultText={puzzle.start} ncol={ncol} num={0}/>
                    {keys.slice(1, -1).map(key => <Row key={key} ncol={ncol} num={key} setCell={setCell}/>)}
                    <Row key={puzzle.nrow-1} defaultText={puzzle.end} ncol={ncol} num={puzzle.nrow-1}/>
                    <button id="submit-button" type="submit">Check!</button>
                </form>
            </div>
        </div>
    )
}

export default Puzzle