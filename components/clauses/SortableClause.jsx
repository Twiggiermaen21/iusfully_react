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
export default function SortableClause({ setClauses, clause, clauses, klauzule, modalData, index, activeTool, onOpenModal, setModalData }) {
  const describedById = useId();
  const [isHovering, setIsHovering] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const [rules, setRules] = useState([
    {
      id: 1,
      type: "success",
      ifField: "Typ umowy",
      ifOp: "jest",
      ifValue: "Umowa o dzieło",
      action: "Pokaż",
      clause: "Wynagrodzenie",
    },
    {
      id: 2,
      type: "warning",
      ifField: "Wynagrodzenie",
      ifOp: "jest",
      ifValue: "Aktywne",
      logic: "AND",
      ifExtra: "Wartość",
      compare: ">",
      number: 1000,
      action: "Pokaż",
      clause: "Prawa autorskie",
      warning: "Ta reguła może powodować cykliczną zależność"
    }
  ]);

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

          {isLinking && (
            <div
              ref={(ref) => {
                if (ref) {
                  const handler = (e) => {
                    if (!ref.contains(e.target)) {
                      setIsLinking(false);
                    }
                  };
                  document.addEventListener("mousedown", handler);
                  return () => document.removeEventListener("mousedown", handler);
                }
              }}
              className="absolute top-full left-0 mt-2 w-full max-h-64 overflow-y-auto bg-gradient-to-b from-white via-gray-50 to-gray-100 border border-gray-300 rounded-2xl shadow-2xl p-4 z-50"
            >
              <h3 className="text-sm font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">
                Połącz z inną klauzulą
              </h3>
              <div className="space-y-2">
                {klauzule.clauses.map((otherClause, ci) => (
                  <div
                    key={ci}
                    className="cursor-pointer p-3 rounded-xl hover:bg-blue-100 transition flex items-center justify-between group"
                    onClick={() => {
                      setClauses(prev =>
                        prev.map(cl =>
                          cl.id === clause.id
                            ? {
                              ...cl,
                              link: Array.isArray(cl.link)
                                ? cl.link.includes(otherClause.id)
                                  ? cl.link // już istnieje, nic nie rób
                                  : [...cl.link, otherClause.id]
                                : cl.link
                                  ? cl.link === otherClause.id
                                    ? [cl.link] // pojedynczy link -> zamień w tablicę
                                    : [cl.link, otherClause.id]
                                  : [otherClause.id] // nie było wcale linków
                            }
                            : cl
                        )
                      );

                      if (!clauses.find(c => c.id === otherClause.id)) {
                        setClauses(prev => [...prev, otherClause]);
                      }
                      setIsLinking(false);
                    }}
                  >
                    <span className="text-gray-700 font-medium group-hover:text-blue-800">
                      §{ci + 1} {otherClause.title}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-blue-700">
                      Kliknij aby połączyć
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

    {isAlternative && (
  <div
    ref={(ref) => {
      if (ref) {
        const handler = (e) => {
          if (!ref.contains(e.target)) {
            setIsAlternative(false);
          }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
      }
    }}
    className="absolute top-full left-0 mt-2 w-full max-h-96 overflow-y-auto bg-gradient-to-b from-white via-gray-50 to-gray-100 border border-gray-300 rounded-2xl shadow-2xl p-6 z-50"
  >
    <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
      Reguły zależności
    </h3>
    <div className="space-y-5">
      {rules.map((rule, index) => (
        <div
          key={rule.id}
          className={`rounded-xl p-4 border transition 
            ${rule.type === "success" ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {rule.type === "success" ? (
                <i className="fa-solid fa-circle-check text-green-500"></i>
              ) : (
                <i className="fa-solid fa-triangle-exclamation text-amber-500"></i>
              )}
              <span className="font-medium text-gray-900">Reguła {index + 1}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 text-gray-400 hover:text-gray-600 transition">
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                onClick={() => removeRule(rule.id)}
                className="p-1 text-gray-400 hover:text-red-600 transition"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-gray-700">JEŚLI</span>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>{rule.ifField || "Pole"}</option>
              </select>
              <span className="text-gray-500">{rule.ifOp}</span>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>{rule.ifValue || "Wartość"}</option>
              </select>
              {rule.logic && (
                <>
                  <select className="px-3 py-1 border border-gray-300 rounded text-sm bg-blue-50">
                    <option>{rule.logic}</option>
                  </select>
                  <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                    <option>{rule.ifExtra || "Pole"}</option>
                  </select>
                  <span className="text-gray-500">{rule.compare || ">"}</span>
                  <input
                    type="number"
                    value={rule.number || ""}
                    className="w-20 px-3 py-1 border border-gray-300 rounded text-sm"
                    readOnly
                  />
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-gray-700">TO</span>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>{rule.action}</option>
              </select>
              <span className="text-gray-500">klauzulę</span>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>{rule.clause || "Klauzula"}</option>
              </select>
            </div>
          </div>

          {rule.warning && (
            <div className="mt-4 p-2 bg-amber-100 rounded text-sm text-amber-800 flex items-start">
              <i className="fa-solid fa-circle-info mr-2"></i>
              <span>{rule.warning}</span>
            </div>
          )}
        </div>
      ))}
    </div>

    <div className="mt-6">
      <button
        onClick={addRule}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition"
      >
        <i className="fa-solid fa-plus mr-2"></i> Dodaj kolejną regułę
      </button>
    </div>
  </div>
)}



          {isHovering && (
            <Button {...listeners} className="absolute right-1 bg-amber-300 cursor-grab">
              <Image alt="arrow" src={arrowDOWNUP} />
            </Button>
          )}
        </div>

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
