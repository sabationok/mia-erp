import { RefObject, useCallback, useLayoutEffect, useRef, useState } from 'react';

const findOverflowParent = (element: HTMLElement) => {
  let parent = element.parentElement;

  while (parent) {
    const style = window.getComputedStyle(parent);
    if (style.overflow === 'auto' || style.overflow === 'hidden') {
      return parent;
    }
    parent = parent.parentElement;
  }

  return null;
};

const checkOverflow = (element: HTMLElement, parent?: HTMLElement, callback?: (val: boolean) => void) => {
  if (parent) {
    const parentRect = parent.getBoundingClientRect();
    const dropdownRect = element.getBoundingClientRect();

    const checks = [
      () => (dropdownRect.top <= parentRect.top ? `top element: ${dropdownRect.top} parent: ${parentRect.top}` : false),
      () =>
        dropdownRect.left > parentRect.left ? `left element: ${dropdownRect.left} parent: ${parentRect.left}` : false,
      () =>
        dropdownRect.bottom <= parentRect.bottom
          ? `bottom element: ${dropdownRect.bottom} parent: ${parentRect.bottom}`
          : false,
      () =>
        dropdownRect.right > parentRect.right
          ? `right element: ${dropdownRect.right} parent: ${parentRect.right}`
          : false,
    ];

    let isDropdownOverflowed = false;
    // dropdownRect.top >= parentRect.top ||
    // dropdownRect.left > parentRect.left ||
    // dropdownRect.bottom <= parentRect.bottom ||
    // dropdownRect.right > parentRect.right;

    for (const check of checks) {
      if (check()) {
        isDropdownOverflowed = true;
        console.log('isDropdownOverflowed', check());
      }
    }

    // const keys = ['top', 'left', 'bottom', 'right'] as const;
    //
    // for (const key of keys) {
    //   console.log(key, dropdownRect[key], parentRect[key]);
    // }

    // console.log(
    //   'dropdownRect.top >= parentRect.top',
    //   dropdownRect.top >= parentRect.top,
    //   'dropdownRect.left >= parentRect.left',
    //   dropdownRect.left >= parentRect.left,
    //   'dropdownRect.bottom <= parentRect.bottom',
    //   dropdownRect.bottom <= parentRect.bottom,
    //   'dropdownRect.right <= parentRect.right',
    //   dropdownRect.right <= parentRect.right
    // );

    // console.log({ parentRect }, { dropdownRect });

    callback && callback(isDropdownOverflowed);
    return isDropdownOverflowed;
  } else {
    callback && callback(false);
    return false;
  }
};

export const useIsOverflowed = (
  ref: RefObject<HTMLElement>,
  callback?: (hasOverflow: boolean) => void,
  options?: { disabled?: boolean; horizontal?: boolean }
) => {
  const [isOverflow, setIsOverflow] = useState<boolean>();
  const parentRef = useRef<HTMLElement | null>();

  const trigger = useCallback(
    (current: HTMLElement, parent: HTMLElement): boolean => {
      return checkOverflow(current, parent, val => {
        if (parent) {
          if (val) {
            parent?.classList.add('redOutlined');
          } else {
            parent?.classList.remove('redOutlined');
          }
        }

        setIsOverflow(val);
        if (callback) callback(val);
      });

      // const hasOverflow = options?.horizontal
      //   ? (current?.scrollHeight ?? 0) > (current?.clientWidth ?? 0)
      //   : (current?.scrollHeight ?? 0) > (current?.clientHeight ?? 0);
      //
      // setIsOverflow(hasOverflow);
    },
    [callback]
  );

  useLayoutEffect(() => {
    if (ref.current) {
      parentRef.current = findOverflowParent(ref.current);
    }
  }, [ref, trigger]);

  return {
    isOverflowed: isOverflow,
    trigger: (callback?: (val: boolean, current: HTMLElement, parent: HTMLElement) => void) => {
      if (ref.current && parentRef.current) {
        const res = trigger(ref.current, parentRef.current);

        callback && callback(res, ref.current, parentRef.current);
      }
    },
  };
};

// const dropdownRef = useRef<HTMLDivElement>(null);
// const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({});
// useLayoutEffect(() => {
//   const getAncestor = (element: HTMLElement | null) => {
//     while (element) {
//       const style = window.getComputedStyle(element);
//
//       if (style.overflow === 'auto') {
//         return element;
//       }
//       element = element.parentElement;
//     }
//     return element;
//   };
//
//   if (isOpen) {
//     const dropdown = dropdownRef.current;
//     const dropdownRect = dropdown?.getBoundingClientRect();
//
//     if (dropdownRect) {
//       if (dropdown) {
//         const ancestor = getAncestor(dropdown);
//         const ancestorRect = ancestor?.getBoundingClientRect();
//
//         console.log({ dropdown, dropdownRect });
//         console.log({ ancestor, ancestorRect });
//
//         if (ancestorRect) {
//           // Перевіряємо, чи випадаючий список виходить за межі вікна браузера
//           if (dropdownRect.bottom > ancestorRect?.bottom) {
//             // Позиціонуємо список зверху
//             setDropdownStyle({ top: '100%', bottom: 'auto' });
//           } else {
//             setDropdownStyle({ top: 'auto', bottom: '100%' });
//             // Позиціонуємо список знизу
//           }
//         }
//       }
//     }
//   }
// }, [isOpen]);
