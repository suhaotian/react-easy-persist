/**
 * index.ts
 * @author suhaotian
 * @description create react easy persist hook
 * @created 2021-06-21 15:49:14
 * @copyright None
 * @last-modified 2021-06-21 15:49:14
 */

import { useRef } from 'react';
import { useMount, useDebounceEffect as useDebounce } from 'ahooks';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export interface CreateOptions {
  /** prefix for name */
  namePrefix: string;
  /** encode data, default was JSON.stringify */
  encode: (state: any) => string;
  /** decode data, default was JSON.parse */
  decode: (result: string) => any;
  /** debounce ms, default 200ms */
  debounce: number;
  /** update value from storage if have */
}

export interface Options<T> {
  /** storage key name */
  name: string;
  update: Function;
  /** get new value */
  getValues: Function;
  /** prefix for name */
  namePrefix?: string;
  /** encode data, default was JSON.stringify */
  encode?: (state: T) => string;
  /** decode data, default was JSON.parse */
  decode?: (result: string) => T;
  /** debounce ms, default 200ms */
  debounce?: number;
}

export function createUsePersist(options: CreateOptions) {
  return function usePersist<T>({
    namePrefix = options.namePrefix,
    encode = options.encode,
    decode = options.decode,
    debounce = options.debounce,
    update,
    getValues,
    name,
  }: Options<T>): [Function, boolean] {
    const initedRef = useRef(false);
    const { getItem, setItem, removeItem } = useAsyncStorage(
      `${namePrefix}${name}`
    );

    useMount(async () => {
      const result = await getItem();
      if (result) {
        update(decode(result));
      }
      initedRef.current = true;
    });

    const values = getValues();

    useDebounce(
      () => {
        if (initedRef.current) {
          setItem(encode(values));
        }
      },
      [values],
      { wait: debounce }
    );

    function clear() {
      removeItem();
    }

    return [clear, initedRef.current];
  };
}
