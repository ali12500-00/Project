const board=document.querySelector('#board');
const startbutton=document.querySelector('.btn-start');
const model=document.querySelector('#model');
const startGameModel=document.querySelector('.start-game');
const gameOverModel=document.querySelector('.game-over');
const restartButton=document.querySelector('.btn-restart');
const highScoreElement=document.querySelector('#high-score');
const scoreElement=document.querySelector('#score');
const timeElement=document.querySelector('#time');
const blockHeight=30;
const blockWidth=30;

let highScore=localStorage.getItem('highScore')||0;
highScoreElement.innerText=highScore;
let score=0;
let time=`00-00`;
const cols=Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let intervelId=null;
let timerIntervelId=null;
let food={x:Math.floor(Math.random()*cols),y:Math.floor(Math.random()*rows)};
// for(let i=0;i<rows*cols;i++){
//     const block=document.createElement('div');
//     block.classList.add('block');
//     board.appendChild(block);
// }


    const blocks=[]
    let snake=[
    {x:1,y:4}
 ];
 let direction=`down`;
for(let row=0;row<rows;row++){
    // console.log(row);
    for(let col=0;col<cols;col++){
        // console.log(col);
        const block=document.createElement('div');
        block.classList.add('block');
        
        board.appendChild(block);
        // block.innerText=`${row},${col}`;
        blocks[`${row}-${col}`]=block;
    }
}

    function render(){
         let head=null;
         blocks[`${food.y}-${food.x}`].classList.add('food');
        if(direction===`left`){
            head={x:snake[0].x-1,y:snake[0].y}
        }
        if(direction===`right`){
            head={x:snake[0].x+1,y:snake[0].y}
        }
        if(direction===`up`){
            head={x:snake[0].x,y:snake[0].y-1}
        }
        if(direction===`down`){
            head={x:snake[0].x,y:snake[0].y+1}
        }

        if(head.x<0 || head.x>=cols || head.y<0 || head.y>=rows){
            clearInterval(intervelId);
            model.style.display='flex';
            startGameModel.style.display='none';
            gameOverModel.style.display='flex';
            return;
        }
        if(head.x===food.x && head.y===food.y){
           blocks[`${food.y}-${food.x}`].classList.remove('food');
           food={x:Math.floor(Math.random()*cols),y:Math.floor(Math.random()*rows)};
            blocks[`${food.y}-${food.x}`].classList.add('food');
            snake.unshift(head);
            score+=10;
            scoreElement.innerText=score;
            if(score>highScore){
                highScore=score;
                localStorage.setItem('highScore',highScore.toString());
                highScoreElement.innerText=highScore;

            }
        }
        snake.forEach(segment=>{
            blocks[`${segment.y}-${segment.x}`].classList.remove('fill')
        })
        snake.unshift(head)
        snake.pop();
        snake.forEach(segment=>{
            blocks[`${segment.y}-${segment.x}`].classList.add('fill')
        })
    }
//    intervelId=intervalid=setInterval(()=>{
       
//         render();
//     },400)

    addEventListener('keydown',e=>{
        if(e.key==='ArrowLeft'){
            direction=`left`
        }
        else if(e.key==='ArrowRight'){
            direction=`right`
        }
        else if(e.key==='ArrowUp'){
            direction=`up`
        }
        else if(e.key==='ArrowDown'){
            direction=`down`
        }
    })  
    startbutton.addEventListener('click',()=>{
        model.style.display='none';
        intervelId=setInterval(()=>{ render()},100)
        timerIntervelId=setInterval(()=>{
            let [mins,sec]=time.split('-').map(Number);
            
            if(sec===59){
                mins+=1;
                sec=0;
            } 
            else{
                sec+=1;
            }
            time=`${String(mins).padStart(2,'0')}-${String(sec).padStart(2,'0')}`
            timeElement.innerText=time;
        },1000)

    });
    restartButton.addEventListener('click',restartGame);
     function restartGame(){
        blocks[`${food.y}-${food.x}`].classList.remove('food');
        snake.forEach(segment=>{
            blocks[`${segment.y}-${segment.x}`].classList.remove('fill')
        })
        score=0;
        time=`00-00`;
        scoreElement.innerText=score;
        timeElement.innerText=time;
        highScoreElement.innerText=highScore;

        model.style.display='none';
        direction=`down`;
        snake=[
            {x:1,y:4}
         ];
         
         food={x:Math.floor(Math.random()*cols),y:Math.floor(Math.random()*rows)};
         intervelId=setInterval(()=>{ render()},300)
     }