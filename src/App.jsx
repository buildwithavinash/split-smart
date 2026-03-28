import { useEffect, useState } from "react"
import GroupCard from "./components/GroupCard"

const App = () => {

  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState([]);


  // local storage

  useEffect(()=>{
    localStorage.setItem("groups", JSON.stringify(groups))
  }, [groups])
  // create group
  const createGroup = () => {
    const newGroup = {
      id: crypto.randomUUID(),
      name: groupName.trim(),
      members: members,
    }

    setGroups((prev) => [...prev, newGroup])
    setGroupName("")
    setMemberInput("")
  }

  // add members

  const addMembers = () => {
    if(memberInput.trim() === "") return
    setMembers((prev)=> [...prev, memberInput])
    setMemberInput("")
  }


  return (
    <div className="min-h-screen bg-gray-900 w-full text-white p-4">

    <h1 className="font-semibold text-2xl text-slate-100 text-center">Split<span className="text-green-500 ">Smart</span></h1>

    {/* group input form */}

    <div>
      <form onSubmit={(e)=> {
        e.preventDefault()
      }}>
        
        <div className="">
          <label htmlFor="groupName">Group Name : </label>
          <input type="text" value={groupName} onChange={(e)=>setGroupName(e.target.value)}  name="groupName" id="groupName" className="border border-indigo-400 rounded-sm" />
        </div>

        <div>
          <label htmlFor="">Members:</label>
          <input type="text" name="" id="" value={memberInput} onChange={(e)=>setMemberInput(e.target.value)} className="border border-indigo-400 rounded-sm" />
          <button type="button" className="border bg-indigo-500 font-medium px-4 py-2 rounded-xl cursor-pointer" onClick={addMembers}>Add Member</button>
        </div>

        <button type="submit" onClick={createGroup} className="border bg-indigo-500 font-medium px-4 py-2 rounded-xl cursor-pointer">Create</button>
      </form>
    </div>

{/* groups rendering */}
    {groups.length === 0 ? (
      <div>
        <p className="mt-6 text-gray-400">No groups yet. Create your first group!</p>
      </div>
    ) : (
      <div className="cards__container grid grid-cols-1 gap-4 mt-4">
      {groups.map((group)=>(

        // group card component
        <GroupCard key={group.id} group={group} members={members} setMembers={setMembers}/>
      ))}  
    </div>
    )}
    

    </div>
  )
}

export default App