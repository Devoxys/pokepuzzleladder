import axios from 'axios'

const getPuzzle = async () => {
    const response = await axios.get('/puzzle')
    console.log(response.data)
    return response.data
}

const puzzleService = {
    getPuzzle
}

export default puzzleService