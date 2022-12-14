import { atom } from "recoil";
import {recoilPersist} from 'recoil-persist';

// Testing new github repo

const { persistAtom } = recoilPersist()

export const userModeState = atom({
    key: 'userModeState',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export const userJWT = atom({
    key: 'userJWT',
    default: '',
    effects_UNSTABLE: [persistAtom],
})