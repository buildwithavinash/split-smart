const CreateGroupBtn = ({setIsFormOpen}) => {
  return (
    <button
            type="submit"
            onClick={()=>setIsFormOpen(true)}
            className="bg-green-600 hover:bg-green-700 fixed bottom-8 left-1/2 -translate-x-1/2 text-white px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer text-xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
          >
            <i className="ri-add-fill"></i>
          </button>
  )
}

export default CreateGroupBtn