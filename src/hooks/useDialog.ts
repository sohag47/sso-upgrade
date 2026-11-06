import { useCallback, useState } from "react";

export function useDialog(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  // Single handle function for opening, closing, or toggling
  const handleDialog = useCallback((nextState?: boolean) => {
    setIsOpen((prev) => (typeof nextState === "boolean" ? nextState : !prev));
  }, []);

  return {
    isOpen,
    setIsOpen,
    handleDialog,
    dialogProps: {
      open: isOpen,
      onOpenChange: setIsOpen,
    },
  };
}
