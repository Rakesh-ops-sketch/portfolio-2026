/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  Quote,
  Smartphone,
  Sparkles,
  Users2,
} from "lucide-react";
import { PremiumHeroActions, PremiumHeroAmbient, PremiumHeroHeadline } from "@/components/premium-hero-motion";
import { CaseStudyVisual } from "@/components/case-study-visual";
import { EvaluationCaseVisual } from "@/components/evaluation-case-visual";
import { CaseStudyAtmosphere, CaseStudyReveal } from "@/components/case-study-motion";
import { AnimatedCaseMetrics } from "@/components/animated-case-metrics";
import { WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';


export default function HomeSection7({data,shared}:TemplateProps){
const testimonials = shared.testimonials;
return (<section id="testimonials" className="testimonials-section scroll-mt-20">
        <div className="page-wrap section-pad">
          <div className="section-kicker"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div>
          <div className="testimonials-intro mt-10 md:mt-16">
            <CaseStudyReveal direction="left" className="testimonials-intro-copy">
              <p className="testimonials-overline">{t(data, 'field3')}</p>
              <WordReveal as="h2" className="display-heading" text={t(data, 'field4')} />
            </CaseStudyReveal>
            <CaseStudyReveal direction="right" delay={.1} className="testimonials-intro-note">
              <span>{t(data, 'field5')}</span>
              <p>{t(data, 'field6')}</p>
            </CaseStudyReveal>
          </div>

          <CaseStudyReveal className="testimonial-grid mt-12 md:mt-16" delay={.1}>
            {testimonials.map((testimonial, index) => (
              <figure key={testimonial.id} className={`testimonial-card${index === 0 ? " testimonial-card-featured" : ""}`}>
                <Quote className="testimonial-card-mark" aria-hidden="true" />
                <span className="testimonial-card-index">{t(data, 'field7')}{index + 1}</span>
                <blockquote>{testimonial.quote}</blockquote>
                <figcaption>
                  <span className="testimonial-avatar" aria-hidden="true">
                    {(testimonial.name || "").split(" ").map((part) => part[0]).slice(0, 2).join("")}
                  </span>
                  <span className="testimonial-byline"><strong>{testimonial.name}</strong><span>{testimonial.role}</span></span>
                </figcaption>
              </figure>
            ))}
          </CaseStudyReveal>
        </div>
      </section>);
}
