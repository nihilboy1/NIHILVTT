import React from "react";
import d20 from "../assets/d20.png";
import detatch from "../assets/detach-svgrepo-com.svg";
import trash from "../assets/trash.svg";
import plusCircle from "../assets/plus-circle.svg";
export interface IconProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  "aria-hidden"?: boolean;
}

export function DiceIcon({ "aria-hidden": ariaHidden, className }: IconProps) {
  return (
    <img
      className={`invert w-5 h-5 ${className || ""}`}
      src={d20}
      alt="dado de vinte lados"
      aria-hidden={ariaHidden}
      data-testid="dice-icon"
    ></img>
  );
}

export function DeleteIcon({
  "aria-hidden": ariaHidden,
  className,
}: IconProps) {
  return (
    <img
      src={trash}
      alt="lixeira"
      aria-hidden={ariaHidden}
      className={`invert  ${className || ""}`}
    />
  );
}

export function PlusCircleIcon({
  "aria-hidden": ariaHidden,
  className,
}: IconProps) {
  return (
    <img
      src={plusCircle}
      alt="adicionar"
      aria-hidden={ariaHidden}
      className={`invert w-5 h-5 ${className || ""}`}
    />
  );
}

export function DetatchIcon({
  "aria-hidden": ariaHidden,
  className,
}: IconProps) {
  return (
    <img
      className={`invert w-3 h-3 ${className || ""}`}
      src={detatch}
      alt="clip de papel partido ao meio"
      aria-hidden={ariaHidden}
    ></img>
  );
}
export const SelectIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path d="M237.33,106.21,61.41,41l-.16-.05A16,16,0,0,0,40.9,61.25a1,1,0,0,0,.05.16l65.26,175.92A15.77,15.77,0,0,0,121.28,248h.3a15.77,15.77,0,0,0,15-11.29l.06-.2,21.84-78,78-21.84.2-.06a16,16,0,0,0,.62-30.38ZM149.84,144.3a8,8,0,0,0-5.54,5.54L121.3,232l-.06-.17L56,56l175.82,65.22.16.06Z" />
  </svg>
);

export const PanIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path d="M188,48a27.75,27.75,0,0,0-12,2.71V44a28,28,0,0,0-54.65-8.6A28,28,0,0,0,80,60v64l-3.82-6.13a28,28,0,0,0-48.6,27.82c16,33.77,28.93,57.72,43.72,72.69C86.24,233.54,103.2,240,128,240a88.1,88.1,0,0,0,88-88V76A28,28,0,0,0,188,48Zm12,104a72.08,72.08,0,0,1-72,72c-20.38,0-33.51-4.88-45.33-16.85C69.44,193.74,57.26,171,41.9,138.58a6.36,6.36,0,0,0-.3-.58,12,12,0,0,1,20.79-12,1.76,1.76,0,0,0,.14.23l18.67,30A8,8,0,0,0,96,152V60a12,12,0,0,1,24,0v60a8,8,0,0,0,16,0V44a12,12,0,0,1,24,0v76a8,8,0,0,0,16,0V76a12,12,0,0,1,24,0Z" />
  </svg>
);

export const ChatBubbleIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path d="M216,48H40A16,16,0,0,0,24,64V224a15.84,15.84,0,0,0,9.25,14.5A16.05,16.05,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78l.09-.07L83,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,224h0ZM216,192H80a8,8,0,0,0-5.23,1.95L40,224V64H216Z" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path d="M200,112a8,8,0,0,1-8,8H152a8,8,0,0,1,0-16h40A8,8,0,0,1,200,112Zm-8,24H152a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm40-80V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Zm-80.26-34a8,8,0,1,1-15.5,4c-2.63-10.26-13.06-18-24.25-18s-21.61,7.74-24.25,18a8,8,0,1,1-15.5-4,39.84,39.84,0,0,1,17.19-23.34,32,32,0,1,1,45.12,0A39.76,39.76,0,0,1,135.75,166ZM96,136a16,16,0,1,0-16-16A16,16,0,0,0,96,136Z" />
  </svg>
);


export const Cog6ToothIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path
      fillRule="evenodd"
      d="M11.078 2.25c-.917 0-1.699.663-1.947 1.549A7.452 7.452 0 008.776 6.13a7.48 7.48 0 00-2.318 1.09BA1.99 1.99 0 005.152 9.07a7.482 7.482 0 00-1.09 2.318 1.99 1.99 0 00-1.549 1.325C2.088 13.626 2 14.301 2 15s.088 1.374.313 2.051A1.99 1.99 0 003.81 18.35a7.482 7.482 0 001.09 2.318 1.99 1.99 0 001.325 1.549c.725.225 1.452.342 2.177.342s1.452-.117 2.177-.342a1.99 1.99 0 001.325-1.549 7.482 7.482 0 001.09-2.318 1.99 1.99 0 00-1.306-2.612 7.48 7.48 0 00-2.318-1.09 7.452 7.452 0 00-.356-2.337A1.99 1.99 0 0011.078 2.25zM12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
      clipRule="evenodd"
    />
    <path d="M12 8.25a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0v-.01A.75.75 0 0112 8.25zm.75 3.75a.75.75 0 00-1.5 0v2.25a.75.75 0 001.5 0v-2.25z" />
    <path
      fillRule="evenodd"
      d="M14.28 4.194a2.001 2.001 0 00-1.22-.546 2.002 2.002 0 00-1.378.136l-.009.006-.006.004-.007.004-.004.002-.005.003-3.64 2.102a2 2 0 00-1.018 1.725V10.5a2 2 0 00.191 1.037l.006.009.004.006.006.004.002.001.003.002 2.102 3.64a2 2 0 001.725 1.018h2.204a2 2 0 001.037-.191l.009-.006.006-.004.004-.006.001-.002.002-.003 3.64-2.102a2 2 0 001.018-1.725V9a2 2 0 00-.191-1.037l-.006-.009-.004-.006-.006-.004-.002-.001-.003-.002-2.102-3.64zM10.5 7.64L9 10.19v3.62L10.5 16h3L16 13.81V10.19L13.5 7.64h-3z"
      clipRule="evenodd"
    />
  </svg>
);

