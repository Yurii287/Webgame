import {getLoggedInUser, setLoggedInUser, setUserData, checkLoggedIn} from "./utilModules/userUtil.js";

const userScore = document.getElementById("loggedInScore");
const userHeader = document.getElementById("loggedInHeader");
const highScore = document.getElementById("highestScore");
const topTenList = document.getElementById("topTenList");

let allScores = [];

setLoggedInUser();
setUserData();
checkLoggedIn();
loadLeaderboard();


function loadLeaderboard() {
  // check if there is or isnt a user logged in
  if (getLoggedInUser() === undefined || getLoggedInUser() === null) {
    userHeader.innerHTML = "Not currently logged in.  Log in to see your score";
  }
  else{
  }
  if (JSON.parse(localStorage.getItem("userData")) === null) {
    highScore.innerHTML += "<br>"+"No Users"
    for (let i = 0; i < 10; i++) {
      topTenList.innerHTML += "<br> <li>  " + "No User" + "</li>";
    }
  }
  else {
    // Collect all scores within an array from userData
    getAllScores();
    // Find the highest score and the score of the logged in user
    findHighestUser();
    findUserScore();  
    findTopTen();
  }
}

function getAllScores() {
  let item = JSON.parse(localStorage.getItem("userData"));
  for (let i = 0; i < item.length; i++) {
    // push all user objects into the array
    allScores.push(item[i]);
  }
  sortAllScores();
}

function sortAllScores() {
  return allScores.sort(function(x, y) {
    return y.score-x.score;
  })
}

function findHighestUser() {
  let item = JSON.parse(localStorage.getItem("userData"));
  if (allScores[0].score === 0) {
    highScore.innerHTML += "<br> No Highscore set";
  }
  else {
    for (let i = 0; i < item.length; i++) {
      if (item[i].score === allScores[0].score) {
        highScore.innerHTML += item[i].username + "<br>" + item[i].highScore + "<br>";
      }
    }
  }
}

function findUserScore() {
  let item = JSON.parse(localStorage.getItem("userData"));
  for (let i = 0; i < item.length; i++) {
    if (item[i].username === getLoggedInUser()) {
      userScore.innerHTML += item[i].highScore;
    }
  }
}

function findTopTen() {
  for (let k = 0; k < 10; k++) {
    if (allScores[k] === undefined) {
      topTenList.innerHTML += "<br> <li>  " + "No User" + "</li>";
    }
    else {
    topTenList.innerHTML += "<br> <li>  "+ allScores[k].username+ " : " + allScores[k].highScore + "</li>";
    }
  }
}