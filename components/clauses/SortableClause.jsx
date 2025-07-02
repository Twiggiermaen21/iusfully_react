"use client";
import React, { useState ,useEffect} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useId } from "react";
import HoveringMenu from "./HoveringMenu";
import { Button } from "../ui/button";
import Image from "next/image";
import arrowDOWNUP from "@/public/images/icon-up-dow.svg";
import formatClauseWithSelect from "@/utils/formatClauseWithSelect";

export default function SortableClause({ setClauses, clause, clauses, modalData, index, activeTool, onOpenModal, setModalData }) {
  const describedById = useId();
  const [isHovering, setIsHovering] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isAdding, setIsAdding] = useState(false)
  const [newText, setNewText] = useState("");
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
const [oldSelectedPoints, setOldSelectedPoints] = useState([]);

useEffect(() => {
  let all = [];
  clause.items.forEach((item, ii) => {
    all.push(`${ii}`);
    item.subpoints?.forEach((_, si) => {
      all.push(`${ii}-${si}`);
    });
  });
  setSelectedPoints(all);
}, [clause.items]);


  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: `clause-${index}`,
    transition: { duration: 650, easing: "cubic-bezier(0.25, 1, 0.5, 1)" },
  });

  const style = { transform: CSS.Transform.toString(transform), transition };
const addProvision = (newObj) => {
  setClauses(prev => prev.map((clause, i) => {
    if (i !== modalData.clauseIndex) return clause;
    return {
      ...clause,
      items: [...clause.items, { text: newObj }]
    };
  }));
};
  return (
    <>
      <div id={describedById} aria-live="assertive" style={{ position: "absolute", left: -9999, top: 0 }} />
      <div
        id={clause.id}
        ref={setNodeRef}
        {...attributes}
        aria-describedby={describedById}
        style={style}
        onMouseEnter={() => { setIsHovering(true); setModalData({ type: "clause", text: clause.title, clauseIndex: index }); }}
        onMouseLeave={() => { setIsHovering(false); setModalData([]); }}
        className="relative rounded-lg p-4 mb-4 bg-white shadow"
      >
        <div className="relative p-2 right-2 flex gap-2">
          {isHovering && <HoveringMenu modalData={modalData} clauses={clauses} setClauses={setClauses} setIsSelecting={setIsSelecting} setIsAdding={setIsAdding} setNewText={setNewText} selectedPoints={selectedPoints} setOldSelectedPoints={setOldSelectedPoints} />}
          {isHovering && (
            <Button {...listeners} className="absolute right-1 bg-amber-300 cursor-grab">
              <Image alt="arrow" src={arrowDOWNUP} />
            </Button>
          )}
        </div>

        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-semibold">{clause.title}</h1>
        </div>

        <ol className="list-decimal pl-6 space-y-4 text-gray-800">
          {clause.items?.map((item, ii) => {
            const itemSelected = selectedPoints.includes(`${ii}`) || item.subpoints?.some((_, si) => selectedPoints.includes(`${ii}-${si}`));
            if (!isSelecting && !itemSelected) return null;
            return (
              <li key={ii} className={`p-3 rounded-lg ${activeTool === "items" && !isSelecting ? "hover:bg-blue-50 cursor-pointer transition" : ""}`} onClick={(e) => {
                if (activeTool === "items" && !isSelecting) {
                  e.stopPropagation();
                  onOpenModal({ type: "item", text: item.text, clauseIndex: index, itemIndex: ii });
                }
              }}>
                <div className="flex justify-between items-start">
                  {isSelecting ? (
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={selectedPoints.includes(`${ii}`)} onChange={(e) => {
                        setSelectedPoints(prev => e.target.checked ? [...prev, `${ii}`] : prev.filter(id => id !== `${ii}`));
                      }} />
                      <span>{item.text}</span>
                    </label>
                  ) : (
                    <span onClick={(e) => {
                      if (activeTool === "text") {
                        e.stopPropagation();
                        onOpenModal({ type: "subpoint", text: item.text, clauseIndex: index, itemIndex: ii, subIndex: ii });
                      }
                    }} className={activeTool === "text" ? "hover:underline cursor-pointer transition" : ""}>
                      {item.select ? formatClauseWithSelect(item.text, item.select) : item.text}
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
                            <input type="checkbox" checked={subSelected} onChange={(e) => {
                              setSelectedPoints(prev => e.target.checked ? [...prev, `${ii}-${si}`] : prev.filter(id => id !== `${ii}-${si}`));
                            }} />
                            <span>{sub}</span>
                          </label>
                        ) : (
                          <span onClick={(e) => {
                            if (activeTool === "text") {
                              e.stopPropagation();
                              onOpenModal({ type: "subpoint", text: sub, clauseIndex: index, itemIndex: ii, subIndex: si });
                            }
                          }} className={activeTool === "text" ? "hover:underline cursor-pointer transition" : ""}>{sub}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
           {isAdding && (
                  <div className="mt-4 flex flex-col gap-2">
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={3}
                      placeholder="Wpisz coś..."
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          console.log("Zapisuję:", newText);
                          setIsAdding(false);
                           addProvision(newText)
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md"
                      >
                        ✅ Zapisz
                      </button>
                      <button
                        onClick={() => {
                          setIsAdding(false);
                          setNewText('');
                        }}
                        className="px-3 py-1 bg-gray-300 rounded-md"
                      >
                        ❌ Anuluj
                      </button>
                    </div>
                  </div>
                )}
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
        setSelectedPoints(oldSelectedPoints); // 🔥 kluczowa zmiana
        setIsSelecting(false);
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
