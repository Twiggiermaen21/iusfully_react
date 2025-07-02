export default function Delete(modalData, clauses, setClauses) {
  console.log('modal', modalData);
  console.log('clauses', clauses);

  const { type, clauseIndex, itemIndex, subIndex } = modalData;

  let newClauses = [...clauses]; // kopiujemy główny array

  if (type === 'clause') {
    console.log(`Deleting clause at index ${clauseIndex}`);
    newClauses = newClauses.filter((_, i) => i !== clauseIndex);
  }

  if (type === 'item') {
    console.log(`Deleting item at index ${itemIndex} in clause ${clauseIndex}`);
    newClauses = newClauses.map((clause, i) =>
      i === clauseIndex
        ? { ...clause, items: clause.items.filter((_, j) => j !== itemIndex) }
        : clause
    );
  }

  if (type === 'subpoint') {
    console.log(`Deleting subpoint at index ${subIndex} in item ${itemIndex} in clause ${clauseIndex}`);
    newClauses = newClauses.map((clause, i) =>
      i === clauseIndex
        ? {
            ...clause,
            items: clause.items.map((item, j) =>
              j === itemIndex
                ? { ...item, subpoints: item.subpoints.filter((_, k) => k !== subIndex) }
                : item
            )
          }
        : clause
    );
  }

  console.log('newClauses after delete', newClauses);
  setClauses(newClauses);
}
