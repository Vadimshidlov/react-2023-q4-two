// /* eslint-disable object-curly-newline */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import '@testing-library/jest-dom';
// import { createMemoryRouter, RouterProvider, Router } from 'react-router-dom';
// // import { fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { waitFor } from '@testing-library/react';
// import { render } from '@/components/rtl-utils';
// import { mockResponsePeoples } from '@/mocks/handlers';
// import { mockLukeSkywalkerData } from '@/components/Hero/Hero.test';
// import MainPage from '@/components/MainPage/MainPage.tsx';
// import AppLayout from '@/components/AppLayout/AppLayout.tsx';
// import { setupStore } from '@/store/store.ts';
//
// beforeAll(() => {
//   jest.clearAllMocks();
// });
//
// beforeEach(() => {
//   jest.clearAllMocks();
// });
//
// const setupMyTest = () => {
//   const router = createMemoryRouter(
//     [
//       {
//         path: '/',
//         element: <AppLayout />,
//       },
//
//       {
//         path: '/search',
//         element: (
//           <Provider store={setupStore()}>
//             <MainPage />
//           </Provider>
//         ),
//       },
//     ],
//     {
//       initialEntries: ['/search?page=1'],
//       initialIndex: 0,
//     }
//   );
//
//   render(<RouterProvider router={router} />);
//
//   return { router };
// };
//
// describe('Pagination component tests', () => {
//   test('Make sure the component updates URL query parameter when page changes', async () => {
//     fetchMock.mockOnceIf('https://swapi.dev/api/people/?search=&page=1', () => {
//       return Promise.resolve({
//         status: 200,
//         body: JSON.stringify({ ...mockResponsePeoples }),
//       });
//     });
//
//     fetchMock.mockOnceIf('https://swapi.dev/api/people/?search=&page=2', () => {
//       return Promise.resolve({
//         status: 200,
//         body: JSON.stringify({ ...mockResponsePeoples }),
//       });
//     });
//
//     fetchMock.mockOnceIf('https://swapi.dev/api/people/1', () => {
//       return Promise.resolve({
//         status: 200,
//         body: JSON.stringify({ ...mockLukeSkywalkerData }),
//       });
//     });
//
//     let routerMain: Router;
//
//     await waitFor(async () => {
//       const { router } = setupMyTest();
//       routerMain = router;
//     });
//
//     await waitFor(() => {
//       expect(routerMain.state.location.pathname).toEqual('/search?page=1');
//     });
//
//     // await act(async () => {
//     //   await waitFor(() => {
//     //
//     //   });
//     // });
//
//     // const paginationContainer = await screen.findByTestId('pagination_container');
//     // const paginationButtons = await screen.findAllByTestId('pagination_btn');
//
//     // expect(paginationContainer).toBeInTheDocument();
//     // expect(paginationButtons).toBeInTheDocument();
//
//     // await waitFor(async () => {
//     //   await act(() => {
//     //     fireEvent.click(paginationButtons[1]);
//     //   });
//     // });
//     //
//     // await waitFor(() => {
//     //   expect(window.location.pathname).toBe('/search?page=2');
//     // });
//   });
// });
