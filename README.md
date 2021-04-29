# @keqingrong/hooks (WIP)

Some React hooks

## Installation

```sh
# npm
npm install @keqingrong/hooks

# yarn
yarn add @keqingrong/hooks
```

## Usage

```tsx
import { useQueryParams } from '@keqingrong/hooks';

function App() {
  const query = useQueryParams();
  return <div>App</div>;
}
```

```tsx
import { useHasScrollbar } from '@keqingrong/hooks';

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const hasScrollbar = useHasScrollbar(ref);
  return (
    <div>
      <ul>
        <li>{hasScrollbar.vertical ? '✅' : '❌'} vertical scrollbar</li>
        <li>{hasScrollbar.horizontal ? '✅' : '❌'} horizontal scrollbar</li>
      </ul>
      <div ref={ref}>...</div>
    </div>
  );
}
```

## APIs

- `useFixInputFocusScroll()`
- `useHasScrollbar()`
- `useMutationObserver()`
- `useQueryParams()`

## License

MIT © Qingrong Ke
