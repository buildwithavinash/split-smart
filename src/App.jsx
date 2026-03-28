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
    <div className="min-h-screen bg-gray-900 w-full text-slate-100">

    <h1 className="font-semibold text-2xl text-slate-100 text-center">Split<span className="text-green-500 ">Smart</span></h1>

    <div className="cards__container">
      {groups.map((grp)=>(
        <div key={grp.id}>
          <h2>{grp.name}</h2>
          <p>{grp.members.length} members</p>
        </div>
      ))}  
    </div>

    </div>
  )
}

export default App