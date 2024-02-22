import { cloneElement } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, openDialog, selectOpenDialog } from './dialogSlice';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import Button from '../../ui/Button';
import { HiXMark } from 'react-icons/hi2';

function Dialog({ children }) {
  return <div>{children}</div>;
}

function Open({ children, opens: opensWindowName }) {
  const dispatch = useDispatch();

  return cloneElement(children, {
    onClick: () => dispatch(openDialog(opensWindowName)),
  });
}

function ModalWindow({ children, name }) {
  const openName = useSelector(selectOpenDialog);

  const dispatch = useDispatch();

  const ref = useOutsideClick(() => dispatch(closeDialog()));

  if (name !== openName) return null;
  return createPortal(
    <div className="fixed left-0 top-0 z-40 h-screen w-full backdrop-blur-sm">
      <main
        ref={ref}
        className="fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] overflow-y-scroll rounded-md border border-secondary-300 bg-primary-100 px-5 py-8 shadow-lg"
      >
        <div className="absolute right-2 top-3">
          <Button onClick={() => dispatch(closeDialog())}>
            <HiXMark />
          </Button>
        </div>
        <div>
          {cloneElement(children, {
            onCloseModal: () => dispatch(closeDialog()),
          })}
        </div>
      </main>
    </div>,
    document.body,
  );
}

Dialog.Open = Open;
Dialog.ModalWindow = ModalWindow;

export default Dialog;
