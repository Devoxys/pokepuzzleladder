const IncorrectMessage = ({ visible }) => {
    if (visible === -1) {
        return (
            <div className="incorrectMessage">
                Incorrect. Try again!
            </div>
        )
    }

    return null
}

export default IncorrectMessage