// Marks which edges of each `[data-scroll-fade]` frame have more content past
// them, so `.scroll-fade` (site.css) can fade exactly those edges. The frame's
// first child is the scroll container; its own children are observed too, so
// content that grows (a zoomed lightbox image) updates the edges.
const SLACK = 1;

function watch(frame: HTMLElement) {
  const scroller = frame.firstElementChild as HTMLElement | null;
  if (!scroller) return;
  const sync = () => {
    const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = scroller;
    frame.toggleAttribute('data-overflow-top', scrollTop > SLACK);
    frame.toggleAttribute('data-overflow-bottom', scrollTop < scrollHeight - clientHeight - SLACK);
    frame.toggleAttribute('data-overflow-left', scrollLeft > SLACK);
    frame.toggleAttribute('data-overflow-right', scrollLeft < scrollWidth - clientWidth - SLACK);
  };
  scroller.addEventListener('scroll', sync, { passive: true });
  // Transforms mid-animation count as overflow, so re-check once motion settles.
  scroller.addEventListener('animationend', sync);
  scroller.addEventListener('transitionend', sync);
  const resize = new ResizeObserver(sync);
  resize.observe(scroller);
  for (const child of scroller.children) resize.observe(child);
  sync();
}

document.querySelectorAll<HTMLElement>('[data-scroll-fade]').forEach(watch);
