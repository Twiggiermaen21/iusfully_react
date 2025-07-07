import React, { useState } from "react";
import { TrashIcon, PlusIcon, PencilIcon } from '@heroicons/react/24/solid'

export default function RuleEditor({ rules, isHovering, setRules, addRule, klauzule, removeRule }) {
  const availableFields = ["Pole A", "Pole B", "Pole C"];
  console.log(klauzule.clauses[0].title)
  const [option, setOption] = useState([]);
  const [newClauseInputFor, setNewClauseInputFor] = useState(null);

  const toggleEditing = (id) => {
    setRules(rules.map(rule =>
      rule.id === id ? { ...rule, editing: !rule.editing } : rule
    ));
  };

  const addVariantToRule = (id) => {
    setRules(rules.map(rule =>
      rule.id === id
        ? {
          ...rule,
          variants: [
            ...(rule.variants || []),
            { condition: availableFields[0], result: availableFields[0] }
          ]
        }
        : rule
    ));
  };

  const updateVariant = (ruleId, variantIndex, field, value) => {
    setRules(rules.map(rule => {
      if (rule.id === ruleId) {
        const updatedVariants = [...(rule.variants || [])];
        updatedVariants[variantIndex] = {
          ...updatedVariants[variantIndex],
          [field]: value
        };
        return { ...rule, variants: updatedVariants };
      }
      return rule;
    }));
  };

  const updateClause = (ruleId, value) => {
    if (value === "__new") {
      setNewClauseInputFor(ruleId);
    } else {
      setRules(rules.map(rule =>
        rule.id === ruleId ? { ...rule, clause: value } : rule
      ));
    }
  };

  const saveNewClause = (ruleId, value) => {
    setOption([...option, value]);
    setRules(rules.map(rule =>
      rule.id === ruleId ? { ...rule, clause: value } : rule
    ));
    setNewClauseInputFor(null);
  };

  return (
    <div className="bg-white p-6 mb-4 w-full max-w-6xl mx-auto">


      <div className="space-y-5">
        {rules.map((rule, index) => (
          <div
            key={rule.id}
            className={"rounded-xl p-4 border transition  bg-green-50 border-green-200" }
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">Reguła {index + 1}</span>
              </div>
              {isHovering && (<div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleEditing(rule.id)}
                  className="p-1 text-gray-400 hover:text-yellow-500 transition"
                >
                  <PencilIcon className="w-5 h-5 text-gray-500" />
                </button>
                <button
                  onClick={() => removeRule(rule.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>)}

            </div>

            {/* textarea + inline add clause */}
            <div className={`${rule.editing ? "flex gap-4 mb-4" : "flex items-center justify-between mb-4"}`}>
              {rule.editing ? (<textarea
                value={rule.description || ""}
                onChange={(e) =>
                  setRules(rules.map(r =>
                    r.id === rule.id ? { ...r, description: e.target.value } : r
                  ))
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm resize-none"
                rows={2}
                placeholder="Dodaj opis dla tej reguły..."
              />) : (<h1 className="text-xl font-semibold text-gray-900 pl-2">
                {rule.description || "tutaj będzie polecenie"}
              </h1>)
              }
              {(newClauseInputFor === rule.id || option.length === 0) ? (
                rule.editing ? (
                  <input
                    autoFocus
                    type="text"
                    onBlur={(e) => saveNewClause(rule.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        saveNewClause(rule.id, e.target.value);
                      }
                    }}
                    className="w-48 px-3 py-2 border border-gray-300 rounded text-sm"
                    placeholder="Nowa klauzula..."
                  />) : (<h1>{rule.clause || "opcja"}</h1>)

              ) : (
                rule.editing ? (<select
                  value={rule.clause || ""}
                  onChange={(e) => updateClause(rule.id, e.target.value)}
                  className="w-48 px-3 py-2 border border-gray-300 rounded-xl text-sm"
                >
                  {option.map((c, idx) => (
                    <option key={idx} value={c}>{c}</option>
                  ))}
                  <option value="__new">+ Dodaj nową zmienną...</option>
                </select>) : (<h1 className="text-lg font-semibold text-gray-700 pr-2">
                  {rule.clause || "opcja"}
                </h1>)
              )}
            </div>

            {/* jeżeli [select] to [select] */}
            {(rule.variants || []).map((variant, idx) => (
              rule.editing && (
                <div key={idx} className="flex flex-wrap items-center gap-2 text-sm mb-2">


                  <span className="font-medium text-gray-700">
                    {idx === 0 ? "jeżeli" : "a jeżeli"}
                  </span>

                  {rule.editing ? (
                    <select
                      value={variant.condition}
                      onChange={(e) => updateVariant(rule.id, idx, "condition", e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm"
                    >

                      {option?.map((op, i) => (
                        <option key={i} value={op}>{op}</option>
                      ))}
                    </select>
                  ) : (
                    <>
                      {/* <div className="px-3 py-1 border border-gray-200 rounded text-sm bg-gray-50">
                    {variant.condition}
                  </div> */}
                    </>
                  )}

                  <span className="text-gray-500">to</span>

                  {rule.editing ? (
                    <select
                      value={variant.result}
                      onChange={(e) => updateVariant(rule.id, idx, "result", e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm"
                    >
                      {klauzule.clauses?.map((clause, i) => (
                        <option key={i} value={clause.title}>{clause.title}</option>
                      ))}
                    </select>
                  ) : (
                    <>
                      {/* <div className="px-3 py-1 border border-gray-200 rounded text-sm bg-gray-50">
                    {variant.result}
                  </div> */}
                    </>
                  )}
                </div>
              )
            ))}

            {rule.editing && (
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => addVariantToRule(rule.id)}
                  className="px-4 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50"
                >
                  + Dodaj wariant
                </button>
              </div>
            )}
          </div>
        ))}
        {isHovering  && (<div className="pt-4">
          <button
            onClick={addRule}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition flex items-center justify-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Dodaj kolejną regułę
          </button>
        </div>)}


      </div>
    </div>
  );
}
