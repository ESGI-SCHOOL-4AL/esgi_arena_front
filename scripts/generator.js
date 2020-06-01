export default {
  generate(size) {
    const start = this.generateStart(size)
    const grid = new Array(size).fill(0).map(() => new Array(size).fill(true))

    const end = this.maze(grid, start)

    return { grid, start, end }
  },
  maze(grid, pos) {
    let depth = 1
    let maxDepth = 0
    let end = { x: 0, y: 0 }
    const stack = [pos]
    while (stack.length) {
      const next = stack.pop()
      depth--
      if (this.validNextNode(grid, next)) {
        if (depth > maxDepth) {
          end = next
          maxDepth = depth
        }
        grid[next.y][next.x] = false
        const neighbors = this.findNeighbors(next, grid.length)
        while (neighbors.length) {
          const i = Math.floor(Math.random() * neighbors.length)
          const n = neighbors[i]
          neighbors.splice(i, 1)
          stack.push(n)
          depth++
        }
      }
    }
    this.branch(grid)
    return end
  },
  branch(grid) {
    const chances = Math.floor(grid.length / 1.5)
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] && Math.floor(Math.random() * chances) === chances - 1) {
          grid[i][j] = false
        }
      }
    }
  },
  validNextNode(grid, next) {
    let neighborCount = 0
    for (let y = next.y - 1; y < next.y + 2; y++) {
      for (let x = next.x - 1; x < next.x + 2; x++) {
        if (
          this.inGrid(grid.length, x, y) &&
          this.notNode(next, x, y) &&
          !grid[y][x]
        ) {
          neighborCount++
        }
      }
    }
    return neighborCount < 3 && grid[next.y][next.x]
  },
  findNeighbors(node, size) {
    const neighbors = []
    for (let y = node.y - 1; y < node.y + 2; y++) {
      for (let x = node.x - 1; x < node.x + 2; x++) {
        if (
          this.inGrid(size, x, y) &&
          this.notCorner(node, x, y) &&
          this.notNode(node, x, y)
        ) {
          neighbors.push({ x, y })
        }
      }
    }
    return neighbors
  },
  inGrid(size, x, y) {
    return x >= 0 && y >= 0 && x < size && y < size
  },
  notCorner(node, x, y) {
    return x === node.x || y === node.y
  },
  notNode(node, x, y) {
    return !(x === node.x && y === node.y)
  },
  generateStart(size) {
    return this.randomCorner(size)
  },
  randomCorner(size) {
    size--
    switch (Math.floor(Math.random() * 5)) {
      case 0:
        return { x: 0, y: 0 }
      case 1:
        return { x: size, y: 0 }
      case 2:
        return { x: 0, y: size }
      case 3:
        return { x: size, y: size }
      case 4:
        return { x: Math.floor(size / 2), y: Math.floor(size / 2) }
    }
  }
}
