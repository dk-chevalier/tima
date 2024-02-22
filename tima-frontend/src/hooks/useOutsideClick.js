import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  // useEffect checks if the click happened outside the modal window...will close the window if it did
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      // have to pass in true as the third argument of the eventlistener in order to prevent bubbling (which will cause the window to open and then close again straight away as the event bubbles back up)...this is because we use Portal to make modal direct child of the body in the DOM tree, so when clicking on the button to open it, the event will bubble back up until it reaches the modal window and will be registered as a click outside of the modal window
      document.addEventListener('click', handleClick, listenCapturing);

      return () =>
        document.removeEventListener('click', handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );
  return ref;
}
