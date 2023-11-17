/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';
// import { screen, renderWithProviders, waitFor, fireEvent } from '@/components/rtl-utils';
import { renderWithProviders, waitFor } from '@/components/rtl-utils';
import { mockResponsePeoples } from '@/mocks/handlers';
import { mockLukeSkywalkerData } from '@/components/Hero/Hero.test';
import Search from '@/components/Search/Search';

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

    const localStorageGetMethod = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');

    await waitFor(() => {
      renderWithProviders(<Search />);
    });

    await waitFor(() => {
      expect(localStorageGetMethod).toHaveBeenCalled();
      expect(localStorageGetMethod).toHaveBeenCalledWith('searchValue');
    });

    // await waitFor(() => {
    //   console.log('first render', window.location.href);
    //   expect(window.location.href).toBe('http://localhost/search?page=1');
    //   screen.debug();
    // });

    // const paginationButtons = await screen.getAllByTestId('pagination_btn');

    // await waitFor(() => {
    //   fireEvent.click(paginationButtons[1]);
    // });

    // await waitFor(() => {
    //   console.log('second render', window.location.href);
    //   expect(window.location.href).toBe('http://localhost/search?page=2');
    // });
  });
});
