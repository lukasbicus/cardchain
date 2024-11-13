'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';

export type ErrorDialogProps = {
  title: string;
  body: React.ReactNode;
};

const ErrorDialogContext = createContext({
  openErrorDialog: (props: ErrorDialogProps) => {
    console.log(props);
  },
});

export const useErrorDialog = () => useContext(ErrorDialogContext);

export const ErrorDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [errorProps, setErrorProps] = useState<ErrorDialogProps | null>(null);

  const openErrorDialog = useCallback((props: ErrorDialogProps) => {
    console.log('openErrorDialog props ', props);
    setErrorProps(props);
  }, []);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (errorProps) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [errorProps]);

  return (
    <ErrorDialogContext.Provider
      value={{
        openErrorDialog,
      }}
    >
      {children}
      {errorProps && (
        <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{errorProps.title}</h3>
            <p className="py-4">{errorProps.body}</p>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setErrorProps(null);
                }}
                autoFocus
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </ErrorDialogContext.Provider>
  );
};
