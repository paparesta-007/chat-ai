import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { m } from 'react-router/dist/development/index-react-server-client-BbRcBjrA';

interface ConfirmDialogProps {
  messagePrimary: string,
  messageSecondary: string,
  onConfirm: () => void,
  onCancel: () => void,
  open: boolean
}

const ConfirmDialog = ({ messagePrimary, messageSecondary, onConfirm, onCancel, open }: ConfirmDialogProps) => {

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }
  }, [open, onCancel]);


  if (!open) return null;

  const dialog = (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-[9999]">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-md" onClick={onCancel}></div>

      <div className="border animate-slideDown border-[var(--border-primary)] bg-[var(--background-Primary)] rounded-lg p-4 w-max z-50">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">Confirm Action</h2>
        <p className="text-[var(--color-third)] text-base mb-2">{messagePrimary}</p>
        <p className="text-[var(--color-third)] text-sm mb-4 opacity-80">{messageSecondary}</p>


        <div className='flex flex-col md:flex-row gap-4'>
          <button className='bg-[var(--color-primary)] hover:brightness-90 px-2 py-1 rounded-md cursor-pointer' onClick={onConfirm}>Confirm</button>
          <button
            onClick={onCancel}
            className='bg-[var(--btn-danger)] px-2 py-1 border border-[var(--border-error)] hover:bg-[var(--btn-danger-hover)] font-semibold text-[var(--color-danger)] rounded-md cursor-pointer'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(dialog, document.body);
}

export default ConfirmDialog;
