const Result = ({ visible }) => {
    if (visible === 1) {
        return (
            <div className="resultBox">
                You win!
            </div>
        )
    }

    return null
}

export default Result