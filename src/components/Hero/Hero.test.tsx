/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import { screen, renderWithProviders, waitFor, fireEvent } from '@/components/rtl-utils';
import Hero from '@/components/Hero/Hero';
import SearchItems from '@/components/SearchItems/SearchItems';
import { mockResponsePeoples } from '@/mocks/handlers';

// eslint-disable-next-line import/prefer-default-export
export const mockLukeSkywalkerData = {
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
};

describe('Hero component tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should render correct data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Hero setHeroNumber={jest.fn()} heroData={mockLukeSkywalkerData} />
      </MemoryRouter>
    );

    const heroesName = await screen.getByText('Luke Skywalker');
    expect(heroesName).toBeInTheDocument();

    const heroesBirthdayDate = await screen.getByText('Birthday date: 19BBY');
    expect(heroesBirthdayDate).toBeInTheDocument();

    const heroesGender = await screen.getByText('Gender: male');
    expect(heroesGender).toBeInTheDocument();
  });

  test('Validate that clicking on a card opens a detailed card component', async () => {
    fetchMock.mockOnceIf('https://swapi.dev/api/people/?search=&page=1', () => {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify({ ...mockResponsePeoples }),
      });
    });

    fetchMock.mockOnceIf('https://swapi.dev/api/people/1', () => {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify({ ...mockLukeSkywalkerData }),
      });
    });

    await waitFor(() => {
      renderWithProviders(
        <MemoryRouter>
          <SearchItems />
        </MemoryRouter>
      );
    });

    const heroes = await screen.getAllByTestId('hero-item');

    await waitFor(() => {
      fireEvent.click(heroes[0]);
    });

    const detailsContainer = await screen.getByTestId('details-container');

    await waitFor(() => {
      expect(detailsContainer).toBeInTheDocument();
    });
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    fetchMock.mockOnceIf('https://swapi.dev/api/people/?search=&page=1', () => {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify({ ...mockResponsePeoples }),
      });
    });

    const spySelectHeroApiCall = fetchMock.mockOnceIf('https://swapi.dev/api/people/1', () => {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify({ ...mockLukeSkywalkerData }),
      });
    });

    // const spySelectHeroApiCall = jest.spyOn(heroesAPI, 'useFetchSelectHeroQuery');

    await waitFor(() => {
      renderWithProviders(
        <MemoryRouter>
          <SearchItems />
        </MemoryRouter>
      );
    });

    const heroes = await screen.getAllByTestId('hero-item');

    await waitFor(() => {
      fireEvent.click(heroes[0]);
    });

    const detailsContainer = await screen.getByTestId('details-container');

    await waitFor(() => {
      expect(detailsContainer).toBeInTheDocument();
    });

    expect(spySelectHeroApiCall).toHaveBeenCalled();
  });
});
