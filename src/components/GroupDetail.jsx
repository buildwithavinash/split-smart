import { useState } from "react";
import calculateSettlements from "../utils/settlements";

const GroupDetail = ({ group, onAddExpense, onDeleteExpense, onBackClick }) => {
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(group.members[0]);
  const [description, setDescription] = useState("");

  const handleAddClick = () => {
    if (!amount || !description) return;
    if (!amount || amount <= 0) return;

    const newExpense = {
      id: crypto.randomUUID(),
      paidBy: paidBy,
      amount: Number(amount),
      description: description,
      splitBetween: [...group.members],
      date: new Date().toISOString(),
    };

    onAddExpense(group.id, newExpense);

    setAmount("");
    setDescription("");
    console.log(newExpense);
  };

  const total = group.expenses
    ? group.expenses
        .reduce((sum, exp) => sum + exp.amount, 0)
        .toLocaleString("en-IN")
    : 0;

  const settlements = calculateSettlements(group) || [];
  console.log(settlements);

  // generate message

  const generateMessage = () => {
    if (settlements.length === 0) return "No settlements needed";

    let text = `SplitSmart Summary - ${group.name}\n`;

    settlements.forEach((s) => {
      text += `${s.from} owes ${s.to} ₹${s.amount}\n`;
    });

    return text;
  };

  // handle whatsapp share

  const handleShare = () => {
    const message = generateMessage();
    const encoded = encodeURIComponent(message);

    window.open(`https://wa.me/?text=${encoded}`);
  };

  return (
    <div className="border border-slate-300 rounded-xl p-2 relative">
      <button
        className="bg-green-300 hover:bg-green-500 transition-all duration-200 font-medium absolute px-3 py-1 rounded-md cursor-pointer top-2 right-2"
        onClick={() => onBackClick(null)}
      >
        <i class="ri-arrow-go-back-line"></i>
      </button>
      <h2 className="text-2xl text-slate-900 font-bold">{group.name}</h2>

      <p className="text-slate-800">
        <span className="text-slate-900">Members: </span>
        {group.members.join(", ")}
      </p>

      {/* expense input */}
      <div className="mt-4">
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-slate-300 rounded-md px-3 py-1 focus:outline-none focus:border-green-500 transition-all duration-200"
          />

          <div className="flex gap-2 items-center">
            <label className="flex-1 text-nowrap text-slate-900 font-medium">
              Paid By:{" "}
            </label>
            <select
              name=""
              id=""
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-1 focus:outline-none focus:border-green-500 transition-all duration-200"
            >
              {group.members.map((mem) => (
                <option key={mem} className="bg-gray-800 text-white">
                  {mem}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border border-slate-300 rounded-md px-3 py-1 focus:outline-none focus:border-green-500 transition-all duration-200"
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer border border-slate-500"
            onClick={handleAddClick}
          >
            Add Expense
          </button>
        </form>
      </div>

      {/* details */}

      <div className="border border-slate-300 mt-6 p-1 rounded-md">
        <div className="text-center mt-2">
          <p>Total Expense: {total}</p>
        </div>

        {/* show expenses */}
        {group.expenses && group.expenses.length > 0 ? (
          <div className="mt-3 space-y-3 border border-green-400 p-1 rounded-md">
            {[...group.expenses].reverse().map((exp) => (
              <div key={exp.id} className="relative">
                <button
                  className="text-xs px-2 py-1 bg-red-300 rounded-md absolute cursor-pointer hover:bg-red-500 transition-all duration-200 top-1 right-1 active:scale-95"
                  onClick={() => onDeleteExpense(group.id, exp.id)}
                >
                  <i class="ri-delete-bin-6-line"></i>
                </button>
                <p className="text-slate-800"><span className="font-medium text-slate-900">For: </span>{exp.description}</p>

                <p className="text-slate-800"><span className="font-medium text-slate-900">Amount: </span>{exp.amount.toLocaleString("en-IN")}</p>

                <p className="text-slate-800"><span className="font-medium text-slate-900">Paid By: </span>{exp.paidBy}</p>

                <p className="text-slate-800"><span className="font-medium text-slate-900">Split Between: </span>{exp.splitBetween.length} people</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-600">No expenses yet.</p>
        )}

        {/* show settlements */}
        <div className="border border-slate-300 rounded-md p-0.5 mt-2">
          <h3 className="text-center font-semibold mb-2">Settlement Summary</h3>

          {settlements.length > 0 ? (
            <div>
              {settlements.map((s, index) => (
                <div key={index}>
                  <p>
                    <span className="text-red-500 font-bold">{s.from} </span>owes
                    <span className="text-green-500 font-bold"> {s.to}</span> ₹{s.amount.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}

              <button onClick={handleShare} className="block border border-slate-400 bg-green-500 text-slate-100 rounded-md px-3 py-1 mx-auto my-4 cursor-pointer hover:bg-green-700 transition-all duration-200">Share on Whatsapp</button>
            </div>
          ) : (
            <p className="text-slate-600 text-center">No settlements needed</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
