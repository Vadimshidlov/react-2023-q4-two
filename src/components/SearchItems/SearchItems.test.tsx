import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import SearchItems from '@/components/SearchItems/SearchItems.tsx';
import { server } from '@/mocks/server';
import { setupStore } from '@/store/store';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe('SearchItems component tests', () => {
  // test('<SearchItems/>', () => {});

  test('SearchItems has 10 child elements', () => {
    waitFor(() => {
      render(
        <Provider store={setupStore()}>
          <SearchItems />
        </Provider>
      );
    });

    screen.debug();
  });

  // test('Correct message is displayed if no cards are present.', () => {});
});
