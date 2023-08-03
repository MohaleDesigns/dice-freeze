import React, { useEffect, useState } from 'react'
import Dice from './Dice'
import uuid from 'react-uuid'
// import Confetti from 'react-confetti'

const App = () => {
    const [dice, setDice] = useState(allNewDice())
    const [results, setResults] = useState(false)

    function generateNewDie() {
        return {value: Math.ceil(Math.random() * 6), isHeld: false, id: uuid()}
    }

    function allNewDice() {
        const newDiceArray = []
        for(let i = 0; i < 10; i++) {
            newDiceArray.push(generateNewDie())
        }
        return newDiceArray
    }

    function rollDice() {
        if(!results) {
            setDice(prevDie => prevDie.map(die => {
                return die.isHeld ? die : generateNewDie()
            }))
        } else {
            setResults(false)
            setDice(allNewDice())
        }
    }

    function holdDice(id) {
        setDice(dice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
    }

    useEffect(() => {
        const firstIndex = dice[0].value
        const allHeld = dice.every(die => die.isHeld)
        const allSame = dice.every(die => die.value === firstIndex)

        if(allSame && allHeld) {
            setResults(true)
        }
    }, [dice])


    return (
        <div className='flex flex-col items-center justify-center h-screen p-6'>
            {/* <Confetti /> */}
            <h1 className='text-blue-950 text-5xl font-bold text-center mb-2'>Dice Freeze</h1>
            <p className='text-blue-950/80 text-lg font-normal text-center md:max-w-lg'>Roll until all dice are the same number. Click each dice to freeze it at it's current number.</p>
            <p className='max-w-sm text-blue-950/60 text-sm font-medium text-center mb-14 md:max-w-lg'>Hint: Frezze all the dice to the value 1</p>
            <div className='grid grid-rows-2 grid-cols-5 md:gap-5'>
                {dice.map(die => (
                    <Dice 
                        key={die.id} 
                        value={die.value} 
                        isHeld={die.isHeld}
                        holdDice={() => holdDice(die.id)}
                    />
                ))}   
            </div>
            <button 
                    className='inline-block mx-auto bg-blue-950 text-white font-semibold text-xl rounded-full py-3 px-8 duration-300 hover:bg-blue-800'
                    onClick={rollDice}
                >
                    {results ? "New Game" : "Roll Dice"}
            </button> 
        </div>
    )
}

export default App