"use client";
import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useId } from "react";
import HoveringMenu from "./HoveringMenu";
import { Button } from "../ui/button";
import Image from "next/image";
import arrowDOWNUP from "@/public/images/icon-up-dow.svg";
import link from "@/public/images/link.svg";

import ClauseLinker from "@/components/clauses/ClauseLinker"
import RuleEditor from "@/components/clauses/RuleEditor"
import ClauseItemsEditor from "@/components/clauses/ClauseItemsEditor"
export default function SortableClause({ setClauses, clause, clauses, klauzule, modalData, index, activeTool, setModalData }) {
  const describedById = useId();
  const [isHovering, setIsHovering] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const [rules, setRules] = useState([]);

  const addRule = () => {
    setRules(prev => [
      ...prev,
      {
        id: Date.now(),
        type: "success",
        ifField: "",
        ifOp: "jest",
        ifValue: "",
        action: "Pokaż",
        clause: ""
      }
    ]);
  };

  const removeRule = (id) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
  };
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
  const [isLinking, setIsLinking] = useState(false);
  const [isAlternative, setIsAlternative] = useState(false)
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
  console.log("ModalData", modalData)
  console.log("klazuzle w dokumncie", clauses)
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
useEffect(() => {
  if (!isHovering && rules.length===0) {
    setIsAlternative(false);
  }
}, [isHovering]);
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
          {isHovering && <HoveringMenu modalData={modalData} clauses={clauses} setClauses={setClauses}
            setIsSelecting={setIsSelecting} setIsAdding={setIsAdding} setNewText={setNewText}
            selectedPoints={selectedPoints} setOldSelectedPoints={setOldSelectedPoints} setIsLinking={setIsLinking} setIsAlternative={setIsAlternative} />}

          <ClauseLinker
            isLinking={isLinking}
            setIsLinking={setIsLinking}
            klauzule={klauzule}
            clauses={clauses}
            setClauses={setClauses}
            clause={clause}
          />


          {isHovering && (
            <Button {...listeners} className="absolute right-1 bg-amber-300 cursor-grab">
              <Image alt="arrow" src={arrowDOWNUP} />
            </Button>
          )}
        </div>

        {isAlternative && (
          <RuleEditor
            rules={rules}
            isHovering={isHovering}
            setRules={setRules}
            addRule={addRule}
            klauzule={klauzule}
            removeRule={removeRule}
          />
        )}

        <div className="flex justify-center items-center  mb-2">
          <h1 className="text-xl  font-semibold">§{index + 1} {clause.title}</h1>
          {clause.link && (
            <div className="relative inline-block">
              <Image
                alt="link"
                className="pl-3 size-10 cursor-pointer"
                src={link}
                onMouseEnter={(e) => {
                  const tooltip = e.currentTarget.parentNode.querySelector('.tooltip-link');
                  if (tooltip) {
                    tooltip.style.opacity = '1';
                    tooltip.style.pointerEvents = 'auto';
                  }
                }}
                onMouseLeave={(e) => {
                  const tooltip = e.currentTarget.parentNode.querySelector('.tooltip-link');
                  setTimeout(() => {
                    if (!tooltip.matches(':hover')) {
                      tooltip.style.opacity = '0';
                      tooltip.style.pointerEvents = 'none';
                    }
                  }, 100);
                }}
              />

              <div
                className="tooltip-link absolute left-12 top-0 z-50 opacity-0 pointer-events-none transition-opacity duration-300 
      bg-gradient-to-b from-white via-gray-50 to-gray-100 border border-gray-300 rounded-xl shadow-2xl 
      p-4 w-72"
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.pointerEvents = 'auto';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0';
                  e.currentTarget.style.pointerEvents = 'none';
                }}
              >
                <h4 className="text-xs font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">
                  Połączono z:
                </h4>
                <div className="space-y-2">
                  {(Array.isArray(clause.link) ? clause.link : [clause.link]).map((lid, idx) => {
                    const linkedClause = clauses.find(c => c.id === lid);
                    return (
                      <div
                        key={idx}
                        className="text-sm text-blue-700 hover:text-blue-900 hover:underline cursor-pointer transition"
                        onClick={() => {
                          const el = document.getElementById(lid);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        §{linkedClause ? linkedClause.id.replace(/\D/g, '') : lid} {linkedClause?.title || ''}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

        <ClauseItemsEditor
          clause={clause}
          isSelecting={isSelecting}
          selectedPoints={selectedPoints}
          toggleSelect={toggleSelect}
          removeItem={removeItem}
          updateItemText={updateItemText}
          updateSubpointText={updateSubpointText}
          requireAtLeastOne={requireAtLeastOne}
          setRequireAtLeastOne={setRequireAtLeastOne}
          allowCustomSubpoints={allowCustomSubpoints}
          setAllowCustomSubpoints={setAllowCustomSubpoints}
          listeners={listeners}
        />

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
