import { separateSearch } from '../src/useQueryParams';

test('separateSearch', () => {
  const url1 = new URL(`https://www.example.com/?foo=1&bar=2#section`);
  const url2 = new URL(`https://www.example.com/#/home?foo=1&bar=2`);
  const url3 = new URL(`https://www.example.com/?foo=1#/home?bar=2`);

  expect(separateSearch(url1, 'std')).toEqual('?foo=1&bar=2');
  expect(separateSearch(url2, 'std')).toEqual('');
  expect(separateSearch(url3, 'std')).toEqual('?foo=1');

  expect(separateSearch(url1, 'hash')).toEqual('');
  expect(separateSearch(url2, 'hash')).toEqual('?foo=1&bar=2');
  expect(separateSearch(url3, 'hash')).toEqual('?bar=2');

  expect(separateSearch(url1, 'mixed')).toEqual('?foo=1&bar=2');
  expect(separateSearch(url2, 'mixed')).toEqual('?foo=1&bar=2');
  expect(separateSearch(url3, 'mixed')).toEqual('?foo=1&bar=2');

  expect(separateSearch(url1, 'auto')).toEqual('?foo=1&bar=2');
  expect(separateSearch(url2, 'auto')).toEqual('?foo=1&bar=2');
  expect(separateSearch(url3, 'auto')).toEqual('?bar=2');

  expect(separateSearch(url1)).toEqual('?foo=1&bar=2');
  expect(separateSearch(url2)).toEqual('?foo=1&bar=2');
  expect(separateSearch(url3)).toEqual('?bar=2');
});
