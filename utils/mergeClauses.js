export function mergeClauses(clauses, alternativeData) {
  return clauses
    .slice(0, 3)
    .map((_, idx) => {
      const alt = alternativeData.find(a => a.clauseIndex === idx)
      if (!alt) return clauses[idx]
      if (alt.selectedVariantIndex != null) {
        return clauses[alt.selectedVariantIndex]
      }
      return clauses[alt.clauseIndex]
    })
}