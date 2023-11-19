import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { screen, renderWithProviders, waitFor, fireEvent } from '@/components/rtl-utils';
import Hero from '@/components/Hero/Hero';
import SearchItems from '@/components/SearchItems/SearchItems';
import { mockLukeSkywalkerData, mockResponsePeoples } from '@/mocks/apiResponse';
import { heroesAPI } from '@/services/HeroesService';

describe('Hero component tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
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
    const spySelectHeroApiCall = jest.spyOn(heroesAPI, 'useFetchSelectHeroQuery');

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
