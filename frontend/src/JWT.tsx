import { atom } from "recoil";
import {recoilPersist} from 'recoil-persist';
import { User, BasicUser } from "./util/Interfaces";

const { persistAtom } = recoilPersist()

export const userModeState = atom<User | null>({
    key: 'userModeState',
    default: {} as User,
    effects_UNSTABLE: [persistAtom],
});

export const userJWT = atom({
    key: 'userJWT',
    default: '',
    effects_UNSTABLE: [persistAtom],
})
