// // import { userEvent } from '@testing-library/user-event';
// import * as AppContext from '@/context-store.tsx';
// import { render } from '@/components/rtl-utils.tsx';
// import {
//   mockContextValue,
//   mockFirstItemContextValue,
// } from '@/components/SearchItems/SearchItems.test.tsx';
// import Hero from '@/components/Hero/Hero.tsx';
// import * as getHeroNumberObject from '@/shared/utils/getHeroNumber.ts';
// import App from '@/App.tsx';

// describe('Hero component tests', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   test('Should render correct data', () => {
//     const contextValue = {
//       contextData: mockFirstItemContextValue,
//       setContextData: () => {},
//     };

//     const mockGetHeroNumber = jest.spyOn(getHeroNumberObject, 'default');
//     mockGetHeroNumber.mockImplementation(() => 1);

//     jest.spyOn(AppContext, 'useContextData').mockImplementation(() => contextValue);

//     const { getByText } = render(
//       <Hero heroData={mockFirstItemContextValue.searchData[0]} setHeroNumber={() => {}} />,
//       {
//         value: contextValue,
//       }
//     );

//     const heroesName = getByText('Luke Skywalker');
//     expect(heroesName).toBeInTheDocument();

//     const heroesBirthdayDate = getByText('Birthday date: 19BBY');
//     expect(heroesBirthdayDate).toBeInTheDocument();

//     const heroesGender = getByText('Gender: male');
//     expect(heroesGender).toBeInTheDocument();
//   });

//   it('should open details component after click', () => {
//     jest.mock('@/hooks/useFetching.ts', () => ({
//       getData: jest.fn(),
//       totalPages: 10,
//       pagesArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//       searchFormHandler: jest.fn(),
//       fetchError: jest.fn(),
//       setFetchError: jest.fn(),
//       currentPage: 1,
//       setCurrentPage: jest.fn(),
//     }));

//     const contextValue = {
//       contextData: mockContextValue,
//       setContextData: () => {},
//     };

//     // jest.spyOn(AppContext, 'useContextData').mockImplementation(() => contextValue);

//     const { asFragment } = render(<App />, {
//       value: contextValue,
//     });

//     expect(asFragment()).toMatchSnapshot();
//   });
// });
