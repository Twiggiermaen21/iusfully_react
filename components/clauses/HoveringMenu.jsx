import React from 'react'
import { Button } from '../ui/button'
import Delete from '@/utils/deleteFunction'
export default function HoveringMenu({ modalData, clauses, setClauses, setIsSelecting, setIsAdding, setNewText, selectedPoints, setOldSelectedPoints }) {
    return (
        <div className=" relative p-2 right-2 flex gap-2 ">
            <Button variant="default"
            // onClick={() => setMode('alternative')}
            >➕ Dodaj alternatywę</Button>
            <Button variant="outline" size="sm"
            //   onClick={() => { setMode('binding'); setVariants(['']); }}
            >🔗 Dodaj powiązania</Button>


            <Button variant="outline" size="sm" onClick={() => {setOldSelectedPoints(selectedPoints);setIsSelecting(true);}}>📌 Wybierz punkty</Button>
            <Button variant="outline" size="sm" onClick={() => {setIsAdding(true) ;setNewText('')}}>➕ Dodaj postanowienie</Button>
            <Button variant="destructive" onClick={() => Delete(modalData, clauses, setClauses)}  >  🗑️ Usuń   </Button>
       
      
       
        </div>
    )
}
