const Row = ({ defaultText, ncol, num, setCell }) => {
    const cellEditDown = (event) => {
        const id = event.target.id
        const id_split = id.split('-')
        const id_row = parseInt(id_split[1])
        const id_col = parseInt(id_split[2])

        if ((event.key === "Backspace" || event.key === "Delete") && id_col > 0) {
            if (event.target.value !== "") {
                event.target.value = ""
            } else {
                document.getElementById(`cell-${id_row}-${id_col-1}`).focus()
            }
        }
    }

    const cellChanged = (event) => {
        const id = event.target.id
        const id_split = id.split('-')
        const id_row = parseInt(id_split[1])
        const id_col = parseInt(id_split[2])

        if (!/^[a-zA-Z0-9]+$/.test(event.target.value)) {
            event.target.value = ''
        }

        if (event.target.value === '') {
            setCell(id_row, id_col, '_')
        } else {
            setCell(id_row, id_col, event.target.value.toLowerCase())
        }
        
        if (event.target.value !== '' && id_col < ncol - 1) {
            document.getElementById(`cell-${id_row}-${id_col+1}`).focus()
        }
    }

    if (defaultText) {
        const clist = [...defaultText]
        return (
            <div className="row row-default">
                {clist.map((c, i) => 
                    <div className="text-cell" key={i}>
                        {c !== '_' ? c : ''}
                    </div>
                )}
            </div>
        )
    }

    const keys = [...Array(ncol).keys()]
    return (
        <div className="row">
            {keys.map(k => 
                <div key={k}>
                    <input className="input-cell" id={`cell-${num}-${k}`} type="text" maxLength="1" onKeyDown={cellEditDown} onChange={cellChanged}/>
                </div>
            )}
        </div>
    )
}

export default Row