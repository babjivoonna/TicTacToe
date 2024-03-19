import React from 'react'
import GameState from './GameState'

const GameRestart = ({gameState,onReset}) => {
    if(gameState===GameState.inProgress){
        return
    }
  return (
    <button  onClick={onReset} className="buttonn">
      Resettttt
    </button>
  )
}

export default GameRestart
