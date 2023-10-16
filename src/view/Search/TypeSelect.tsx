import React from 'react';

export type CountriesListType = {
  value: string;
  text: string;
};

export interface ITypeSelectPropsType extends React.ComponentPropsWithRef<'select'> {
  setSearchType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

function TypeSelect({ setSearchType, value }: ITypeSelectPropsType) {
  const countriesList: CountriesListType[] = [
    { value: 'people', text: 'People' },
    { value: 'planets', text: 'Planets' },
    { value: 'films', text: 'Films' },
    { value: 'species', text: 'Species' },
    { value: 'vehicles', text: 'Vehicles' },
    { value: 'starships', text: 'Starships' },
  ];

  return (
    <select
      value={value}
      className="block-address_select inter-400-font font-size_m color_grey-dark"
      onChange={setSearchType}
    >
      {countriesList.map((el, index) => {
        const itemKey = `key-${index + 1}`;

        return (
          <option value={el.value} key={itemKey}>
            {el.text}
          </option>
        );
      })}
    </select>
  );
}

export default TypeSelect;

/*

import React from 'react';

export type CountriesListType = {
  value: string;
  text: string;
};

export interface ITypeSelectPropsType extends React.ComponentPropsWithRef<'select'> {
  setSearchType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

class TypeSelect extends React.Component<ITypeSelectPropsType> {
  countriesList: CountriesListType[] = [
    { value: 'people', text: 'People' },
    { value: 'planets', text: 'Planets' },
    { value: 'films', text: 'Films' },
    { value: 'species', text: 'Species' },
    { value: 'vehicles', text: 'Vehicles' },
    { value: 'starships', text: 'Starships' },
  ];

  render() {
    return (
      <select
        value={this.props.value}
        className="block-address_select inter-400-font font-size_m color_grey-dark"
        onChange={this.props.setSearchType}
      >
        {this.countriesList.map((el, index) => {
          const itemKey = `key-${index + 1}`;

          return (
            <option value={el.value} key={itemKey}>
              {el.text}
            </option>
          );
        })}
      </select>
    );
  }
}

export default TypeSelect;

*/
