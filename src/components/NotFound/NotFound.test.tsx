import '@testing-library/jest-dom';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { screen, waitFor } from '@/components/rtl-utils';
import { mockResponsePeoples } from '@/mocks/apiResponse';
import MainPage from '@/components/MainPage/MainPage.tsx';
import { setupStore } from '@/store/store.ts';
import AppLayout from '@/components/AppLayout/AppLayout.tsx';
import NotFound from '@/components/NotFound/NotFound.tsx';

beforeAll(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('NotFound component tests', () => {
  test('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    fetchMock.mockOnceIf('https://swapi.dev/api/people/?search=&page=1', () => {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify({ ...mockResponsePeoples }),
      });
    });

    const route = '/some/bad/route';

    await waitFor(async () => {
      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={setupStore()}>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate to="/search" />} />
                <Route path="/search" element={<MainPage />} />
              </Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Provider>
        </MemoryRouter>
      );
    });

    await waitFor(async () => {
      expect(screen.getByText('Not Found')).toBeInTheDocument();
    });
  });

  test('Ensure that the 404 page is not displayed when navigating to valid route', async () => {
    fetchMock.mockOnceIf('https://swapi.dev/api/people/?search=&page=1', () => {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify({ ...mockResponsePeoples }),
      });
    });

    await waitFor(async () => {
      render(
        <MemoryRouter>
          <Provider store={setupStore()}>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate to="/search" />} />
                <Route path="/search" element={<MainPage />} />
              </Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Provider>
        </MemoryRouter>
      );
    });

    await waitFor(async () => {
      expect(screen.queryByText('Not Found')).toBeNull();
    });
  });
});
