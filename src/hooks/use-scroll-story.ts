import { useEffect, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters } from '@/lib/portfolio';

export function useScrollStory(scope: RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const element = scope.current;
    if (!element) return;
    const root: HTMLDivElement = element;
    gsap.registerPlugin(ScrollTrigger);
    const sections = Array.from(root.querySelectorAll<HTMLElement>('section[data-chapter]'));
    let cinematic = false;
    const observer = new IntersectionObserver(entries => {
      if (cinematic) return;
      for (const entry of entries) if (entry.isIntersecting) {
        const index = chapters.findIndex(c => c.id === entry.target.id);
        if (index >= 0) setActive(index);
      }
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    sections.forEach(el => observer.observe(el));
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const stage = root.querySelector<HTMLElement>('main');
      if (!stage) return;
      cinematic = true;
      root.classList.add('cinematic');
      const progress = document.createElement('div');
      progress.className = 'scroll-progress';
      progress.innerHTML = '<span></span>';
      root.appendChild(progress);
      const starts: number[] = [];
      let timeline: gsap.core.Timeline | undefined;
      let motionContext: gsap.Context | undefined;
      let lastActive = -1;
      function markActive(index: number) {
        if (lastActive === index) return;
        lastActive = index;
        setActive(index);
        sections.forEach((section, i) => {
          section.inert = i !== index;
          section.setAttribute('aria-hidden', String(i !== index));
        });
      }
      function buildTimeline() {
        const previousProgress = timeline?.scrollTrigger?.progress ?? 0;
        timeline?.scrollTrigger?.kill();
        motionContext?.revert();
        motionContext = gsap.context(() => {
          const height = window.innerHeight;
          const width = window.innerWidth;
          const horizontal = width >= 1000;
          sections.forEach((section, i) => {
            section.dataset['number'] = String(i + 1).padStart(2, '0');
            gsap.set(section, { zIndex: i + 1, y: 0, clipPath: i === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)' });
          });
          const tl = gsap.timeline({ defaults: { ease: 'none' } });
          timeline = tl;
          starts.length = 0;
          let cursor = 0;
          const arrival = sections.at(0);
          if (arrival) {
            starts.push(0);
            const art = arrival.querySelector('.arrival-art-story');
            const totems = arrival.querySelectorAll('.art-totem');
            if (art) gsap.set(art, { autoAlpha: 0 });
            const arrivalLandscape = arrival.querySelector('.arrival-landscape');
            const heroCopy = arrival.querySelector('.hero-copy');
            const arrivalBottom = arrival.querySelector('.arrival-bottom');
            const arrivalBirds = arrival.querySelector('.arrival-birds');
            if (arrivalLandscape) tl.to(arrivalLandscape, { scale: 1.5, xPercent: -8, yPercent: -12, duration: 1.5 }, 0);
            if (heroCopy) tl.to(heroCopy, { y: -height * .45, opacity: 0, duration: .85 }, .15);
            if (arrivalBottom) tl.to(arrivalBottom, { opacity: 0, duration: .3 }, .15);
            if (arrivalBirds) tl.to(arrivalBirds, { x: -width * .35, y: -150, duration: 1.2 }, 0);
            if (arrivalLandscape) tl.to(arrivalLandscape, { opacity: 0, duration: .6 }, .85);
            tl.to(art, { autoAlpha: 1, duration: .5 }, .8);
            const storyWord = arrival.querySelector('.story-word');
            if (storyWord) tl.fromTo(storyWord, { y: 100, scale: .75 }, { y: 0, scale: 1, duration: .8 }, .85);
            totems.forEach((totem, i) => {
              tl.fromTo(totem, { y: height * .65, rotation: (i - 1) * 18, scale: .7 }, { y: (i === 1 ? -20 : 15), rotation: (i - 1) * -4, scale: 1, duration: .95 }, .8 + i * .12);
              tl.to(totem, { y: i === 1 ? -90 : -15, rotation: (i - 1) * 5, duration: .65 }, 1.9);
            });
            if (storyWord) tl.to(storyWord, { x: -width * .12, duration: .65 }, 1.9);
            tl.to({}, { duration: .3 }, 2.55);
            cursor = 2.85;
          }
          sections.slice(1).forEach((section, offset) => {
            const i = offset + 1;
            const chapterStart = cursor;
            starts.push(cursor);
            tl.to(section, { clipPath: 'inset(0% 0% 0% 0%)', duration: .85, ease: 'power2.inOut' }, cursor);
            const previous = sections.at(i - 1);
            if (previous) tl.to(previous, { x: -width * .15, scale: 1.08, opacity: .35, duration: .85 }, cursor);
            tl.fromTo(section.querySelectorAll('.section-heading h2, .chapter-label'), { x: 120, opacity: 0 }, { x: 0, opacity: 1, stagger: .12, duration: .65 }, cursor + .2);
            cursor += .95;
            if (i === 2 && horizontal) {
              const track = section.querySelector<HTMLElement>('.forge-track');
              const panels = track ? Array.from(track.children) : [];
              tl.to({}, { duration: .7 }, cursor); cursor += .7;
              if (track) {
                panels.slice(1).forEach((panel, panelIndex) => {
                  tl.to(track, { x: -(panelIndex + 1) * width, duration: 1.05, ease: 'power2.inOut' }, cursor);
                  const projectVisual = panel.querySelector('.project-visual');
                  if (projectVisual) tl.fromTo(projectVisual, { rotationY: -12, scale: .85 }, { rotationY: 0, scale: 1, duration: .8 }, cursor + .2);
                  cursor += 1.05;
                  tl.to({}, { duration: .75 }, cursor); cursor += .75;
                });
              }
            } else if (!(i === 4 && width < 768)) {
              const overflow = Math.max(0, section.scrollHeight - height);
              tl.to({}, { duration: .35 }, cursor); cursor += .35;
              if (overflow > 0) {
                const travelStart = cursor;
                const duration = overflow / height;
                tl.to(section, { y: -overflow, duration }, cursor);
                section.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
                  if (el.classList.contains('section-heading')) return;
                  const entryTime = Math.max(0, (el.offsetTop - height * .75) / height);
                  if (entryTime === 0) tl.fromTo(el, { y: 30, opacity: .8 }, { y: 0, opacity: 1, duration: .6 }, chapterStart + .25);
                  else if (entryTime < duration) tl.fromTo(el, { y: 40, opacity: .8 }, { y: 0, opacity: 1, duration: Math.min(.4, duration - entryTime) }, travelStart + entryTime);
                });
                cursor += duration;
              }
            }
            const sceneDuration = Math.max(.5, cursor - chapterStart);
            section.querySelectorAll('.mountain-far').forEach(el => tl.fromTo(el, { x: -22 }, { x: 30, duration: sceneDuration }, chapterStart));
            section.querySelectorAll('.mountain-mid').forEach(el => tl.fromTo(el, { x: 18 }, { x: -40, duration: sceneDuration }, chapterStart));
            section.querySelectorAll('.mountain-front').forEach(el => tl.fromTo(el, { x: -12 }, { x: 45, duration: sceneDuration }, chapterStart));
            const sun = section.querySelector('.scene-sun, .horizon-sun');
            if (sun) tl.fromTo(sun, { y: 65, scale: .6 }, { y: -45, scale: 1.2, duration: sceneDuration }, chapterStart);
            section.querySelectorAll<SVGPathElement>('.chart-observed, .chart-predicted, .car-line, .inspection-box').forEach(el => {
              const length = el.getTotalLength();
              tl.fromTo(el, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: .8 }, chapterStart + .7);
            });
            const visual = section.querySelector('.project-visual');
            if (visual) tl.fromTo(visual, { rotationY: 10, scale: .88 }, { rotationY: 0, scale: 1, duration: 1 }, chapterStart + .5);
            tl.to({}, { duration: .4 }, cursor); cursor += .4;
          });
          ScrollTrigger.create({
            trigger: stage, animation: tl, start: 'top top', end: `+=${tl.duration() * height}`,
            pin: true, pinSpacing: true, scrub: .6, anticipatePin: 1,
            onUpdate: self => {
              const time = self.progress * tl.duration();
              let index = 0;
              starts.forEach((start, i) => { if (time >= start + (i === 0 ? 0 : .45)) index = i; });
              markActive(index);
              gsap.set(progress.firstElementChild, { scaleX: self.progress });
            },
          });
          ScrollTrigger.refresh();
          lastActive = -1;
          markActive(0);
          if (previousProgress > 0) window.scrollTo({ top: previousProgress * (tl.scrollTrigger?.end ?? 0), behavior: 'instant' });
        }, root);
      }
      function goToChapter(id: string, behavior: ScrollBehavior = 'smooth') {
        const index = chapters.findIndex(chapter => chapter.id === id);
        const trigger = timeline?.scrollTrigger;
        const start = starts.at(index);
        if (index < 0 || !trigger || start === undefined || !timeline) return;
        const time = start + (index === 0 ? 0 : 1);
        window.scrollTo({ top: trigger.start + time / timeline.duration() * (trigger.end - trigger.start), behavior });
      }
      const click = (event: MouseEvent) => {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
        const id = link?.getAttribute('href')?.slice(1);
        if (!id || !chapters.some(chapter => chapter.id === id)) return;
        event.preventDefault(); history.pushState(null, '', `#${id}`); goToChapter(id);
      };
      const hash = () => goToChapter(location.hash.slice(1));
      let resizeTimer: ReturnType<typeof setTimeout>;
      let layoutWidth = window.innerWidth;
      const resize = () => {
        clearTimeout(resizeTimer);
        const focused = document.activeElement;
        if (window.innerWidth === layoutWidth && focused instanceof Element && focused.closest('.contact-form')) return;
        layoutWidth = window.innerWidth;
        resizeTimer = setTimeout(buildTimeline, 180);
      };
      buildTimeline();
      const initialHash = requestAnimationFrame(() => goToChapter(location.hash.slice(1), 'instant'));
      root.addEventListener('click', click); root.addEventListener('toggle', resize, true);
      window.addEventListener('hashchange', hash); window.addEventListener('popstate', hash); window.addEventListener('resize', resize);
      const fonts = document.fonts;
      let alive = true;
      void fonts.ready.then(() => { if (alive) resize(); });
      return () => {
        alive = false; cinematic = false; cancelAnimationFrame(initialHash); clearTimeout(resizeTimer);
        root.removeEventListener('click', click); root.removeEventListener('toggle', resize, true);
        window.removeEventListener('hashchange', hash); window.removeEventListener('popstate', hash); window.removeEventListener('resize', resize);
        timeline?.scrollTrigger?.kill(); motionContext?.revert(); progress.remove(); root.classList.remove('cinematic');
        sections.forEach(section => { section.inert = false; section.removeAttribute('aria-hidden'); });
      };
    }, scope);
    return () => { observer.disconnect(); mm.revert(); };
  }, [scope]);
  return active;
}
