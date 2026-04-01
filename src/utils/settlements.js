const calculateSettlements = (groups) => {
  if (!groups.expenses || groups.expenses.length === 0) return;

  const balances = {};

  groups.members.forEach((member) => {
    balances[member] = 0;
  });

  groups.expenses.forEach((exp) => {
    const splitAmount = exp.amount / exp.splitBetween.length;

    exp.splitBetween.forEach((member) => {
      balances[member] -= splitAmount;
    });

    balances[exp.paidBy] += exp.amount;
  });

  const creditors = [];
  const debtors = [];

  for (let person in balances) {
    if (balances[person] > 0) {
      creditors.push({
        name: person,
        amount: balances[person],
      });
    } else if (balances[person] < 0) {
      debtors.push({
        name: person,
        amount: -balances[person],
      });
    }
  }

  // matching
  const settlements = [];
  let i = 0,
    j = 0;

  while (i < debtors.length && j < creditors.length) {
    const amt = Math.min(debtors[i].amount, creditors[j].amount);
    settlements.push({
      from: debtors[i].name,
      to: creditors[j].name,
      amount: Math.round(amt * 100) / 100,
    });

    debtors[i].amount -= amt;
    creditors[j].amount -= amt;

    if (debtors[i].amount === 0) i++;
    if (creditors[j].amount === 0) j++;
  }

  
  return settlements;
};

export default calculateSettlements;
