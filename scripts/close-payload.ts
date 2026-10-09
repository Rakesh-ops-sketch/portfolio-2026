import type { Payload } from 'payload';
/** CLI/test cleanup: Payload's Postgres adapter retains its initial pool client. */
export async function closePayload(payload:Payload){
 const pool=payload.db.pool as typeof payload.db.pool & {_clients:{release?:()=>void}[];_idle:{client:unknown}[]};
 if(pool){
  for(const client of pool._clients){if(!pool._idle.some(entry=>entry.client===client))client.release?.();}
  await pool.end();
 }
 await payload.destroy();
}
