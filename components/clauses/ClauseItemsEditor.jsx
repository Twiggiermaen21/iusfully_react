import React from "react"

export default function ClauseItemsEditor({
  clause,
  isSelecting,
  selectedPoints,
  toggleSelect,
  removeItem,
  updateItemText,
  updateSubpointText,
  requireAtLeastOne,
  setRequireAtLeastOne,
  allowCustomSubpoints,
  setAllowCustomSubpoints,
  listeners
}) {
  return (
    <div className="space-y-4 mb-6">
      {clause.items?.map((item, ii) => (
        <div
          key={ii}
          className={`${isSelecting ? "border border-gray-200 rounded-lg p-4" : ""}`}
        >
          {isSelecting ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900 mr-2">{ii + 1}.</span>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      checked={selectedPoints.includes(`${ii}`)}
                      onChange={(e) => toggleSelect(ii, e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in checked:translate-x-full checked:border-primary"
                      id={`toggle-${ii}`}
                    />
                    <label
                      htmlFor={`toggle-${ii}`}
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                  <span className="ml-2 text-xs text-gray-600">Opcjonalny</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button {...listeners} className="text-gray-400 hover:text-gray-600 cursor-grab">⭥</button>
                  <button className="text-gray-400 hover:text-danger" onClick={() => removeItem(ii)}>🗑️</button>
                </div>
              </div>

              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Treść podpunktu..."
                value={item.text}
                onChange={(e) => updateItemText(ii, e.target.value)}
              />

              {item.subpoints?.map((sub, si) => (
                <textarea
                  key={si}
                  className="w-full p-2 mt-2 border border-gray-200 rounded-lg"
                  placeholder="Treść pod-podpunktu..."
                  value={sub}
                  onChange={(e) => updateSubpointText(ii, si, e.target.value)}
                />
              ))}
            </>
          ) : (
            <>
              <div className="flex items-start space-x-2">
                <span className="font-medium text-gray-900">{ii + 1}.</span>
                <p className="text-gray-700">{item.text}</p>
              </div>
              {item.subpoints?.length > 0 && (
                <ul className="list-[lower-alpha] pl-6 mt-2 text-sm text-gray-700 space-y-1">
                  {item.subpoints.map((sub, si) => (
                    <li key={si}>{sub}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      ))}

      {isSelecting && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Ustawienia opcjonalności</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={requireAtLeastOne}
                onChange={(e) => setRequireAtLeastOne(e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label className="ml-2 text-sm text-gray-700">
                Wymagaj wyboru co najmniej jednego podpunktu opcjonalnego
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={allowCustomSubpoints}
                onChange={(e) => setAllowCustomSubpoints(e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label className="ml-2 text-sm text-gray-700">
                Pozwól klientowi dodawać własne podpunkty
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
