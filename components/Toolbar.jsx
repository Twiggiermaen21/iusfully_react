

import {items} from '@/data/toolbar'
export default function Toolbar() {
  return (
    <div className="min-w-20 border-l border-gray-200 bg-white">
         <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Narzędzia</h3>
      </div>
    </div>

      <div className="p-4">
        <h4 className="text-gray-500 text-xs uppercase font-medium mb-3">Bloki</h4>
        <div className="grid grid-cols-1 gap-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded p-3 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <span className="text-gray-700">{item.label}</span>
              <item.icon className={`w-5 h-5 ${item.color || "text-gray-500"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
