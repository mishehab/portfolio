'use client';

// @flow strict
import { useState, useRef, useEffect } from 'react';
import { coursework } from '@/utils/data/coursework';

function GlowCard({ children, identifier }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      return () => card.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-lg p-[1px] transition-all duration-300"
      style={{
        background: isHovered
          ? `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(167, 139, 250, 1), rgba(139, 92, 246, 0.8) 35%, rgba(139, 92, 246, 0.4) 60%, transparent 100%)`
          : 'transparent'
      }}
    >
      <div className="relative bg-[#0d1224] rounded-lg h-full">
        {children}
      </div>
    </div>
  );
}

function Coursework() {
  return (
    <div id='coursework' className="relative z-50 border-t my-8 lg:my-12 border-[#25213b]">
      <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-4 lg:py-6">
        <div className="flex items-center">
          <span className="w-20 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Coursework & Certifications
          </span>
          <span className="w-20 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 px-4">
        {coursework.map(item => (
          <GlowCard key={item.id} identifier={`coursework-${item.id}`}>
            <div className="p-4 h-full">
              <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
              <p className="text-xs text-gray-300">{item.provider}</p>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}

export default Coursework;