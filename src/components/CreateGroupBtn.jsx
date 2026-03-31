
const CreateGroupBtn = ({setIsFormOpen}) => {
  return (
    <button
            type="submit"
            onClick={()=>setIsFormOpen(true)}
            className="bg-green-600 hover:bg-green-700 fixed bottom-8 left-1/2 -translate-x-1/2 text-white px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer text-xl shadow-xl"
          >
            <i class="ri-add-fill"></i>
          </button>
  )
}

export default CreateGroupBtn