from datetime import date, timedelta
from util import get_pokemon_list, get_triedict
import json
from ladders import generate_puzzle, generate_ladder
import random

def generateDailyJson(sdate: date, ndays: int, td: dict, lp: list, jsonfile: str) -> None:
    datelist = [sdate + timedelta(days=x) for x in range(ndays)]
    dailydict = {}
    for date in datelist:
        ladders = {}
        for i in range(3, 11):
            ladder = generate_ladder(td, lp, i)
            ladders[i] = generate_puzzle(ladder)
        datestring = date.strftime('%m-%d-%Y')
        dailydict[datestring] = ladders
    
    dailyjson = json.dumps(dailydict, indent=4)
    print(dailyjson)
    with open(jsonfile, "w") as outfile:
        outfile.write(dailyjson)


if __name__ == "__main__":
    generateDailyJson(date.today(), 400, get_triedict(), get_pokemon_list(), "daily.json")
