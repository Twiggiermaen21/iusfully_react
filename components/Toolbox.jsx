'use client'

import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  AlignJustify,
  Heading1,
  ImagePlus,
  List,
  Text,
} from "lucide-react"

export default function ToolBox() {
  return (
    <aside className="flex flex-col gap-2 p-2 border-r border-gray-300 bg-white min-h-screen w-16 items-center">
      <Button variant="ghost" size="icon" title="Dodaj tytuł">
        <Heading1 className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" title="Dodaj tekst">
        <Text className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" title="Pogrub">
        <Bold className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" title="Kursywa">
        <Italic className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" title="Wyjustuj">
        <AlignJustify className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" title="Lista punktowana">
        <List className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" title="Wstaw obraz">
        <ImagePlus className="w-5 h-5" />
      </Button>
    </aside>
  )
}
