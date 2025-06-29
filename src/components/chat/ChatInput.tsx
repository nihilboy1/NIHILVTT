import React, { useRef } from "react";
import { ChatCommandPopover } from "./ChatCommandPopover";

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isCommandPopoverOpen: boolean;
  setIsCommandPopoverOpen: (isOpen: boolean) => void;
  commandError: string | null;
  resetHistoryNavigation: () => void;
  navigateHistory: (direction: "up" | "down", currentInput: string) => string | null;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputText,
  setInputText,
  handleSubmit,
  isCommandPopoverOpen,
  setIsCommandPopoverOpen,
  commandError,
  resetHistoryNavigation,
  navigateHistory,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);

    if (text.startsWith("/")) {
      setIsCommandPopoverOpen(true);
    } else {
      setIsCommandPopoverOpen(false);
    }
    // Reset command error when input changes
    if (commandError) {
      // setCommandError(null); // This should be handled by parent or use a separate state
    }
    if (text !== inputText) {
      resetHistoryNavigation();
    }
  };

  const handleCommandSelect = (commandString: string) => {
    setInputText(commandString);
    setIsCommandPopoverOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
      setTimeout(
        () =>
          inputRef.current?.setSelectionRange(
            commandString.length,
            commandString.length
          ),
        0
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isCommandPopoverOpen) {
      if (e.key === "Enter") {
        setIsCommandPopoverOpen(false);
        return;
      } else if (["ArrowUp", "ArrowDown", "Escape"].includes(e.key)) {
        return;
      }
    }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const direction = e.key === "ArrowUp" ? "up" : "down";
      const historyEntry = navigateHistory(direction, inputText);
      if (historyEntry !== null) {
        setInputText(historyEntry);
        setTimeout(
          () =>
            inputRef.current?.setSelectionRange(
              historyEntry.length,
              historyEntry.length
            ),
          0
        );
      }
    } else if (e.key === "Escape") {
      if (isCommandPopoverOpen) {
        setIsCommandPopoverOpen(false);
      }
    }
  };

  return (
    <>
      <ChatCommandPopover
        isOpen={isCommandPopoverOpen}
        onClose={() => setIsCommandPopoverOpen(false)}
        targetInputRef={inputRef}
        onCommandSelect={handleCommandSelect}
        inputValue={inputText}
      />

      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex space-x-2 ">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Digite uma mensagem ou /comando..."
            className="flex-grow p-2 border border-text-secondary rounded-md "
            aria-label="Entrada de mensagem do chat"
            aria-autocomplete="list"
            aria-expanded={isCommandPopoverOpen}
            autoComplete="off"
            aria-controls={
              isCommandPopoverOpen ? "command-suggestions" : undefined
            }
          />
          <button
            type="submit"
            className="px-4 py-2 bg-accent-primary cursor-pointer hover:bg-accent-primary-hover font-semibold rounded-md "
          >
            Enviar
          </button>
        </div>
        <p
          className={` text-xs text-text-secondary mt-1.5 min-h-[3rem] `}
          role="alert"
          aria-live="assertive"
        >
          {commandError}
        </p>
      </form>
    </>
  );
};
