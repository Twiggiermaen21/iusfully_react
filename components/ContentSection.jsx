import React, { useState } from 'react'
import ClauseList from './clauses/ClausesList'

import { klauzule } from '@/data/klauzule'

export default function ContentSection({ activeTool,setBindingData, clauses, setClauses }) {
  const [modalData, setModalData] = useState({ type: null, text: '', clauseIndex: null, itemIndex: null, subIndex: null })
  console.log(modalData)

  const addAlternative = (newAlt) => setAlternativeData(prev => [...prev, newAlt])
  const addBinding=(newBind) =>  setBindingData(prev =>[...prev,newBind])

  

  return (
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
  )
}