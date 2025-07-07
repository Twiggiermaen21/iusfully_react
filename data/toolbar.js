import {
  DocumentTextIcon,
  PhotoIcon,
  TableCellsIcon,
  ListBulletIcon,
  PaperClipIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
 
  ScissorsIcon,
  PencilIcon,
  PencilSquareIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline'

export const items = [
  { label: "Tekst", icon: DocumentTextIcon },
  { label: "Obraz", icon: PhotoIcon },
  { label: "Tabela", icon: TableCellsIcon },
  { label: "Lista", icon: ListBulletIcon },
  { label: "Nagłówek", icon:  PencilSquareIcon },
  { label: "Załącznik", icon: PaperClipIcon },
  { label: "Spis treści", icon: ListBulletIcon },
  { label: "Podział strony", icon: ScissorsIcon },
  { label: "Pole tekstowe", icon: PencilIcon, color: "text-blue-500" },
  { label: "Podpis", icon: IdentificationIcon, color: "text-blue-500" },
  { label: "Inicjały", icon: IdentificationIcon, color: "text-blue-500" },
  { label: "Data", icon: CalendarIcon, color: "text-blue-500" },
  { label: "Pole wyboru", icon: CheckIcon, color: "text-blue-500" },
  { label: "Lista rozwijana", icon: ChevronDownIcon, color: "text-blue-500" },
];