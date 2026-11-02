import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';

export function EngineeringIntro() {
 return <section className="engineering-intro" aria-labelledby="engineering-intro-title">
  <div className="page-wrap section-pad engineering-intro-layout">
   <div><div className="section-kicker"><span>01</span> AT THE WHITEBOARD</div><h2 id="engineering-intro-title">Before the code,<br/>I draw the flow.</h2></div>
   <div className="engineering-intro-copy"><p>Where does the request go? Who owns the data? What happens if this step fails?</p><p>That is usually where I start. A rough diagram helps me find the parts we have not thought through yet, and gives the team something specific to discuss.</p><Link href="/principles">A few architecture decisions I think about <ArrowUpRight size={18} aria-hidden="true"/></Link></div>
  </div>
 </section>;
}

function Node({title,detail}:{title:string;detail:string}) {
 return <div className="architecture-node"><strong>{title}</strong><span>{detail}</span></div>;
}

export function DesignPrinciples() {
 return <section className="architecture-notes" aria-labelledby="architecture-title">
  <div className="page-wrap section-pad">
   <header className="architecture-header"><span className="notebook-label">ENGINEERING NOTES / 01—03</span><h1 id="architecture-title">How I think about<br/>software design.</h1><p>Some decisions I come back to when designing a system. These are small, illustrative examples—the interesting part is deciding when each approach is useful.</p></header>

   <article className="architecture-entry" aria-labelledby="boundaries-title">
    <div className="architecture-entry-copy"><span className="notebook-label">01 / BOUNDARIES</span><h2 id="boundaries-title">One application can still have clear boundaries.</h2><p>I would start a small system with one deployable application. Accounts, core workflows, and reporting can live together without reaching into each other’s tables.</p><p>The boundary matters more than the number of services. A module exposes an interface; its storage and business rules stay behind that interface.</p><dl><dt>What would change my mind?</dt><dd>A part of the system needs a different scaling profile, release schedule, or team owner. Then there is a concrete reason to split it out.</dd></dl></div>
    <figure className="architecture-diagram">
     <span className="diagram-label">REQUEST PATH</span><Node title="Browser / mobile" detail="HTTP request"/><ArrowDown className="diagram-arrow" aria-hidden="true"/>
     <div className="application-boundary"><span className="diagram-label">ONE APPLICATION · ONE DEPLOYMENT</span><Node title="API layer" detail="Authentication · validation"/><div className="module-grid"><Node title="Accounts" detail="Identity & access"/><Node title="Workflows" detail="Business rules"/><Node title="Reports" detail="Read queries"/></div><p className="diagram-annotation">Calls go through module interfaces.</p></div>
     <figcaption>A modular monolith. Fewer moving parts to deploy, with boundaries that can be tested independently.</figcaption>
    </figure>
   </article>

   <article className="architecture-entry" aria-labelledby="async-title">
    <div className="architecture-entry-copy"><span className="notebook-label">02 / REQUEST LIFECYCLE</span><h2 id="async-title">A report should not hold a request open.</h2><p>A short query can run in the request. A large export is different: create a job, return its ID, and let a worker generate the file.</p><p>The UI can show the job’s status while the user carries on. The worker needs a timeout, a retry limit, and a way to avoid creating the same output twice.</p><dl><dt>The cost</dt><dd>There is now job state to maintain and a worker to operate. I would add this when the work is slow enough to justify it.</dd></dl></div>
    <figure className="architecture-diagram">
     <span className="diagram-label">EXAMPLE: GENERATE AN EXPORT</span><Node title="POST /exports" detail="Validate request · create job"/>
     <div className="request-reply"><ArrowRight size={16} aria-hidden="true"/><span>202 Accepted + job ID → UI</span></div>
     <ArrowDown className="diagram-arrow" aria-hidden="true"/><Node title="Job queue" detail="Pending work · bounded retries"/><ArrowDown className="diagram-arrow" aria-hidden="true"/><Node title="Worker" detail="Generate file → object storage"/><ArrowDown className="diagram-arrow" aria-hidden="true"/><Node title="Job status" detail="Queued → running → ready / failed"/>
     <figcaption>The UI checks status by job ID. A completed job returns a download link; a failed job returns a useful error.</figcaption>
    </figure>
   </article>

   <article className="architecture-entry" aria-labelledby="release-title">
    <div className="architecture-entry-copy"><span className="notebook-label">03 / CHANGING A RUNNING SYSTEM</span><h2 id="release-title">The migration is part of the design.</h2><p>Renaming a database field looks simple until old and new application versions are running at the same time. I would make the change in stages.</p><p>Add the new field, backfill existing records, switch the application over, and remove the old field in a later release. Each step needs a check before the next one.</p><dl><dt>Before release</dt><dd>Can the previous version still run? How will we verify the backfill? Which step stops being reversible? Those questions belong in the review.</dd></dl></div>
    <figure className="architecture-diagram migration-diagram"><span className="diagram-label">EXAMPLE: REPLACING A DATABASE FIELD</span><ol>
     <li><span>01</span><div><strong>Expand</strong><p>Add the new field. Keep the old one working.</p></div></li>
     <li><span>02</span><div><strong>Backfill</strong><p>Copy existing data in batches. Check counts and values.</p></div></li>
     <li><span>03</span><div><strong>Switch</strong><p>Move reads and writes to the new field. Monitor errors.</p></div></li>
     <li><span>04</span><div><strong>Contract</strong><p>Remove the old field after older versions are retired.</p></div></li>
    </ol><figcaption>Separate releases give the team time to verify the change before removing the old path.</figcaption></figure>
   </article>
   <footer className="architecture-footer"><p>I use diagrams like these in design discussions and code reviews. The goal is to get the assumptions out of our heads and onto the page.</p><Link href="/playground" prefetch={false}>For something you can play with, visit the playground <ArrowUpRight size={18} aria-hidden="true"/></Link></footer>
  </div>
 </section>;
}
