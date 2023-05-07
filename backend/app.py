from flask import Flask, request
import ladders
import util
import json
from datetime import date

app = Flask(__name__, static_folder='../pokepuzzleladder/build', static_url_path='/')
td = util.get_triedict()
lp = util.get_pokemon_list()

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/puzzle', methods=['GET'])
def get_puzzle():
    nrow = 4
    if request.args.get('nrow'):
        nrow = int(request.args.get('nrow'))
    ladder = ladders.generate_ladder(td, lp, nrow)
    return ladders.generate_puzzle(ladder)

@app.route('/daily', methods=['GET'])
def get_daily():
    nrow = 4
    if request.args.get('nrow'):
        nrow = int(request.args.get('nrow'))
    datestring = date.today().strftime('%m-%d-%Y')
    dailydict = {}
    with open('../daily.json') as infile:
        dailydict = json.load(infile)
    return dailydict[datestring][str(nrow)]

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