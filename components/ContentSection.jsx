import React, { useState } from 'react'
import ClauseList from './ClauseList'
import AlternativeDialog from './AlternativeDialog'
import { klauzule } from '@/data/klauzule'

export default function ContentSection({ activeTool, alternativeData, setAlternativeData,setBindingData, clauses, setClauses }) {
  const [modalData, setModalData] = useState({ type: null, text: '', clauseIndex: null, itemIndex: null, subIndex: null })
  const [isOpen, setIsOpen] = useState(false)

  const openModal = (data) => {
    setModalData(data)
    setIsOpen(true)
  }

  const addAlternative = (newAlt) => setAlternativeData(prev => [...prev, newAlt])
  const addBinding=(newBind) =>  setBindingData(prev =>[...prev,newBind])

  

  return (
    <div className="space-y-10">
      <ClauseList
        clauses={clauses}
        setClauses={setClauses}
        klauzule = {klauzule}
        activeTool={activeTool}
        onOpenModal={openModal}
      />

      <AlternativeDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalData={modalData}
        klauzule={klauzule}
        clauses={clauses}
        setClauses = {setClauses}
        addAlternative={addAlternative}
        addBinding ={addBinding}
        handleDelete={() => {
          // deletion logic moved here
          const { type, clauseIndex, itemIndex, subIndex } = modalData
          if (type === 'clause') setClauses(prev => prev.filter((_, i) => i !== clauseIndex))
          if (type === 'item') setClauses(prev => prev.map((clause, i) => i === clauseIndex
            ? { ...clause, items: clause.items.filter((_, j) => j !== itemIndex) }
            : clause
          ))
          if (type === 'subpoint') setClauses(prev => prev.map((clause, i) => i === clauseIndex
            ? {
                ...clause,
                items: clause.items.map((item, j) => j === itemIndex
                  ? { ...item, subpoints: item.subpoints.filter((_, k) => k !== subIndex) }
                  : item
                ),
              }
            : clause
          ))
          setIsOpen(false)
        }}
      />
    </div>
  )
}