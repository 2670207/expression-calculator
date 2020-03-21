function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expression) {
   
     expression = expression.replace(/\s+/g, '')

    let countBrackets = (expression.match(/\(/g) || []).length;
    if((expression.match(/\(/g) || []).length != (expression.match(/\)/g) || []).length){
         throw 'ExpressionError: Brackets must be paired';
    } 

    for(let i = 1; i <= countBrackets; i++){
        let subExpresstion = 
            expression.substring(expression.lastIndexOf('(') , expression.indexOf(')',expression.lastIndexOf('('))+1);
        let calculation =
            (new Calculation(
                expression.substring(expression.lastIndexOf('(')+1 , expression.indexOf(')',expression.lastIndexOf('(')))  ).run().result())
    
       expression = expression.replace(subExpresstion,calculation);
    }


    return (new Calculation(expression)).run().result();
   
}

class Calculation{
   
    constructor(expression){
        this.expression = this.trim(expression);
    }
    run(){
        let result = this.multiplicationDivision().test().result();

        return this;
    }
  
    result() {
        return Number.parseFloat(this.expression);
    }
    trim(expression){
        return expression.replace(/\s+/g, '')
    }
    multiplicationDivision(){ 
        for(let index = 0; index < this.expression.length; index++ ){
            if(['/','*'].includes(this.expression[index])){
                this.expression = this.expression.replace(
                        /((?:(?<=[-+/*^]|^)[-])?(?:[\d.]+))([*|/])(-?[\d.]+)/,
                            (match, p1,operator,p3) => {

                                if(operator == '/' && p3 == 0){
                                    throw 'TypeError: Division by zero.';
                                }
                                switch(operator){
                                    case '/': return Number.parseFloat(p1 / p3).toFixed(20); ;
                                    case '*': return p1 * p3
                                }
                            } 
                    )

                index = 0;
                
            }
        }
        return this;
    }
    test(){ 
        for(let index = 0; index < this.expression.length; index++ ){

            if(['+','-'].includes(this.expression[index])){
                this.expression = this.expression.replace(
                        /((?:(?<=[-+/*^]|^)[-])?(?:[\d.]+))([+|-])(-?[\d.]+)/,
                            (match, p1,operator,p3) => {
                                switch(operator){
                                    case '+': return Number.parseFloat(p1) + Number.parseFloat(p3);
                                    case '-': return Number.parseFloat(p1) - Number.parseFloat(p3)
                                } 
                            } 
                    )

                index = 0;
                
            }
        }
        return this;
    }
  
}




module.exports = {
    expressionCalculator
   
}
