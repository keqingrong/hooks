import { useEffect } from 'react';

/**
 * 滚动到页面顶部
 */
export function scrollToTop() {
  window.scrollTo(0, 0);
}

/**
 * 判断 event 目标来源元素和 tagName 是否相同
 */
export function isEventTargetTagNameSame(event: Event, tagName: string) {
  const element = event.target as HTMLElement;
  return element.tagName.toLowerCase() === tagName;
}

/**
 * 问题：iOS 上点击输入框，弹出软键盘后页面会上推，键盘关闭后，页面不会收回。
 * 解决方案：输入聚焦时记录滚动位置，输入框失焦时，自动滚到上一次位置；如果从一个输入框直接聚焦到另一个输入框取消滚动。
 * FIXME: Android 上聚焦输入框时，页面不会上推，下方的输入框会被软键盘挡住，需要向上滚动
 * TODO: 支持 input/textarea 和可编辑元素？
 */
export function useFixInputFocusScroll() {
  useEffect(() => {
    if (/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      let timeoutId: ReturnType<typeof setTimeout>;
      let previousScrollY = 0;

      const onFocusOut = (event: FocusEvent) => {
        if (isEventTargetTagNameSame(event, 'input')) {
          timeoutId = setTimeout(() => {
            window.scrollTo(0, previousScrollY);
          }, 0);
        }
      };

      const onFocusIn = (event: FocusEvent) => {
        if (isEventTargetTagNameSame(event, 'input')) {
          previousScrollY = window.scrollY;
          clearTimeout(timeoutId);
        }
      };

      document.body.addEventListener('focusout', onFocusOut);
      document.body.addEventListener('focusin', onFocusIn);

      return () => {
        document.body.removeEventListener('focusout', onFocusOut);
        document.body.removeEventListener('focusin', onFocusIn);
      };
    }

    return;
  }, []);
}
