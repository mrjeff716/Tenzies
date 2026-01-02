import Die from "./components/Die"
import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = useState(() => generateAllNewDice()) //Lazy state
  /*ANOTHER ALTERNATIVE TO :
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)
  */
  /*const [gameWon, setGameWon] = useState(false)*/
  const newGameButton = useRef(null)
  /*
  useEffect(() => {
    /*const isSameValue = dice.map(die => die.value === dice[0].value ? [true] : [false])*/ /*
    if (dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)) {
      console.log("Game won")
      setGameWon(true)
    }
  }, [dice])
  */

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    newGameButton.current.focus()
  }, [gameWon])
  
    function generateAllNewDice() {
      console.log("generateAllNewDice was called")
    let arr = []
    for(let i = 0; i < 10; i++) {
      const randomNum = Math.floor(Math.random() * 6) + 1
      arr.push({
        value: randomNum,
        isHeld: false,
        id: nanoid()
      })
    } 
    
    return arr
    /*
    OR:
    return new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6))
    */
  }

  function rollDice() {
    if(!gameWon) {
      console.log("rollDice() is being run")
      setDice(prevDice => {
        return (
          prevDice.map(die => {
            if (die.isHeld === false) {
              const randomNum = Math.floor(Math.random() * 6) + 1
              return {...die, value: randomNum}
            } else {
              return {...die}
            }
          })
        )
      })  
    } else {
      console.log("generateAllNewDice() is being run")
      setDice(generateAllNewDice())
    }
    

  }

  function hold(id) {
    setDice(prevDice => prevDice.map(die => {
      return (
        die.id === id ? {...die, isHeld: !die.isHeld} : {...die}
      )
    }))
  }

  const diceElements = dice.map((dieObject) => {
    return (
      <Die value={dieObject.value} key={dieObject.id} isHeld={dieObject.isHeld} id={dieObject.id}  hold={hold}/> 
    )
  })

  console.log(dice)

  return (
    <main>
      {gameWon ? <Confetti /> : null}
      {/* For an unknown reason it is still rendering. The issue needs to be fixed
      <div aria-live="polite" className="sr-only">
        {gameWon && <p className="sr-only">Congratulations! You won! Press "New Game" to start again</p>}
      </div>
      */}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceElements}
      </div>
      <button className="new-roll-button"
      /*onClick= {gameWon ? () => setDice(generateAllNewDice()) : rollDice}*/
      onClick={rollDice}
      ref={newGameButton}
      >{gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}