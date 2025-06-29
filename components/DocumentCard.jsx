'use client'

import React, { useState, useEffect } from "react"
import ContentSection from "./ContentSection"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { klauzule } from "@/data/klauzule"

// Funkcja scalająca klauzule z alternatywami
function mergeClauses(clauses, alternativeData) {
  return clauses
    .slice(0, 3)
    .map((_, idx) => {
      const alt = alternativeData.find(a => a.clauseIndex === idx)
      if (!alt) return clauses[idx]
      // jeśli wybrano wariant, zwróć wybrany wariant
      if (alt.selectedVariantIndex != null) {
        return clauses[alt.selectedVariantIndex]
      }
      // inaczej zwróć oryginalną klauzulę
      return clauses[alt.clauseIndex]
    })
}

export default function DocumentCard() {
  const [activeTool, setActiveTool] = useState(null)
  const [alternativeData, setAlternativeData] = useState([])
  const [bindingData,setBindingData] = useState([])
  const [clauses, setClauses] = useState( mergeClauses(klauzule.clauses, []))

  console.log(alternativeData)
  console.log(bindingData)

  useEffect(() => {
    setClauses(mergeClauses(klauzule.clauses, alternativeData))
  }, [alternativeData])

  // Handler wyboru wariantu dla danej klauzuli
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
    <div className="flex w-full">
    {/* Sidebar */}
    <div className="w-1/5 border-r border-gray-200 bg-white">
      <SidebarProvider>
        <AppSidebar activeTool={activeTool} setActiveTool={setActiveTool} />
        <SidebarTrigger />
      </SidebarProvider>
    </div>

    {/* Główna zawartość */}
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



    {/* Panel alternatyw */}
    <div className="w-1/5 p-6 border-l border-gray-200 overflow-auto m-7 bg-gray-400 text-black">
      <h2 className="text-lg font-semibold mb-4">Opcje w Umowie</h2>
      <div className="text-sm text-black space-y-4">
     {alternativeData.length > 0 ? (
  alternativeData.map((alt, idx) => {
     return (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl shadow-sm p-5 mb-6 bg-white"
          >
            <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Alternatywa
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Pytanie {alt.clauseIndex + 1}: {alt.question}
              </p>
            </div>

            <div>
              <label
                htmlFor={`variant-select-${alt.clauseIndex}`}
                className="block mb-2 font-medium text-gray-700"
              >
                Wybierz alternatywę:
              </label>

              <select
                id={`variant-select-${alt.clauseIndex}`}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={alt.selectedVariantIndex ?? ""}
                onChange={e =>
                  handleVariantSelect(alt.clauseIndex, Number(e.target.value))
                }
              >
                <option value="" disabled>
                  - wybierz alternatywę -
                </option>
                {alt.variants && alt.variants.length > 0 ? (
                  alt.variants.map((variantIdx, vIdx) => (
                    <option key={vIdx} value={variantIdx}>
                      {klauzule.clauses[variantIdx]?.title ||
                        `Klauzula ${variantIdx + 1}`}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Brak opcji
                  </option>
                )}
              </select>
            </div>
          </div>

          
        );
        
  })
) : (
  <p className="text-gray-500">Brak zapisanych alternatyw.</p>
)}


    {bindingData.map((bind, idx) => {
    const targetClauseIndex = bind.selectedVariantIndex;
   
    const targetClauseTitle = klauzule.clauses[targetClauseIndex]?.title || `Klauzula ${targetClauseIndex + 1}`;
    const targetHref = `#clause-${targetClauseIndex}`;
  console.log(targetHref )
        return (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl shadow-sm p-5 mb-6 bg-white"
          >
            <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Powiązanie
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Powiązanie klauzuli {bind.clauseIndex + 1}
              </p>
            </div>

            <div className="mt-2 text-blue-600 hover:underline cursor-pointer">
              {targetClauseIndex != null ? (
                <a href={targetHref}>{targetClauseTitle}</a>
              ) : (
                <span className="text-gray-500">Brak wybranej klauzuli</span>
              )}
            </div>
          </div>
        );
      })}
   
  

      </div>
    </div>
  </div>
)}