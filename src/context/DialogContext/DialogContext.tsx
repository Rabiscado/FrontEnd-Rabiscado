import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AppDialog } from '@components/Dialog/Dialog';

type DialogContextType = {
    title: string;
    openDialog:  ({
      title,
      onConfirm,
      onConfirmText,
      onCloseText,
    } : {
      title: string,
      onConfirm: () => void,
      onConfirmText?: string,
      onCloseText?: string
    }) => void;
    showSuccessDialog:  ({
      title,
      onConfirm,
      onConfirmText,
      onCloseText,
    } : {
      title: string,
      onConfirm: () => void,
      onConfirmText?: string,
      onCloseText?: string
    }) => void;
    isOpened: boolean;
    setIsOpened: (isOpened: boolean) => void;
};

export const DialogContext = createContext<DialogContextType>({
    title: '',
    openDialog: () => { },
    isOpened: false,
    setIsOpened: () => { },
    showSuccessDialog: () => {}
}); 

export const DialogProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [onConfirmText, setOnConfirmText] = useState<string | undefined>();
    const [onCloseText, setOnCloseText] = useState<string | undefined>();
    const [onConfirm, setOnConfirm] = useState<() => void>(() => { });
    const [hideCloseButton, setHideCloseButton] = useState(false)
    

    
  const openDialog = useCallback(({
    title,
    onConfirm,
    onConfirmText,
    onCloseText,
    hideCloseButton = false
}: {
    title: string,
    onConfirm: () => void,
    onConfirmText?: string,
    onCloseText?: string,
    hideCloseButton?: boolean
}) => {
    setTitle(title);
    setOnConfirm(() => onConfirm); 
    setOnConfirmText(onConfirmText);
    setOnCloseText(onCloseText);
    setHideCloseButton(hideCloseButton);
    setShowDialog(true);
}, []);

    const showSuccessDialog = ({
      title,
      onConfirm,
      onConfirmText = 'Fechar',
      onCloseText,
      hideCloseButton = true
    } : {
      title: string,
      onConfirm: () => void,
      onConfirmText?: string,
      onCloseText?: string,
      hideCloseButton?: boolean
    }) => {
      setTitle(title);
      setOnConfirm(() => onConfirm); 
      setOnConfirmText(onConfirmText);
      setOnCloseText(onCloseText);
      setHideCloseButton(hideCloseButton)
      setShowDialog(true);
    }

    useEffect(() => {
      if(!showDialog) {
        setTitle('');
        setOnConfirm(() => {});
        setOnConfirmText('');
        setHideCloseButton(false)
        setOnCloseText('');
      }
    }, [showDialog]);

    return (
        <DialogContext.Provider value={{ isOpened: showDialog, openDialog, setIsOpened: setShowDialog, title, showSuccessDialog }}>
            {children}
            {showDialog && (
                <AppDialog
                    title={title}
                    onConfirm={() => {
                      onConfirm()
                      setShowDialog(false)
                    }} 
                    isOpen={showDialog}
                    onClose={() => setShowDialog(false)}
                    hideCloseButton={hideCloseButton}
                    onConfirmText={onConfirmText}
                    onCloseText={onCloseText}
                />
            )}
        </DialogContext.Provider>
    );
};
