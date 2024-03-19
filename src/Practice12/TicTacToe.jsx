 import React, { useEffect, useState } from 'react'
import Borad from './Borad'
import GameOver from './GameOver'
import GameState from './GameState'
import GameRestart from './GameRestart'
import click_Sound from './Sounds/click_soung.wav'
import Game_OverSound from './Sounds/Game_OverSound.wav'
 const PLAYER_X="X"
 const PLAYER_O="O"
 const winningCombinations=[
    //rows
    {combo:[0,1,2],strikeClass:"stike-row-1"},
    {combo:[3,4,5],strikeClass:"stike-row-2"},
    {combo:[6,7,8],strikeClass:"stike-row-3"},
    //columns
    {combo:[0,3,6],strikeClass:"stike-column-1"},
    {combo:[1,4,7],strikeClass:"stike-column-2"},
    {combo:[2,5,8],strikeClass:"stike-column-3"},

// daigonals
    {combo:[0,4,8],strikeClass:"stike-diagonal-1"},
    {combo:[2,4,6],strikeClass:"stike-diagonal-2"},
 ]
 const checkWinner=(tiles,setStrikeClass,setGameState)=>{
    
    for( const {combo,strikeClass} of winningCombinations){
        // console.log(strikeClass)
        // console.log({gim:tiles[combo[0]]})
        // console.log({gim1:tiles[combo[1]]})
        // console.log({gim2:tiles[combo[2]]})
        const tileValue1=tiles[combo[0]]
       const tileValue2=tiles[combo[1]]
       const tileValue3=tiles[combo[2]]
       if(tileValue1!==null && tileValue1===tileValue2 && tileValue2===tileValue3){
        console.log(strikeClass,"if")
        setStrikeClass(strikeClass)

        if(tileValue1=== PLAYER_X){
            setGameState(GameState.playerXWins)
        }
        else{
            setGameState(GameState.playerOWins)
        }
        return
       }

    }
    const areAllTilesFilledIn=tiles.every((tile)=>tile!==null)
    if(areAllTilesFilledIn){
        setGameState(GameState.draw)
    }

}
 const  TicTacToe=()=> {
    const [tiles,setTiles]=useState(Array(9).fill(null))
    const [playerTurn,setPlayerTurn]=useState(PLAYER_X)
    const [strikeClass,setStrikeClass]=useState()
    const [gameState,setGameState]=useState(GameState.inProgress)
    const gameOverSound=new Audio(Game_OverSound)
    gameOverSound.volume=0.2
    const clickSound=new Audio(click_Sound)
    clickSound.vloume=0.4
    
    const onTileClick=(index)=>{
        if(tiles[index]!==null){
            return null
        }
        const newTile=[...tiles]
        newTile[index]=playerTurn
        setTiles(newTile)
        if(playerTurn===PLAYER_X){
            setPlayerTurn(PLAYER_O)
        }
        else{
            setPlayerTurn(PLAYER_X)
  
        }
    }
    const handleReset=()=>{
        setGameState(GameState.inProgress)
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_X)
        setStrikeClass(null)
    }
   console.log(strikeClass)
    useEffect(()=>{
        checkWinner(tiles,setStrikeClass,setGameState)
    },[tiles])
    useEffect(()=>{
        if(tiles.some((tile)=>tile!==null)){
            clickSound.play()
        }

    },[tiles])
   useEffect(()=>{
    if(gameState!==GameState.inProgress){
        gameOverSound.play()
    }
   },[gameState])
   return (
    <>
     <div>
        <h1>Tic Tac Toe</h1>
       <Borad playerTurn={playerTurn} onTileClick={onTileClick} tiles={tiles} strikeClass={strikeClass}/>
       <GameOver gameState={gameState}/>
       <GameRestart  gameState={gameState} onReset={handleReset}/>
     </div>
   
      
       </>
   )
 }
 
 export default TicTacToe
 