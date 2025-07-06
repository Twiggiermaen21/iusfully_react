'use client'
import React, { useState, useEffect } from "react"
import ContentSection from "./ContentSection"
import { klauzule } from "@/data/klauzule"
import { mergeClauses } from "@/utils/mergeClauses"

export default function DocumentCard() {
  const [activeTool, setActiveTool] = useState(null)
  const [alternativeData, setAlternativeData] = useState([])
  const [bindingData, setBindingData] = useState([])
  const [clauses, setClauses] = useState(mergeClauses(klauzule.clauses, []))

  useEffect(() => {
    setClauses(mergeClauses(klauzule.clauses, alternativeData))
  }, [alternativeData])

  const handleVariantSelect = (idx, variantIdx) => {
    setAlternativeData(prev => {
      const newAlt = [...prev]
      const existingIdx = newAlt.findIndex(a => a.clauseIndex === idx)
      const entry = {
        clauseIndex: idx,
        variants: newAlt[existingIdx]?.variants || [],
        selectedVariantIndex: variantIdx
      }
      if (existingIdx !== -1) {
        newAlt[existingIdx] = { ...newAlt[existingIdx], ...entry }
      } else {
        newAlt.push(entry)
      }
      return newAlt
    })
  }

  return (
    <div className="flex w-full bg-gray-50">
      <div className="w-1/5 bg-gray-100 border-r flex flex-col p-4 space-y-4">
        <h3 className="text-lg font-semibold mb-4">Toolbar</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Nowa klauzula
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          Zapisz
        </button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
          Eksportuj
        </button>
      </div>

      <div className="document-card w-3/5 p-6 overflow-auto">
        <ContentSection
          activeTool={activeTool}
          alternativeData={alternativeData}
          setAlternativeData={setAlternativeData}
          setBindingData={setBindingData}
          clauses={clauses}
          setClauses={setClauses}
          onVariantSelect={handleVariantSelect}
        />
      </div>


      <div className="flex-1 p-6 h-screen  overflow-auto space-y-4">
        <div className="bg-gray-200">
          <div className="p-4 border-b  border-gray-200">
            <div className="relative">
              <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍 </i>
              <input
                type="text"
                placeholder="Szukaj klauzul..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-gray-600">
                Klauzule ({klauzule.clauses.length})
              </span>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600">⚙️</button>
                <button className="p-1 text-gray-400 hover:text-gray-600">↕️</button>
              </div>
            </div>
          </div>

          <div id="document-preview" className="p-4 space-y-4">
            {klauzule.clauses.map((clause, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-lg p-4 border border-gray-200`}
              >
                <h4 className="text-sm font-medium text-gray-900 mb-2">{clause.title}</h4>
                {clause.items.map((item, i) => (
                  <p key={i} className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                    {item.text}
                  </p>
                ))}

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}