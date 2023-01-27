import { arrayMove as arrayMoveUtil } from "@/util/arrayMove";

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

  push(item: T) {
    this.arr.push(item);
  }

  unshift(item: T) {
    this.arr.unshift(item);
  }

  length(): number {
    return this.arr?.length;
  }

  findIndex(cb: (item: T) => boolean): number {
    return this.arr.findIndex(cb);
  }

  removeItem(cb: (item: T) => boolean) {
    this.arr = this.arr.filter((item) => !cb(item));
  }

  // Addition funcs
  arrayMove(from: number, to: number) {
    if (from < 0 && to > this.arr.length - 1) {
      throw new Error("From or To is out of array!");
    }
    this.arr = arrayMoveUtil(this.arr, from, to);
  }
}
