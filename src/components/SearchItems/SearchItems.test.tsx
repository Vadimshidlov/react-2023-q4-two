/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
// import { server } from '@/mocks/server';
// eslint-disable-next-line object-curly-newline
import { screen, renderWithProviders, waitFor } from '@/components/rtl-utils';
import { mockResponsePeoples } from '@/mocks/handlers';
import SearchItems from '@/components/SearchItems/SearchItems';

// beforeAll(() => server.listen());
// afterEach(() => {
//   server.resetHandlers();
// });

// afterAll(() => server.close());

beforeAll(() => {
  jest.clearAllMocks();
});

describe('SearchItems component tests', () => {
  test('HeroItems container has 10 child elements', async () => {
    // jest.spyOn(getTotalPages, 'default').mockReturnValue(10);

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

    const heroes = await screen.getAllByTestId('hero-item');

    // await waitFor(() => screen.debug());
    // await waitFor(() => screen.debug());
    expect(heroes.length).toBe(10);
  });

  test('Check that an appropriate message is displayed if no cards are present', async () => {
    // jest.spyOn(getTotalPages, 'default').mockReturnValue(10);

    fetchMock.mockOnceIf('https://swapi.dev/api/people/?search=&page=1', () => {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify({
          count: 0,
          next: '',
          previous: null,
          results: [],
        }),
      });
    });

    await waitFor(() => {
      renderWithProviders(
        <MemoryRouter>
          <SearchItems />
        </MemoryRouter>
      );
    });

    const messageText = await screen.getByText(/Sad news... Heroes are not found/i);

    expect(messageText).toBeInTheDocument();

    const messageContainer = await screen.getByTestId('not-found-message');

    expect(messageContainer).toBeInTheDocument();
  });
});
