import { fireEvent, screen, waitFor } from '@testing-library/react';
import * as AppContext from '@/context-store.tsx';
import { render } from '@/components/rtl-utils.tsx';
import {
  mockContextValue,
  mockFirstItemContextValue,
} from '@/components/SearchItems/SearchItems.test.tsx';
import Hero from '@/components/Hero/Hero.tsx';
import * as getHeroNumberObject from '@/shared/utils/getHeroNumber.ts';
import SearchItems from '@/components/SearchItems/SearchItems.tsx';

jest.mock('@/context-store.tsx');
jest.mock('@/services/SwapiService.ts');

describe('Hero component tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should render correct data', () => {
    const contextValue = {
      contextData: mockFirstItemContextValue,
      setContextData: () => {},
    };

    const mockGetHeroNumber = jest.spyOn(getHeroNumberObject, 'default');
    mockGetHeroNumber.mockImplementation(() => 1);

    jest.spyOn(AppContext, 'useContextData').mockImplementation(() => contextValue);

    const { getByText } = render(
      <Hero heroData={mockFirstItemContextValue.searchData[0]} setHeroNumber={() => {}} />,
      {
        value: contextValue,
      }
    );

    const heroesName = getByText('Luke Skywalker');
    expect(heroesName).toBeInTheDocument();

    const heroesBirthdayDate = getByText('Birthday date: 19BBY');
    expect(heroesBirthdayDate).toBeInTheDocument();

    const heroesGender = getByText('Gender: male');
    expect(heroesGender).toBeInTheDocument();
  });

  it('should open details component after click', async () => {
    const contextValue = {
      contextData: mockContextValue,
      setContextData: jest.fn(),
    };
    jest.spyOn(AppContext, 'useContextData').mockImplementation(() => contextValue);

    render(<SearchItems />, {
      value: contextValue,
    });

    fireEvent.click(screen.getByTestId('hero_id_1'));

    await waitFor(() => {
      expect(contextValue.setContextData).toHaveBeenCalled();
    });
  });
});
