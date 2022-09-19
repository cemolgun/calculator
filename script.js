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

    if(calculationArray[1]){
        eval();
    }

    symbol=symbols[num];

    if (symbol =="-" && screenContainer == ""){
        if(!calculationArray[1]){
            calculationArray[0]=0;
            calculationArray[1]="+";
        }
        screenContainer+="-";
        refreshScreen();
        return;
    }

    calculationArray[0] = Number(screenContainer);
    calculationArray[1] = symbol;
    c();
    refreshScreen(calculationArray[0]);

}
function eval(){
    let result;

    console.log(screenContainer)

    if (calculationArray.length==0){return;}
    if (!calculationArray[1]){result=calculationArray[0];}
    if (calculationArray[0] && calculationArray[1] && screenContainer==""){
        result=calculationArray[0];
    }
    else {
        calculationArray[2] = Number(screenContainer);

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
    if(result != Math.trunc(result) || result > 1e10){
        result=result.toPrecision(4);
    }
    console.log(calculationArray[0], calculationArray[1],calculationArray[2])
    console.log(result);
    ac();
    calculationArray[0]=result;
    screenContainer=result;
    refreshScreen();
    if (result==Infinity){
        ac();
        refreshScreen(":)");
    }
}


//Klavye event listener
document.body.addEventListener("keydown", e => {
    
    if (Number(e.key)<10 && Number(e.key)>=0){inputNum(e.key);}
    if(e.key == "Delete" || e.key == "Backspace"){del();}
    if(e.key=="." || e.key==","){inputDot();}
    console.log(e.key);
    if(e.key == "+") inputSymbol(0);
    if(e.key == "-") inputSymbol(1);
    if(e.key == "*") inputSymbol(2);
    if(e.key == "/") inputSymbol(3);
    if(e.key == "%") inputSymbol(4);
    if(e.key== "Enter") eval();

});