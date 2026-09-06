import { useCallback, useEffect, useMemo, useState } from 'react';
import { CATALOGUE } from '../data/catalogue';
import { FiltersContext } from './filtersContext';
import { VAN_PRICE_MAX } from './format';
import { fetchSanityVehicles, sanityClient } from './sanity';
import { getCars, getTw, getVans, seatsMatch, setActiveCatalogue } from './vehicles';

/* One source of truth for the filters and live catalogue from Sanity Studio. */
export default function FiltersProvider({ children }) {
  const [allVehicles, setAllVehicles] = useState(CATALOGUE);
  const [isLoading, setIsLoading] = useState(true);
  const [isSanityConnected, setIsSanityConnected] = useState(false);

  const [brandVan, setBrandVan] = useState('all');
  const [brandCar, setBrandCar] = useState('all');
  const [brandTw, setBrandTw] = useState('all');
  const [twType, setTwType] = useState('all');
  const [twSort, setTwSort] = useState('default');
  const [maxPrice, setMaxPrice] = useState(VAN_PRICE_MAX);
  const [seats, setSeats] = useState('all');
  const [acOnly, setAcOnly] = useState(false);

  const refreshVehicles = useCallback(async () => {
    try {
      const sanityData = await fetchSanityVehicles();
      if (Array.isArray(sanityData) && sanityData.length > 0) {
        // If Sanity is populated with full catalogue, Sanity is the authoritative master
        if (sanityData.length >= 10) {
          setAllVehicles(sanityData);
          setActiveCatalogue(sanityData);
        } else {
          // If only partial items exist in Sanity, merge with baseline so categories remain populated
          const merged = [...CATALOGUE];
          sanityData.forEach((sDoc) => {
            const idx = merged.findIndex((c) => c.id === sDoc.id || c._id === sDoc._id);
            if (idx !== -1) {
              merged[idx] = { ...merged[idx], ...sDoc };
            } else {
              // New vehicle created in Sanity Studio - prepend to top
              merged.unshift(sDoc);
            }
          });
          setAllVehicles(merged);
          setActiveCatalogue(merged);
        }
        setIsSanityConnected(true);
      }
    } catch (err) {
      console.info('Using local catalogue fallback (Sanity dataset empty or offline):', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshVehicles();

    // Subscribe to live Sanity Studio changes
    let subscription = null;
    try {
      subscription = sanityClient
        .listen('*[_type == "vehicle"]')
        .subscribe((update) => {
          if (update) {
            refreshVehicles();
          }
        });
    } catch (err) {
      console.warn('Sanity realtime listener not available:', err);
    }

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, [refreshVehicles]);

  const allVans = useMemo(() => getVans(allVehicles), [allVehicles]);
  const allCars = useMemo(() => getCars(allVehicles), [allVehicles]);
  const allTw = useMemo(() => getTw(allVehicles), [allVehicles]);

  const vans = useMemo(
    () =>
      allVans.filter((v) => {
        if (brandVan !== 'all' && v.brand !== brandVan) return false;
        if (v.price && v.price > maxPrice) return false;
        if (acOnly && !v.ac) return false;
        return seatsMatch(v, seats);
      }),
    [allVans, brandVan, maxPrice, acOnly, seats]
  );

  const cars = useMemo(
    () => allCars.filter((v) => brandCar === 'all' || v.brand === brandCar),
    [allCars, brandCar]
  );

  const tw = useMemo(
    () =>
      allTw.filter((v) => {
        if (brandTw !== 'all' && v.brand !== brandTw) return false;
        return twType === 'all' || v.type === twType;
      }),
    [allTw, brandTw, twType]
  );

  const twSorted = useMemo(() => {
    const list = tw.slice();
    if (twSort === 'price-asc' || twSort === 'price-desc') {
      const dir = twSort === 'price-desc' ? -1 : 1;
      list.sort((a, b) => {
        /* Anything priced at the counter sits at the end either way. */
        if (a.price == null) return 1;
        if (b.price == null) return -1;
        return (a.price - b.price) * dir;
      });
    }
    return list;
  }, [tw, twSort]);

  const findVehicleById = useCallback(
    (id) => {
      if (!id) return null;
      return (
        allVehicles.find((v) => v.id === id || v._id === id) ||
        CATALOGUE.find((v) => v.id === id) ||
        null
      );
    },
    [allVehicles]
  );

  const value = useMemo(() => {
    const resetVans = () => {
      setBrandVan('all');
      setMaxPrice(VAN_PRICE_MAX);
      setSeats('all');
      setAcOnly(false);
    };

    /* How many filters are away from their default, for the sidebar button. */
    const activeCount = (group) => {
      if (group === 'van') {
        return (
          (brandVan !== 'all' ? 1 : 0) +
          (maxPrice !== VAN_PRICE_MAX ? 1 : 0) +
          (seats !== 'all' ? 1 : 0) +
          (acOnly ? 1 : 0)
        );
      }
      if (group === 'car') return brandCar !== 'all' ? 1 : 0;
      return (brandTw !== 'all' ? 1 : 0) + (twType !== 'all' ? 1 : 0);
    };

    return {
      allVehicles,
      allVans,
      allCars,
      allTw,
      isLoading,
      isSanityConnected,
      refreshVehicles,
      findVehicle: findVehicleById,
      brandVan, setBrandVan,
      brandCar, setBrandCar,
      brandTw, setBrandTw,
      twType, setTwType,
      twSort, setTwSort,
      maxPrice, setMaxPrice,
      seats, setSeats,
      acOnly, setAcOnly,
      vans, cars, tw, twSorted,
      resetVans, activeCount,
    };
  }, [
    allVehicles,
    allVans,
    allCars,
    allTw,
    isLoading,
    isSanityConnected,
    refreshVehicles,
    findVehicleById,
    brandVan,
    brandCar,
    brandTw,
    twType,
    twSort,
    maxPrice,
    seats,
    acOnly,
    vans,
    cars,
    tw,
    twSorted,
  ]);

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}
