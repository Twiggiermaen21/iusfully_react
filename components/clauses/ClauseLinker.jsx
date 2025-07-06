import React, { useEffect, useRef } from "react"

export default function ClauseLinker({
  isLinking,
  setIsLinking,
  klauzule,
  clauses,
  setClauses,
  clause
}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsLinking(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [setIsLinking])

  if (!isLinking) return null

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-2 w-full max-h-64 overflow-y-auto bg-gradient-to-b from-white via-gray-50 to-gray-100 border border-gray-300 rounded-2xl shadow-2xl p-4 z-50"
    >
      <h3 className="text-sm font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">
        Połącz z inną klauzulą
      </h3>
      <div className="space-y-2">
        {klauzule.clauses.map((otherClause, ci) => (
          <div
            key={ci}
            className="cursor-pointer p-3 rounded-xl hover:bg-blue-100 transition flex items-center justify-between group"
            onClick={() => {
              setClauses(prev =>
                prev.map(cl =>
                  cl.id === clause.id
                    ? {
                      ...cl,
                      link: Array.isArray(cl.link)
                        ? cl.link.includes(otherClause.id)
                          ? cl.link
                          : [...cl.link, otherClause.id]
                        : cl.link
                          ? cl.link === otherClause.id
                            ? [cl.link]
                            : [cl.link, otherClause.id]
                          : [otherClause.id]
                    }
                    : cl
                )
              )

              if (!clauses.find(c => c.id === otherClause.id)) {
                setClauses(prev => [...prev, otherClause])
              }
              setIsLinking(false)
            }}
          >
            <span className="text-gray-700 font-medium group-hover:text-blue-800">
              §{ci + 1} {otherClause.title}
            </span>
            <span className="text-xs text-gray-400 group-hover:text-blue-700">
              Kliknij aby połączyć
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
