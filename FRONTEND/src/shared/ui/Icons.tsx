import {
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
  FaMinus,
  FaPen,
  FaPlusCircle,
  FaRegSquare,
  FaTimes,
  FaTrash,
} from 'react-icons/fa';

import BrowsersIconComponent from '../assets/browsers.svg?react';
import ChatIconComponent from '../assets/chat.svg?react';
import d20 from '../assets/d20.png';
import DetatchIconComponent from '../assets/detach-svgrepo-com.svg?react';
import HandIconComponent from '../assets/hand.svg?react';
import IdentificationCardIconComponent from '../assets/identification-card.svg?react';
import NavigationArrowIconComponent from '../assets/navigation-arrow.svg?react';
import RulerIconComponent from '../assets/ruler.svg?react';

import { Icon, type IconProps } from './Icon';

export type { IconProps } from './Icon';
export type SpecificIconProps = Omit<IconProps, 'src' | 'alt' | 'component'>;

export function EditIcon(props: SpecificIconProps) {
  return <FaPen {...props} />;
}
export function DiceIcon(props: SpecificIconProps) {
  return <Icon src={d20} alt="Dado de vinte lados" {...props} />;
}
export function DeleteIcon(props: SpecificIconProps) {
  return <FaTrash {...props} />;
}
export function PlusCircleIcon(props: SpecificIconProps) {
  return <FaPlusCircle {...props} />;
}
export function DetatchIcon(props: SpecificIconProps) {
  return <Icon component={DetatchIconComponent} alt="Ícone de desanexar" size={3} {...props} />;
}
export function SelectIcon(props: SpecificIconProps) {
  return <Icon component={NavigationArrowIconComponent} alt="Ícone de seleção" {...props} />;
}
export function PanIcon(props: SpecificIconProps) {
  return <Icon component={HandIconComponent} alt="Ícone de mão para arrastar" {...props} />;
}
export function ChatBubbleIcon(props: SpecificIconProps) {
  return <Icon component={ChatIconComponent} alt="Ícone de balão de chat" {...props} />;
}
export function RulerIcon(props: SpecificIconProps) {
  return <Icon component={RulerIconComponent} alt="Ícone de régua" {...props} />;
}
export function XMarkIcon(props: SpecificIconProps) {
  return <FaTimes {...props} />;
}
export function ChevronLeftIcon(props: SpecificIconProps) {
  return <FaChevronLeft {...props} />;
}
export function ChevronRightIcon(props: SpecificIconProps) {
  return <FaChevronRight {...props} />;
}
export function IdentificationCardIcon(props: SpecificIconProps) {
  return (
    <Icon
      component={IdentificationCardIconComponent}
      alt="Ícone de cartão de identificação"
      {...props}
    />
  );
}
export function DotsThreeVerticalIcon(props: SpecificIconProps) {
  return <FaEllipsisV {...props} />;
}
export function PageConfigIcon(props: SpecificIconProps) {
  return (
    <Icon component={BrowsersIconComponent} alt="Ícone de configurações de página" {...props} />
  );
}
export function MinimizeIcon(props: SpecificIconProps) {
  return <FaMinus {...props} />;
}
export function RestoreWindowIcon(props: SpecificIconProps) {
  return <FaRegSquare {...props} />;
}
