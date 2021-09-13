# @keqingrong/hooks (WIP)

Collection of React Hooks

## Installation

```sh
# npm
npm install @keqingrong/hooks

# yarn
yarn add @keqingrong/hooks
```

## Usage

### Use query string parameters

```tsx
import { useQueryParams } from '@keqingrong/hooks';

function App() {
  const query = useQueryParams();
  return <div>App</div>;
}
```

### Check whether element has scrollbars

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
- `useQueryParams(opts)`
  - `opts.mode`: `'auto'|'std'|'hash'|'mixed'`

## License

MIT © Qingrong Ke
