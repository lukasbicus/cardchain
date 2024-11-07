'use callback';

import { forwardRef } from 'react';

type ConfirmDialogProps = {
  title: string;
  body: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  onConfirmButtonClick: () => void;
  onCancelButtonClick: () => void;
};

export const ConfirmDialog = forwardRef<HTMLDialogElement, ConfirmDialogProps>(
  function ConfirmDialogWithRef(
    {
      confirmButtonLabel = 'Confirm',
      cancelButtonLabel = 'Cancel',
      title,
      body,
      onConfirmButtonClick,
      onCancelButtonClick,
    }: ConfirmDialogProps,
    dialogRef
  ) {
    return (
      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{body}</p>
          <div className="modal-action">
            <button
              className="btn btn-outline btn-primary"
              onClick={onCancelButtonClick}
            >
              {cancelButtonLabel}
            </button>
            <button
              className="btn btn-primary"
              onClick={onConfirmButtonClick}
              autoFocus
            >
              {confirmButtonLabel}
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);
