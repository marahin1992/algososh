export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array.from(Array(size), () => null);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail] = item;
    this.length++
    if (this.tail < this.size - 1) {
      this.tail++
    } else {
      this.tail = 0;
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    //delete this.container[this.head];
    this.container[this.head] = null;
    this.length--;
    if (this.head < this.size - 1) {
      this.head++
    } else {
      this.head = 0;
    }
    if (this.isEmpty()) {
      this.head = 0;
      this.tail = 0;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  };

  getTail = (): number | null => {
    return this.tail;
  }

  getHead = (): number | null => {
    return this.head;
  }

  clear = (): (T | null)[] => {
    this.container = Array.from(Array(this.size), () => null);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    return this.container
  }

  elements = (): (T | null)[] => {
    return this.container;
  }

  isEmpty = () => this.length === 0;

  isFull = () => this.length >= this.size;
}