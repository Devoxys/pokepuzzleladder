import { useState, useEffect } from 'react'
import puzzleService from '../services/puzzleService'
import HeadRow from "./HeadRow"
import Row from "./Row"
import IncorrectMessage from './IncorrectMessage'
import Result from './Result'

const Puzzle = ({ puzzle }) => {
    const [rows, setRows] = useState([])
    const [correctness, setCorrectness] = useState(0)

    const ncol = puzzle.head.length
    const keys = [...Array(puzzle.nrow).keys()]
    
    useEffect(() => {
        let initialState = [puzzle.start.split('')]
        for (let i = 0; i < puzzle.nrow - 2; ++i) {
            initialState.push([...Array(ncol).fill('_')])
        }
        initialState.push(puzzle.end.split(''))
        setRows(initialState)
        setCorrectness(0)
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
        if (res.correct) {
            setCorrectness(1)
            console.log('Correct')
        } else {
            setCorrectness(-1)
            console.log('Incorrect')
        }
    }

    if (correctness === 1) {
        return (
            <div className="puzzle">
                <div className="grid">
                    <HeadRow head={puzzle.head}/>
                    <Row key={0} defaultText={puzzle.start} ncol={ncol} num={0}/>
                    {keys.slice(1, -1).map(key => <Row key={key} ncol={ncol} num={key} defaultText={rows[key].join('')}/>)}
                    <Row key={puzzle.nrow-1} defaultText={puzzle.end} ncol={ncol} num={puzzle.nrow-1}/>
                    <Result visible={correctness}/>
                </div>
            </div>
        )
    }

    return (
        <div className="puzzle">
            <div className="grid">
                <HeadRow head={puzzle.head}/>
                <form onSubmit={checkLadder}>
                    <Row key={0} defaultText={puzzle.start} ncol={ncol} num={0}/>
                    {keys.slice(1, -1).map(key => <Row key={key} ncol={ncol} num={key} setCell={setCell}/>)}
                    <Row key={puzzle.nrow-1} defaultText={puzzle.end} ncol={ncol} num={puzzle.nrow-1}/>
                    <button className="puzzleButton" type="submit">Check!</button>
                </form>
                <IncorrectMessage visible={correctness}/>
            </div>
        </div>
    )
}

export default Puzzle