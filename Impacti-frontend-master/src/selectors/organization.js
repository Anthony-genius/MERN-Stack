const getField = name => (state, id) => {
  if (id === undefined) {
    return a => getField(name)(state, a)
  }
  const nodePresentation = state.treePresentation.find(e => e.id === id)
  return nodePresentation ? nodePresentation[name] : false
}

const _nodeById = (id, state) => root => {
  if (root.id === id) {
    return root
  }

  return root.children && root.children.length > 0
    ? root.children.reduce((acc, e) => {
        if (e.id === id) {
          return e
        }
        if (nodeById(id, state)(e) !== undefined) {
          return nodeById(id, state)(e)
        }
        return acc
      }, undefined)
    : undefined
}

export const nodeWithPresentation = (id, state) => root => {
  const node = _nodeById(id, state)(root)

  const nodePresentation = state.treePresentation.find(e => e.id === id)

  return Object.assign({}, node, nodePresentation)
}

export const childrenVisible = () => getField('childrenVisible')
export const edited = () => getField('edited')
export const nodeById = nodeWithPresentation
