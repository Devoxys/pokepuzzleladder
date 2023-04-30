import axios from 'axios'

const getPuzzle = async (nrow) => {
    const response = await axios.get('/puzzle', { params: { nrow } })
    console.log(response.data)
    return response.data
}

const checkAnswer = async (ladder) => {
    const response = await axios.post('/check_ladder', ladder)
    return response.data
}

const puzzleService = {
    getPuzzle,
    checkAnswer
}

export default puzzleService