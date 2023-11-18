import { rest } from 'msw';
import { mockLukeSkywalkerData } from '@/components/Hero/Hero.test';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('https://swapi.dev/api/people/', (_req, res, ctx) => {
    const search = _req.url.searchParams.get('search');
    const page = _req.url.searchParams.get('page');

    if (search === '' && page === '1') {
      return res(
        ctx.json({
          count: 82,
          next: 'https://swapi.dev/api/people/?search=&page=2',
          previous: null,
          results: arrResult,
        })
      );
    }

    return res(ctx.json(JSON.stringify(mockResponsePeoples)));
  }),
  rest.get('https://swapi.dev/api/people/', (_req, res, ctx) => {
    const search = _req.url.searchParams.get('search');
    const page = _req.url.searchParams.get('page');

    if (search === '' && page === '2') {
      return res(
        ctx.json({
          count: 82,
          next: 'https://swapi.dev/api/people/?search=&page=2',
          previous: null,
          results: arrResult,
        })
      );
    }

    return res(ctx.json(JSON.stringify(mockResponsePeoples)));
  }),
  rest.get('https://swapi.dev/api/people/1', (_req, res, ctx) => {
    return res(ctx.json(JSON.stringify(mockLukeSkywalkerData)));
  }),
];
