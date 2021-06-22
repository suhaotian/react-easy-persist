import * as React from 'react';
import { usePersist } from '../src';

export default function EasyPersistExample() {
  const [count, setCount] = React.useState(0);
  const [clear, inited] = usePersist({
    name: 'countdown',
    getValues: () => count,
    update: setCount,
  });

  function onIncrement() {
    setCount(count + 1);
  }

  function onDecrement() {
    setCount(count - 1);
  }

  return (
    <div>
      <h1>Countdown Persist Example</h1>

      <h2>Count: {count}</h2>

      <button onClick={onIncrement}>Increment +1</button>
      <button onClick={onDecrement}>Decrement -1</button>

      <button onClick={() => clear()}>
        Clear cache{inited ? '(inited)' : ''}
      </button>
    </div>
  );
}
