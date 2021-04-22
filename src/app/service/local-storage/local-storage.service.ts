import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /**
   * Saves the given object into the local storage identified by the given key.
   *
   * @param key the key of the local storage entry
   * @param obj the stored object
   */
  public save(key: string, obj: any) {
    window.localStorage.setItem(key, JSON.stringify(obj));
  }

  /**
   * Gets the object with the given key from the local storage.
   * If not existing, null will be returned.
   *
   * @param key the key of the local storage entry
   */
  public get(key: string): any {
    return JSON.parse(window.localStorage.getItem(key));
  }

  /**
   * Returns true if the local storage contains an object with the given key, else false.
   *
   * @param key the key of the object to localize
   */
  public hasKey(key: string) {
    return window.localStorage.getItem(key) !== null;
  }

  /**
   * Removes the entries with the given keys from the local storage.
   *
   * @param keys the keys of the entries to be removed
   */
  public removeKeys(keys: string[]) {
    for (let key of keys) {
      window.localStorage.removeItem(key);
    }
  }
}
