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
  const [alternativeData, setAlternativeData] = useState(
    // przykład struktury: [{ clauseIndex: 1, variants: [2,3], selectedVariantIndex: null }]
    []
  )
  const [clauses, setClauses] = useState(
    mergeClauses(klauzule.clauses, [])
  )

  // Za każdym razem gdy zmienią się alternativeData, przeliczamy clauses
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

    console.log(`Zaktualizowano alt dla klauzuli ${idx}, wariant ${variantIdx}`)
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
          clauses={clauses}
          setClauses={setClauses}
          onVariantSelect={handleVariantSelect}
        />
      </div>

      {/* Panel alternatyw */}
      <div className="w-1/5 p-6 border-l border-gray-200 overflow-auto m-7 bg-gray-400 text-black">
        <h2 className="text-lg font-semibold mb-4">Alternatywy</h2>
        <div className="text-sm text-black space-y-4">
          {alternativeData.length > 0 ? (
            alternativeData.map((alt, idx) => (
              <div key={idx} className="space-y-3 border-t pt-3">
                <p>
                  <strong>Klauzula bazowa:</strong> {alt.clauseIndex}
                </p>
                <label
                  htmlFor={`variant-select-${alt.clauseIndex}`}
                  className="block mb-1 font-medium"
                >
                  Wybierz wariant:
                </label>
                <select
                  id={`variant-select-${alt.clauseIndex}`}
                  className="w-full border border-gray-300 rounded p-2"
                  value={alt.selectedVariantIndex ?? ""}
                  onChange={e =>
                    handleVariantSelect(
                      alt.clauseIndex,
                      Number(e.target.value)
                    )
                  }
                >
                  <option value="" disabled>
                    -wybierz alternatywe-
                  </option>
                  {alt.variants && alt.variants.length > 0 ? (
                    alt.variants.map((variantIdx, vIdx) => (
                      <option key={vIdx} value={variantIdx}>
                        {klauzule.clauses[variantIdx].title}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Brak wariantów
                    </option>
                  )}
                </select>
              </div>
            ))
          ) : (
            <p>Brak zapisanych alternatyw.</p>
          )}
        </div>
      </div>
    </div>
  )
}
