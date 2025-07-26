import React from 'react';

import { cn } from '../lib/utils/cn';

export interface IconProps {
  src?: string;
  component?: React.ElementType;
  alt: string;
  className?: string;
  'aria-hidden'?: boolean;
  size?: number | string;
}

export function Icon({
  src,
  component: Component,
  alt,
  className,
  size = 5,
  'aria-hidden': ariaHidden = true,
}: IconProps) {
  const iconClassName = cn(`w-${size} h-${size}`, 'invert', className);

  if (typeof Component === 'function' || (typeof Component === 'object' && Component !== null)) {
    return <Component className={iconClassName} aria-hidden={ariaHidden} />;
  }

  const imageSrc = typeof Component === 'string' ? Component : src;

  return <img src={imageSrc} alt={alt} aria-hidden={ariaHidden} className={iconClassName} />;

  return <img src={src} alt={alt} aria-hidden={ariaHidden} className={iconClassName} />;
}
