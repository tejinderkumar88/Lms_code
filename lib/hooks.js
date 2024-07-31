import { useDispatch, useSelector, useStore } from 'react-redux'
import { useRouter } from 'next/navigation';

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export const useAppStore = useStore;
export const useCustomRouter = useRouter;
