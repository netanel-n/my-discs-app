import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
    constructor() { }

    get<T>(key: string): null | T {
        const returnValue = localStorage.getItem(key);
        if (returnValue == null) return null;
        return JSON.parse(returnValue)
    }

    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }

    remove(key: string) {
        localStorage.removeItem(key);
        return true;
    }
}