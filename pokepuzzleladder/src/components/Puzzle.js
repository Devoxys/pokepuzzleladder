import Head from "./Head"
import Row from "./Row"

const Puzzle = ({ puzzle }) => {
    const ncol = puzzle.head.length
    const keys = [...Array(puzzle.nrow).keys()]
    return (
        <div className="puzzle">
            <Head head={puzzle.head}/>
            <div className="grid">
                <Row key={0} defaultText={puzzle.start} ncol={ncol}/>
                {keys.slice(1, -1).map(key => <Row key={key} ncol={ncol} />)}
                <Row key={puzzle.nrow-1} defaultText={puzzle.end} ncol={ncol}/>
            </div>
        </div>
    )
}

export default Puzzle