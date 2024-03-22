
export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  addByIndex: (element: T, position: number) => void;
  deleteByIndex: (position: number) => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;


        // перебрать элементы в списке до нужной позиции
        while (curr && (currIndex < index - 1)) {
          curr = curr.next;
          currIndex++
        }

        // добавить элемент
        node.next = curr ? curr.next : curr;
        if (curr) { curr.next = node; }
      }

      this.size++;
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      // добавить элемент в начало списка
      if (this.head && index === 0) {
        this.head = this.head.next ? this.head.next : null;
      } else {
        let curr = this.head;
        let currIndex = 0;


        // перебрать элементы в списке до нужной позиции
        while (curr && (currIndex < index - 1)) {
          curr = curr.next;
          currIndex++
        }

        // добавить элемент
        let target = curr?.next;
        if (curr && target && target.next) {
          curr.next = target.next;
        } else if (curr) {
          curr.next = null
        }
      }

      this.size--;
    }
  }

  deleteHead() {
    if (this.head){
      this.head = this.head?.next || null;
    }
    this.size--
  }

  deleteTail() {
    if (!this.head) {
      return
    }
    if (this.getSize() === 1) {
      this.head = null;
      this.size--;
      return
    }
    let curr = this.head;
    let next = curr.next;
    while (curr && curr.next && next?.next) {
      curr = curr.next;
      next = curr.next;
    }
    curr.next = null;
    this.size--
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;      
      this.head = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  }
}



