"use client"

import { useEffect, useRef } from 'react';

// Client-only Lottie wrapper that dynamically imports `lottie-web` inside useEffect.
// This avoids importing any DOM-dependent code during SSR (prevents `document is not defined`).
const AnimationLottie = ({ animationPath, width }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    let anim = null;
    let mounted = true;

    // dynamic import inside effect — runs only in the browser
    import('lottie-web')
      .then((lottie) => {
        if (!mounted || !containerRef.current) return;
        const player = lottie.default || lottie;
        anim = player.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationPath,
        });
      })
      .catch((err) => {
        // swallow client-only load errors
        // console.error('Failed to load lottie-web', err);
      });

    return () => {
      mounted = false;
      if (anim) {
        try {
          anim.destroy();
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, [animationPath]);

  return (
    <div
      ref={containerRef}
      style={{ width: width || '95%' }}
      className="lottie-container"
    />
  );
};

export default AnimationLottie;