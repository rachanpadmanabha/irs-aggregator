/**
 * Country service - fetches country list from REST Countries API
 */

export interface Country {
  name: string;
  code: string; // ISO 3166-1 alpha-2 code
}

const COUNTRIES_API = 'https://restcountries.com/v3.1/all';
const CACHE_KEY = 'countries_cache';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CachedCountries {
  countries: Country[];
  timestamp: number;
}

/**
 * Fetch countries from API with caching
 */
export async function fetchCountries(): Promise<Country[]> {
  // Check cache first
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const data: CachedCountries = JSON.parse(cached);
      const age = Date.now() - data.timestamp;
      
      if (age < CACHE_DURATION) {
        return data.countries;
      }
    }
  } catch (error) {
    console.error('Failed to load cached countries:', error);
  }
  
  // Fetch from API
  try {
    const response = await fetch(COUNTRIES_API);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    
    const data = await response.json();
    
    // Transform to our format
    const countries: Country[] = data
      .map((country: any) => ({
        name: country.name.common,
        code: country.cca2
      }))
      .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
    
    // Cache the results
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        countries,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Failed to cache countries:', error);
    }
    
    return countries;
  } catch (error) {
    console.error('Failed to fetch countries from API:', error);
    
    // Fallback to basic list if API fails
    return getFallbackCountries();
  }
}

/**
 * Fallback country list if API is unavailable
 */
function getFallbackCountries(): Country[] {
  return [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Canada', code: 'CA' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Egypt', code: 'EG' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'Greece', code: 'GR' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Japan', code: 'JP' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Norway', code: 'NO' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Russia', code: 'RU' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Singapore', code: 'SG' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Korea', code: 'KR' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Turkey', code: 'TR' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
    { name: 'Vietnam', code: 'VN' }
  ];
}

/**
 * Clear country cache (useful for testing or forcing refresh)
 */
export function clearCountryCache(): void {
  localStorage.removeItem(CACHE_KEY);
}
