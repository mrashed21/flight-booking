import gsap from "gsap";

/**
 * Creates a floating ghost element
 */
function createGhost(text, rect) {
  const ghost = document.createElement("div");
  ghost.innerText = text;
  ghost.className =
    "fixed z-50 px-3 py-2 bg-white rounded-md shadow text-sm pointer-events-none mt-[26px]";

  ghost.style.left = `${rect.left}px`;
  ghost.style.top = `${rect.top}px`;
  ghost.style.width = `${rect.width}px`;

  document.body.appendChild(ghost);
  return ghost;
}

/**
 * Reusable swap animation
 */
export function swapGhostAnimation({ fromEl, toEl, fromText, toText, onSwap }) {
  if (!fromEl || !toEl) return;

  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();

  const fromGhost = createGhost(fromText, fromRect);
  const toGhost = createGhost(toText, toRect);

  const dx = toRect.left - fromRect.left;
  const dy = toRect.top - fromRect.top;

  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete: () => {
      fromGhost.remove();
      toGhost.remove();
    },
  });

  // hide real elements
  tl.to([fromEl, toEl], {
    opacity: 0,
    duration: 0.2,
  });

  // move ghosts
  tl.to(fromGhost, { x: dx, y: dy, duration: 0.6 }, "<");
  tl.to(toGhost, { x: -dx, y: -dy, duration: 0.6 }, "<");

  // swap state AFTER animation
  tl.call(() => {
    onSwap?.();
  });

  // show real elements again
  tl.to([fromEl, toEl], {
    opacity: 1,
    duration: 0.25,
  });
}
