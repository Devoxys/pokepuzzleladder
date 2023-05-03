const PlayAgain = ({ visible, playAgain }) => {
    if (visible === false) {
        return null
    }
    return <button className='puzzleButton' onClick={() => playAgain()}>Play Again!</button>
}

export default PlayAgain