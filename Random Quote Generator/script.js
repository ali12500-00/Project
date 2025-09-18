const quotes = [
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Dream big, work hard, stay focused, and surround yourself with good people.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "Opportunities don’t happen, you create them.",
  "Don’t watch the clock; do what it does. Keep going."
];
let usedIndex=new Set()
let quoteElement=document.getElementById("quote")
 function generateQuote(){
    while(true){
    let randomIdx=Math.floor(Math.random()*quotes.length)
    if(usedIndex.has(randomIdx))continue

    
    let quote=quotes[randomIdx]
    quoteElement.innerHTML=quote;
    break;
 }

}