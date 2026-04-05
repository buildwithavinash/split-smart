import { useEffect, useState } from "react";
import GroupCard from "./components/GroupCard";
import GroupDetail from "./components/GroupDetail";
import GroupInputForm from "./components/GroupInputForm";
import CreateGroupBtn from "./components/CreateGroupBtn";
import Header from "./components/Header";
import textFormatter from "./utils/textFormat";

const App = () => {
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem("groups");
    return saved ? JSON.parse(saved) : [];
  });
  const [groupName, setGroupName] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedGroupID, setSelectedGroupID] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // local storage
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  // dark mode
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // create group — prevent duplicate names
  const createGroup = () => {
    const formattedName = textFormatter(groupName.trim());
    const isDuplicate = groups.some(
      (g) => g.name.toLowerCase() === formattedName.toLowerCase()
    );
    if (isDuplicate) return;

    const newGroup = {
      id: crypto.randomUUID(),
      name: formattedName,
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
    if (memberInput.trim() === "") return;
    if (members.includes(memberInput.trim())) return;
    setMembers((prev) => [...prev, textFormatter(memberInput)]);
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
    const updatedGroup = groups.filter((group) => group.id !== groupId);
    setGroups(updatedGroup);
    // if deleted group was open, go back
    if (selectedGroupID === groupId) setSelectedGroupID(null);
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
    <div
      className={`${isFormOpen ? "overflow-hidden h-screen" : "scr"} relative min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 max-w-xl mx-auto border border-slate-300 dark:border-slate-800 rounded-md shadow-md`}
    >
      <Header theme={theme} setTheme={setTheme} />

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
          setMembers={setMembers}
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
            <div className="text-center h-[80vh] flex flex-col justify-center items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <p className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
                  Split expenses, <br /> not friendships.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
                  Create a group for a trip, dinner, or shared bills - SplitSmart tracks who paid and tells everyone exactly what they owe.
                </p>
              </div>

              <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span>✓ Track group expenses</span>
                <span>✓ Auto-calculate settlements</span>
                <span>✓ Share via WhatsApp</span>
              </div>

              {!isFormOpen && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer border border-slate-500"
                >
                  Create your first group
                </button>
              )}
            </div>
          ) : (
            <div className="cards__container grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {groups.map((group) => (
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
        <CreateGroupBtn setIsFormOpen={setIsFormOpen} />
      )}

      {/* main end */}
    </div>
  );
};

export default App;