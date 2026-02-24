declare global {
  interface IteratorConstructor {
    zip<T, U>(p: [Iterable<T>, Iterable<U>]): IteratorObject<[T, U]>;
  }
}
