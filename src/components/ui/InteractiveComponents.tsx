"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useScroll, useTransform, useMotionValue, useInView, animate } from 'framer-motion';

// Custom Cursor
export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useSpring(-100, { damping: 25, stiffness: 200, mass: 0.5 });
  const cursorY = useSpring(-100, { damping: 25, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - (isHovering ? 20 : 6));
      cursorY.set(e.clientY - (isHovering ? 20 : 6));
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isPointer = window.getComputedStyle(target).cursor === 'pointer' || 
                        target.tagName.toLowerCase() === 'a' || 
                        target.tagName.toLowerCase() === 'button' || 
                        target.closest('a') || target.closest('button');
      setIsHovering(!!isPointer);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isHovering, cursorX, cursorY]);

  return (
    <motion.div
      style={{ x: cursorX, y: cursorY, width: isHovering ? 40 : 12, height: isHovering ? 40 : 12 }}
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[100] transition-colors duration-300 ${
        isHovering ? "bg-white mix-blend-difference" : "bg-[var(--color-brand-sage)]"
      }`}
    />
  );
}

// Magnetic Button with Glow and Ripple
export function MagneticButton({ children, href, className = "", onClick }: any) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.2);
    y.set((clientY - (top + height / 2)) * 0.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      href={href}
      target={href ? "_blank" : undefined}
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      animate={{ scale: isHovered ? 1.02 : 1 }}
      style={{ x, y }}
      className={`relative inline-flex justify-center items-center overflow-hidden transition-all duration-300 ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 z-0 bg-[var(--color-brand-sage-dark)] transition-opacity duration-300"
      />
    </Tag>
  );
}

// Transparent-to-Solid Navbar
export function Navbar({ whatsappUrl }: { whatsappUrl: string }) {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(244,241,232,0)", "rgba(26,28,25,0.95)"]);
  const textColor = useTransform(scrollY, [0, 80], ["#1A1C19", "#FFFFFF"]);
  const logoColor = useTransform(scrollY, [0, 80], ["#6B7A65", "#FFFFFF"]);
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(24px)"]);

  return (
    <motion.nav 
      style={{ backgroundColor: bg, color: textColor, backdropFilter: blur }}
      className="fixed w-full z-40 py-6 px-6 md:px-12 flex justify-between items-center transition-all duration-300 border-b border-transparent"
    >
      <div className="text-[20px] font-light tracking-tight flex items-center gap-3">
        <motion.svg style={{ color: logoColor }} xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12.005C20 5.589 16.411 2 12 2Zm0 16.621C11.171 17.818 6 13.568 6 9.995 6 6.685 8.686 4 12 4s6 2.685 6 5.995c0 3.573-5.171 7.823-6 8.626Z" />
        </motion.svg>
        <span className="hidden sm:inline">Acompaña</span>
      </div>
      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-sage)] animate-pulse"></div>
          <span className="text-[12px] font-medium tracking-widest uppercase opacity-80">Disponibles</span>
        </div>
        <MagneticButton href={whatsappUrl} className="bg-[var(--color-brand-charcoal)] text-white px-8 py-3 rounded-full text-[16px] font-medium border border-white/10 shadow-lg hover:shadow-[0_0_20px_rgba(107,122,101,0.5)]">
          Agendar ahora
        </MagneticButton>
      </div>
    </motion.nav>
  );
}

// Animated Counter
export function Counter({ to, label }: { to: number, label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (inView) {
      const controls = animate(0, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (v) => setCount(Math.floor(v))
      });
      return controls.stop;
    }
  }, [inView, to]);

  return (
    <div ref={ref} className="flex flex-col items-start">
      <span className="text-[32px] font-light text-[var(--color-brand-charcoal)] leading-none mb-1">
        {count}+
      </span>
      <span className="text-[12px] font-medium tracking-widest uppercase text-[var(--color-brand-charcoal)]/60">
        {label}
      </span>
    </div>
  );
}

// Typewriter
export function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className="inline-block relative overflow-hidden align-bottom">
      <motion.span
        key={index}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.3, 1] }}
        className="absolute inset-0 text-[var(--color-brand-sage)] font-light italic"
      >
        {words[index]}
      </motion.span>
      <span className="invisible font-light italic">{words[0]}</span> {/* for width */}
    </div>
  );
}

// 3D Tilt Card
export function TiltCard({ children, className = "" }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform mouse position to rotation (max 8 degrees)
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedLine() {
  return (
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.25, 1, 0.3, 1] }}
      className="h-[1px] w-full bg-[var(--color-brand-charcoal)]/10 origin-left mt-8 mb-16"
    />
  );
}

// Parallax Image
export function ParallaxImage({ src, alt, className }: { src: string, alt: string, className: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img 
        style={{ y, scale: 1.15 }}
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-cover" 
      />
    </div>
  );
}
