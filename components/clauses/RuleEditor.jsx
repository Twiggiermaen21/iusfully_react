import React, { useState } from "react"

export default function RuleEditor({ rules, addRule, removeRule }) {
  // dynamiczne listy zmiennych
  const [fields, setFields] = useState(["Pole A", "Pole B"])
  const [values, setValues] = useState(["Wartość X", "Wartość Y"])
  const [clauses, setClauses] = useState(["Klauzula 1", "Klauzula 2"])

  return (
    <div className="bg-white p-6 mb-4 w-full max-w-6xl mx-auto">
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
                
                <select
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                  onChange={(e) => {
                    if (e.target.value === "__new") {
                      const newField = prompt("Podaj nazwę nowego pola:")
                      if (newField) setFields([...fields, newField])
                    } else {
                      rule.ifField = e.target.value
                    }
                  }}
                >
                  <option>{rule.ifField || "Pole"}</option>
                  {fields.map((f, idx) => (
                    <option key={idx} value={f}>{f}</option>
                  ))}
                  <option value="__new">+ Dodaj nową zmienną...</option>
                </select>

                <span className="text-gray-500">{rule.ifOp}</span>

                <select
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                  onChange={(e) => {
                    if (e.target.value === "__new") {
                      const newVal = prompt("Podaj nową wartość:")
                      if (newVal) setValues([...values, newVal])
                    } else {
                      rule.ifValue = e.target.value
                    }
                  }}
                >
                  <option>{rule.ifValue || "Wartość"}</option>
                  {values.map((v, idx) => (
                    <option key={idx} value={v}>{v}</option>
                  ))}
                  <option value="__new">+ Dodaj nową zmienną...</option>
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

                <select
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                  onChange={(e) => {
                    if (e.target.value === "__new") {
                      const newClause = prompt("Podaj nazwę nowej klauzuli:")
                      if (newClause) setClauses([...clauses, newClause])
                    } else {
                      rule.clause = e.target.value
                    }
                  }}
                >
                  <option>{rule.clause || "Klauzula"}</option>
                  {clauses.map((c, idx) => (
                    <option key={idx} value={c}>{c}</option>
                  ))}
                  <option value="__new">+ Dodaj nową zmienną...</option>
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

        <div className="pt-4">
          <button
            onClick={addRule}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition"
          >
            <i className="fa-solid fa-plus mr-2"></i> Dodaj kolejną regułę
          </button>
        </div>
      </div>
    </div>
  )
}
