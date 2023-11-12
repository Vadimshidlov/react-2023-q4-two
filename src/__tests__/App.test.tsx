import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ContextDataStoreProvider } from '@/context-store.tsx';
import App from '@/App.tsx';

jest.mock('@/context-store.tsx');

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(
    <ContextDataStoreProvider>
      <App />
    </ContextDataStoreProvider>
  );
  expect(true).toBeTruthy();
});
