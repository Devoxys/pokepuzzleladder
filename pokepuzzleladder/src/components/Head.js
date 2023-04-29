const Head = ({ head }) => {
    return (
        <div className='head'>
            {head.map((num, i) =>
                <div key={i}>{num}</div> 
            )}
        </div>
    )
}

export default Head