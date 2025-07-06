"use client";
import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useId } from "react";
import HoveringMenu from "./HoveringMenu";
import { Button } from "../ui/button";
import Image from "next/image";
import arrowDOWNUP from "@/public/images/icon-up-dow.svg";

export default function SortableClause({ setClauses, clause, clauses, modalData, index, activeTool, onOpenModal, setModalData }) {
  const describedById = useId();
  const [isHovering, setIsHovering] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
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

  const [requireAtLeastOne, setRequireAtLeastOne] = useState(true);
  const [hideIfNotSelected, setHideIfNotSelected] = useState(false);
  const [allowCustomSubpoints, setAllowCustomSubpoints] = useState(false);

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

  const toggleSelect = (ii, checked) => {
    setSelectedPoints(prev =>
      checked ? [...prev, `${ii}`] : prev.filter(p => p !== `${ii}`)
    );
  };

  const updateItemText = (ii, text) => {
    setClauses(prev =>
      prev.map((cl, ci) =>
        ci === index
          ? { ...cl, items: cl.items.map((item, idx) => idx === ii ? { ...item, text } : item) }
          : cl
      )
    );
  };

  const updateSubpointText = (ii, si, text) => {
    setClauses(prev =>
      prev.map((cl, ci) =>
        ci === index
          ? {
            ...cl,
            items: cl.items.map((item, idx) =>
              idx === ii
                ? { ...item, subpoints: item.subpoints.map((sub, sIdx) => sIdx === si ? text : sub) }
                : item
            ),
          }
          : cl
      )
    );
  };

  const removeItem = (ii) => {
    setClauses(prev =>
      prev.map((cl, ci) =>
        ci === index
          ? { ...cl, items: cl.items.filter((_, idx) => idx !== ii) }
          : cl
      )
    );
  };

  const addProvision = (newObj) => {
    setClauses(prev =>
      prev.map((cl, ci) =>
        ci === index
          ? { ...cl, items: [...cl.items, { text: newObj, subpoints: [] }] }
          : cl
      )
    );
    setNewText("");
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
          <h1 className="text-xl font-semibold">§{index + 1}. {clause.title}</h1>
        </div>

        <div className="space-y-4 mb-6">
          {clause.items?.map((item, ii) => (
            <div
              key={ii}
              className={`${isSelecting ? "border border-gray-200 rounded-lg p-4" : ""}`}
            >
              {isSelecting ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 mr-2">{ii + 1}.</span>
                      <div className="relative inline-block w-12 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          checked={selectedPoints.includes(`${ii}`)}
                          onChange={(e) => toggleSelect(ii, e.target.checked)}
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in checked:translate-x-full checked:border-primary"
                          id={`toggle-${ii}`}
                        />
                        <label htmlFor={`toggle-${ii}`} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                      </div>
                      <span className="ml-2 text-xs text-gray-600">Opcjonalny</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button {...listeners} className="text-gray-400 hover:text-gray-600 cursor-grab">⭥</button>
                      <button className="text-gray-400 hover:text-danger" onClick={() => removeItem(ii)}>🗑️</button>
                    </div>
                  </div>

                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Treść podpunktu..."
                    value={item.text}
                    onChange={(e) => updateItemText(ii, e.target.value)}
                  />

                  {item.subpoints?.map((sub, si) => (
                    <textarea
                      key={si}
                      className="w-full p-2 mt-2 border border-gray-200 rounded-lg"
                      placeholder="Treść pod-podpunktu..."
                      value={sub}
                      onChange={(e) => updateSubpointText(ii, si, e.target.value)}
                    />
                  ))}

                </>
              ) : (
                <>
                  <div className="flex items-start space-x-2">
                    <span className="font-medium text-gray-900">{ii + 1}.</span>
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                  {item.subpoints?.length > 0 && (
                    <ul className="list-[lower-alpha] pl-6 mt-2 text-sm text-gray-700 space-y-1">
                      {item.subpoints.map((sub, si) => (
                        <li key={si}>{sub}</li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          ))}
          {isSelecting && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Ustawienia opcjonalności</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={requireAtLeastOne}
                    onChange={(e) => setRequireAtLeastOne(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Wymagaj wyboru co najmniej jednego podpunktu opcjonalnego
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hideIfNotSelected}
                    onChange={(e) => setHideIfNotSelected(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Ukryj całkowicie niezaznaczone podpunkty w finalnym dokumencie
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={allowCustomSubpoints}
                    onChange={(e) => setAllowCustomSubpoints(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Pozwól klientowi dodawać własne podpunkty
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

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
                  setIsAdding(false);
                  addProvision(newText);
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
                setSelectedPoints(oldSelectedPoints);
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
