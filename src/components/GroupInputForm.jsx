
const GroupInputForm = ( {groupName, setGroupName, memberInput, setMemberInput, addMembers, members, removeMember, createGroup, isFormOpen, setIsFormOpen} ) => {

    const handleClick = () => {
        createGroup();
        setIsFormOpen(false);
    }
  return (
    <div className="p-2 absolute inset-0 h-screen w-full backdrop-blur-xl flex flex-col justify-center items-center z-10">
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col justify-center gap-4 border bg-slate-200 dark:bg-slate-900 border-slate-400 dark:border-slate-700 p-2 rounded-xl"
        >
          <div className="mt-4">
            <input
            placeholder="Group name"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              name="groupName"
              id="groupName"
              className="w-full border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1 focus:outline-none focus:border-green-500 bg-slate-100 dark:bg-slate-800 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-2 justify-between">
            <div className="flex gap-2 justify-between items-center">

            
            <input
            placeholder="Member name"
              type="text"
              value={memberInput}
              onChange={(e) => setMemberInput(e.target.value)}
              className="w-full border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1 focus:outline-none focus:border-green-500 bg-slate-100 dark:bg-slate-800 transition-all duration-200"
            />
            <button
              type="button"
              className="bg-slate-100 hover:bg-slate-300 text-slate-800 px-3 py-1 rounded-lg transition-all cursor-pointer self-center"
              onClick={addMembers}
            >
              Add
            </button>
            </div>
            {members.length > 0 && (
              <div className="flex gap-1">
              {members.map((m, id)=>(
                <div key={id} className="bg-slate-200 text-slate-900 flex items-center px-3 py-1 rounded-xl justify-center gap-2">
                  <span>{m}</span>
                  <button onClick={(e) => {
                e.stopPropagation();
                removeMember(id);
              }} className="cursor-pointer"><i class="ri-close-large-fill"></i></button>
                </div>
              ))}
            </div>
            )}
            
          </div>

          <button
            type="submit"
            onClick={handleClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer border border-slate-500"
          >
            Create
          </button>
          {isFormOpen && (
    <button onClick={()=>setIsFormOpen(false)} className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer border border-slate-500 -mt-1">Cancel</button>
  )}
        </form>
      </div>
  )
}

export default GroupInputForm