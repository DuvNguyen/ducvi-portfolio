import { Variants, Transition } from "framer-motion";

/**
 * Spring transition presets for Apple / Linear-like micro-interactions
 */
export const springTransitions: Record<string, Transition> = {
  snappy: {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 1,
  },
  smooth: {
    type: "spring",
    stiffness: 250,
    damping: 22,
    mass: 1,
  },
  gentle: {
    type: "spring",
    stiffness: 140,
    damping: 18,
    mass: 1,
  },
};

/**
 * Staggered container for page entry / section reveal
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Individual item inside staggered container
 */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
};

/**
 * Card lift on hover (for Bento cards / Project cards)
 */
export const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.01,
    transition: springTransitions.smooth,
  },
};

/**
 * Pill button tap / hover
 */
export const pillButtonVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -1, transition: springTransitions.snappy },
  tap: { scale: 0.97, transition: springTransitions.snappy },
};

/**
 * Floating avatar badge swaying loop
 */
export const floatingBadgeAnimation = {
  animate: {
    y: [0, -6, 0],
    rotate: [0, 1.5, 0],
  },
  transition: {
    duration: 3.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};
