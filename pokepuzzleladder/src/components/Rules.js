import example_ladder from '../example_ladder.png'

const Rules = () => {
    return (
        <>
            <h2>Rules:</h2>
            <ul id="rules">
            <li><p>The goal is to complete the ladder of Pokémon names.</p></li>
            <li><p>Each Pokémon name shares a "link" of 3 characters with the names above and/or below it. Each name is aligned in the columns by the link(s).</p></li>
            <li><p>You many only use a Pokémon name once, and you may only use a 3-letter link once.</p></li>
            <li><p>If more than 3 characters match, pick any 3 adjacent characters in that match.</p></li>
            <li><p>The numbers in above each column specify the number of characters in that column.</p></li>
            <li><p>Unused boxes should be left blank.</p></li>
            <li><p>Use Pokédex names. Forms and regional variants are not included.</p></li>
            <li><p>Only alphanumerical characters are used. Spaces, hyphens, and dots are removed (i.e. mrmime, wochien)</p></li>
            <li><p>Both Nidoran-M and Nidoran-F are "nidoran".</p></li>
            <li><p>Flabébé is "flabebe".</p></li>
            <li><p>Example:</p><img src={example_ladder} alt="Example Ladder: Pawniard Braviary Staravia Staryu" /></li>
            </ul>
        </>
    )
}

export default Rules