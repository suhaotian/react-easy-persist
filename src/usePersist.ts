/**
 * index.ts
 * @author suhaotian
 * @description react easy persist hook
 * @created 2021-06-21 15:49:14
 * @copyright None
 * @last-modified 2021-06-21 15:49:14
 */
import { createUsePersist, Options } from './createUsePersist';

/**
 * common hook, and you can create your own
 */
export const usePersist: <T>({
  namePrefix,
  encode,
  decode,
  debounce,
  update,
  getValues,
  name,
}: Options<T>) => [Function, boolean] = createUsePersist({
  namePrefix: '@up',
  debounce: 200,
  encode: JSON.stringify,
  decode: JSON.parse,
});
