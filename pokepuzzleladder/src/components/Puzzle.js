import { useState, useEffect } from 'react'
import puzzleService from '../services/puzzleService'
import HeadRow from "./HeadRow"
import Row from "./Row"
import IncorrectMessage from './IncorrectMessage'
import PlayAgain from './PlayAgain'
import Result from './Result'

const Puzzle = ({ puzzle, daily, playAgain }) => {
    const [rows, setRows] = useState([])
    const [correctness, setCorrectness] = useState(0)

    const ncol = puzzle.head.length
    const keys = [...Array(puzzle.nrow).keys()]

    useEffect(() => {
        const currentDate = new Date()
        const streakDate = localStorage.getItem(`daily-${puzzle.nrow}-lastPlay`)
        if (daily && streakDate !== null && streakDate === currentDate.setHours(0, 0, 0, 0).toLocaleString()) {
            const ladderObj = JSON.parse(localStorage.getItem(`daily-${puzzle.nrow}-ladder`))
            let initialState = [puzzle.start.split('')]
            for (let i = 1; i < puzzle.nrow - 1; ++i) {
                initialState.push(ladderObj.ladder[i].split(''))
            }
            initialState.push(puzzle.end.split(''))
            setRows(initialState)
            setCorrectness(1)
        } else {
            let initialState = [puzzle.start.split('')]
            for (let i = 1; i < puzzle.nrow - 1; ++i) {
                initialState.push([...Array(ncol).fill('_')])
            }
            initialState.push(puzzle.end.split(''))
            setRows(initialState)
            Array.from(document.querySelectorAll('input')).forEach(
                input => (input.value = '')
            )
            setCorrectness(0)
        }
    }, [ncol, puzzle, daily])

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
            if (daily) {
                if (localStorage.getItem(`daily-${puzzle.nrow}-count`) === null) {
                    localStorage.setItem(`daily-${puzzle.nrow}-count`, 1)
                    localStorage.setItem(`daily-${puzzle.nrow}-streak`, 1)
                    localStorage.setItem(`daily-${puzzle.nrow}-lastPlay`, new Date().setHours(0, 0, 0, 0).toLocaleString())
                } else {
                    localStorage.setItem(`daily-${puzzle.nrow}-count`, parseInt(localStorage.getItem(`daily-${puzzle.nrow}-count`)) + 1)
                    const currentDate = new Date().setHours(0, 0, 0, 0).toLocaleString()
                    const streakDate = localStorage.getItem(`daily-${puzzle.nrow}-lastPlay`)
                    if (currentDate - streakDate === 86400000) {
                        localStorage.setItem(`daily-${puzzle.nrow}-streak`, parseInt(localStorage.getItem(`daily-${puzzle.nrow}-streak`)) + 1)
                        localStorage.setItem(`daily-${puzzle.nrow}-lastPlay`, currentDate)
                    } else {
                        localStorage.setItem(`daily-${puzzle.nrow}-streak`, 1)
                        localStorage.setItem(`daily-${puzzle.nrow}-lastPlay`, currentDate)
                    }
                }
                localStorage.setItem(`daily-${puzzle.nrow}-ladder`, JSON.stringify(ladderObj))
            }
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
                    <PlayAgain visible={!daily} playAgain={playAgain} />
                    <Result visible={correctness} daily={daily} nrow={puzzle.nrow}/>
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