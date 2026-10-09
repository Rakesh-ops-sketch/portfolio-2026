import type { Access, PayloadRequest } from 'payload';
export const owner = ({ req }: { req:PayloadRequest }) => Boolean(req.user);
export const published: Access = ({ req }) => req.user ? true : { _status: { equals: 'published' } };
export const validLink = (value: unknown) => !value || (typeof value === 'string' && /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i.test(value)) || 'Use a relative path, HTTPS URL, email, or telephone link.';
export const validSlug = (value: unknown) => typeof value === 'string' && /^(home|[a-z0-9]+(?:-[a-z0-9]+)*)$/.test(value) && !['admin','api','preview','exit-preview','robots','sitemap','sw','manifest','_next'].includes(value) || 'Use a unique lowercase slug; system routes are reserved.';
export const validColor = (value: unknown) => !value || typeof value === 'string' && /^#[\da-f]{6}$/i.test(value) || 'Use a six-digit hex color.';
