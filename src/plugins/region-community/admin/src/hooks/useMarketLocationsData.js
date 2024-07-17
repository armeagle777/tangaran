import { useState, useEffect } from 'react';

import { getRegionsData } from '../api';

const useMarketLocationsData = ({ value }) => {
  const marketId = value?.marketId;

  const [markets, setMarkets] = useState([]);
  const [locations, setLocations] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    const selectedMarket = markets.find((market) => market.id == marketId);
    if (selectedMarket?.locations) {
      setLocations(selectedMarket?.locations);
    } else {
      setLocations([]);
    }
  }, [marketId]);

  async function fetchOptions() {
    try {
      setIsLoading(true);
      const data = await getRegionsData();
      if (!data) {
        return setErrorMessage('Something went wrong');
      }

      setMarkets(data);
      const selectedMarket = data?.find((market) => market.id == marketId);
      if (selectedMarket?.locations) {
        setLocations(selectedMarket?.locations);
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return { markets, locations, isLoading, errorMessage };
};

export default useMarketLocationsData;
