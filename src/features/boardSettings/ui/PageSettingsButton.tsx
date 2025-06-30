import { PageConfigIcon } from "../../../shared/ui/Icons";

interface PageSettingsButtonProps {
  onClick: () => void;
}

export function PageSettingsButton({ onClick }: PageSettingsButtonProps) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-accent-primary-hover p-2 rounded-md shadow-md focus:outline-none focus:ring-2 cursor-pointer"
      aria-label="Configurações da Página e Grade"
      title="Configurações da Página e Grade"
    >
      <PageConfigIcon className="w-6 h-6 p-[0.1rem]" />
    </button>
  );
}
