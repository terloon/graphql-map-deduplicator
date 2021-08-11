const mapit = (node: Record<string, any>, map: Record<string, any>): Record<string, any> => {
  const fields = Object.keys(node)
  for (const f of fields) {
    const value = node[f]
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
      node[f] = mapit(node[f], map)
    }
  }
  if (node.__typename && node.id) {
    if (!map[node.__typename]) {
      map[node.__typename] = {}
    }
    if (!map[node.__typename][node.id]) {
      const { id, __typename, ...nodeMap } = node
      map[node.__typename][node.id] = nodeMap
    }
    return {
      __typename: node.__typename,
      id: node.id,
    }
  }
  return node
}

export default (node: Object) => {
  const map = {}
  return {
    __map__: map,
    ...mapit(node, map),
  }
}
