export default {
  generate(size) {
    const ends = this.generateEnds(size)
    const grid = new Array(size).fill(0).map(() => new Array(size).fill(0))

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        grid[y][x] =
          Math.floor(Math.random() * 3) > 1 && !this.isEnd(ends, x, y)
      }
    }

    return { grid, ends }
  },
  isEnd(ends, x, y) {
    return (
      (ends.start.x === x && ends.start.y === y) ||
      (ends.end.x === x && ends.end.y === y)
    )
  },
  generateEnds(size) {
    const start = this.randomCorner(size)

    let end = { x: 0, y: 0 }
    do {
      end = this.randomCorner(size)
    } while (end.x === start.x && end.y === start.y)

    return { start, end }
  },
  randomCorner(size) {
    size--
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        return { x: 0, y: 0 }
      case 1:
        return { x: size, y: 0 }
      case 2:
        return { x: 0, y: size }
      case 3:
        return { x: size, y: size }
    }
  }
}
