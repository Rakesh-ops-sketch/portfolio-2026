import { revalidatePath, revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload';
function refresh(context: Record<string, unknown> | undefined) {
  if (!context?.skipRevalidation) { revalidateTag('portfolio', { expire:0 }); revalidatePath('/', 'layout'); }
}
export const contentChanged: CollectionAfterChangeHook = ({ doc, previousDoc, context }) => {
  if (doc._status === 'published' || previousDoc?._status === 'published') refresh(context);
  return doc;
};
export const contentDeleted: CollectionAfterDeleteHook = ({ doc, context }) => { refresh(context); return doc; };
export const settingsChanged: GlobalAfterChangeHook = ({ doc, previousDoc, context }) => {
  if (doc._status === 'published' || previousDoc?._status === 'published') refresh(context);
  return doc;
};
