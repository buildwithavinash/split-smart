const GroupCard = ({ group, onMemberRemove, onRemoveGroup, onOpenGroup }) => {
  return (
    <div
      onClick={() => onOpenGroup(group.id)}
      className="border border-indigo-500 border-l-4 p-2 relative"
    >
      <button
        className="px-2 py-0.5 bg-red-500 absolute top-2 right-2"
        onClick={(e) => {
          e.stopPropagation;
          onRemoveGroup(group.id);
        }}
      >
        X
      </button>
      <h2 className="text-2xl font-semibold">{group.name}</h2>
      <p>{group.members.length} members</p>

      {/* members */}
      <div className="flex gap-2 flex-wrap">
        {group.members.map((member, index) => (
          <div
            key={member}
            className="px-3 py-1 bg-indigo-600 rounded-full flex items-center justify-center gap-2"
          >
            <span className="flex justify-center items-center">{member}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMemberRemove(group.id, index);
              }}
              className="px-4"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupCard;
