import { useEffect, useState } from "react";
import GroupCard from "./components/GroupCard";
import GroupDetail from "./components/GroupDetail";

const App = () => {
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem("groups");

    let res = saved ? JSON.parse(saved) : [];

    return res;
  });
  const [groupName, setGroupName] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedGroupID, setSelectedGroupID] = useState(null);

  // local storage
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  // create group
  const createGroup = () => {
    if (groupName.trim() === "" || members.length < 2) {
      alert("Please enter a group name and at least 2 members");
      return;
    }

    const newGroup = {
      id: crypto.randomUUID(),
      name: groupName.trim(),
      members: members,
      expenses: [],
    };

    setGroups((prev) => [...prev, newGroup]);
    setGroupName("");
    setMemberInput("");
    setMembers([]);
  };

  // add members
  const addMembers = () => {
    if (members.includes(memberInput.trim())) return;

    if (memberInput.trim() === "") return;
    setMembers((prev) => [...prev, memberInput]);
    setMemberInput("");
  };

  // handle member remove
  const handleRemoveMember = (groupId, memberIndex) => {
    const updatedGroup = groups.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          members: group.members.filter((_, i) => i !== memberIndex),
        };
      }

      return group;
    });

    setGroups(updatedGroup);
  };

  // remove member on form input
  const removeMember = (id) => {
    const updatedMembers = members.filter((mem, i)=>(
      i !== id
    ))

    setMembers(updatedMembers)
  }

  // remove/delete group
  const onRemoveGroup = (groupId) => {
    const updatedGroup = groups.filter((group) => {
      return group.id !== groupId;
    });

    setGroups(updatedGroup);
  };

  const selectedGroup = groups.find((g) => g.id === selectedGroupID);

  // handle add expense

  const handleAddExpense = (groupId, expense) => {
    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          expenses: [...(group.expenses || []), expense],
        };
      }

      return group;
    });

    setGroups(updatedGroups);
  };

  // delete expense
  const handleDeleteExpense = (groupId, expId) => {
    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          expenses: group.expenses.filter((exp) => exp.id !== expId),
        };
      }

      return group;
    });

    setGroups(updatedGroups);
  };

  // main return
  return (
    <div className="min-h-screen bg-slate-100 w-full text-slate-900 p-4">
      <h1 className="font-bold text-3xl text-slate-900 text-center">
        Split<span className="text-green-500 ">Smart</span>
      </h1>

      {/* group input form */}

      <div className="p-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col justify-center gap-4"
        >
          <div className="mt-4">
            <input
            placeholder="Group name"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              name="groupName"
              id="groupName"
              className="w-full border border-slate-300 rounded-md px-3 py-1 focus:outline-none focus:border-green-500 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-2 justify-between">
            <div className="flex gap-2 justify-between items-center">

            
            <input
            placeholder="Member name"
              type="text"
              value={memberInput}
              onChange={(e) => setMemberInput(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-1 focus:outline-none focus:border-green-500 transition-all duration-200"
            />
            <button
              type="button"
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1 rounded-lg transition-all cursor-pointer self-center"
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
              }}>X</button>
                </div>
              ))}
            </div>
            )}
            
          </div>

          <button
            type="submit"
            onClick={createGroup}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer border border-slate-500"
          >
            Create
          </button>
        </form>
      </div>

      {/* groups rendering */}

      {/* single open group */}
      {selectedGroup ? (
        <GroupDetail
          group={selectedGroup}
          onAddExpense={handleAddExpense}
          onDeleteExpense={handleDeleteExpense}
          onBackClick={setSelectedGroupID}
        />
      ) : (
        <>
          {groups.length === 0 ? (
            <div className="text-center">
              <p className="mt-6 text-gray-400 text-center">
                No groups yet. Create your first group!
              </p>
            </div>
          ) : (
            <div className="cards__container grid grid-cols-1 gap-4 mt-4">
              {groups.map((group) => (
                // Group Card Component
                <GroupCard
                  key={group.id}
                  group={group}
                  onMemberRemove={handleRemoveMember}
                  onRemoveGroup={onRemoveGroup}
                  onOpenGroup={setSelectedGroupID}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
