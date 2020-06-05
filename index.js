
const width = 9;
const height = 9;
const board = [];
const dotPlayer = {
    name: "cucumber",
    position: 0,
};
const ladders = [{
    number: 1,
    startPos: 19,
    xEnd: 3,
    yEnd: 4,
    countMove :29
},{
    number: 2,
    startPos: 67,
    xEnd: 3,
    yEnd: 1,
    countMove :8
},{
    number: 3,
    startPos: 16,
    xEnd: 7,
    yEnd: 6,
    countMove :18
},{
    number: 4,
    startPos: 31,
    xEnd: 7,
    yEnd: 1,
    countMove :48
},{
    number: 5,
    startPos: 54,
    xEnd: 1,
    yEnd: 0,
    countMove :28
}];
const snakes = [{
    number: 1,
    startPos: 86,
    xEnd: 8,
    yEnd: 4,
    countMove :-33
},{
    number: 2,
    startPos: 12,
    xEnd: 5,
    yEnd: 9,
    countMove :-7
},{
    number: 3,
    startPos: 83,
    xEnd: 2,
    yEnd: 3,
    countMove :-27
},{
    number: 4,
    startPos: 37,
    xEnd: 5,
    yEnd: 7,
    countMove :-14
},{
    number: 5,
    startPos: 58,
    xEnd: 6,
    yEnd: 5,
    countMove :-16
}];

//for timer counting
let time = 0;
let interval = 0;

let boardSize = 0;
let dice = 0;
let position = 0;
let start = false;
let cheat = "";
let startBtn = "";
let boardHTML = ""
let newsText = ""
let imageDadu = false;
let hulkMode = false;




        
// START : action handler for start buttton
startBtn = document.getElementById("startbutton");
startBtn.addEventListener("click", function(){
    if(start === true){
        alert("Game already start ma brow");
    }else{
        alert("Time will start counting ma brow, Goodluck!");
        //show Playground (board, snakes, ladders, and player) after click start (initial display content is "none")
        document.getElementById("playGround").style.display = "block";
        interval = setInterval(function(){
            time ++;
            document.getElementById("timer").innerHTML = time/100;
        },10);
        start = true;
    };
});
// END : action handler for start buttton




// START : action handler for dark mode button
function checkDarkMode(){
    let darkMode = document.getElementById("darkMode").checked;
    if(darkMode == true){
        document.body.style.backgroundColor = "black";
    }else{
        document.body.style.backgroundColor = "rgb(136, 65, 91)";
    };
};
// END : action handler for dark mode button




// START : action handler for roll dice button 
function rollDice(){
    if(start === false){
        alert("Need to START The Game first ma brow");
    }else{
        imageDadu = true;

        //show image dice after click rolldice (initial display image is "none")
        document.getElementById("dice").style.display = "block";
        dice = Math.ceil(Math.random() * 6 );

        //show immage base on rolled dice 1-6
        document.getElementById("dice").src = "img/dice1.png";
        switch (dice){
            case 1 : document.getElementById("dice").src="img/dice1.png"; break;
            case 2 : document.getElementById("dice").src="img/dice2.png"; break;
            case 3 : document.getElementById("dice").src="img/dice3.png"; break;
            case 4 : document.getElementById("dice").src="img/dice4.png"; break; 
            case 5 : document.getElementById("dice").src="img/dice5.png"; break;
            case 6 : document.getElementById("dice").src="img/dice6.png"; break;
        }

        //check if player steps left to finish is less than rolled dice 
        if((dotPlayer.position + dice) > 89 ){
            alert("cannot move, Roll the Dice again ma bro");
            newsText = `<a>Rolled Dice need LESS or EQUAL than steps left</a>`;
            document.getElementById("news").innerHTML = newsText ;
        }
        else{
            dotPlayer.position += dice;
        }
        document.getElementById("diceNumber").innerHTML = `You rolled : ${dice}`;
        drawBoard();
    };
};
// END : action handler for roll dice button 




// START : action handler for restart button
function restart(){
    if(start === false){
        alert("The Game not yet Started ma brow");
    }else{
        if(confirm("are you sure want to Restart ma brow?")){
            location.reload();
        }else{

        };
    };
};
// END : action handler for restart button




// START : set space and object for board
for( y = height ; y >= 0  ; y--){
    let row=[];
    board.push(row);
    for(x = 0 ; x < width ; x++){
        row.push({x,y,occupied:null, position});
        position++;
    };
};
// END : set space and object for board




