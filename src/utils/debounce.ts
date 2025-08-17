export default function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay = 300
) {
  let timeoutId: number | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId !== null) clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, delay);
  };
}
