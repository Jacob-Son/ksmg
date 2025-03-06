import { useEffect } from 'react';
import ReactDom from 'react-dom';

export default function ModalPortal({
  children,
  id = 'modal-root',
}: {
  children: React.ReactNode;
  id?: string;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  });

  if (typeof document === 'undefined') return null;
  return ReactDom.createPortal(children, document.getElementById(id));
}
