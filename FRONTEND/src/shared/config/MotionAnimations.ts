import { Variants } from 'framer-motion';

import { MOTION_TIMING } from './constants';

export const fadeInAndSlideUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: MOTION_TIMING.DURATION_DEFAULT,
    },
  },
};

export const slideInFromLeft = {
  hidden: { x: -20, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: MOTION_TIMING.DURATION_DEFAULT,
    },
  },
};

export const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: MOTION_TIMING.DURATION_DEFAULT,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: MOTION_TIMING.DURATION_DEFAULT,
    },
  },
};

export const staggeredFadeInAndSlideUpContainer = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: MOTION_TIMING.STAGGER_DEFAULT,
    },
  },
};

export const staggeredFadeInAndSlideUpItem = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: MOTION_TIMING.STAGGER_DEFAULT,
    },
  },
};
