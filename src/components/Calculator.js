import React, {Component} from "react";
import "../styles/Calculator.css"
import Key from "./Keys";

let input = 0;


class Calculator extends Component{
    constructor(){
        super()
        this.state ={
            currentValue: "0",
            queue:[]          
        }
    }
     calculateQueue=()=> {
         const { queue } = this.state;



     // this.setState({ currentValue: eval(currentValue) })
         if (input !== 0) {
             input = parseFloat(input);

             this.addToQueue(input);
        }
         let answer = queue[0];
        let dividedByZero = 0;
         for (var i = 2; i < queue.length; i = i + 2) {

            switch (queue[i - 1]) {
                case '+':
                    answer += queue[i];
                    break;
                case '-':
                    answer -= queue[i];
                    break;
                case '/': if (queue[i] === 0) dividedByZero = 1;
                else answer = answer / queue[i];

                    break;
                case '*': answer = answer * queue[i];
                    break;
                default:     
            }

        }

        answer = answer.toFixed(10);
        answer = parseFloat(answer);
        if (dividedByZero === 1) {
            this.clearAll();
            document.getElementById("answer").innerHTML = "ERROR";
        }
        else {
            this.setState({ currentValue: `${answer}` })
            // this.setState.currentValue = answer;
            this.setState.queue = [];
        }

    }
    addToQueue=Value=> {
        const queue = this.state.queue
        queue.push(Value)
    }
    operatorButton=event=> {
        const value = event.currentTarget.dataset.text
        if (input !== 0 && input !== "-") {
            input = parseFloat(input);
            this.addToQueue(input);
            this.addToQueue(value);
            this.setState({ currentValue: `${input}${value}` })
            // this.setState({ currentValue: 0 })
            input=0
            
            

        }
        if (value === "-" && isNaN(this.state.queue[0]) && this.state.currentValue  !== "-") {
            input  = "-";

            this.setState({ currentValue: "-"})


        }
    }
    
    numericButton=event=> {

        const value = event.currentTarget.dataset.text
        // const { currentValue } = this.state;
        if (this.state.currentValue === "ERROR" || (this.state.currentValue === "0" && value !== "."))
         {
            this.setState({ currentValue: "" }, function () {
                console.log(this.state.currentValue);
            });                 
        }       
        
        if (!(value === ".") || !input.match(/[.]/)) {
           
            input += value;
            console.log(input);
           
            this.setState({ currentValue: `${this.state.currentValue}${value}` })
        }
        console.log(this.state.currentValue);    
    }
    clearAll = () => { this.setState({ currentValue: "0" }); this.setState({queue: [] }); input=0; }
    
    // handleClick=event=>{
    //     // const { currentValue } = this.state;

    //     const value = event.currentTarget.dataset.text
    //     return (
    //         this.setState({ currentValue: `${this.state.currentValue}${value}` })
    //     )       
    // }
   

    // handleEval=()=>{ 
    //     const { currentValue } = this.state;



    //     this.setState({ currentValue: eval(currentValue) })
    // }
    render(){
        console.log(this.state.currentValue);
        console.log(this.state.queue);
        return(
            <div className="calculator">
                <div className="top">
                    <Key text="Clear" className="clear" eClick={this.clearAll}/>
                    <div className="screen">{this.state.currentValue}</div>
                </div>  

                <div className="keys">
                    <Key text={7} eClick={this.numericButton} />
                    <Key text={8} eClick={this.numericButton}/>
                    <Key text={9} eClick={this.numericButton}/>
                    <Key text="+" className="operator" eClick={this.operatorButton}/>
                    <Key text={4} eClick={this.numericButton}/>
                    <Key text={5} eClick={this.numericButton}/>
                    <Key text={6} eClick={this.numericButton}/>
                    <Key text="-" className="operator" eClick={this.operatorButton}/>
                    <Key text={1} eClick={this.numericButton}/>
                    <Key text={2} eClick={this.numericButton}/>
                    <Key text={3} eClick={this.numericButton}/>
                    <Key text="/" className="operator" eClick={this.operatorButton}/>
                    <Key text={0} eClick={this.numericButton}/>
                    <Key text="." eClick={this.numericButton}/>
                    <Key text="=" className="eval" eClick={this.calculateQueue}/>
                    <Key text="*" className="operator" eClick={this.operatorButton}/>
                </div>               
            </div>
        )
    }
}
export default Calculator