import Search, { PeopleRequestType } from 'view/Search/Search';
// eslint-disable-next-line object-curly-newline
import { Component, FormEvent } from 'react';
import SearchItems from 'view/SearchItems/SearchItems';
import SwapiService from 'services/SwapiService';
import './MainPage.scss';
import ErrorButton from 'view/ErrorButton/ErrorButton';

export type MainPageState = {
  searchValue: string;
  fetchError: string;
  searchData: PeopleRequestType[];
  isLoading: boolean;
};

class MainPage extends Component<object, MainPageState> {
  swapiApi = SwapiService;

  constructor(props: object) {
    super(props);
    this.state = {
      searchValue: localStorage.getItem('searchValue') || '',
      fetchError: '',
      searchData: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const searchValueFromStorage = localStorage.getItem('searchValue');

    this.setState({ isLoading: true });
    if (!localStorage.getItem('searchValue')) {
      const peopleData = await this.swapiApi.getAllPeoples();
      this.setState({ searchData: peopleData });
    } else if (searchValueFromStorage) {
      const searchPeopleData = await this.swapiApi.searchPeoples(searchValueFromStorage);
      this.setState({ searchData: searchPeopleData });
    }

    this.setState({ isLoading: false });
  };

  searchFormHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { searchValue } = this.state;
    localStorage.setItem('searchValue', searchValue);
    this.setState({ isLoading: true });
    const searchPeopleData = await this.swapiApi.searchPeoples(searchValue);
    this.setState({ isLoading: false });
    this.setState({ searchData: searchPeopleData, isLoading: false });
  };

  render() {
    const { searchValue, fetchError } = this.state;
    const { searchData, isLoading } = this.state;

    return (
      <div className="main-page__container">
        <h2 className="page__title">Star Wars Heroes!!!</h2>
        <ErrorButton />
        <Search
          searchFormHandler={this.searchFormHandler}
          searchValue={searchValue}
          setSearchValue={(value) => this.setState({ searchValue: value })}
          fetchError={fetchError}
          setFetchError={(error) => this.setState({ fetchError: error })}
        />
        <SearchItems searchData={searchData} isLoading={isLoading} />
      </div>
    );
  }
}

export default MainPage;
