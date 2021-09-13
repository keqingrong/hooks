import { useMemo } from 'react';
import qs from 'qs';

/**
 * 目前主要存在以下 3 种包含 `search` 的 URL：
 * - `https://www.example.com/?foo=1&bar=2#section` (history router)
 * - `https://www.example.com/#/home?foo=1&bar=2` (hash router)
 * - `https://www.example.com/?foo=1#/home?bar=2` (quirk)
 *
 * 分别对应以下模式：
 * - std 标准模式，对应 `URL.search`
 * - hash Hash 模式，解析 Hash 中的 `search`
 * - auto 自动模式，优先使用 Hash，然后才是 `URL.search`
 * - mixed 混合模式，合并两种 `search`
 */
type Mode = 'std' | 'hash' | 'auto' | 'mixed';

interface URLLike {
  hash: string;
  search: string;
}

/**
 * 分离出 URL 对象的 `search` 属性
 */
export function separateSearch(url: URLLike, mode: Mode = 'auto') {
  const { search = '', hash = '' } = url;
  if (mode === 'std') {
    return search;
  }
  const hashSearchIndex = hash.indexOf('?');
  const hashSearch = hashSearchIndex > -1 ? hash.slice(hashSearchIndex) : '';
  if (mode === 'hash') {
    return hashSearch;
  }
  if (mode === 'auto') {
    return hashSearch.length - search.length >= 0 ? hashSearch : search;
  }
  return search.length > 1
    ? [search.replace(/&+$/, ''), hashSearch.slice(1)]
        .filter(s => s.length > 0)
        .join('&')
    : hashSearch;
}

/**
 * 解析 Query String 参数
 */
export function parseQueryString<T extends { [K in keyof T]?: string } = {}>(
  search: string
) {
  return qs.parse(search, { ignoreQueryPrefix: true }) as T;
}

/**
 * 获取 Query String 参数，基于 `qs`
 */
export function useQueryParams<T>(opts: { mode?: Mode } = {}) {
  const { search, hash } = window.location;
  const { mode } = opts;
  return useMemo<T>(
    () => parseQueryString(separateSearch({ search, hash }, mode)),
    [search, hash, mode]
  );
}

/**
 * 获取 Query String 参数，基于 `URLSearchParams`
 */
export function useSearchParams(opts: { mode?: Mode } = {}) {
  const { search, hash } = window.location;
  const { mode } = opts;
  return useMemo(
    () => new URLSearchParams(separateSearch({ search, hash }, mode)),
    [search, hash, mode]
  );
}
