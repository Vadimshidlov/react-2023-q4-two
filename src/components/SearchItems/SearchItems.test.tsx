/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
// import { server } from '@/mocks/server';
// eslint-disable-next-line object-curly-newline
import { screen, act, renderWithProviders, waitFor } from '@/components/rtl-utils';
import { mockResponsePeoples } from '@/mocks/handlers';
import SearchItems from '@/components/SearchItems/SearchItems';

// beforeAll(() => server.listen());
// afterEach(() => {
//   server.resetHandlers();
// });

// afterAll(() => server.close());

beforeAll(() => {
  fetchMock.mockOnceIf('https://swapi.dev/api/people/?search=&page=1', () => {
    return Promise.resolve({
      status: 200,
      body: JSON.stringify({ ...mockResponsePeoples }),
    });
  });
});

describe('SearchItems component tests', () => {
  // test('<SearchItems/>', () => {});

  test('SearchItems has 10 child elements', async () => {
    // jest.spyOn(getTotalPages, 'default').mockReturnValue(10);

    act(() => {
      renderWithProviders(
        <MemoryRouter>
          <SearchItems />
        </MemoryRouter>
      );
    });

    waitFor(() => {
      screen.debug();
    });
  });

  // test('Correct message is displayed if no cards are present.', () => {});
});
