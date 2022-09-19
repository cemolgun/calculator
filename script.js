let screenContainer = "";
let calculationArray = [];

function refreshScreen(arg){
    if (arg){
        document.querySelector("#screen").textContent = String(arg);
        return;
    }
    document.querySelector("#screen").textContent = screenContainer;   
}
function inputNum(number){
    if (screenContainer.length<11 && !isNaN(number)){
        screenContainer += String(number);
        refreshScreen();
    }
}
function inputDot(){
    if (!screenContainer.includes(".") && screenContainer.length>0){
        screenContainer +=".";
        refreshScreen();
    }
}
function ac(){
    screenContainer = "";
    calculationArray=[];
    refreshScreen();
}
function c(){
    screenContainer="";
    refreshScreen();
}
function del(){
    screenContainer = screenContainer.slice(0,-1);
    refreshScreen();
}

let symbols=["+","-","*","/","%"];
function inputSymbol(num){
    if(calculationArray[1]!=undefined){eval();}
    symbol=symbols[num];

    if (symbol =="-" && screenContainer == ""){
        screenContainer+="-";
        refreshScreen();
        return;
    }

    if(calculationArray)

    calculationArray[0] = Number(screenContainer);
    calculationArray[1] = symbol;
    c();
    refreshScreen(calculationArray[0]);
}
function eval(){
    let result;
    
    if (Number(screenContainer) == ""){
        result=calculationArray[0]
    }
    else if (calculationArray[0]==undefined){
        result=Number(screenContainer);
    }

    else{
        calculationArray[2]=Number(screenContainer);

        switch (calculationArray[1]){
            case "+":
                result = calculationArray[0]+calculationArray[2];
                break;
            case "-":
                result = calculationArray[0]-calculationArray[2];
                break;
            case "*":
                result = calculationArray[0]*calculationArray[2];
                break;
            case "/":
                result = calculationArray[0]/calculationArray[2];
                break;
            case "%":
                result = (calculationArray[0]/100)*calculationArray[2];
                break;
        }
    }
    calculationArray=[result];
    screenContainer=String(result);
    refreshScreen();
}

//Klavye event listener
document.body.addEventListener("keydown", e => {
    if (Number(e.key)<10 && Number(e.key)>=0){
        inputNum(e.key);
    }
    if(e.key == "Delete" || e.key == "Backspace"){
        del();
    }
    if(e.key=="." || e.key==","){
        inputDot();
    }
    console.log(e.key);
});