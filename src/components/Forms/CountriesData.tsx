/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { RefObject } from 'react';
import { useCountriesSelector } from '@/Hooks/redux';

function CountriesData({
  inputRef,
  countryValue,
}: {
  inputRef: RefObject<HTMLInputElement>;
  countryValue: string | null;
}) {
  const { countries } = useCountriesSelector((state) => state.countriesReducer);

  const showData = countries.filter((country) => {
    if (countryValue) {
      return country.toLocaleLowerCase().includes(countryValue);
    }
  });

  const ref = inputRef;
  console.log(countries);

  return (
    <ul>
      {showData.map((country) => (
        <li
          onClick={() => {
            if (ref.current) {
              ref.current.value = country;
            }
          }}
          key={country}
        >
          {country}
        </li>
      ))}
    </ul>
  );
}

export default CountriesData;
