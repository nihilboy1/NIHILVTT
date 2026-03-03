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

import BookBookmarkBoldIconComponent from '../assets/book-bookmark-bold.svg?react';
import DotsSixBoldIconComponent from '../assets/dots-six-bold.svg?react';
import GearSixBoldIconComponent from '../assets/gear-six-bold.svg?react';
import chatWhite from '../assets/chat-white.svg';
import d20 from '../assets/d20.png';
import DetatchIconComponent from '../assets/detach-svgrepo-com.svg?react';
import folderUserFillWhite from '../assets/folder-user-fill-white.svg';
import HandIconComponent from '../assets/hand.svg?react';
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
  return <Icon src={chatWhite} alt="Ícone de balão de chat" invert={false} {...props} />;
}
export function BookIcon(props: SpecificIconProps) {
  return (
    <Icon
      component={BookBookmarkBoldIconComponent}
      alt="Ícone de biblioteca"
      invert={false}
      {...props}
    />
  );
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
      src={folderUserFillWhite}
      alt="Ícone de personagens"
      invert={false}
      {...props}
    />
  );
}
export function DotsThreeVerticalIcon(props: SpecificIconProps) {
  return <FaEllipsisV {...props} />;
}
export function DragHandleIcon(props: SpecificIconProps) {
  return <Icon component={DotsSixBoldIconComponent} alt="Ícone de arrastar" size={3} {...props} />;
}
export function PageConfigIcon(props: SpecificIconProps) {
  return (
    <Icon component={GearSixBoldIconComponent} alt="Ícone de configurações" {...props} />
  );
}
export function MinimizeIcon(props: SpecificIconProps) {
  return <FaMinus {...props} />;
}
export function RestoreWindowIcon(props: SpecificIconProps) {
  return <FaRegSquare {...props} />;
}
