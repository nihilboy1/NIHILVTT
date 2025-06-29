import React, { useEffect, useRef, useState, useMemo } from "react";
import { getAllCommands } from "./lib/chatCommands";

interface ChatCommandPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  targetInputRef: React.RefObject<HTMLInputElement | null>;
  onCommandSelect: (command: string) => void;
  inputValue: string;
}

// popover para sugestões de comandos no chat
// Exibe sugestões de comandos quando o usuário digita "/"
// Permite navegação com setas e seleção com Enter ou clique
// Fecha com Escape ou clique fora do popover
export function ChatCommandPopover({
  isOpen,
  onClose,
  targetInputRef,
  onCommandSelect,
  inputValue,
}: ChatCommandPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0, opacity: 0 });

  const availableCommands = useMemo(() => getAllCommands(), []);

  const filteredCommands = useMemo(() => {
    if (!inputValue || !inputValue.startsWith("/")) {
      return [];
    }
    const typedCommandPart = inputValue.toLowerCase().split(" ")[0];
    return availableCommands.filter(
      (command) =>
        command.name.toLowerCase().startsWith(typedCommandPart) ||
        (command.aliases &&
          command.aliases.some((alias) =>
            alias.toLowerCase().startsWith(typedCommandPart)
          ))
    );
  }, [inputValue, availableCommands]);

  const savedOnClose = useRef(onClose);
  const savedOnCommandSelect = useRef(onCommandSelect);
  const stateRef = useRef({ selectedIndex, filteredCommands });

  useEffect(() => {
    savedOnClose.current = onClose;
    savedOnCommandSelect.current = onCommandSelect;
    stateRef.current = { selectedIndex, filteredCommands };
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  useEffect(() => {
    let popoverHeight = 0;
    let popoverWidth = 0;

    if (popoverRef.current) {
      popoverHeight = popoverRef.current.offsetHeight;
      popoverWidth = popoverRef.current.offsetWidth;
    }

    if (isOpen && targetInputRef.current) {
      const inputRect = targetInputRef.current.getBoundingClientRect();
      const spaceAbove = inputRect.top;
      const spaceBelow = window.innerHeight - inputRect.bottom;

      let topPosition;
      if (popoverHeight < spaceAbove || spaceAbove >= spaceBelow) {
        topPosition = inputRect.top - popoverHeight - 8;
      } else {
        topPosition = inputRect.bottom + 8;
      }

      let leftPosition = inputRect.left;

      if (leftPosition + popoverWidth > window.innerWidth) {
        leftPosition = window.innerWidth - popoverWidth - 8;
      }

      if (leftPosition < 8) {
        leftPosition = 8;
      }

      if (topPosition < 8) {
        topPosition = 8;
      }

      if (topPosition + popoverHeight > window.innerHeight - 8) {
        topPosition = window.innerHeight - popoverHeight - 8;
      }

      if (topPosition < 8) {
        topPosition = 8;
      }

      setPosition({
        top: topPosition,
        left: leftPosition,
        opacity: 1,
      });
    } else {
      setPosition((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [isOpen, targetInputRef, inputValue, filteredCommands]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement !== targetInputRef.current) return;

      const {
        selectedIndex: currentSelectedIndex,
        filteredCommands: currentFilteredCommands,
      } = stateRef.current;

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          savedOnClose.current();
          break;
        case "ArrowDown":
          event.preventDefault();
          if (currentFilteredCommands.length > 0) {
            setSelectedIndex(
              (prev) => (prev + 1) % currentFilteredCommands.length
            );
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (currentFilteredCommands.length > 0) {
            setSelectedIndex(
              (prev) =>
                (prev - 1 + currentFilteredCommands.length) %
                currentFilteredCommands.length
            );
          }
          break;
        case "Enter":
        case "Tab":
          event.preventDefault();
          if (
            currentFilteredCommands.length > 0 &&
            currentFilteredCommands[currentSelectedIndex]
          ) {
            const selectedCmdObj =
              currentFilteredCommands[currentSelectedIndex];
            const commandToFill =
              selectedCmdObj.usage && selectedCmdObj.usage.includes("<")
                ? selectedCmdObj.name + " "
                : selectedCmdObj.name;
            savedOnCommandSelect.current(commandToFill);
            savedOnClose.current();
          }
          break;
        default:
          break;
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        targetInputRef.current &&
        !targetInputRef.current.contains(event.target as Node)
      ) {
        savedOnClose.current();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, targetInputRef]);

  useEffect(() => {
    if (
      isOpen &&
      popoverRef.current &&
      filteredCommands.length > 0 &&
      popoverRef.current.children.length > 0
    ) {
      const listElement = popoverRef.current.querySelector("ul");
      if (listElement && listElement.children[selectedIndex]) {
        listElement.children[selectedIndex].scrollIntoView({
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  }, [selectedIndex, isOpen, filteredCommands]);

  if (!isOpen || !inputValue.startsWith("/")) {
    return null;
  }

  return (
    <div
      ref={popoverRef}
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        opacity: position.opacity,
        minWidth: targetInputRef.current?.offsetWidth,
        transition: "opacity 0.1s ease-in-out",
      }}
      className=" bg-surface-0 rounded-md shadow-xl z-[70] p-2"
      role="listbox"
      aria-label="Sugestões de comando"
      aria-live="polite"
    >
      <ul
        className="space-y-1 max-h-48 overflow-y-auto"
        tabIndex={-1}
        id="command-suggestions"
      >
        {filteredCommands.length > 0 ? (
          filteredCommands.map((command, index) => {
            const namePart = command.name;
            const usagePart = command.usage
              ? command.usage.substring(command.name.length)
              : "";

            return (
              <li
                key={command.name}
                className={`bg-surface-1 p-1.5 rounded text-sm text-text-primary hover:bg-accent-secondary-hover cursor-pointer `}
                onClick={() => {
                  const commandToFill =
                    command.usage && command.usage.includes("<")
                      ? command.name + " "
                      : command.name;
                  savedOnCommandSelect.current(commandToFill);
                  savedOnClose.current();
                }}
                title={command.description}
                role="option"
                aria-selected={index === selectedIndex}
                id={`command-option-${index}`}
              >
                <span className="font-semibold">{namePart}</span>
                {usagePart && <span>{usagePart}</span>}
                <span className={`text-text-secondary block text-xs`}>
                  {command.description}
                </span>
              </li>
            );
          })
        ) : (
          <li className="p-1.5 text-sm text-text-secondary">
            Nenhum comando correspondente.
          </li>
        )}
      </ul>
    </div>
  );
}
// ESTILO AJUSTADO
