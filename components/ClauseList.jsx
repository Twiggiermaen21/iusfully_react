import React, { useState } from 'react'
import formatClauseWithSelect from '@/utils/formatClauseWithSelect'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

 function SortableClause({ clause, index, activeTool, onOpenModal }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: `clause-${index}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="rounded-lg p-4 mb-4 bg-white shadow cursor-grab"
    >
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold">{clause.title}</h1>
        {activeTool === 'clauses' && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onOpenModal({ type: 'clause', text: clause.title, clauseIndex: index })
              console.log('clasusla', {clause, clauseIndex: index})  
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            ✏️ Edytuj
          </button>
        )}
      </div>

      <ol className="list-decimal pl-6 space-y-4 text-gray-800">
        {clause.items?.map((item, ii) => (
          <li
            key={ii}
            className={`p-3 rounded-lg ${activeTool === 'items' ? 'hover:bg-blue-50 cursor-pointer transition' : ''}`}
            onClick={(e) => {
              if (activeTool === 'items') {
                e.stopPropagation()
                onOpenModal({ type: 'item', text: item.text, clauseIndex: index, itemIndex: ii })
              }
            }}
          >
            <div className="flex justify-between items-start">
              <span
                onClick={(e) => {
                  if (activeTool === 'text') {
                    e.stopPropagation()
                    onOpenModal({
                      type: 'subpoint',
                      text: item.text,
                      clauseIndex: index,
                      itemIndex: ii,
                      subIndex: ii
                    })
                  }
                }}
                className={activeTool === 'text' ? 'hover:underline cursor-pointer transition' : ''}
              >
                {item.select
                  ? formatClauseWithSelect(item.text, item.select)
                  : item.text}
              </span>
            </div>

            <ul className="list-[lower-alpha] list-inside pl-4 mt-2 text-sm text-gray-700 space-y-1">
              {item.subpoints?.map((sub, si) => (
                <li
                  key={si}
                  onClick={(e) => {
                    if (activeTool === 'text') {
                      e.stopPropagation()
                      onOpenModal({
                        type: 'subpoint',
                        text: sub,
                        clauseIndex: index,
                        itemIndex: ii,
                        subIndex: si
                      })
                    }
                  }}
                  className={activeTool === 'text' ? 'hover:underline cursor-pointer transition' : ''}
                >
                  {sub}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function ClauseList({ clauses,setClauses, klauzule, activeTool, onOpenModal }) {
  const [selectedClauseIndex, setSelectedClauseIndex] = useState(null)
  const [newText, setNewText] = useState('')
  const [addingTarget, setAddingTarget] = useState(null)
  const [localClauses, setLocalClauses] = useState(clauses)
console.log('chce',clauses) 
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    const oldIndex = localClauses.findIndex(c => c.id === active.id)
    const newIndex = localClauses.findIndex(c => c.id === over.id)
    const reordered = arrayMove(localClauses, oldIndex, newIndex)
    setLocalClauses(reordered)
  }

  return (
    <>
      <DndContext
  sensors={sensors}
  collisionDetection={closestCenter}
  onDragEnd={({ active, over }) => {
    if (!over || active.id === over.id) return
    const oldIndex = parseInt(active.id.split('-')[1], 10)
    const newIndex = parseInt(over.id.split('-')[1], 10)
    const reordered = arrayMove(clauses, oldIndex, newIndex)
    setClauses(reordered)
  }}
>
  <SortableContext
    items={clauses.map((_, i) => `clause-${i}`)}
    strategy={verticalListSortingStrategy}
  >
    {clauses.map((clause, ci) => (
      <SortableClause
        key={`clause-${ci}`}
        clause={clause}
        index={ci}
        activeTool={activeTool}
        onOpenModal={onOpenModal}
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
    {addingTarget.type === 'clause' ? (
      <>
        {selectedClauseIndex === null && newText === '' ? (
          <>
            <label className="block mb-2 font-medium text-gray-700">
              Wybierz istniejącą klauzulę do dodania:
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={selectedClauseIndex ?? ''}
              onChange={e => setSelectedClauseIndex(Number(e.target.value))}
            >
              <option value="" disabled>-- wybierz klauzulę --</option>
              {klauzule.clauses.map((clause, idx) => (
                <option key={idx} value={idx}>
                  {clause.title || `Klauzula ${idx + 1}`}
                </option>
              ))}
            </select>

            <button
              className="text-sm text-blue-600 hover:underline mt-1"
              onClick={() => {
                setSelectedClauseIndex('new'); // sygnał że tworzymy nową
              }}
            >
              + Stwórz nową klauzulę
            </button>
          </>
        ) : selectedClauseIndex === 'new' ? (
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
        ) : null}
      </>
    ) : (
      <>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          rows={3}
          placeholder="Wpisz treść nowego podpunktu..."
          value={newText}
          onChange={e => setNewText(e.target.value)}
        />
      </>
    )}

    <div className="flex gap-2">
      <button
        onClick={() => {
          if (addingTarget.type === 'clause') {
            if (selectedClauseIndex === 'new') {
              if (!newText.trim() || !addingTarget.newItemText?.trim()) return;

              clauses.push({
                title: newText.trim(),
                items: [{ text: addingTarget.newItemText.trim() }]
              });
            } else if (selectedClauseIndex !== null) {
              const clauseToCopy = klauzule.clauses[selectedClauseIndex];
              clauses.push({
                title: clauseToCopy.title,
                items: [...clauseToCopy.items]
              });
            } else {
              return;
            }
          } else if (addingTarget.type === 'item') {
            if (!newText.trim()) return;
            clauses[addingTarget.clauseIndex].items.push({ text: newText });
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
  )
}
