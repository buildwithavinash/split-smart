import { useEffect, useState } from "react"
import GroupCard from "./components/GroupCard"

const App = () => {

  const [groups, setGroups] = useState(()=>{
    const saved = localStorage.getItem("groups");

    let res = saved ? JSON.parse(saved) : [];

    return res;
  });
  const [groupName, setGroupName] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState([]);


  // local storage

  useEffect(()=>{
    localStorage.setItem("groups", JSON.stringify(groups))
  }, [groups])


  // create group

  
  const createGroup = () => {

    if(groupName.trim() === "" || members.length < 2) {
    alert("Please enter a group name and at least 2 members")
    return
  }

    const newGroup = {
      id: crypto.randomUUID(),
      name: groupName.trim(),
      members: members,
    }

    setGroups((prev) => [...prev, newGroup])
    setGroupName("")
    setMemberInput("")
    setMembers([])
  }

  // add members

  const addMembers = () => {
    if(members.includes(memberInput.trim())) return;

    if(memberInput.trim() === "") return
    setMembers((prev)=> [...prev, memberInput])
    setMemberInput("")
  }

  // handle member remove

  const handleRemoveMember = (groupId, memberIndex) => {
      const updatedGroup = groups.map((group)=>{
        if(group.id === groupId){
          return {
            ...group, members: group.members.filter((_, i) => i !== memberIndex)
          };
        }

        return group;
      })

      setGroups(updatedGroup)
  }

  // remove/delete group

  const onRemoveGroup = (groupId) => {
    const updatedGroup = groups.filter((group)=>{
      return group.id !== groupId
    })

    setGroups(updatedGroup)
  }


  // main return
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

        // Group Card Component
        <GroupCard key={group.id} group={group} onMemberRemove={handleRemoveMember} onRemoveGroup={onRemoveGroup}/>
      ))}  
    </div>
    )}
    

    </div>
  )
}

export default App