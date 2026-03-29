import { useState } from "react"

const GroupDetail = ( {group, onAddExpense} ) => {

    const [amount, setAmount] = useState("");
    const [paidBy, setPaidBy] = useState(group.members[0]);
    const [description, setDescription] = useState("");

    const handleAddClick = () => {
        if(!amount || !description) return;
        if(!amount || amount <= 0) return;

        const newExpense = {
            id: crypto.randomUUID(),
            paidBy: paidBy,
            amount: Number(amount),
            description: description,
            splitBetween: group.members,
            date: new Date().toISOString,
        }

        onAddExpense(group.id, newExpense);

        setAmount("");
        setDescription("");
        console.log(newExpense);
    }

  return (
    <div className="border border-slate-500 rounded-xl p-2">
        <h2 className="text-2xl">{group.name}</h2>

        <p>
            {group.members.join(", ")}
        </p>

{/* expense input */}
        <div>
            <form className="flex flex-col gap-2" onSubmit={(e)=>e.preventDefault()}>
                <input type="number" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} className="border border-indigo-400"/>

                <select name="" id="" value={paidBy} onChange={(e)=>setPaidBy(e.target.value)} className="border border-indigo-500">
                    {group.members.map((mem)=>(
                        <option key={mem} className="bg-gray-800 text-white">{mem}</option>
                    ))}
                </select>

                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border border-indigo-500"/>

                <button type="submit" className="bg-indigo-500 rounded-xl px-4 py-2 font-semibold" onClick={handleAddClick}>Add Expense</button>
            </form>
        </div>


        {/* show expenses */}
        {group.expenses && group.expenses.length > 0 ? (
            <div className="mt-3 space-y-3">
                {[...group.expenses].reverse().map((exp)=>(
                    <div key={exp.id}>
                        <p>
                            For: {exp.description}
                        </p>

                        <p>
                            Amount: {exp.amount.toLocaleString("en-IN")}
                        </p>

                        <p>
                            Paid By: {exp.paidBy}
                        </p>

                        <p>
                            Split Between: {exp.splitBetween.length} people
                        </p>
                    </div>
                ))}
            </div>
        ) : (
            <p>
                No expenses yet.
            </p>
        )}
        
            
        


    </div>
  )
}

export default GroupDetail