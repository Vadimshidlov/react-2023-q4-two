import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders, waitFor, screen, fireEvent } from '@/components/rtl-utils';
import { mockResponsePeoples, mockLukeSkywalkerData } from '@/mocks/apiResponse';
import MainPage from '@/components/MainPage/MainPage.tsx';
import * as reduxHooks from '@/hooks/redux';
import * as actions from '@/store/SearchSlice';

beforeAll(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Search component tests', () => {
  test('Search input should save value to Redux store', async () => {
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

    const searchDispatch = jest.spyOn(reduxHooks, 'useSearchDispatch').mockReturnValue(jest.fn());
    const changeSearchMock = jest.spyOn(actions, 'changeSearch');

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

    await waitFor(() => {
      const searchInput: HTMLInputElement = screen.getByRole('textbox');

      fireEvent.change(searchInput, { target: { value: 'Luke Skywalker' } });
      expect(searchInput.value).toBe('Luke Skywalker');

      fireEvent.click(submitButton);
      expect(searchDispatch).toHaveBeenCalled();
      expect(changeSearchMock).toHaveBeenCalled();
      expect(changeSearchMock).toHaveBeenCalledTimes(1);
      expect(changeSearchMock).toHaveBeenCalledWith('Luke Skywalker');
    });
  });
});
