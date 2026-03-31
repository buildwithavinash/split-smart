import React from 'react'

const CreateGroupBtn = ({setIsFormOpen}) => {
  return (
    <button
            type="submit"
            onClick={()=>setIsFormOpen(true)}
            className="bg-green-500 hover:bg-green-600 fixed bottom-8 right-8 text-white px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer border border-slate-500 text-xl"
          >
            +
          </button>
  )
}

export default CreateGroupBtn