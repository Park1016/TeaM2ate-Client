import { atom, selector } from 'recoil';
import axios from 'axios';

export const typeSelector = selector({
    key: 'typeSelect',
    get: async() => {
        try {
            const res = await axios.get('/type/type.json');
            return res.data.type;
        } catch(err) {
            throw err
        }
    }
})

export const numSelector = selector({
    key: 'numSelect',
    get: async() => {
        try {
            const res = await axios.get('/type/number.json');
            return res.data.number;
        } catch(err) {
            throw err
        }
    }
})

export const tagSelector = selector({
    key: 'tagSelect',
    get: async() => {
        try {
            const res = await axios.get('/tags/tag.json');
            return res.data.tag;
        } catch(err) {
            throw err
        }
    }
})

export const progressState = atom({
    key: 'progressState',
    default: [
        {value: 'ing', name: '모집 중'},
        {value: 'done', name: '모집 마감'}
    ],
    // effects_UNSTABLE: [persistAtom]
});