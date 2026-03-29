import { useState } from "react"

const GroupDetail = ( {group} ) => {

    const [amount, setAmount] = useState("");
    const [paidBy, setPaidBy] = useState(group.members[0]);
    const [description, setDescription] = useState("");

  return (
    <div className="border border-slate-500 rounded-xl p-2">
        <h2 className="text-2xl">{group.name}</h2>

        <p>
            {group.members.join(", ")}
        </p>

        <div>
            <form className="flex flex-col gap-2">
                <input type="number" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} className="border border-indigo-400"/>

                <select name="" id="" value={paidBy} onChange={(e)=>setPaidBy(e.target.value)} className="border border-indigo-500">
                    {group.members.map((mem)=>(
                        <option key={mem} className="bg-gray-800 text-white">{mem}</option>
                    ))}
                </select>

                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border border-indigo-500"/>

                <button type="submit" className="bg-indigo-500 rounded-xl px-4 py-2 font-semibold">Add</button>
            </form>
        </div>
    </div>
  )
}

export default GroupDetail