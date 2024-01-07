import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootStateType, SearchDispatchType } from '@/store/store.ts';

export const useSearchDispatch = () => useDispatch<SearchDispatchType>();
export const useSearchSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export const usePagesDispatch = () => useDispatch<SearchDispatchType>();
export const usePagesSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export const useViewModeDispatch = () => useDispatch<SearchDispatchType>();
export const useViewModeSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export const useUncontrolledFormDispatch = () => useDispatch<SearchDispatchType>();
export const useUncontrolledFormSelector: TypedUseSelectorHook<RootStateType> = useSelector;
