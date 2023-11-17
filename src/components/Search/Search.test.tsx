/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';
// import { screen, renderWithProviders, waitFor, fireEvent } from '@/components/rtl-utils';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders, waitFor, screen } from '@/components/rtl-utils';
import { mockResponsePeoples } from '@/mocks/handlers';
import { mockLukeSkywalkerData } from '@/components/Hero/Hero.test';
import MainPage from '@/components/MainPage/MainPage.tsx';

beforeAll(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Pagination component tests', () => {
  test('Make sure the component updates URL query parameter when page changes', async () => {
    fetchMock.mockOnceIf('https://swapi.dev/api/people/?search=&page=1', () => {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify({ ...mockResponsePeoples }),
      });
    });

    fetchMock.mockOnceIf('https://swapi.dev/api/people/?search=&page=2', () => {
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

    await waitFor(async () => {
      renderWithProviders(
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      );
    });

    const submitButton = await screen.getByTestId('submit_button');

    await waitFor(() => {
      expect(submitButton).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });
});
