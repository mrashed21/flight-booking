import gsap from "gsap";

export function swapHoverAnimation({ buttonEl, iconEl }) {
  if (!buttonEl || !iconEl) return;

  const hoverIn = () => {
    gsap.to(buttonEl, {
      scale: 1.05,
      boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
      duration: 0.25,
      ease: "power3.out",
    });

    gsap.to(iconEl, {
      rotate: 180,
      scale: 1.15,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const hoverOut = () => {
    gsap.to(buttonEl, {
      y: 0,
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.25,
      ease: "power3.inOut",
    });

    gsap.to(iconEl, {
      rotate: 0,
      scale: 1,
      duration: 0.25,
      ease: "power3.inOut",
    });
  };

  return { hoverIn, hoverOut };
}
