def hopcroftkarp(G: dict, U: list, V: list) -> int:
    nil = "nil"
    pair_U = {}
    for u in U:
        pair_U[u] = nil
    pair_V = {}
    for v in V:
        pair_V[v] = nil
    matching = 0

    dist_u = {}
    def BFS():
        Q = []
        for u in U:
            if pair_U[u] == nil:
                dist_u[u] = 0
                Q.append(u)
            else:
                dist_u[u] = nil
        dist_u[nil] = None
        while len(Q) > 0:
            qu = Q.pop(0)
            if dist_u[nil] is None or dist_u[qu] < dist_u[nil]:
                for v in G[qu]:
                    if dist_u[pair_V[v]] is None:
                        dist_u[pair_V[v]] = dist_u[qu] + 1
                        Q.append(pair_V[v])
        return dist_u[nil] is not None
    
    def DFS(du):
        if du != nil:
            for v in G[du]:
                if dist_u[pair_V[v]] == dist_u[du] + 1:
                    if DFS(pair_V[v]):
                        pair_V[v] = du
                        pair_U[du] = V
                        return True
            dist_u[du] = None
            return False
        return True
    
    while BFS():
        for u in U:
            if pair_U[u] == nil:
                if DFS(u):
                    matching += 1
    return matching