// START : draw board game with iteration boardHTML and row 
boardSize = 50;
boardHTML = "";
const drawBoard = () => {
    board.forEach(row => {
        row.forEach(square => {
            if (square.position % 2 == 0){
                boardHTML += `<div class="squareOdd" style="top:${square.y * boardSize}px; 
                left:${square.x * boardSize}px"> <a class="number"> ${square.position} </a></div>`;
            }else{
                if(square.position == 89 ){
                    boardHTML += `<div class="lastSquare" style="top:${square.y * boardSize}px; 
                    left:${square.x * boardSize}px"> <a class="lastNumber"> WIN! </a></div>`;
                }else{
                    boardHTML += `<div class="squareEven" style="top:${square.y * boardSize}px; 
                    left:${square.x * boardSize}px"> <a class="number"> ${square.position} </a></div>`;
                };
            };
        });
    });
    scanPosition();
    document.getElementById("boardTable").innerHTML = boardHTML;
};
// END : draw board game with iteration boardHTML and row 




// START : scan position of player on the board
let square = null;
function scanPosition(){

    //flagladders for check if player located on on the ladder position or not
    let flagLadders = false;

    //looping ladders position available every time player make a move
    ladders.forEach(ladder =>{
        if(ladder.startPos === dotPlayer.position){
            console.log(document.getElementsByClassName("diceBtn"));
            document.getElementById("diceBtn").style.display = "none";
            // document.getElementsByClassName("diceBtn").style.display = "none"
            let addClass = document.getElementById(`ladder${ladder.number}`);

            //blinking for sign which ladder player get  
            addClass.classList.add("blinking");

            //check if cheat Hulk Mode is enabled
            if(hulkMode === false){
                newsText = `<a>Amazing! You get a ladder!</a>`;
            }else{
                newsText = `<a>HULK climbing a Ladder!</a>`;
            }
            
            setTimeout(function(){
                document.getElementById("diceBtn").style.display = "block";
                boardHTML += `<div class="player" style="top:${ladder.yEnd * boardSize + 10}px ; 
                left:${ladder.xEnd * boardSize + 10}px "> </div>`;
                dotPlayer.position += ladder.countMove;
                drawBoard();
            }, 2000);
            flagLadders = true;
        };
    });

    //flagSnakes for check if player located on on the snake position or not
    let flagSnakes = false;

    //looping snakes position available every time player make a move
    snakes.forEach(snake =>{
        if(snake.startPos === dotPlayer.position){
            console.log(document.getElementsByClassName("diceBtn"));
            document.getElementById("diceBtn").style.display = "none";
            // document.getElementsByClassName("diceBtn").style.display = "none"
            let addClass = document.getElementById(`snake${snake.number}`);

            //blinking for sign which snake player get  
            addClass.classList.add("blinking");

            //check if cheat Hulk Mode is enabled
            if(hulkMode === false){
                newsText = `<a>Sorry, you get a snake</a>`
                setTimeout(function(){
                    document.getElementById("diceBtn").style.display = "block"
                    boardHTML += `<div class="player" style="top:${snake.yEnd * boardSize + 10}px ; 
                    left:${snake.xEnd * boardSize + 10}px "> </div>`;
                    dotPlayer.position += snake.countMove;
                    drawBoard();
                    flagSnakes = true;
                }, 2000);
            }

            //on hulk mode, player not affected by snake's moveback position 
            else{
                document.getElementById("diceBtn").style.display = "block"
                newsText = `<a>Got a snake but you're a HULK</a>`
            };
        };
    });
    document.getElementById("news").innerHTML = newsText

    //if player not in position ladders and snakes, draw position base on roller dice (rollDice())
    if(flagLadders == false && flagSnakes == false){
        board.forEach(row => {
            row.forEach(element => {
                if(element.position == dotPlayer.position){
                    boardHTML += `<div class="player" style="top:${element.y * boardSize + 10}px ; 
                    left:${element.x * boardSize + 10}px "> </div>`;
                };
            });
        });

        //position 89 is finish line 
        if(dotPlayer.position == 89){
            alert("You WIN");

            //stop timer 
            clearInterval(interval);

            newsText = `<a>Congratulation You WIN!</a>`;
            document.getElementById("news").innerHTML = newsText ;
        };
    };
};
// END : scan position of player on the board

drawBoard();




//  START : cheat section
cheat = document.getElementById("cheat") ;
cheat.addEventListener("dblclick", function(){
    alert(`Type "ISEEUHAPPY" on game = WIN \nType "STRONGLIKEHULK" on game = anti-snake `);
});

let temp = "";
bodyTag = document.getElementById("body");

//record what user typing and check if any cheat typed
bodyTag.addEventListener("keypress", function(e){    
    temp +=  e.code[3] ;
    if(temp.includes("ISEEUHAPPY")){
        alert("CHEAT ENABLED")
        boardHTML += `<div class="player" style="top:${0 * boardSize + 10}px ; 
        left:${8 * boardSize + 10}px "> </div>`;
        
        //89 is finish line
        dotPlayer.position = 89;
        drawBoard();
        temp = "";

        //clear timer and interval aswell
        clearInterval(interval);

        newsText = `<a>Congratulation You WIN!</a>`;
        document.getElementById("news").innerHTML = newsText ;

    }
    if(temp.includes("STRONGLIKEHULK")){
        alert("CHEAT ENABLED")
        hulkMode = true;
    }
});
//  END : cheat section

