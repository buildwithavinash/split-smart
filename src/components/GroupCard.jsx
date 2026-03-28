
const GroupCard = ( {group} ) => {
  return (
    <div className='border border-indigo-500 border-l-4 p-2 '>
          <h2 className='text-2xl font-semibold'>{group.name}</h2>
          <p>{group.members.length} members</p>
        </div>
  )
}

export default GroupCard