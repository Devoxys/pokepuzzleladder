from util import get_triedict, get_pokemon_list
from hopcroftkarp import hopcroftkarp

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

def solve_ladder(td: dict, ncol: int, nrow: int, head: list, start: str, end: str, used_pokemon: list, used_links: list) -> list:
    if (start == end and nrow == 1 and final_row_head_match(start, ncol, head)):
        return [end]
    
    for i in range(len(start) - 2):
        if (start[i:i+3] in used_links):
            continue

        c0 = start[i]
        c1 = start[i + 1]
        c2 = start[i + 2]
        if (c0 == '_' or c1 == '_' or c2 == '_'):
            continue

        if c0 in td and c1 in td[c0] and c2 in td[c0][c1]:
            options = td[c0][c1][c2]
            for pokemon in options:
                if pokemon["name"] in used_pokemon:
                    continue
                if i - pokemon["index"] < 0 or i + len(pokemon["name"]) - pokemon["index"] > ncol:
                    continue
                leftpad = i - pokemon["index"]
                rightpad = ncol - leftpad - len(pokemon["name"])
                row = '_' * leftpad + pokemon["name"] + '_' * rightpad
                if not row_head_match(row, ncol, head):
                    continue
                nh = []
                for j in range(ncol):
                    if start[j] != '_':
                        nh.append(head[j] - 1)
                    else:
                        nh.append(head[j])
                nup = used_pokemon + [pokemon["name"]]
                nul = used_links + [start[i:i+3]]
                result = solve_ladder(td, ncol, nrow - 1, nh, row, end, nup, nul)
                #print(start, row, result, nrow, not result)
                if not result:
                    continue
                else:
                    return [start] + result
        else:
            continue
    return None

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
            

def check_ladder(lp: dict, ncol: int, nrow: int, head: list, ladder: list) -> bool:
    for i in range(nrow):
        if len(ladder[i]) != ncol:
            return False
    for i in range(ncol):
        count = 0
        for row in ladder:
            if row[i] != '_':
                count += 1
        if count != head[i]:
            return False
    if ladder[0].strip('_') not in lp:
        return False
    
    used_pokemon = [ladder[0]]
    used_links = []
    all_links = set()
    for i in range(nrow - 1):
        pname = ladder[i+1].strip('_')
        if pname not in lp or pname in used_pokemon:
            return False
        links = find_links(ladder[i], ladder[i+1])
        if len(links) == 0:
            return False
        used_links.append(links)
        for link in links:
            all_links.add(link)
    linkgraph = {k: v for k, v in enumerate(used_links)}
    print(hopcroftkarp(linkgraph, linkgraph.keys(), all_links))
    return True

if __name__ == "__main__":
    td = get_triedict()
    lp = get_pokemon_list()
    #print(solve_ladder(td, 8, 2, [2, 2, 2, 2, 2, 2, 2, 1], "pikachu__", "vikavolt", ["pikachu"], []))
    #test_ladder = solve_ladder(td, 9, 5, [3, 4, 4, 5, 5, 5, 5, 3, 2], "pikachu__", "___swanna", ["pikachu"], [])
    #test_ladder = solve_ladder(td, 12, 6, [1, 4, 5, 6, 6, 6, 5, 5, 5, 3, 1, 1], "kakuna______", "___dragonair", ["kakuna"], [])
    #print(solve_ladder(td, 12, 7, [1, 2, 4, 5, 6, 6, 7, 7, 7, 4, 4, 3], "bulbasaur___", "_frosmoth___", ["bulbasaur"], []))
    test_ladder = ['kakuna______', '__lunatone__', '_magneton___', '_magcargo___', '_volcarona__', '___dragonair']
    #test_ladder = solve_ladder(td, 12, 8, [1, 4, 5, 7, 8, 8, 8, 7, 7, 4, 2, 1], "___arceus___", "_igglybuff__", ["arceus"], [])
    print(test_ladder)
    print(check_ladder(lp, 12, 6, [1, 4, 5, 6, 6, 6, 5, 5, 5, 3, 1, 1], test_ladder))