
const GroupCard = ( {group, members, setMembers} ) => {
  return (
    <div className='border border-indigo-500 border-l-4 p-2 '>
          <h2 className='text-2xl font-semibold'>{group.name}</h2>
          <p>{group.members.length} members</p>

          {/* members */}
          <div className="flex gap-2 flex-wrap">

          {group.members.map((member, index)=>(
            <div key={index} className="px-3 py-1 bg-indigo-600 rounded-full flex items-center justify-center gap-2">
              <span className="flex justify-center items-center">{member}</span>
              <button onClick={()=>{
                const updated = members.filter((_, i) => i !== index);
                setMembers(updated)
                console.log("click");
              }} className="px-4">
                X
              </button>
            </div>
            ))}
            </div>
        </div>
  )
}

export default GroupCard