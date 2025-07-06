"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import SortableClause from "./SortableClause";

export default function ClauseList({
  clauses,
  setClauses,
  modalData,
  klauzule,
  activeTool,
  onOpenModal,
  setModalData
}) {
  const [selectedClauseIndex, setSelectedClauseIndex] = useState(null);
  const [newText, setNewText] = useState("");
  const [addingTarget, setAddingTarget] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
  console.log("clauses changed:", clauses);
}, [clauses]);



  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={({ active, over }) => {
          if (!over || active.id === over.id) return;
          const oldIndex = parseInt(active.id.split("-")[1], 10);
          const newIndex = parseInt(over.id.split("-")[1], 10);
          setClauses((prev) => arrayMove(prev, oldIndex, newIndex));
        }}
      >
        <SortableContext
          items={clauses.map((_, i) => `clause-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          {clauses.map((clause, ci) => (
            <SortableClause
              key={`clause-${ci}`}
              setClauses={setClauses}
              clause={clause}
              clauses={clauses}
              klauzule={klauzule}
              modalData={modalData}
              index={ci}
              activeTool={activeTool}
              onOpenModal={onOpenModal}
              setModalData={setModalData}
            />
          ))}
        </SortableContext>
      </DndContext>

      {activeTool === 'clauses' && (
        <button
          onClick={() => {
            setAddingTarget({ type: 'clause' })
            setNewText('')
          }}
          className="text-green-600 hover:underline text-sm mt-4 block"
        >
          + Dodaj nową klauzulę
        </button>
      )}

      {addingTarget && (
        <div className="mt-4 bg-gray-50 p-4 border rounded-md">
          {addingTarget.type === 'clause' && (
            <>
              <label className="block mb-2 font-medium text-gray-700">
                Wybierz istniejącą klauzulę do dodania:
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                value={selectedClauseIndex ?? ''}
                onChange={e => setSelectedClauseIndex(e.target.value === "new" ? "new" : Number(e.target.value))}
              >
                <option value="" disabled>-- wybierz klauzulę --</option>
                {klauzule.clauses.map((clause, idx) => (
                  <option key={idx} value={idx}>
                    {clause.title || `Klauzula ${idx + 1}`}
                  </option>
                ))}
                <option value="new">+ Stwórz nową klauzulę</option>
              </select>

              {selectedClauseIndex === 'new' && (
                <>
                  <label className="block mb-2 font-medium text-gray-700">Tytuł klauzuli:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    placeholder="Wpisz tytuł nowej klauzuli..."
                    value={newText}
                    onChange={e => setNewText(e.target.value)}
                  />

                  <label className="block mb-2 font-medium text-gray-700">Pierwszy podpunkt:</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                    rows={3}
                    placeholder="Wpisz pierwszy podpunkt..."
                    value={addingTarget.newItemText ?? ''}
                    onChange={e =>
                      setAddingTarget(prev => ({ ...prev, newItemText: e.target.value }))
                    }
                  />
                </>
              )}
            </>
          )}

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                if (addingTarget.type === 'clause') {
                  if (selectedClauseIndex === 'new') {
                    if (!newText.trim() || !addingTarget.newItemText?.trim()) return;
                    setClauses(prev => [
                      ...prev,
                      { title: newText.trim(), items: [{ text: addingTarget.newItemText.trim() }] }
                    ]);
                  } else if (selectedClauseIndex !== null && selectedClauseIndex !== '') {
                    const clauseToCopy = klauzule.clauses[selectedClauseIndex];
                    setClauses(prev => [...prev, clauseToCopy]);
                  }
                }
                setAddingTarget(null);
                setNewText('');
                setSelectedClauseIndex(null);
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded-md"
            >
              Zapisz
            </button>
            <button
              onClick={() => {
                setAddingTarget(null);
                setNewText('');
                setSelectedClauseIndex(null);
              }}
              className="px-3 py-1 bg-gray-300 rounded-md"
            >
              Anuluj
            </button>
          </div>
        </div>
      )}
    </>
  );
}
