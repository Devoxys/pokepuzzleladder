import ladders
import util
from flask import Flask, request

app = Flask(__name__)
td = util.get_triedict()
lp = util.get_pokemon_list()

@app.route('/puzzle', methods=['GET'])
def get_puzzle():
    nrow = 4
    if request.args.get('nrow'):
        nrow = int(request.args.get('nrow'))
    ladder = ladders.generate_ladder(td, lp, nrow)
    return ladders.generate_puzzle(ladder)

@app.route('/check_ladder', methods=['POST'])
def check_ladder():
    #print(request.headers)
    request_data = request.get_json()
    head = request_data['head']
    ladder = request_data['ladder']
    ncol = request_data['ncol']
    nrow = request_data['nrow']
    validity = ladders.check_ladder(lp, ncol, nrow, head, ladder)
    return {'correct': validity}