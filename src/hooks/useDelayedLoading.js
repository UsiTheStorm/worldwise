import { useEffect, useState } from 'react';

function useDelayedLoading(isLoading, delay = 500) {
  const [isDelayedLoading, setIsDelayedLoading] = useState(false);
  useEffect(() => {
    let timer;

    if (isLoading) {
      timer = setTimeout(() => {
        setIsDelayedLoading(true);
      }, delay);
    }
    else {
      setIsDelayedLoading(false);
    }

    return () => {
      if (timer)
        clearTimeout(timer);
    };
  }, [delay, isLoading]);

  return isDelayedLoading;
}

export default useDelayedLoading;
