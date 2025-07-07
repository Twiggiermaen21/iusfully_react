
export default function ClauseBar({ klauzule }) {
  return (
    <div className="flex-1 p-6 h-screen min-w-20 overflow-auto space-y-4">
      <div className="bg-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </i>
            <input
              type="text"
              placeholder="Szukaj klauzul..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-600">
              Klauzule ({klauzule.clauses.length})
            </span>
            <div className="flex space-x-2">
              <button className="p-1 text-gray-400 hover:text-gray-600">⚙️</button>
              <button className="p-1 text-gray-400 hover:text-gray-600">↕️</button>
            </div>
          </div>
        </div>

        <div id="document-preview" className="p-4 space-y-4">
          {klauzule.clauses.map((clause, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                {clause.title}
              </h4>
              {clause.items.map((item, i) => (
                <p
                  key={i}
                  className="text-xs text-gray-700 leading-relaxed whitespace-pre-line"
                >
                  {item.text}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
