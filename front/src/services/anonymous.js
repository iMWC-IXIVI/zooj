import {v4 as uuidv4} from 'uuid';

export function GetAnonymous() {
    let anonId = localStorage.getItem('anon_id')

    if (anonId) {
        return anonId;
    }

    let newAnonId = uuidv4();
    localStorage.setItem('anon_id', newAnonId);
    return newAnonId
}

export function ResetAnonymous() {
    localStorage.removeItem('anon_id');
    GetAnonymous()
}