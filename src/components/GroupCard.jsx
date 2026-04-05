const GroupCard = ({ group, onMemberRemove, onRemoveGroup, onOpenGroup }) => {
  const hasExpenses = group.expenses && group.expenses.length > 0;

  const handleRemoveGroup = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete group "${group.name}"? This cannot be undone.`)) {
      onRemoveGroup(group.id);
    }
  };

  const handleMemberRemove = (e, index) => {
    e.stopPropagation();
    if (hasExpenses) {
      alert("Cannot remove members after expenses have been added.");
      return;
    }
    onMemberRemove(group.id, index);
  };

  return (
    <div
      onClick={() => onOpenGroup(group.id)}
      className="border border-slate-300 dark:border-slate-700 rounded-xl p-2 relative cursor-pointer"
    >
      <button
        className="text-sm px-2 py-0.5 bg-rose-400 dark:bg-rose-500 rounded-md absolute cursor-pointer hover:bg-rose-500 dark:hover:bg-rose-600 transition-all duration-200 top-2 right-2 active:scale-95"
        onClick={handleRemoveGroup}
      >
        <i className="ri-delete-bin-6-line"></i>
      </button>
      <h2 className="text-2xl text-slate-900 dark:text-slate-100 font-semibold">{group.name}</h2>
      <p className="text-slate-800 dark:text-slate-600 text-sm">{group.members.length} members</p>

      {/* members */}
      <div className="flex gap-2 flex-wrap mt-4">
        {group.members.map((member, index) => (
          <div
            key={member}
            className="bg-slate-200 text-slate-900 flex items-center px-3 py-1 rounded-xl justify-center gap-2 text-sm"
          >
            <span className="flex justify-center items-center font-semibold">{member}</span>
            <button
              onClick={(e) => handleMemberRemove(e, index)}
              className={`font-semibold px-1 py-0.5 rounded-md cursor-pointer ${hasExpenses ? "bg-slate-200 opacity-40 cursor-not-allowed" : "bg-slate-300"}`}
              title={hasExpenses ? "Cannot remove members after expenses are added" : "Remove member"}
            >
              <i className="ri-close-large-fill"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupCard;