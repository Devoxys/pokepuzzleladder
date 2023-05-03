const Result = ({ visible, daily, nrow }) => {
    if (visible === 1) {
        if (daily) {
            return (
                <div className="resultBox">
                    <h2>You win!</h2>
                    <p><em>Number Solved:</em> {localStorage.getItem(`daily-${nrow}-count`)}</p>
                    <p><em>Streak:</em> {localStorage.getItem(`daily-${nrow}-streak`)}</p>
                </div>
            )
        }
        return (
            <div className="resultBox">
                <h2>You win!</h2>
            </div>
        )
    }

    return null
}

export default Result