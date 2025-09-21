let display =document.querySelector("#display")
function appendtoDisplay(input){
    display.value+=input
}
function displayClear(){
    display.value=""
}
function calculator(){
    try{
        display.value=eval(display.value)
    }
    catch (error){
    display.value="Error";
        
    }
    
}