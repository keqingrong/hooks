import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

/**
 * 解析 Query String 参数
 */
export function parseQueryString<T extends { [K in keyof T]?: string } = {}>(
  search: string
) {
  return qs.parse(search, { ignoreQueryPrefix: true }) as T;
}

/**
 * 获取 Query String 参数，基于 qs
 */
export function useQueryParams<T>() {
  const { search } = useLocation();
  return useMemo<T>(() => parseQueryString(search), [search]);
}

/**
 * 获取 Query String 参数，基于 URLSearchParams
 * TODO: 如果使用了 react-router@^6 可以迁移到 <https://github.com/ReactTraining/react-router/blob/6e13acf6b9c0101bcffb67a236f29226c18c2a6b/packages/react-router-dom/index.tsx#L306>
 */
export function useSearchParams() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
