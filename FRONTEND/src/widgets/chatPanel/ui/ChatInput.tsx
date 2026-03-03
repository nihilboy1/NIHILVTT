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

export function ChatInput({
  inputText,
  setInputText,
  handleSubmit,
  isCommandPopoverOpen,
  setIsCommandPopoverOpen,
  commandError,
  resetHistoryNavigation,
  navigateHistory,
}:ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isCommandPopoverOpen) {
      if (e.key === "Enter") {
        e.preventDefault();
        setIsCommandPopoverOpen(false);
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
    } else if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
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
        <div className="flex items-stretch space-x-2 ">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Digite uma mensagem ou /comando..."
            rows={3}
            className="min-h-[4.5rem] max-h-28 flex-grow resize-none overflow-y-auto rounded-md border border-text-secondary p-2 text-sm"
            aria-label="Entrada de mensagem do chat"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            autoComplete="off"
            aria-controls={
              isCommandPopoverOpen ? "command-suggestions" : undefined
            }
          />
          <button
            type="submit"
            className="min-h-[4.5rem] self-stretch rounded-md bg-accent-primary px-4 py-2 font-semibold hover:bg-accent-primary-hover cursor-pointer"
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
