import React, { forwardRef, useEffect, useRef } from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Stack, Combobox, ComboboxOption } from '@strapi/design-system';

import { updateRelation } from '../../api';
import { useMarketLocationsData } from '../../hooks';
import { autocompleteListener } from './input.helpers';

const Input = forwardRef((props, ref) => {
  const allowClickRef = useRef(false);

  const { name, value, onChange, intlLabel, attribute, placeholder, required, error } = props;
  const parsedValue = JSON.parse(value || null);
  const { markets, locations, isLoading, errorMessage } = useMarketLocationsData({
    value: parsedValue,
  });

  //Extract id of current item
  const { modifiedData } = useCMEditViewDataManager();
  const { id } = modifiedData;

  //Turn autocomplete off for all comboboxes not to show options without search
  useEffect(autocompleteListener, []);

  useEffect(() => {
    const submitButton = document.querySelector('button[type="submit"]');
    const handleClick = async (event) => {
      if (!allowClickRef.current) {
        event.preventDefault();
        await updateRelation({ data: parsedValue, id });
        allowClickRef.current = true;
        event.target.click();
      }
    };

    submitButton?.addEventListener('click', handleClick);

    return () => {
      submitButton?.removeEventListener('click', handleClick);
    };
  }, [parsedValue, id]);

  const selectedMarket = parsedValue && markets.length > 0 ? parsedValue?.marketId || '' : '';
  const selectedLocation =
    parsedValue?.locationId && locations.length > 0 ? parsedValue.locationId : '';

  const handleMarketChange = (e) => {
    allowClickRef.current = false;
    const newValue = { marketId: e };

    onChange({
      target: { name, value: e ? JSON.stringify(newValue) : null, type: attribute.type },
    });
  };

  const handleLocationChange = (e) => {
    allowClickRef.current = false;
    const newValue = { ...parsedValue, locationId: e };

    onChange({
      target: { name, value: JSON.stringify(newValue), type: attribute.type },
    });
  };

  return (
    <Stack spacing={1}>
      <Combobox
        required={required}
        value={selectedMarket}
        error={error || errorMessage}
        onChange={handleMarketChange}
        placeholder={placeholder || ''}
        label={intlLabel?.defaultMessage || ''}
        onClear={() => handleMarketChange(null)}
      >
        {markets.length > 0 &&
          markets?.map((market) => (
            <ComboboxOption key={market.id} value={market.id}>
              {market.name}
            </ComboboxOption>
          ))}
      </Combobox>
      {locations?.length > 0 && (
        <Combobox
          label="Location"
          value={selectedLocation}
          placeholder="Select Location"
          onChange={handleLocationChange}
          onClear={() => handleLocationChange(null)}
        >
          {locations?.map((location) => (
            <ComboboxOption key={location.id} value={location.id}>
              {location.name}
            </ComboboxOption>
          ))}
        </Combobox>
      )}
    </Stack>
  );
});

export default Input;
