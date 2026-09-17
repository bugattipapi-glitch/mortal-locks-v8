import { revalidateTag, unstable_cache } from 'next/cache';
import { getRuntimeSnapshot } from './runtime-data';

export const RUNTIME_CACHE_TAG = 'mortal-locks-runtime';

const getCachedRuntimeSnapshot = unstable_cache(
  () => getRuntimeSnapshot({ fallbackOnError: false }),
  ['mortal-locks-public-runtime-snapshot-v1'],
  {
    tags: [RUNTIME_CACHE_TAG],
    revalidate: 21_600,
  },
);

/**
 * Public routes share a six-hour snapshot so score polling and page traffic do
 * not keep Neon awake. Every in-app mutation invalidates this cache immediately.
 * A transient database failure is never cached; the existing preview fallback
 * remains available for that individual request.
 */
export async function getPublicRuntimeSnapshot() {
  try {
    return await getCachedRuntimeSnapshot();
  } catch {
    return getRuntimeSnapshot();
  }
}

export function invalidateRuntimeCache() {
  revalidateTag(RUNTIME_CACHE_TAG, { expire: 0 });
}
