'use client'
import { useState } from "react"
import ContentSection from "./ContentSection";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DocumentCard() {
  const [activeTool, setActiveTool] = useState(null)
  const [alternativeData, setAlternativeData] = useState(null)

  return (
    <div className="flex w-full">
      <div className="w-1/5 border-r border-gray-200 bg-white">
        <SidebarProvider>
          <AppSidebar activeTool={activeTool} setActiveTool={setActiveTool} />
          <SidebarTrigger />
        </SidebarProvider>
      </div>

      <div className="document-card w-3/5 p-6 overflow-auto">
        <ContentSection activeTool={activeTool} alternativeData={alternativeData} setAlternativeData={setAlternativeData} />
      </div>


      <div className="w-1/5 p-6 border-l border-gray-200 bg-gray-50 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Alternatywy</h2>
        <div className="text-sm text-gray-700 space-y-2">
          {alternativeData ? (
            <div className="space-y-1">
              <p><strong>Typ:</strong> {alternativeData.targetType}</p>
              <p><strong>Klauzula:</strong> {String(alternativeData.clauseIndex)}</p>
              {alternativeData.itemIndex != null && (
                <p><strong>Item:</strong> {String(alternativeData.itemIndex)}</p>
              )}
              {alternativeData.subIndex != null && (
                <p><strong>Subpunkt:</strong> {String(alternativeData.subIndex)}</p>
              )}
              <p><strong>Pytanie:</strong> {alternativeData.question?.toString() || <em>(brak)</em>}</p>
              <p><strong>Warianty:</strong></p>
              <ul className="list-disc list-inside">
                {alternativeData.variants.length > 0 ? (
                  alternativeData.variants.map((v, i) => <li key={i}>{v}</li>)
                ) : (
                  <li><em>Brak wariantów</em></li>
                )}
              </ul>
            </div>
          ) : (
            <p>Brak zapisanych alternatyw.</p>
          )}
        </div>
      </div>

    </div>
  )
}