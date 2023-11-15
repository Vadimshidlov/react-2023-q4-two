import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';
import { render, screen } from '@/components/rtl-utils.tsx';
import * as AppContext from '@/context-store.tsx';
import { mockResult } from '@/components/SearchItems/SearchItems.test.tsx';
import SwapiService from '@/services/SwapiService.ts';
import * as useFetching from '@/hooks/useFetching';
import SearchItems from '@/components/SearchItems/SearchItems.tsx';

jest.mock('@/context-store.tsx');
jest.mock('@/services/SwapiService.ts');
jest.mock('@/hooks/useFetching.ts');

const contextValue = {
  contextData: {
    searchData: mockResult,
    searchValue: '',
    currentPage: 1,
    isLoading: false,
    isLoadingDetails: false,
    isShowDetails: true,
  },
  setContextData: () => jest.fn(),
};

const promise = Promise.resolve({
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/2/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/6/',
  ],
  species: [],
  vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
  starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
});

const mockHookReturnedValue = {
  getData: jest.fn(),
  totalPages: 9,
  pagesArray: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  searchFormHandler: jest.fn(),
  fetchError: '',
  setFetchError: jest.fn(),
  currentPage: 1,
  setCurrentPage: jest.fn(),
};

jest.spyOn(useFetching, 'default').mockImplementation(() => mockHookReturnedValue);

jest.spyOn(AppContext, 'useContextData').mockImplementation(() => contextValue);

jest.spyOn(SwapiService, 'getSelectPeople').mockImplementation(() => promise);

describe('Hero component tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should render correct data', () => {
    act(() => {
      render(
        <MemoryRouter>
          <SearchItems />
        </MemoryRouter>,
        {
          value: contextValue,
        }
      );
    });

    screen.debug();
  });
});