export const RulerIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path d="M235.32,73.37,182.63,20.69a16,16,0,0,0-22.63,0L20.68,160a16,16,0,0,0,0,22.63l52.69,52.68a16,16,0,0,0,22.63,0L235.32,96A16,16,0,0,0,235.32,73.37ZM84.68,224,32,171.31l32-32,26.34,26.35a8,8,0,0,0,11.32-11.32L75.31,128,96,107.31l26.34,26.35a8,8,0,0,0,11.32-11.32L107.31,96,128,75.31l26.34,26.35a8,8,0,0,0,11.32-11.32L139.31,64l32-32L224,84.69Z" />
  </svg>
);

export const XMarkIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path
      fillRule="evenodd"
      d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
      clipRule="evenodd"
    />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path
      fillRule="evenodd"
      d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
      clipRule="evenodd"
    />
  </svg>
);

export const DocumentIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM12.971 1.816A5.23 5.23 0 0114.25 1.5a.75.75 0 01.75.75v2.25H18a.75.75 0 01.75.75v1.875a3.75 3.75 0 01-5.25-4.558V1.816z" />
  </svg>
);

export const PageConfigIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path d="M184,72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V88A16,16,0,0,0,184,72Zm0,128H40V88H184V200ZM232,56V176a8,8,0,0,1-16,0V56H64a8,8,0,0,1,0-16H216A16,16,0,0,1,232,56Z" />
  </svg>
);

export const MinimizeIcon: React.FC<IconProps> = ({
  className,
  width = 16,
  height = 16,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path d="M5 11h14v2H5z" />
  </svg>
);

export const RestoreWindowIcon: React.FC<IconProps> = ({
  className,
  width = 16,
  height = 16,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path d="M3 3v10h10V3H3zm9 9H4V4h8v8z" />
  </svg>
);
// Placeholder for a generic User icon (for Player tokens)
export const UserCircleIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path
      fillRule="evenodd"
      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      clipRule="evenodd"
    />
  </svg>
);

// Placeholder for a generic Monster icon
export const BugAntIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path
      fillRule="evenodd"
      d="M2.51 8.269A4.492 4.492 0 016.929 6h10.142a4.492 4.492 0 014.419 2.269l.003.006.002.005a1.5 1.5 0 01-.487 1.936l-.005.004a1.5 1.5 0 01-1.936-.487l-.004-.005A1.492 1.492 0 0017.07 9H6.929a1.492 1.492 0 00-1.396 1.017l-.004.005a1.5 1.5 0 01-1.936.487l-.005-.004a1.5 1.5 0 01-.487-1.936l.002-.005.003-.006zm9.364 8.162a.75.75 0 00-1.061 1.061 3.001 3.001 0 102.122 2.121.75.75 0 101.06-1.06 1.501 1.501 0 01-2.121-2.122zM21 11.25a8.956 8.956 0 01-1.224 4.38L19.5 15a.75.75 0 000 1.5l.276.092a6.471 6.471 0 01-3.691 3.691l-.092.276a.75.75 0 001.5 0l.22-.66a8.956 8.956 0 014.38-1.224L22.5 18a.75.75 0 001.5 0l-.092-.276A8.956 8.956 0 0121 11.25zm-18 0a8.956 8.956 0 011.224 4.38L4.5 15a.75.75 0 010 1.5l-.276.092a6.471 6.471 0 003.691 3.691l.092.276a.75.75 0 01-1.5 0l-.22-.66a8.956 8.956 0 00-4.38-1.224L1.5 18a.75.75 0 01-1.5 0l.092-.276A8.956 8.956 0 003 11.25z"
      clipRule="evenodd"
    />
  </svg>
);

// Placeholder for a generic Object icon
export const CubeIcon: React.FC<IconProps> = ({
  className,
  width = 24,
  height = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path
      fillRule="evenodd"
      d="M12.963 2.286a.75.75 0 00-1.071 1.056 9.75 9.75 0 01-1.762 3.337A9.75 9.75 0 0112 21.75c1.13 0 2.18-.198 3.163-.574a9.757 9.757 0 01-1.762-3.337 9.753 9.753 0 01-1.223-3.722 9.753 9.753 0 011.223-3.722c.51-.983 1.128-1.872 1.847-2.654A7.503 7.503 0 0012 2.25c-.86 0-1.678.14-2.433.396a.75.75 0 00-.286-.11zM10.875 6.75a7.5 7.5 0 00-8.625 4.5.75.75 0 001.5 0 6 6 0 017.5-3.75.75.75 0 00-.375-1.5z"
      clipRule="evenodd"
    />
  </svg>
);

export const EjectIcon: React.FC<IconProps> = ({
  className,
  width = 20,
  height = 20,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path
      fillRule="evenodd"
      d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export const EllipsisVerticalIcon: React.FC<IconProps> = ({
  className,
  width = 20,
  height = 20,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path
      fillRule="evenodd"
      d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
      clipRule="evenodd"
    />
  </svg>
);
// BranchIcon removed
