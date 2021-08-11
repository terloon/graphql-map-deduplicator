const unmapit = (node: Record<string, any>, map: Record<string, any>): Record<string, any> => {
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
        if (Array.isArray(value) || typeof value === 'object' && value !== null) {
            node[f] = unmapit(value, map)
        }
    }    
    return node
}

export default (node: Record<string, any>) => {
    const {__map__, ...root} = node
    return unmapit(root, __map__)
}