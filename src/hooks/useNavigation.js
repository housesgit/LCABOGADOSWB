import { useEffect, useRef, useState } from 'react';

export default function useNavigation() {
  const [scrollToContact, setScrollToContact] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [route, setRoute] = useState(() => (
    typeof window !== 'undefined'
      ? (
          window.location.pathname === '/admin'
            ? '#admin'
            : (window.location.hash || '#inicio')
        )
      : '#inicio'
  ));

  const [transitionPhase, setTransitionPhase] = useState('idle');
  const transitionTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setIsMenuOpen(false);
      }
    };

    const handleHash = () => {
      setRoute(
        window.location.pathname === '/admin'
          ? '#admin'
          : (window.location.hash || '#inicio')
      );

      setIsMenuOpen(false);
      setScrolled(false);

      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const navigate = (path, options = {}) => {
    if (path === '/admin') {
      setIsMenuOpen(false);
      setScrolled(false);

      window.history.pushState({}, '', '/admin');
      setRoute('#admin');
      setTransitionPhase('idle');
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    if (path === '/') {
      setIsMenuOpen(false);
      setScrolled(false);

      window.history.pushState({}, '', '/');
      window.location.hash = '#inicio';
      setRoute('#inicio');
      setTransitionPhase('idle');
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    setIsMenuOpen(false);
    setScrolled(false);
    setTransitionPhase('cover');

    transitionTimerRef.current = setTimeout(() => {
      window.location.hash = path;
      setRoute(path);
      window.scrollTo({ top: 0, behavior: 'auto' });

      transitionTimerRef.current = setTimeout(() => {
        setTransitionPhase('reveal');

        transitionTimerRef.current = setTimeout(() => {
          setTransitionPhase('idle');

          if (options.scrollTo) {
            let attempts = 0;

            const scrollWhenReady = () => {
              const element = document.getElementById(options.scrollTo);

              if (element) {
                element.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
                return;
              }

              attempts += 1;

              if (attempts < 30) {
                setTimeout(scrollWhenReady, 100);
              }
            };

            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                scrollWhenReady();
              });
            });
          }
        }, 700);
      }, 35);
    }, 475);
  };

  return {
    route,
    navigate,
    transitionPhase,
    transitionTimerRef,
    scrollToContact,
    setScrollToContact,
    scrolled,
    isMenuOpen,
    setIsMenuOpen
  };
}