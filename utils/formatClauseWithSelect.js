export default function formatClauseWithSelect(text, select) {
  if (!select) return text
  const [before, after] = text.split('czas nieokreślony')
  return (
    <>
      {before}
      <select className="mx-2 border rounded px-2 py-1 text-sm" defaultValue={select.options.find(o => o.selected)?.value} name={select.name}>
        {select.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      {after}
    </>
  )
}