import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
export default function AlternativeDialog({
  isOpen,
  setIsOpen,
  modalData,
  klauzule,
  clauses,
  addAlternative,
  handleDelete,
  addBinding,
  selectBinding,

}) {
  const [mode, setMode] = useState('options') // 'options' | 'alternative' | 'provision' | 'points'
  const [question, setQuestion] = useState('')
  const [variants, setVariants] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [provisionList, setProvisionList] = useState([])
  const [selectedPoints, setSelectedPoints] = useState([])

  const [originalClauseObj, setOriginalClauseObj] = useState(null)


  function filterClauseItemsBySelectedPoints(selectedPoints) {

    const filtered = clauses[modalData.clauseIndex].items.filter((_, idx) => selectedPoints.includes(idx))
    // zapisujemy do clauses – mutujemy tylko tę jedną klauzulę
    clauses[modalData.clauseIndex].items = filtered
  }

  useEffect(() => {
    if (modalData.clauseIndex != null) {
      const freshOriginal = klauzule.clauses[modalData.clauseIndex]
      setOriginalClauseObj(freshOriginal)

    }
  })

  const addProvision = (newObj) => {

    const myNewItem = { text: newObj };
    clauses[modalData.clauseIndex].items.push(myNewItem)
  }

  const addVariantField = () => setVariants(prev => [...prev, ''])
  const updateVariant = (i, v) => setVariants(prev => prev.map((x, idx) => idx === i ? v : x))

  const addProvisionField = () => setProvisionList(prev => [...prev, ''])
  const updateProvisionText = (i, text) => setProvisionList(prev => prev.map((t, idx) => idx === i ? text : t))

  const onSaveAlternative = () => {
    const parsed = variants.filter(x => x).map(x => parseInt(x, 10))
    if (!question || parsed.length === 0) return
    addAlternative({ question, variants: parsed, ...modalData })
    setMode('options')
    setIsOpen(false)
  }
  const onSaveBinding = () => {
      const parsed = variants.filter(x => x).map(x => parseInt(x, 10))
     addAlternative({ question: "powiazanie!!", variants: parsed, ...modalData })
    setMode('options')
    setIsOpen(false)

  }

  const onSaveProvision = () => {
    if (selectedItem === null) return
    provisionList.forEach(text => {
      if (text) addProvision(provisionList)
    })
    setMode('options')
    setIsOpen(false)
    setProvisionList([])
    console.log(provisionList)

  }

  const renderOptions = () => (
    <div className="flex flex-col gap-2 mt-4">
      <Button variant="default" onClick={() => setMode('alternative')}>➕ Dodaj alternatywę</Button>
      <Button variant="outline" size="sm" onClick={() => setMode('binding')}>🔗 Dodaj powiązania</Button>
      <Button variant="outline" size="sm" onClick={() => setMode('points')}>📌 Wybierz punkty</Button>
      <Button variant="outline" size="sm" onClick={() => setMode('provision')}>➕ Dodaj postanowienie</Button>
      <Button variant="destructive" onClick={handleDelete}>🗑️ Usuń</Button>
    </div>
  )

  const renderAlternativeForm = () => (
    <div className="flex flex-col gap-4 mt-4">
      <Textarea placeholder="Wpisz pytanie alternatywy..." value={question} onChange={e => setQuestion(e.target.value)} />
      {variants.map((v, i) => (
        <select key={i} className="w-full border rounded p-2" value={v} onChange={e => updateVariant(i, e.target.value)}>
          <option value="" disabled>-- Wybierz klauzulę --</option>
          {klauzule.clauses.map((c, ci) => <option key={ci} value={ci}>{c.title}</option>)}
        </select>
      ))}
      <Button size="sm" variant="outline" onClick={addVariantField}>➕ Dodaj wariant</Button>
      <div className="flex gap-2 mt-4">
        <Button variant="default" onClick={onSaveAlternative}>✅ Zapisz alternatywę</Button>
        <Button variant="secondary" onClick={() => setMode('options')}>⬅️ Wróć</Button>
      </div>
    </div>
  )

  const renderBindingView = () => (
    <div className="flex flex-col gap-4 mt-4">


      <select className="w-full border rounded p-2"
       value={variants[0]} onChange={e => updateVariant(0, e.target.value)}
      >
        <option value="" disabled>-- Wybierz klauzulę --</option>
        {klauzule.clauses.map((c, ci) => <option key={ci} value={ci}>{c.title}</option>)}
      </select>


      <div className="flex gap-2 mt-4">
        <Button variant="default" onClick={onSaveBinding}>✅ Zapisz powiazanie</Button>
        <Button variant="secondary" onClick={() => setMode('options')}>⬅️ Wróć</Button>
      </div>
    </div>
  )



  const renderProvisionForm = () => {
    if (!originalClauseObj) return null
    return (
      <div className="flex flex-col gap-4 mt-4">
        <h2 className="text-lg font-semibold">{originalClauseObj.title}</h2>
        <ol className="list-decimal list-inside ml-4">
          {originalClauseObj.items.map((item, idx) => (
            <li
              key={idx}
              className="mb-2 p-2 cursor-pointer"
              onClick={() => setSelectedItem(idx)}
            >
              <p>{item.text}</p>
              {item.subpoints && (
                <ul className="list-disc list-inside ml-4 mt-1">
                  {item.subpoints.map((sub, j) => <li key={j}>{sub}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ol>
        {selectedItem !== null && (
          <div className="flex flex-col gap-2">
            {provisionList.map((text, i) => (
              <Textarea
                key={i}
                placeholder="Wpisz tekst postanowienia..."
                value={text}
                onChange={e => updateProvisionText(i, e.target.value)}
              />
            ))}
            <Button size="sm" variant="outline" onClick={addProvisionField}>➕ Dodaj kolejne pole</Button>
          </div>
        )}
        <div className="flex gap-2">
          <Button variant="default" onClick={onSaveProvision}>✅ Zapisz postanowienie</Button>
          <Button variant="secondary" onClick={() => setMode('options')}>⬅️ Wróć</Button>
        </div>
      </div>
    )
  }

  const renderPointsView = () => {
    if (!originalClauseObj) return null


    return (
      <div className="flex flex-col gap-4 mt-4">
        <h2 className="text-lg font-semibold">{originalClauseObj.title}</h2>
        <ol className="list-decimal list-inside ml-4">
          {originalClauseObj.items.map((item, idx) => (
            <li
              key={idx}
              onClick={() => setSelectedPoints(prev =>
                prev.includes(idx)
                  ? prev.filter(i => i !== idx)   // odznacz
                  : [...prev, idx]                // zaznacz
              )}
              className={`mb-2 p-2 cursor-pointer rounded ${selectedPoints.includes(idx) ? 'font-bold bg-yellow-100' : 'hover:bg-gray-100'
                }`}
            >
              <p>{item.text}</p>
              {item.subpoints && (
                <ul className="list-disc list-inside ml-4 mt-1">
                  {item.subpoints.map((sub, j) => <li key={j}>{sub}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ol>
        <div className="flex gap-2">
          <Button
            variant="default"
            onClick={() => {
              filterClauseItemsBySelectedPoints(selectedPoints)
              setMode('options')
            }}
          >
            ✅ Zatwierdź
          </Button>
          <Button variant="secondary" onClick={() => setMode('options')}>⬅️ Wróć</Button>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'alternative'
              ? 'Dodaj alternatywę'
              : mode === 'provision'
                ? 'Dodaj postanowienie'
                : mode === 'points'
                  ? 'Podgląd klauzuli'
                  : `Opcje dla ${modalData.type}`}
          </DialogTitle>
        </DialogHeader>

        {mode === 'alternative'
          ? renderAlternativeForm()
          : mode === 'provision'
            ? renderProvisionForm()
            : mode === 'points'
              ? renderPointsView()
              : mode === 'binding'
                ? renderBindingView()
                : renderOptions()}

        {mode === 'options' && (
          <Button className="mt-6" onClick={() => setIsOpen(false)}>Zamknij</Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
