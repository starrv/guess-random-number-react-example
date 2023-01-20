import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { clear } from '@testing-library/user-event/dist/clear';

let timer;

function App() {

  const timerDisplay=document.querySelector("#timerDisplay");
  const alarm=document.querySelector("#alarm");
  const won=document.querySelector("#won");

  const intervalTime=1000;
  const timerLimit=60;
  //const resetTime=10000;
  const timeoutColor="red";
  const wonColor="green";
  const defaultColor="black";
  const [count,setCount]=useState(timerLimit);
  const mult=1000000;
  const [randNum,setRandNum]=useState(parseInt(mult*Math.random()));
  
  useEffect(()=>{
    if(document.querySelector("#userInputBox").value==randNum){
      endGame("game won");
    }
    if(count==0){
      endGame("time out");
    }
  });

  let newTimerDisplay;
  if(count<=0){
    newTimerDisplay=<h1 id="timerDisplay">Time is up!!</h1>
  }
  else{
    newTimerDisplay=<h1 id="timerDisplay">{count}</h1>
  }
  return (
    <div className="App">
      <h1>
        Guess the random number
      </h1>
      {newTimerDisplay}
      <div>
        <label htmlFor='userInputBox'>
          <input id="userInputBox" type="text"></input>
        </label>
        <button onClick={init}>start game</button>
      </div>
      <audio id="alarm" src="./alarm.wav">
        Audio not supported
      </audio>
      <audio id="tok" src="./tok.mp3">
        Audio not supported
      </audio>
      <audio id="won" src="./won.wav">
        Audio not supported
      </audio>
    </div>
  );

  function init(){
    document.querySelector("#alarm").load();
    //console.log("timer: ",timer);
    clearInterval(timer);
    //console.log("timer: ",timer);
    resetGame();
    timer=setInterval(timerFunc,intervalTime);
    //console.log("timer: ",timer);
  }

  function timerFunc(){
    setCount(count=>count-1);
    console.log("count: ",count);
    document.querySelector("#tok").play();
  }

  function setRandomNumber(){
    setRandNum(parseInt(mult*Math.random()));
  }

  function setCounter(){
    setCount(timerLimit);
  }

  function resetGame(){
    document.querySelector("#timerDisplay").style.color=defaultColor;
    setCounter();
    setRandomNumber();
  }

  function endGame(flag){
    if(flag=="time out"){
      timerDisplay.style.color=timeoutColor;
      alarm.play();
      clearInterval(timer);
    }
    else if(flag=="game won"){
      won.play();
      timerDisplay.style.color=wonColor;
      timerDisplay.textContent="You won!!";
      clearInterval(timer);
    }
  }

}

export default App;

