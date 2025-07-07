'use client'
import React, { useState, useEffect } from "react"
import { mergeClauses } from "@/utils/mergeClauses"
import { klauzule } from "@/data/klauzule"
import Toolbar from "./Toolbar"
import ClauseBar from "./ClausesBar"
import ClauseList from './clauses/ClausesList'
export default function DocumentCard() {
  const [activeTool, setActiveTool] = useState(null)
  const [alternativeData, setAlternativeData] = useState([])
  const [bindingData, setBindingData] = useState([])
  const [clauses, setClauses] = useState(mergeClauses(klauzule.clauses, []))
  const [modalData, setModalData] = useState({ type: null, text: '', clauseIndex: null, itemIndex: null, subIndex: null })

  useEffect(() => {
    setClauses(mergeClauses(klauzule.clauses, alternativeData))
  }, [alternativeData])

  // const handleVariantSelect = (idx, variantIdx) => {
  //   setAlternativeData(prev => {
  //     const newAlt = [...prev]
  //     const existingIdx = newAlt.findIndex(a => a.clauseIndex === idx)
  //     const entry = {
  //       clauseIndex: idx,
  //       variants: newAlt[existingIdx]?.variants || [],
  //       selectedVariantIndex: variantIdx
  //     }
  //     if (existingIdx !== -1) {
  //       newAlt[existingIdx] = { ...newAlt[existingIdx], ...entry }
  //     } else {
  //       newAlt.push(entry)
  //     }
  //     return newAlt
  //   })
  // }

  return (
    <div className="flex bg-gray-50">
    <Toolbar/>
      <div className="document-card w-3/5 p-6 overflow-auto">
        <div className="space-y-10">
             <ClauseList
               clauses={clauses}
               setClauses={setClauses}
               modalData={modalData}
               klauzule = {klauzule}
               activeTool={activeTool}
               setModalData={setModalData}
             />
           </div>
      </div>

     <ClauseBar klauzule={klauzule}/>
    </div>

  )
}