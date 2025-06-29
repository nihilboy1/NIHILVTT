import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ToolbarButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  isHideButton?: boolean;
  isToggled?: boolean;
}

export const ToolbarButton = React.forwardRef<
  HTMLButtonElement,
  ToolbarButtonProps
>(
  (
    { label, icon, isActive, onClick, isHideButton = false, isToggled = false },
    ref
  ) => {
    return (
      <button
        ref={ref}
        title={label}
        aria-label={label}
        aria-pressed={isActive && !isHideButton}
        onClick={onClick}
        className={twMerge(
          clsx(
            "border border-surface-0 rounded-md ml-[0.2rem] p-4 w-[90%]",
            "flex justify-center items-center",
            "transition-colors duration-150 ease-in-out",
            "focus:outline-none cursor-pointer",
            {
              "bg-accent-primary text-accent-primary-text hover:bg-accent-primary-hover":
                isActive && !isHideButton,
              "bg-accent-secondary text-accent-primary-text hover:bg-accent-primary-hover":
                isToggled,
              "hover:bg-accent-primary-hover":
                !isActive && !isToggled && !isHideButton,
              "mt-auto hover:bg-accent-primary-hover": isHideButton,
            }
          )
        )}
      >
        {icon}
      </button>
    );
  }
);

ToolbarButton.displayName = "ToolbarButton";
