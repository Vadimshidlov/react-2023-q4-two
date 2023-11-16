/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { screen, renderWithProviders, act, fireEvent, waitFor } from '@/components/rtl-utils';
import { mockResponsePeoples } from '@/mocks/handlers';
import SearchItems from '@/components/SearchItems/SearchItems';
import { mockLukeSkywalkerData } from '@/components/Hero/Hero.test';

beforeAll(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('DetailsComponent component tests', () => {
  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
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

    await act(async () => {
      await waitFor(() => {
        renderWithProviders(
          <MemoryRouter>
            <SearchItems />
          </MemoryRouter>
        );
      });
    });

    const heroes = screen.getAllByTestId('hero-item');

    await act(() => {
      fireEvent.click(heroes[0]);
    });

    const heroId = screen.getByText('Hero ID: 1');
    expect(heroId).toBeInTheDocument();

    const heroHeight = screen.getByText('Height: 172 sm');
    expect(heroHeight).toBeInTheDocument();

    const heroEyeColor = screen.getByText('Eye color: blue');
    expect(heroEyeColor).toBeInTheDocument();

    const heroMass = screen.getByText('Mass: 77 kg');
    expect(heroMass).toBeInTheDocument();

    const heroSkinColor = screen.getByText('Skin color: fair');
    expect(heroSkinColor).toBeInTheDocument();
  });

  test('Check that a loading indicator is displayed while fetching data', async () => {
    fetchMock.mockOnceIf('https://swapi.dev/api/people/?search=&page=1', () => {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify({ ...mockResponsePeoples }),
      });
    });

    fetchMock.mockOnceIf('https://swapi.dev/api/people/?search=&page=1', () => {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify({ ...mockResponsePeoples }),
      });
    });

    await waitFor(() => {
      renderWithProviders(
        <MemoryRouter>
          <SearchItems />
        </MemoryRouter>
      );
    });

    const heroes = screen.getAllByTestId('hero-item');

    act(() => {
      fireEvent.click(heroes[0]);
    });

    expect(screen.getByTestId('app-loader')).toBeInTheDocument();
  });

  test('Ensure that clicking the close button hides the component', async () => {
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

    await act(async () => {
      await waitFor(() => {
        renderWithProviders(
          <MemoryRouter>
            <SearchItems />
          </MemoryRouter>
        );
      });
    });

    const heroes = screen.getAllByTestId('hero-item');

    await act(() => {
      fireEvent.click(heroes[0]);
    });

    const detailsCloseBtn = screen.getByTestId('detail_close_btn');

    expect(detailsCloseBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(detailsCloseBtn);
    });

    await waitFor(async () => {
      const detailsCloseBtnNull = screen.queryByTestId('detail_close_btn');

      expect(detailsCloseBtnNull).not.toBeInTheDocument();
    });

    await waitFor(async () => {
      const detailsContainer = screen.queryByTestId('details-container');

      expect(detailsContainer).not.toBeInTheDocument();
    });
  });
});
