import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@stores/appStore';

/**
 * Custom cursor component with tactical design
 * Provides visual feedback for interactions
 */
const CustomCursor: React.FC = () => {
  const [_position] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  const { accessibility } = useAppStore();

  useEffect(() => {
    // Don't show custom cursor if reduced motion is enabled
    if (accessibility.reducedMotion) {
      setIsVisible(false);
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      // Use lerp for smooth diagonal movement
      const lerpFactor = 0.15;
      cursorX += (mouseX - cursorX) * lerpFactor;
      cursorY += (mouseY - cursorY) * lerpFactor;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX - 12}px`;
        cursorRef.current.style.top = `${cursorY - 12}px`;
        cursorRef.current.style.transform = `translate3d(0, 0, 0)`; // Force hardware acceleration
      }
      
      animationFrameRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Detect hoverable elements with better performance
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('tactical-button') ||
        target.classList.contains('hud-element') ||
        target.classList.contains('interactive-element') ||
        target.style.cursor === 'pointer' ||
        target.onclick !== null
      );
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Start animation loop
    updateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [accessibility.reducedMotion]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;
