const unmapit = (node: Record<string, any>, map: Record<string, any>, options: Options): Record<string, any> => {
  if (node.__typename && node.id) {
    node = {
      __typename: node.__typename,
      id: node.id,
      ...map[node.__typename][node.id]
    }
  }
  const fields = Object.keys(node)
  for (const f of fields) {
    const value = node[f]
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {      
      node[f] = unmapit(value, map, options)
      if (!options.inMemory) {
        continue;
      }      
      const {__typename, id} = node[f]
      if (__typename && id) {
        if (node.__typename && node.id) {
          Object.defineProperty(map[node.__typename][node.id], f, {
            get: map.getters[__typename][id]
          })      
        }
        Object.defineProperty(node, f, {
          get: map.getters[__typename][id]
        })
      }      
    }
  }
  return node
}

const createGetters = (map: Record<string, any>) => {
  const getters: Record<string, any> = {}
  const entities = Object.keys(map)
  for (const e of entities) {
    getters[e] = {}
    const entity = map[e]
    const ids = Object.keys(entity)
    for (const id of ids) {
      getters[e][id] = () => map[e][id]
      map[e][id].__typename = e
      map[e][id].id = id
    }    
  }
  map.getters = getters
}

export type Options = {
  inMemory?: boolean
}

export default (node: Record<string, any>, options: Options = {inMemory: false}) => {
  const { __map__, ...root } = node
  if (options.inMemory) {
    createGetters(__map__)
  }
  return unmapit(root, __map__, options)
}
