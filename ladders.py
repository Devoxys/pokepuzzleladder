from util import get_triedict

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

def check_ladder(td: dict, ncol: int, nrow: int, head: list, ladder: list) -> bool:
    
    return True

if __name__ == "__main__":
    td = get_triedict()
    #print(solve_ladder(td, 8, 2, [2, 2, 2, 2, 2, 2, 2, 1], "pikachu__", "vikavolt", ["pikachu"], []))
    #print(solve_ladder(td, 9, 5, [3, 4, 4, 5, 5, 5, 5, 3, 2], "pikachu__", "___swanna", ["pikachu"], []))
    #print(solve_ladder(td, 12, 6, [1, 4, 5, 6, 6, 6, 5, 5, 5, 3, 1, 1], "kakuna______", "___dragonair", ["kakuna"], []))
    #print(solve_ladder(td, 12, 7, [1, 2, 4, 5, 6, 6, 7, 7, 7, 4, 4, 3], "bulbasaur___", "_frosmoth___", ["bulbasaur"], []))
    print(solve_ladder(td, 12, 8, [1, 4, 5, 7, 8, 8, 8, 7, 7, 4, 2, 1], "___arceus___", "_igglybuff__", ["arceus"], []))