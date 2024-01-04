import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PeopleRequestType, PeoplesRequestType } from '@/components/Search/types.ts';

// eslint-disable-next-line import/prefer-default-export
export const heroesAPI = createApi({
  reducerPath: 'heroesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (build) => ({
    fetchAllHeroes: build.query<PeoplesRequestType, { searchValue: string; page: number }>({
      query: ({ searchValue = '', page = 1 }) => ({
        url: '/people/',
        params: {
          search: searchValue,
          page,
        },
      }),
    }),
    fetchSelectHero: build.query<PeopleRequestType, number>({
      query: (selectHeroNumber) => ({
        url: `/people/${selectHeroNumber}`,
      }),
    }),
  }),
});
