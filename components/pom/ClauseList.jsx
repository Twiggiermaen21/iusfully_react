"use client";
import React, { useState } from "react";
import formatClauseWithSelect from "@/utils/formatClauseWithSelect";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useId } from "react";
import HoveringMenu from "../clauses/HoveringMenu";
import { Button } from "../ui/button";
import Image from "next/image";
import arrowDOWNUP from "@/public/images/icon-up-dow.svg"


function SortableClause({ setClauses, clause, clauses, modalData, index, activeTool, onOpenModal, setModalData }) {
  const describedById = useId();
  const [isHovering, setIsHovering] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,

  } = useSortable({
    id: `clause-${index}`,
    transition: {
      duration: 650,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });
const [isSelecting, setIsSelecting] = useState(false);
const [selectedPoints, setSelectedPoints] = useState(() => {
  let all = [];
  clause.items.forEach((item, ii) => {
    all.push(`${ii}`);
    item.subpoints?.forEach((_, si) => {
      all.push(`${ii}-${si}`);
    });
  });
  return all;
});
console.log(selectedPoints)
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <>
      <div
        id={describedById}
        aria-live="assertive"
        style={{ position: "absolute", left: -9999, top: 0 }}

      />
      <div
        id={clause.id}
        ref={setNodeRef}
        {...attributes}

        aria-describedby={describedById}
        style={style}
        onMouseEnter={() => {
          setIsHovering(true)
          setModalData({
            type: "clause",
            text: clause.title,
            clauseIndex: index,
          })
        }

        }
        onMouseLeave={() => {
          setIsHovering(false)
          setModalData([])
        }}
        className="relative rounded-lg p-4 mb-4 bg-white shadow"
      >
        <div className=" relative p-2 right-2 flex gap-2 ">

          {isHovering && (

            <HoveringMenu
              modalData={modalData}
              clauses={clauses}
              setClauses={setClauses}
              setIsSelecting={setIsSelecting}
            />

          )}
          {isHovering && (

            <Button {...listeners} className="absolute right-1   bg-amber-300  cursor-grab" >
              <Image alt="arrow" src={arrowDOWNUP}></Image>
            </Button>


          )}
        </div>
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-semibold">{clause.title}</h1>


        </div>

        <ol className="list-decimal pl-6 space-y-4 text-gray-800">
  {clause.items?.map((item, ii) => {
    // SPRAWDZAMY czy ten item ma być widoczny w trybie nie-wybierania
    const itemSelected = selectedPoints.includes(`${ii}`) ||
      item.subpoints?.some((_, si) => selectedPoints.includes(`${ii}-${si}`));

    if (!isSelecting && !itemSelected) return null;

    return (
      <li
        key={ii}
        className={`p-3 rounded-lg ${activeTool === "items" && !isSelecting
          ? "hover:bg-blue-50 cursor-pointer transition"
          : ""}`}
        onClick={(e) => {
          if (activeTool === "items" && !isSelecting) {
            e.stopPropagation();
            onOpenModal({
              type: "item",
              text: item.text,
              clauseIndex: index,
              itemIndex: ii,
            });
          }
        }}
      >
        <div className="flex justify-between items-start">
          {isSelecting ? (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedPoints.includes(`${ii}`)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPoints(prev => [...prev, `${ii}`]);
                  } else {
                    setSelectedPoints(prev => prev.filter(id => id !== `${ii}`));
                  }
                }}
              />
              <span>{item.text}</span>
            </label>
          ) : (
            <span
              onClick={(e) => {
                if (activeTool === "text") {
                  e.stopPropagation();
                  onOpenModal({
                    type: "subpoint",
                    text: item.text,
                    clauseIndex: index,
                    itemIndex: ii,
                    subIndex: ii,
                  });
                }
              }}
              className={
                activeTool === "text"
                  ? "hover:underline cursor-pointer transition"
                  : ""
              }
            >
              {item.select
                ? formatClauseWithSelect(item.text, item.select)
                : item.text}
            </span>
          )}
        </div>

        <ul className="list-[lower-alpha] list-inside pl-4 mt-2 text-sm text-gray-700 space-y-1">
          {item.subpoints?.map((sub, si) => {
            const subSelected = selectedPoints.includes(`${ii}-${si}`);

            if (!isSelecting && !subSelected) return null;

            return (
              <li key={si}>
                {isSelecting ? (
                  <label className="flex items-center space-x-2 ml-6">
                    <input
                      type="checkbox"
                      checked={subSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPoints(prev => [...prev, `${ii}-${si}`]);
                        } else {
                          setSelectedPoints(prev => prev.filter(id => id !== `${ii}-${si}`));
                        }
                      }}
                    />
                    <span>{sub}</span>
                  </label>
                ) : (
                  <span
                    onClick={(e) => {
                      if (activeTool === "text") {
                        e.stopPropagation();
                        onOpenModal({
                          type: "subpoint",
                          text: sub,
                          clauseIndex: index,
                          itemIndex: ii,
                          subIndex: si,
                        });
                      }
                    }}
                    className={
                      activeTool === "text"
                        ? "hover:underline cursor-pointer transition"
                        : ""
                    }
                  >
                    {sub}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </li>
    );
  })}
</ol>

{isSelecting && (
  <div className="flex space-x-4 mt-4">
    <Button
      variant="success"
      onClick={() => {
        console.log("Zapisz wybrane:", selectedPoints);
        setIsSelecting(false);
      }}
    >
      ✅ Zapisz
    </Button>
    <Button
      variant="destructive"
      onClick={() => {
        setIsSelecting(false);
        setSelectedPoints([]);
      }}
    >
      ❌ Anuluj
    </Button>
  </div>
)}


      </div>
    </>
  );
}

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
                    clauses.push(clauseToCopy);
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
