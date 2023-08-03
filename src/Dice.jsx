import React from 'react'

const Dice = ({value, isHeld, holdDice}) => {
  const dieContainer = {
    backgroundColor: isHeld ? "#59e391" : "white"
  }

  return (
    <div
      style={dieContainer} 
      onClick={holdDice}
      className='w-10 h-10 flex items-center justify-center shadow-xl rounded-full p-10 mb-10 duration-300 hover:cursor-pointer hover:bg-green-200'>
        <span className='text-blue-950 font-bold text-3xl'>{value}</span>
    </div>
  )
}

export default Dice