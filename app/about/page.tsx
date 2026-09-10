import { ArrowUpRight, MapPin } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";

const values = [
  ["01", "Field reality first", "The best architecture starts with the people, devices, and constraints it must serve."],
  ["02", "Clarity compounds", "Clear decisions, ownership, and feedback loops help teams move quickly without creating chaos."],
  ["03", "Reliability is a feature", "Offline behavior, recovery paths, and observability deserve the same care as the visible interface."],
];

export default function AboutPage() {
  return (
    <div className="inner-page">
      <section className="inner-hero page-wrap">
        <div className="section-kicker"><span>01</span> About</div>
        <WordReveal className="inner-title" text="Builder, leader, and systems thinker." delay={0.08} eager />
        <div className="inner-hero-foot">
          <p>I work across product, engineering, and operations to turn complicated field problems into dependable software.</p>
          <span><MapPin className="size-4" /> Bengaluru, India</span>
        </div>
      </section>

      <section className="section-paper"><div className="page-wrap section-pad about-story-grid">
        <WordReveal as="p" className="big-statement" text="I care about the moment software leaves the demo environment and meets the real world." />
        <Reveal delay={0.08} className="story-copy">
          <p>My path started with browser games and interactive experiences. That work taught me to think in systems: inputs, state, performance, and feedback.</p>
          <p>Today I lead teams building mobile and backend platforms used for large-scale education programs. I remain close to the code while shaping architecture, delivery, and the conditions teams need to do excellent work.</p>
          <a className="text-link" href="mailto:hsekar.bat@gmail.com">Start a conversation <ArrowUpRight className="size-4" /></a>
        </Reveal>
      </div></section>

      <section className="section-light"><div className="page-wrap section-pad">
        <Reveal><div className="section-kicker"><span>02</span> Principles</div></Reveal>
        <div className="principles-grid">
          {values.map(([number, title, copy], index) => (
            <article key={title} className="principle-card" style={{ transitionDelay: `${index * 70}ms` }}>
              <span>{number}</span><WordReveal as="h2" text={title} amount={0.6} /><p>{copy}</p>
            </article>
          ))}
        </div>
      </div></section>
    </div>
  );
}
