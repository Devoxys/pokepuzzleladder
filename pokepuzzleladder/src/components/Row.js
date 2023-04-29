const Row = ({ defaultText, ncol }) => {
    if (defaultText) {
        const clist = [...defaultText]
        return (
            <div className="row default">
                {clist.map((c, i) => 
                    <div key={i}>
                        {c !== '_' ? c : ''}
                    </div>
                )}
            </div>
        )
    }

    const keys = [...Array(ncol).keys()]
    return (
        <div className="row">
            {keys.map(key => 
                <div key={key}></div>
            )}
        </div>
    )
}

export default Row