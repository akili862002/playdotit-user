import { arrayMove as arrayMoveUtil } from "util/arrayMove";

export class Queue<T> {
  public arr: T[] = [];

  constructor(arr: T[]) {
    this.arr = arr;
  }

  isEmpty(): boolean {
    return this.arr.length === 0;
  }

  enqueue(newItem: T) {
    this.arr.push(newItem);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) throw new Error("EmptyQueueException: Queue is empty!");
    return this.arr.shift();
  }

  front(): T {
    return this.arr[0];
  }

  rare(): T {
    return this.arr[this.arr.length - 1];
  }

  // Addition funcs
  arrayMove(from: number, to: number): boolean {
    if (from < 0 && to > this.arr.length - 1) {
      throw new Error("From or To is out of array!");
    }
    this.arr = arrayMoveUtil(this.arr, from, to);
    return true;
  }
}
