// import { Component, ReactNode } from 'react';

// export type MyState = {
//   searchValue: string;
// };

// class Search extends Component<MyProps, MyState> {
//   constructor(props = {}) {
//     super(props);
//     this.state = {
//       searchValue: '',
//     };
//   }

//   render(): ReactNode {
//     return (
//       <div>
//         <form action="">
//           <input type="text" value={this.state.searchValue} />
//           <button type="submit">Search</button>
//         </form>
//       </div>
//     );
//   }
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Search.scss';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    console.log(searchValue);

    try {
      const response = axios.get(`https://swapi.dev/api/people/${searchValue}`);

      console.log(response);
    } catch (error) {
      console.log(error);
      setFetchError('No data');
    }
  }, [searchValue]);

  return (
    <div className="search__container">
      <input
        type="text"
        value={searchValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchValue(event.target.value);
        }}
      />
      <button type="button">Search</button>
      {fetchError ? <div className="data__result">fetchError</div> : null}
    </div>
  );
}

// interface State {
//   searchValue: string;
//   fetchError: string;
// }

// class Search extends React.Component<object, State> {
//   private readonly STARWARS_API_URL = 'https://swapi.dev/api/';

//   constructor(props: object) {
//     super(props);
//     this.state = {
//       searchValue: '',
//       fetchError: '',
//     };
//   }

//   componentDidUpdate(prevProps: object, prevState: State) {
//     const { state } = this;

//     if (prevState.searchValue !== state.searchValue) {
//       console.log(state.searchValue);

//       try {
//         fetch(this.STARWARS_API_URL + state.searchValue)
//           .then((response) => response.json())
//           .then((res) => console.log(res));
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }

//   render() {
//     const { state } = this;
//     return (
//       <div>
//         <input
//           type="text"
//           value={state.searchValue}
//           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//             this.setState({ searchValue: event.target.value });
//           }}
//         />
//         <button type="button">Search</button>
//       </div>
//     );
//   }
// }

export default Search;
