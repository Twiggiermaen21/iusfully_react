import React from 'react'
import formatClauseWithSelect from '@/utils/formatClauseWithSelect'

export default function ClauseList({ clauses, activeTool, onOpenModal }) {
  return (
    <>
      {clauses.map((clause, ci) => (
        <div key={ci} onClick={() => activeTool === 'clauses' && onOpenModal({ type: 'clause', text: clause.title, clauseIndex: ci })}
          className={`rounded-lg ${activeTool === 'clauses' ? 'cursor-pointer hover:bg-yellow-100 transition' : ''}`}
        >
          <h1 className="text-xl font-semibold mb-4 flex justify-between items-center">
            {clause.title}
          </h1>

          <ol className="list-decimal pl-6 space-y-4 text-gray-800">
            {clause.items?.map((item, ii) => (
              <li key={ii} onClick={e => {
                if (activeTool === 'items') { e.stopPropagation(); onOpenModal({ type: 'item', text: item.text, clauseIndex: ci, itemIndex: ii }) }
              }} className={`p-3 rounded-lg ${activeTool === 'items' ? 'hover:bg-blue-50 cursor-pointer transition' : ''}`}>
                <div className="flex justify-between items-start">
                  <span onClick={e => {
                    if (activeTool === 'text') { e.stopPropagation(); onOpenModal({ type: 'subpoint', text: item.text, clauseIndex: ci, itemIndex: ii, subIndex: ii }) }
                  }} className={`${activeTool === 'text' ? 'hover:underline cursor-pointer transition' : ''}`}>
                    {item.select
                      ? formatClauseWithSelect(item.text, item.select)
                      : item.text}
                  </span>
                </div>

                <ul className="list-[lower-alpha] list-inside pl-4 mt-2 text-sm text-gray-700 space-y-1">
                  {item.subpoints?.map((sub, si) => (
                    <li key={si} onClick={e => {
                      if (activeTool === 'text') { e.stopPropagation(); onOpenModal({ type: 'subpoint', text: sub, clauseIndex: ci, itemIndex: ii, subIndex: si }) }
                    }} className={activeTool === 'text' ? 'hover:underline cursor-pointer transition' : ''}>
                      {sub}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </>
  )
}