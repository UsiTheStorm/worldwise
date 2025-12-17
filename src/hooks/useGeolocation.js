import { useState } from 'react';

/**
 * Hook to get the user's geolocation.
 *
 * It returns an object with four properties:
 * - `error`: a string describing the error that occurred while trying to get the user's geolocation.
 * - `getPosition`: a function that can be called to request the user's geolocation.
 * - `isLoading`: a boolean indicating whether the hook is currently loading the user's geolocation.
 * - `position`: an object with two properties: `lat` and `lng`, representing the user's geolocation coordinates.
 */
function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation');

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return { error, getPosition, isLoading, position };
}
export { useGeolocation };
