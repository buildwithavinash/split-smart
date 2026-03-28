import GroupCard from "./components/GroupCard"

const App = () => {

  const groups = [
    {
    id: 1,
    name: "Goa Trip",
    members: ["Avinash", "Rahul", "Priya"],
    expenses: []
  },
  {
    id: 2,
    name: "Flat 304",
    members: ["Amit", "Rohit"],
    expenses: []
  }
  ]

  return (
    <div className="min-h-screen bg-gray-900 w-full text-white p-4">

    <h1 className="font-semibold text-2xl text-slate-100 text-center">Split<span className="text-green-500 ">Smart</span></h1>

    {groups.length === 0 ? (
      <div>
        <p className="mt-6 text-gray-400">No groups yet. Create your first group!</p>
      </div>
    ) : (
      <div className="cards__container grid grid-cols-1 gap-4 mt-4">
      {groups.map((group)=>(
        <GroupCard key={group.id} group={group}/>
      ))}  
    </div>
    )}
    

    </div>
  )
}

export default App