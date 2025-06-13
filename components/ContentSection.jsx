'use client'

import { useEffect, useState } from 'react'
import { agreement } from '@/data/agreement'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "./ui/textarea"

export default function ContentSection({ activeTool, alternativeData, setAlternativeData }) {
  const [clauses, setClauses] = useState([])
  const [modalData, setModalData] = useState({
    type: null,
    text: '',
    clauseIndex: null,
    itemIndex: null,
    subIndex: null
  })

  const [isOpen, setIsOpen] = useState(false)
  const [showAltForm, setShowAltForm] = useState(false)
  const [question, setQuestion] = useState("")
  const [variants, setVariants] = useState([])
 

  const addVariantField = () => {
    setVariants((prev) => [...prev, ""])
  }

  const updateVariant = (index, value) => {
    setVariants((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  useEffect(() => {
    if (clauses.length === 0) setClauses(agreement.clauses)
  }, [])

  const handleDelete = () => {
    const { type, clauseIndex, itemIndex, subIndex } = modalData

    if (type === "clause") {
      setClauses(prev => prev.filter((_, i) => i !== clauseIndex))
    }

    if (type === "item") {
      setClauses(prev =>
        prev.map((clause, i) =>
          i === clauseIndex
            ? {
              ...clause,
              items: clause.items.filter((_, j) => j !== itemIndex),
            }
            : clause
        )
      )
    }

    if (type === "subpoint") {
      setClauses(prev =>
        prev.map((clause, i) =>
          i === clauseIndex
            ? {
              ...clause,
              items: clause.items.map((item, j) =>
                j === itemIndex
                  ? {
                    ...item,
                    subpoints: item.subpoints.filter((_, k) => k !== subIndex),
                  }
                  : item
              ),
            }
            : clause
        )
      )
    }

    setIsOpen(false)
  }

  const openModal = ({ type, text, clauseIndex, itemIndex, subIndex }) => {
    setModalData({ type, text, clauseIndex, itemIndex, subIndex })
    setIsOpen(true)
  }

  return (
    <div className="space-y-10">
      {clauses.map((clause, index) => (
        <div
          key={index}
          onClick={() => {
            if (activeTool === 'clauses') {
              openModal({ type: 'clause', text: clause.title, clauseIndex: index })
            }
          }}
          className={`rounded-lg ${activeTool === 'clauses' ? 'cursor-pointer hover:bg-yellow-100 transition' : ''}`}
        >
          <h1 className="text-xl font-semibold mb-4 flex justify-between items-center">
            {clause.title}
           
          </h1>

          {clause.items && (
            <ol className="list-decimal pl-6 space-y-4 text-gray-800">
              {clause.items.map((item, i) => (
                <li
                  key={i}
                  onClick={(e) => {
                    if (activeTool === 'items') {
                      e.stopPropagation()
                      openModal({ type: 'item', text: item.text, clauseIndex: index, itemIndex: i })
                    }
                  }}
                  className={`p-3 rounded-lg ${activeTool === 'items' ? 'hover:bg-blue-50 cursor-pointer transition' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={`${activeTool === 'text' ? 'hover:underline cursor-pointer transition' : ''}`}
                      onClick={(e) => {
                        if (activeTool === 'text') {
                          e.stopPropagation()
                          openModal({ type: 'subpoint', text: item.text, clauseIndex: index, itemIndex: i, subIndex: i })
                        }
                      }}
                    >
                      {item.select
                        ? formatClauseWithSelect(item.text, item.select)
                        : item.text}
                    </span>
                    
                  </div>

                  {item.subpoints && (
                    <ul className="list-[lower-alpha] list-inside pl-4 mt-2 text-sm text-gray-700 space-y-1">
                      {item.subpoints.map((sub, j) => (
                        <li
                          key={j}
                          className={activeTool === 'text' ? 'hover:underline cursor-pointer transition' : ''}
                          onClick={(e) => {
                            if (activeTool === 'text') {
                              e.stopPropagation()
                              openModal({ type: 'subpoint', text: sub, clauseIndex: index, itemIndex: i, subIndex: j })
                            }
                          }}
                        >
                          {sub}
                          
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      ))}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {showAltForm
                ? "Dodaj alternatywę"
                : `Opcje dla ${modalData.type === "clause"
                  ? "klauzuli"
                  : modalData.type === "item"
                    ? "punktu"
                    : modalData.type === "subpoint"
                      ? "podpunktu"
                      : "tekstu"}`}
            </DialogTitle>
          </DialogHeader>

          {showAltForm ? (
            <div className="flex flex-col gap-2 mt-4">
              <Textarea
                placeholder="Wpisz pytanie alternatywy..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              {variants.map((variant, index) => (
                <Input
                  key={index}
                  placeholder={`Wariant ${index + 1}`}
                  value={variant}
                  onChange={(e) => updateVariant(index, e.target.value)}
                />
              ))}
              <Button size="sm" variant="outline" onClick={addVariantField}>
                ➕ Dodaj wariant
              </Button>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="default"
                  onClick={() => {
                    const newAlternative = {
                      question,
                      variants,
                      targetType: modalData.type,
                      clauseIndex: modalData.clauseIndex,
                      itemIndex: modalData.itemIndex,
                      subIndex: modalData.subIndex
                    }
                    
                    setAlternativeData(newAlternative)
                    setShowAltForm(false)
                  }}
                >
                  ✅ Zapisz alternatywę
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowAltForm(false)}
                >
                  ⬅️ Wróć
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-4">
              <Button
                variant="default"
                onClick={() => console.log("Edytuj tekst:", modalData.text)}
              >
                ✏️ Edytuj tekst
              </Button>

              {(modalData.type === "clause" || modalData.type === "item") && (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowAltForm(true)
                      setQuestion("")
                      setVariants([])
                    }}
                  >
                    ➕ Dodaj alternatywę
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => console.log("Dodaj subpunkt")}
                  >
                    ➕ Dodaj subpunkt
                  </Button>
                </>
              )}

              <Button
                variant="destructive"
                onClick={handleDelete}
              >
                🗑️ Usuń
              </Button>
            </div>
          )}

          <Button className="mt-6" onClick={() => setIsOpen(false)}>
            Zamknij
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function formatClauseWithSelect(text, select) {
  if (!select) return text
  const [before, after] = text.split("czas nieokreślony")
  return (
    <>
      {before}
      <select
        className="mx-2 border rounded px-2 py-1 text-sm"
        defaultValue={select.options.find((o) => o.selected)?.value}
        name={select.name}
      >
        {select.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {after}
    </>
  )
}
