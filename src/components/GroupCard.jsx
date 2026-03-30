

const GroupCard = ({ group, onMemberRemove, onRemoveGroup, onOpenGroup }) => {
  return (
    <div
      onClick={() => onOpenGroup(group.id)}
      className="border border-slate-400 rounded-xl p-2 relative cursor-pointer"
    >
      <button
        className="text-xl px-2 py-0.5 bg-red-300 rounded-md absolute cursor-pointer hover:bg-red-500 transition-all duration-200 top-2 right-2 active:scale-95"
        onClick={(e) => {
          e.stopPropagation;
          onRemoveGroup(group.id);
        }}
      >
        <i class="ri-delete-bin-6-line"></i>
      </button>
      <h2 className="text-2xl text-slate-900 font-semibold">{group.name}</h2>
      <p className="text-slate-800 text-sm">{group.members.length} members</p>

      {/* members */}
      <div className="flex gap-2 flex-wrap mt-4">
        {group.members.map((member, index) => (
          <div
            key={member}
            className="bg-slate-200 text-slate-900 flex items-center px-3 py-1 rounded-xl justify-center gap-2"
          >
            <span className="flex justify-center items-center">{member}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMemberRemove(group.id, index);
              }}
              className="font-semibold px-2 py-1 bg-slate-300 rounded-md cursor-pointer"
            >
              <i class="ri-close-large-fill"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupCard;
