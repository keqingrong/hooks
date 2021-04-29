import { RefObject, useEffect, useMemo, useState } from 'react';

/**
 * 判断元素是否有水平/垂直滚动条
 */
export const useHasScrollbar = (ref: RefObject<HTMLElement>) => {
  const [state, setState] = useState({
    scrollHeight: 0,
    scrollWidth: 0,
    clientHeight: 0,
    clientWidth: 0
  });

  // 检测容器大小变化
  useEffect(() => {
    if (ref.current) {
      const node = ref.current;
      const resizeObserver = new ResizeObserver(() => {
        const { scrollHeight, scrollWidth, clientHeight, clientWidth } = node;
        setState({
          scrollHeight,
          scrollWidth,
          clientHeight,
          clientWidth
        });
      });

      resizeObserver.observe(ref.current);

      return () => resizeObserver.disconnect();
    }

    return;
  }, [ref]);

  // 检测容器内子节点增减，不考虑子节点数量不变，而内容、样式变化的情况
  // TODO: 处理子节点数量不变，孙子节点数量变化
  useEffect(() => {
    if (ref.current) {
      const node = ref.current;
      const mutationObserver = new MutationObserver(mutationsList => {
        if (mutationsList.find(mutation => mutation.type === 'childList')) {
          const { scrollHeight, scrollWidth, clientHeight, clientWidth } = node;
          setState({
            scrollHeight,
            scrollWidth,
            clientHeight,
            clientWidth
          });
        }
      });

      mutationObserver.observe(ref.current, {
        subtree: false,
        childList: true,
        attributes: false,
        characterData: false,
        attributeOldValue: false,
        characterDataOldValue: false
      });

      return () => mutationObserver.disconnect();
    }

    return;
  }, [ref]);

  const { scrollHeight, scrollWidth, clientHeight, clientWidth } = state;

  return useMemo(() => {
    return {
      vertical: scrollHeight > clientHeight,
      horizontal: scrollWidth > clientWidth
    };
  }, [scrollHeight, scrollWidth, clientHeight, clientWidth]);
};
