import Queue from "./Queue";

function bfsAlgo(grid, startNode, endNode) {
  let visited = [];
  startNode.isVisited = true;
  visited.push(startNode);
  let q = new Queue();
  q.enqueue(startNode);
  let flag = 0;
  while (q.isEmpty() || flag === 0) {
    let currentNode = q.dequeue();
    //console.log(currentNode);
    let neighbours = getUnvisitedNeighbors(currentNode, grid);
    //console.log(neighbours);
    for (const node of neighbours) {
      if (node == endNode) {
        node.previousNode = currentNode;
        visited.push(node);
        flag = 1;
        break;
      } else if (node.isWall || node.isVisited) {
        continue;
      } else {
        node.previousNode = currentNode;
        node.isVisited = true;
        visited.push(node);
        q.enqueue(node);
      }
    }
  }
  return visited;
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export default bfsAlgo;
