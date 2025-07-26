import { motion, HTMLMotionProps } from "framer-motion";
import { Link, LinkProps } from "react-router-dom";

type MotionLinkProps = Omit<
  LinkProps,
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onTransitionEnd"
> &
  HTMLMotionProps<"a">;

const MotionLinkComponent = motion.create(Link);

export function MotionLink({ children, ...props }: MotionLinkProps & { children: React.ReactNode }) {
  return <MotionLinkComponent {...props}>{children}</MotionLinkComponent>;
}
