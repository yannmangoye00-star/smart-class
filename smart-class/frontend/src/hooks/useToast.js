import { useMemo, useState } from 'react';

export default function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3000);
  };

  return useMemo(
    () => ({
      toast,
      showToast,
    }),
    [toast],
  );
}
