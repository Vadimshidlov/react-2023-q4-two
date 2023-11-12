// import { RenderOptions, render } from '@testing-library/react';
// import { ReactElement } from 'react';
// import { AuthContextType, ContextDataStore } from '@/context-store.tsx';

// interface IExtendedRenderOptions extends RenderOptions {
//   value?: AuthContextType;
//   initialEntries?: string[];
// }

// export const customRender = (
//   ui: ReactElement,
//   options?: Omit<IExtendedRenderOptions, 'wrapper'>
// ) => {
//   function Wrapper({ children }: { children: React.ReactNode }) {
//     return <ContextDataStore.Provider value={options?.value}>{children}
// </ContextDataStore.Provider>;
//   }

//   return render(ui, { wrapper: Wrapper, ...options });
// };

// export * from '@testing-library/react';
// export { customRender as render };
