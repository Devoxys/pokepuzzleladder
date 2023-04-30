import ladders
import util
from flask import Flask

app = Flask(__name__)
td = util.get_triedict()
lp = util.get_pokemon_list()

@app.route('/puzzle', methods=['GET'])
def get_puzzle():
    ladder = ladders.generate_ladder(td, lp, 5)
    return ladders.generate_puzzle(ladder)