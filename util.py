import json

def get_pokemon_list() -> list:
    pokelist = []
    with open('pokemon.txt') as pokefile:
        pokelist = [line.rstrip() for line in pokefile]
    return pokelist

def create_triedict(pokelist: list) -> dict:
    td = {}
    for j in  range(len(pokelist)):
        pokemon = pokelist[j]
        for i in range(len(pokemon) - 2):
            leaf = {"name": pokemon, "pid": j, "index": i}
            l0 = pokemon[i]
            l1 = pokemon[i + 1]
            l2 = pokemon[i + 2]
            if l0 not in td:
                td[l0] = {}
            if l1 not in td[l0]:
                td[l0][l1] = {}
            if l2 not in td[l0][l1]:
                td[l0][l1][l2] = []
            td[l0][l1][l2].append(leaf)
    return td

def get_triedict() -> dict:
    td = {}
    with open('triedict.json') as infile:
        td = json.load(infile)
    return td

if __name__ == "__main__":
    pl = get_pokemon_list()
    td = create_triedict(pl)
    tdjson = json.dumps(td, indent=4, sort_keys = True)
    with open("triedict.json", "w") as outfile:
        outfile.write(tdjson)
    print(get_triedict())