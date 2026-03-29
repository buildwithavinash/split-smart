import { useState } from "react"
import calculateSettlements from "../utils/settlements";

const GroupDetail = ( {group, onAddExpense, onDeleteExpense, onBackClick} ) => {

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
            splitBetween: [...group.members],
            date: new Date().toISOString(),
        }

        onAddExpense(group.id, newExpense);

        setAmount("");
        setDescription("");
        console.log(newExpense);
    }

    const total = group.expenses
  ? group.expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString("en-IN")
  : 0;


const settlements = calculateSettlements(group) || [];
console.log(settlements);

// generate message

const generateMessage = () => {
    if(settlements.length === 0) return "No settlements needed";

    let text = `SplitSmart Summary - ${group.name}\n`;

    settlements.forEach((s)=>{
        text += `${s.from} owes ${s.to} ₹${s.amount}\n`
    });

    return text;
}

// handle whatsapp share

const handleShare = () => {
    const message = generateMessage();
    const encoded = encodeURIComponent(message);

    window.open(`https://wa.me/?text=${encoded}`);
};


  return (
    <div className="border border-slate-500 rounded-xl p-2 relative">
        <button className="bg-indigo-500 font-medium absolute px-3 py-1 rounded-md cursor-pointer top-2 right-2" onClick={()=> onBackClick(null)}>Back</button>
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

        <div>
            <p>Total Expense: {total}</p>
        </div>

        {/* show expenses */}
        {group.expenses && group.expenses.length > 0 ? (
            <div className="mt-3 space-y-3">
                {[...group.expenses].reverse().map((exp)=>(
                    <div key={exp.id} className="relative">
                        <button className="bg-red-400 px-2 py-0.5 absolute top-2 right-2" onClick={()=>onDeleteExpense(group.id, exp.id)}>X</button>
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
        
            
        {/* show settlements */}
        <div>
            <h3>Settlement Summary</h3>

            {settlements.length > 0 ? (
                <div>
                    {settlements.map((s, index) => (
                        <div key={index}>
                            <p>
                                <span>{s.from}</span>owes
                                <span>{s.to}</span>  ₹{s.amount.toLocaleString("en-IN")}
                            </p>
                        </div>
                    ))}

                    <button onClick={handleShare}>Share on Whatsapp</button>
                </div>
            ) : (
                <p>
                    No settlements needed
                </p>
            )}
        </div>


    </div>
  )
}

export default GroupDetail