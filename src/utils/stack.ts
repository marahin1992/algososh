export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  get: () => T[];
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    const length = this.getSize();
    if (length > 0) {
      this.container.pop();
    }
    
  };

  peak = (): T | null => {
    const length = this.getSize();
    if (length > 0) {
      return this.container[length - 1]
    }
    return null;
  };

  get = (): T[] => {
    return [...this.container];
  }

  clear = (): void => {
    this.container = [];
  }

  getSize = () => this.container.length;
}