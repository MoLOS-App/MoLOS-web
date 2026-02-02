import { Variants, Transition } from "framer-motion";

/**
 * High-end physics-based transitions inspired by Apple's fluid motion
 * and Material Design 3's hierarchical transitions.
 */

export const springTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 1,
};

export const softSpringTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1.2,
};

export const slowSpringTransition: Transition = {
  type: "spring",
  stiffness: 50,
  damping: 20,
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition,
  },
};

export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition,
  },
};
