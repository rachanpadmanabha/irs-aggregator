import { useState, useEffect } from 'react';
import { fetchCountries, type Country } from '@/services/countryService';

/**
 * Hook to fetch and manage country list
 */
export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchCountries()
      .then(data => {
        if (mounted) {
          setCountries(data);
          setError(null);
        }
      })
      .catch(err => {
        if (mounted) {
          console.error('Failed to load countries:', err);
          setError('Failed to load country list. Using fallback list.');
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { countries, loading, error };
}
