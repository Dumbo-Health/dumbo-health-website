"use client";

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
    threshold?: number;
    delay?: number;
    duration?: number;
    rootMargin?: string;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
    const {
        threshold = 0.1,
        delay = 0,
        duration = 600,
        rootMargin = '0px 0px -50px 0px'
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, delay, rootMargin]);

    const animationClasses = isVisible
        ? `opacity-100 translate-y-0 transition-all duration-${duration} ease-out`
        : `opacity-0 translate-y-8 transition-all duration-${duration} ease-out`;

    return {
        ref,
        isVisible,
        animationClasses,
    };
}

// Preset animation variants
export const fadeInUp = (delay = 0) => useScrollAnimation({ delay, duration: 600 });
export const fadeInLeft = (delay = 0) => useScrollAnimation({ delay, duration: 600 });
export const fadeInRight = (delay = 0) => useScrollAnimation({ delay, duration: 600 });
export const fadeInScale = (delay = 0) => useScrollAnimation({ delay, duration: 700 });
