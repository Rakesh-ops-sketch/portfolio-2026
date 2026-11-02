import assert from 'node:assert/strict';
import test from 'node:test';
import { temporaryPresentation } from '../cms/temporary-presentation';
import { defaultPages, defaultSite, defaultCareer, defaultTestimonials, defaultPlayground, defaultProjects } from '../cms/defaults';
import type { Content, Shared } from '../cms/render-helpers';

test('temporary presentation hides case studies and affiliations while preserving original content and interactive sections', () => {
 const original = {pages:defaultPages as unknown as Content[],shared:{site:defaultSite,career:defaultCareer,testimonials:defaultTestimonials,playground:defaultPlayground,projects:defaultProjects} as Shared};
 const before = JSON.stringify(original);
 const result = temporaryPresentation(original);
 assert.equal(JSON.stringify(original),before);
 assert.ok(!result.pages.some(page=>page.slug==='work'));
 assert.ok(result.pages.some(page=>page.slug==='principles'));
 const home=result.pages.find(page=>page.slug==='home')!;
 const sections=home.sections as Content[];
 assert.ok(sections.some(section=>section.blockType==='engineeringIntro'));
 assert.ok(!sections.some(section=>section.blockType==='designPrinciples'));
 assert.ok(sections.some(section=>section.blockType==='homeSection7'));
 assert.ok(!sections.some(section=>section.blockType==='projectPresentation'));
 assert.deepEqual(result.pages.find(page=>page.slug==='playground'),original.pages.find(page=>page.slug==='playground'));
 assert.equal(result.shared.playground,original.shared.playground);
 assert.deepEqual(result.shared.testimonials.map(item=>item.quote),original.shared.testimonials.map(item=>item.quote));
 assert.doesNotMatch(JSON.stringify(result),/neev|e[‑–-]?talk|evaluator|educational initiatives|\bcto\b/i);
 assert.equal(result.shared.site.navigation.find(item=>item.href==='/principles')?.label,'Principles');
});
