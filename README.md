<h1 style="color:red">ARCHIVED! Use this now: https://github.com/suhaotian/use-one?tab=readme-ov-file#persist-any-hooks-state</h1>

# React Easy Persist

An easy hook to persist react state, support **web** and **react-native**,

## Install:

```zsh
yarn add react-easy-persist
```

## peerDependencies:

```json
"peerDependencies": {
  // the latest async-stoarge version already supports web
  "@react-native-async-storage/async-storage": ">=1",
  "ahooks": ">=3",
  "react": ">=16.8"
}
```

## Usage:

- `usePersist`

```tsx
import * as React from 'react';
import { usePersist } from 'react-easy-persist';

export default function EasyPersistExample() {
  const [count, setCount] = React.useState(0);
  usePersist({ name: 'countdown', getValues: () => count, update: setCount });

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
    </div>
  );
}
```

- `createUsePersist`

```ts
import { createUsePersist } from 'react-easy-persist';

/**
 * common hook, and you can create your own like this
 */
export const usePersist: ReturnType<typeof createUsePersist> = createUsePersist(
  {
    namePrefix: '@up',
    debounce: 200,
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
```

## Example:

Persist `formik` state:

```tsx
import * as React from 'react';
import { useFormik } from 'formik';
import { usePersist } from 'react-easy-persist';

export default function FormikPersistExample() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values));
    },
  });

  const [clear, inited] = usePersist({
    name: 'formik-example',
    getValues: () => formik.values,
    update: formik.setValues,
    encode: JSON.stringify,
    decode: JSON.Parse,
  });

  return (
    <div>
      <h1>useFormikPersist Example</h1>
      <form
        onSubmit={formik.handleSubmit}
        onChange={formik.handleChange}
        onReset={formik.handleReset}
        onBlur={formik.handleBlur}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formik.values.username}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
        />
        <br />
        <br />
        <div>
          <button type="submit">Login</button>
          <button type="reset">Reset</button>
          <button
            onClick={() => {
              clear();
              alert('clear cache done!');
            }}
          >
            Clear Cache
          </button>
        </div>
      </form>
    </div>
  );
}
```

Persist react `useState`'s state:

```tsx
import * as React from 'react';
import { usePersist } from '../src';

export default function EasyPersistExample() {
  const [count, setCount] = React.useState(0);
  const [clear, inited] = usePersist({
    name: 'countdown',
    getValues: () => count,
    update: setCount,
  });

  console.log(inited);

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
    </div>
  );
}
```
