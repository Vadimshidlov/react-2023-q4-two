/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';
import { screen, renderWithProviders, waitFor, fireEvent } from '@/components/rtl-utils';
import { mockResponsePeoples, mockLukeSkywalkerData } from '@/mocks/apiResponse';
import AppRoutes from '@/components/AppRoutes';

beforeAll(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();

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
});

describe('Pagination component tests', () => {
  test('Make sure the component updates URL query parameter when page changes', async () => {
    await waitFor(() => {
      renderWithProviders(<AppRoutes />);
    });

    await waitFor(() => {
      expect(window.location.href).toBe('http://localhost/search?page=1');
    });

    const paginationButtons = await screen.getAllByTestId('pagination_btn');

    await waitFor(() => {
      fireEvent.click(paginationButtons[1]);
    });

    await waitFor(() => {
      expect(window.location.href).toBe('http://localhost/search?page=2');
    });
  });
});
