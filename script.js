// define n1* n2 = r, (5*4)=20, 5+5+5+5 = 20

function multiply(n1, n2){
    let result = 0;
    for(let i =0; i<n2; i++){
        result += n1;
    }
    return result;
}

//define 5*4=20

let finalResult = multiply(5,4);
console.log(finalResult);

//define n1/n2= r, (20/4)=5, 20-4-4-4-4-4

function divide(n1, n2){
    let result = 1;
    while((n1-n2) > 0){
        result++;
        n1-=n2;
    }
    return result;
}

//Define 20/4=5

finalResult = divide(20,4);
console.log(finalResult);

// define (5*4) /10 = 2, el orden de las funciones es inverso al orden de la expresion

finalResult = divide(multiply(5,4), 10);
console.log(finalResult);

//define ((5*4) /10 ) * 6=12

finalResult = multiply(divide(multiply(5,4), 10), 6);
console.log(finalResult);

// E5 callbacks => funcion asincrona que tiene 
//2 eventos (error, exito)

function multiplyCallBack(success, error){//[0],[1]
    try{
        let n1 = arguments[2];
        let n2 = arguments[3];

        if(n1 == null || n2 == null){
            throw("Missing arguments: expected 2 numbers.");
        }
        let result = multiply(n1, n2);
        success(result);
    }catch(e){
        error(e);
    }
    
}

function okCallBack(result){
    console.log(result);
}

function errorCallBack(error){
    console.log(error);
}

//Define 5*4=20
console.log("************CallBacks*************\n");
multiplyCallBack(okCallBack, errorCallBack, 5, 4);
multiplyCallBack(okCallBack, errorCallBack, 5);

//define (5*4) *4 = 80

let r =multiplyCallBack((result) => {
    multiplyCallBack(okCallBack, errorCallBack, result, 4)
}, errorCallBack, 5, 4);


//define n1/n2= r, (20/4)=5, 20-4-4-4-4-4
function divideCallBack(success, error){//[0],[1]
    try{
        let n1 = arguments[2];
        let n2 = arguments[3];

        if(n1 == null || n2 == null){
            throw("Missing arguments: expected 2 numbers.");
        }
        let result = divide(n1, n2);
        success(result);
    }catch(e){
        error(e);
    }
}

divideCallBack(okCallBack, errorCallBack, 20, 4);

//define (5*4) /10 = 2

multiplyCallBack((result)=>{
    divideCallBack(okCallBack, errorCallBack, result, 10);
}, errorCallBack, 5, 4);

//define ((5*4) /10) *5 =10

multiplyCallBack((result)=>{
    divideCallBack((result)=>{
        multiplyCallBack(okCallBack, errorCallBack, result, 5);
    }, errorCallBack, result, 10)
}, errorCallBack, 5, 4);

// ES6 Promise => new Promise;

function multiplyPromise(result){
    return new Promise((resolve, reject)=>{
        if(result.n1 == null || result.n2 == null){
            throw("Missing arguments: expected 2 numbers.");
        }else{
            let r = new Object();
            r.res = multiply(result.n1, result.n2);
            resolve(r);
        }
    });
}

// define 5*4=20
let numbers = new Object();

numbers.n1 = 5;
numbers.n2 = 4;

multiplyPromise(numbers)
    .then(okCallBack)
    .catch(errorCallBack);

function dividePromise(result){
    return new Promise((resolve, reject)=>{
        if(result.n1 == null || result.n2 == null){
            throw("Missing arguments: expected 2 numbers.");
        }else if(result.n2 != 0){
            let r = new Object();
            r.res = divide(result.n1, result.n2);
            resolve(r);
        }else{
            throw("Divide over zero its not possible");
        }
    });
}

//define n1/n2= r, (20/4)=5, 20-4-4-4-4-4

numbers.n1 = 20;
numbers.n2 = 4;

dividePromise(numbers)
    .then(okCallBack)
    .catch(errorCallBack);

//define ((5*4) /10) *5 =10

numbers.n1 = 5;
numbers.n2 = 4;

multiplyPromise(numbers)
    .then((data)=>{
        /*params = new Object();
        params.n1 = data.n1;
        params.n2 = 10;*/
        data.n1 = data.res;
        data.n2 = 10;
        return dividePromise(data);
    })
    .then((data)=>{
        //params.n2 = 5;
        data.n1 = data.res;
        data.n2 = 5;
        return multiplyPromise(data);
    })
    .then(okCallBack)
    .catch(errorCallBack);

//Async -await
//define ((5*4) /10) *5 =10

async function operations(){
    try{
        let num = new Object();
        num.n1 = 5;
        num.n2 = 4;
        
        let val1 = await multiplyPromise(num);
        num.n1 = val1.res;
        num.n2 = 10;
        
        let val2 = await dividePromise(num);
        num.n1 = val2.res;
        num.n2 = 5;

        let val3 = await multiplyPromise(num);
        okCallBack(val3.res);
    }catch(e){
        errorCallBack(e);
    }
}

operations();