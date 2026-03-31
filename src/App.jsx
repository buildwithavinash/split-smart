import { useEffect, useState } from "react";
import GroupCard from "./components/GroupCard";
import GroupDetail from "./components/GroupDetail";
import GroupInputForm from "./components/GroupInputForm";
import CreateGroupBtn from "./components/CreateGroupBtn";

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
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    const updatedMembers = members.filter((mem, i) => i !== id);

    setMembers(updatedMembers);
  };

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
    <div className={`${isFormOpen ? "overflow-hidden h-screen" : "scr"} relative min-h-screen bg-slate-100 w-full text-slate-900 p-4`}>
      <h1 className="font-bold text-3xl text-slate-900 text-center">
        Split<span className="text-green-500 ">Smart</span>
      </h1>

      {/* group input form */}
      {isFormOpen && (
        <GroupInputForm
          groupName={groupName}
          setGroupName={setGroupName}
          memberInput={memberInput}
          setMemberInput={setMemberInput}
          addMembers={addMembers}
          members={members}
          removeMember={removeMember}
          createGroup={createGroup}
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
        />
      )}

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
            <div className="text-center h-[80vh] flex flex-col justify-center items-center">
              <div className="flex justify-center mt-8">
                {!isFormOpen && (
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer border border-slate-500"
                  >
                    Create Group
                  </button>
                )}
              </div>
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

{groups.length > 0 && (
  <div className="shadow">
  <CreateGroupBtn setIsFormOpen={setIsFormOpen}/>
</div>
)}


      {/* main end */}
    </div>
  );
};

export default App;
