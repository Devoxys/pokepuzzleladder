const HeadRow = ({ head }) => {
    return (
        <div className='head'>
            {head.map((num, i) =>
                <div key={i} className="head-cell">{num}</div> 
            )}
        </div>
    )
}

export default HeadRow