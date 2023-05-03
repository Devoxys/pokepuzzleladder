import random
from util import get_triedict, get_pokemon_list
from hopcroftkarp import hopcroftkarp

def pretty_print(head: list, ladder: list) -> None:
    nrow = len(ladder)
    lc = len(str(nrow))
    line = ""
    for num in head:
        snum = str(num)
        line += (lc - len(snum)) * ' ' + snum + ' '
    print(line)
    line = ""
    for row in ladder:
        for c in row:
            line += (lc - 1) * ' ' + c + ' '
        print(line)
        line = ""

def row_head_match(row: str, ncol: int, head: list) -> bool:
    if ncol != len(row):
        return False
    for i in range(ncol):
        if (row[i] != '_'):
            if head[i] - 1 < 0:
                return False
    return True

def final_row_head_match(row: str, ncol: int, head: list) -> bool:
    if ncol != len(row):
        return False
    for i in range(ncol):
        if (row[i] != '_'):
            if head[i] - 1 != 0:
                return False
        elif (row[i] == '_' and head[i] != 0):
            return False
    return True

def find_links(row1: str, row2: str) -> list:
    i = 0
    row1textfound = False
    row2textfound = False
    links = []
    while i < len(row1) - 2:
        if (not row1textfound and row1[i] != '_'):
            row1textfound = True
        elif (row1textfound and row1[i+2] == '_'):
            break
        if (not row2textfound and row2[i] != '_'):
            row2textfound = True
        elif (row2textfound and row2[i+2] == '_'):
            break
        if (row1[i:i+3] == row2[i:i+3]):
            links.append(row1[i:i+3])
        i += 1
    return links
            

def check_ladder(lp: list, ncol: int, nrow: int, head: list, ladder: list) -> bool:
    for i in range(nrow):
        if len(ladder[i]) != ncol:
            print("column mismatch")
            return False
    for i in range(ncol):
        count = 0
        for row in ladder:
            if row[i] != '_':
                count += 1
        if count != head[i]:
            print("header mismatch")
            return False
    if ladder[0].strip('_') not in lp:
        print("pokemon not found 1")
        return False
    
    used_pokemon = [ladder[0]]
    used_links = []
    all_links = set()
    for i in range(nrow - 1):
        pname = ladder[i+1].strip('_')
        if pname not in lp or pname in used_pokemon:
            print("pokemon not found 2")
            return False
        links = find_links(ladder[i], ladder[i+1])
        if len(links) == 0:
            print("no links")
            return False
        used_links.append(links)
        for link in links:
            all_links.add(link)
    linkgraph = {k: v for k, v in enumerate(used_links)}
    if hopcroftkarp(linkgraph, linkgraph.keys(), all_links) != nrow - 1:
        return False
    return True

def generate_ladder(td: dict, lp: list, nrow: int) -> dict:
    def generate_row(td: dict, lp: list, used_pokemon: list, used_links: list, depth: int, nrow: int):
        if len(lp) == 0:
            return None
        random.shuffle(lp)
        for p in lp:
            name = p["name"]
            options = []
            for i in range(len(name) - 2):
                link = name[p["index"]:p["index"] + 3]
                if name in used_pokemon:
                    continue
                if name[i:i+3] in used_links or name[i:i+3] == link:
                    continue
                if depth == nrow:
                    return [p]
                c0 = name[i]
                c1 = name[i+1]
                c2 = name[i+2]
                if c0 in td and c1 in td[c0] and c2 in td[c0][c1]:
                    plist = td[c0][c1][c2]
                    for pdict in plist:
                        pdict["loc"] = i
                        options.append(pdict)
                else:
                    continue
            nul = used_links + [link]
            nup = used_pokemon + [name]
            rows_below = generate_row(td, options, nup, nul, depth + 1, nrow)
            if rows_below:
                return [p] + rows_below
        return None
    
    pokemon_in_ladder = None
    while pokemon_in_ladder is None:
        start = random.choice(lp)
        options = []
        for i in range(len(start) - 2):
            c0 = start[i]
            c1 = start[i+1]
            c2 = start[i+2]
            if c0 in td and c1 in td[c0] and c2 in td[c0][c1]:
                plist = td[c0][c1][c2]
                for pdict in plist:
                    pdict["loc"] = i
                    options.append(pdict)
        rows_below = generate_row(td, options, [start], [], 2, nrow)
        if rows_below is None:
            continue
        else:
            pokemon_in_ladder = [start] + rows_below
    
    startend = [(0, len(pokemon_in_ladder[0]))]
    prev_start_index = 0
    min_start_index = 0
    max_end_index = len(pokemon_in_ladder[0])
    for pokemon in pokemon_in_ladder[1:]:
        start_index = prev_start_index + pokemon["loc"] - pokemon["index"]
        end_index = start_index + len(pokemon["name"])
        if start_index < min_start_index:
            min_start_index = start_index
        if end_index > max_end_index:
            max_end_index = end_index
        startend.append((start_index, end_index))
        prev_start_index = start_index
    
    full_ladder = []
    for i in range(len(pokemon_in_ladder)):
        pname = ""
        if i == 0:
            pname = pokemon_in_ladder[i]
        else:
            pname = pokemon_in_ladder[i]["name"]
        leftpad = startend[i][0] - min_start_index
        rightpad = max_end_index - startend[i][1]
        full_ladder.append(leftpad * '_' + pname + rightpad * '_')

    ncol = max_end_index - min_start_index
    head = [0] * ncol
    for row in full_ladder:
        for i in range(ncol):
            if row[i] != '_':
                head[i] += 1
    
    return { "head": head, "ladder": full_ladder }

def generate_puzzle(solution: dict) -> dict:
    return { "head": solution["head"], "start": solution["ladder"][0], "end": solution["ladder"][-1], "nrow": len(solution["ladder"]) }


if __name__ == "__main__":
    td = get_triedict()
    lp = get_pokemon_list()
    #print(solve_ladder(td, 8, 2, [2, 2, 2, 2, 2, 2, 2, 1], "pikachu__", "vikavolt", ["pikachu"], []))
    #test_ladder = solve_ladder(td, 9, 5, [3, 4, 4, 5, 5, 5, 5, 3, 2], "pikachu__", "___swanna", ["pikachu"], [])
    #test_ladder = solve_ladder(td, 12, 6, [1, 4, 5, 6, 6, 6, 5, 5, 5, 3, 1, 1], "kakuna______", "___dragonair", ["kakuna"], [])
    #print(solve_ladder(td, 12, 7, [1, 2, 4, 5, 6, 6, 7, 7, 7, 4, 4, 3], "bulbasaur___", "_frosmoth___", ["bulbasaur"], []))
    #test_ladder = ['kakuna______', '__lunatone__', '_magneton___', '_magcargo___', '_volcarona__', '___dragonair']
    #test_ladder = solve_ladder(td, 12, 8, [1, 4, 5, 7, 8, 8, 8, 7, 7, 4, 2, 1], "___arceus___", "_igglybuff__", ["arceus"], [])
    #print(test_ladder)
    #print(check_ladder(lp, 12, 6, [1, 4, 5, 6, 6, 6, 5, 5, 5, 3, 1, 1], test_ladder))
    nrow = 5
    gen_ladder = generate_ladder(td, lp, nrow)
    ncol = len(gen_ladder["head"])
    pretty_print(gen_ladder["head"], gen_ladder["ladder"])
    print(generate_puzzle(gen_ladder))
    print(check_ladder(lp, ncol, nrow, gen_ladder["head"], gen_ladder["ladder"]))