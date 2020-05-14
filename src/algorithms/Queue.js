class Queue {
  constructor() {
    this.items = [];
  }

  isEmpty() {
    if (this.items.length === 0) {
      return true;
    }
    return false;
  }

  enqueue(e) {
    this.items.push(e);
  }

  dequeue() {
    if (this.items.length === 0) {
      return false;
    }
    return this.items.shift();
  }

  front() {
    if (this.items.length === 0) {
      return false;
    }
    return this.items[0];
  }
}

export default Queue;
