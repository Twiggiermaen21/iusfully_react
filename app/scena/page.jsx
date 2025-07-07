"use client";
import React, { useRef, useState } from "react";

export default function EditableSelectField() {
  const editorRef = useRef(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  // Pokazuje menu na PPM
  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY
    });
  };

  // Wstawia <select> w miejsce zaznaczenia
  const insertSelect = () => {
    const selectHTML = `
      <select style="border: 1px solid #ccc; border-radius: 4px; padding: 2px 4px;">
        <option>Opcja 1</option>
        <option>Opcja 2</option>
        <option>Opcja 3</option>
      </select>
    `;
    document.execCommand("insertHTML", false, selectHTML);
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  // Ukryj menu przy kliknięciu gdziekolwiek
  const handleClickOutside = () => {
    if (contextMenu.visible) {
      setContextMenu({ visible: false, x: 0, y: 0 });
    }
  };

  return (
    <div onClick={handleClickOutside} className="relative p-4">
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onContextMenu={handleContextMenu}
        className="border p-3 rounded min-h-[120px] outline-none"
      >
        Tutaj możesz pisać. Zaznacz tekst, kliknij prawym i wybierz „Wstaw select”.
      </div>

      {contextMenu.visible && (
        <div
          className="absolute bg-white border shadow rounded text-sm z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            onClick={insertSelect}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Wstaw select
          </button>
        </div>
      )}
    </div>
  );
}
