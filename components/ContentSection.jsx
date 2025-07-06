import React, { useState } from 'react'
import ClauseList from './clauses/ClausesList'
import AlternativeDialog from './AlternativeDialog'
import { klauzule } from '@/data/klauzule'

export default function ContentSection({ activeTool, alternativeData, setAlternativeData,setBindingData, clauses, setClauses }) {
  const [modalData, setModalData] = useState({ type: null, text: '', clauseIndex: null, itemIndex: null, subIndex: null })
  const [isOpen, setIsOpen] = useState(false)

  console.log(modalData)
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
        modalData={modalData}
        klauzule = {klauzule}
        activeTool={activeTool}
        onOpenModal={openModal}
        setModalData={setModalData}
      />

<div id="clause-editor" className="flex-1 bg-white overflow-y-auto">
  <div className="p-6 max-w-3xl mx-auto">
    <div id="clause-1-editor" className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">§1. Zakres usług</h2>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1.5 text-xs font-medium text-primary bg-blue-50 rounded-md hover:bg-blue-100 border border-blue-200">
            Dodaj podpunkt
          </button>
        </div>
      </div>

      <div className="mb-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent h-24"
          placeholder="Wprowadź główną treść klauzuli..."
          defaultValue="W ramach wykonywania przedmiotu Umowy, Kancelaria zobowiązuje się w szczególności do:"
        />
      </div>

      <div id="subpoints-container" className="space-y-4 mb-6">
        {/* Subpoint a */}
        <div id="subpoint-a" className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="font-medium text-gray-900 mr-2">a.</span>
              <div className="flex items-center">
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="optional-a"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in checked:translate-x-full checked:border-primary"
                  />
                  <label htmlFor="optional-a" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <label htmlFor="optional-a" className="text-xs font-medium text-gray-600">Opcjonalny</label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-600">⭥</button>
              <button className="text-gray-400 hover:text-danger">🗑️</button>
            </div>
          </div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Treść podpunktu..."
            defaultValue="świadczenia usług pomocy prawnej przy zachowaniu należytej staranności,"
          />
        </div>

        {/* Subpoint b */}
        <div id="subpoint-b" className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="font-medium text-gray-900 mr-2">b.</span>
              <div className="flex items-center">
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="optional-b"
                    defaultChecked
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in checked:translate-x-full checked:border-primary"
                  />
                  <label htmlFor="optional-b" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <label htmlFor="optional-b" className="text-xs font-medium text-gray-600">Opcjonalny</label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-600">⭥</button>
              <button className="text-gray-400 hover:text-danger">🗑️</button>
            </div>
          </div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Treść podpunktu..."
            defaultValue="świadczenia usług we współpracy z Klientem zgodnie z jego wymaganiami,"
          />
          <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded-md">
            <div className="flex items-center text-xs text-blue-700">
              <span>ℹ️ Ten podpunkt jest opcjonalny - klient będzie mógł go wybrać</span>
            </div>
          </div>
        </div>

        {/* Subpoint c */}
        <div id="subpoint-c" className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="font-medium text-gray-900 mr-2">c.</span>
              <div className="flex items-center">
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                  
                    type="checkbox"
                    id="optional-c"
                    defaultChecked
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in checked:translate-x-full checked:border-primary"
                  />
                  <label htmlFor="optional-c" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <label htmlFor="optional-c" className="text-xs font-medium text-gray-600">Opcjonalny</label>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-600">⭥</button>
              <button className="text-gray-400 hover:text-danger">🗑️</button>
            </div>
          </div>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Treść podpunktu..."
            defaultValue="robienia kawy."
          />
          <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded-md">
            <div className="flex items-center text-xs text-blue-700">
              <span>ℹ️ Ten podpunkt jest opcjonalny - klient będzie mógł go wybrać</span>
            </div>
          </div>
        </div>
      </div>

      <div id="optional-settings" className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Ustawienia opcjonalności</h3>

        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="require-at-least-one"
              defaultChecked
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="require-at-least-one" className="ml-2 text-sm text-gray-700">
              Wymagaj wyboru co najmniej jednego podpunktu opcjonalnego
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="hide-if-not-selected"
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="hide-if-not-selected" className="ml-2 text-sm text-gray-700">
              Ukryj całkowicie niezaznaczone podpunkty w finalnym dokumencie
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="allow-custom-subpoints"
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="allow-custom-subpoints" className="ml-2 text-sm text-gray-700">
              Pozwól klientowi dodawać własne podpunkty
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




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