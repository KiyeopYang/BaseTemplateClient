import { useEffect, useRef } from 'react';
type Props = {
  onObserved: () => void;
  children: React.ReactNode;
};

const Observer = ({ onObserved, children }: Props) => {
  const eleToWatch = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const curIntersecton = entries.filter(
          (e) => e.target === eleToWatch.current
        )[0];
        if (
          curIntersecton &&
          curIntersecton.isIntersecting &&
          curIntersecton.intersectionRatio > 0.7
        ) {
          onObserved();
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.5,
      }
    );
    if (eleToWatch.current) observer.observe(eleToWatch.current);
    return () => {
      observer.disconnect();
    };
  }, [eleToWatch.current]);
  return <span ref={eleToWatch}>{children}</span>;
};

export default Observer;
