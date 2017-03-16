# asynchronous-code-with-JavaScript-generators
Write simple asynchronous code with JavaScript generators
# asynchronous-code-with-JavaScript-generators
Write simple asynchronous code with JavaScript generators

# Description
Generators are functions which can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances.

Calling a generator function does not execute its body immediately; an iterator object for the function is returned instead. When the iterator's next() method is called, the generator function's body is executed until the first yield expression, which specifies the value to be returned from the iterator or, with yield*, delegates to another generator function. The next() method returns an object with a value property containing the yielded value and a done property which indicates whether the generator has yielded its last value as a boolean. Calling the next() method with an argument will resume the generator function execution, replacing the yield statement where execution was paused with the argument from next(). 

---

Generator 는 빠져나갔다가 나중에 다시 돌아올 수 있는 함수입니다. 이때 컨텍스트(변수 값)는 나가고 다시 들어오는 중에도 그대로 저장되어 있게 됩니다.

Generator function 은 호출하더라도 함수가 즉시 실행되지 않습니다. 대신 함수를 위한 iterator object 가 리턴됩니다. iterator의 next() 메서드가 호출되면, generator 함수가 실행되고 첫 번째 yield expression 을 만날 때까지 진행됩니다. 그리고 해당 yield expression 이 가리키는 값이 iterator 로부터 리턴됩니다. 만약 실행 도중 yield* expression 을 만나면 다른 generator 함수로 진행이 넘어가게 됩니다. 이후 next() 메서드가 호출되면 진행이 멈췄던 부분에서부터 다시 실행됩니다. next() 메서드는 객체를 리턴하는데, 이 객체에는 yield expression 이 가리키던 값(yielded value)을 나타내는 value 속성과, generator 함수 안의 모든 yield expression이 실행되었는지를 나타내는 boolean 타입의 done 속성이 포함됩니다.next() 메서드를 인자 값과 함께 호출 하게 되면  진행이 멈췄던 부분의 yield 문을  next() 메서드에서 받은 인자값 으로 치환 하고 그 부분 부터 다시 실행 하게 됩니다.

# [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*] function*
---

## Basic Usage
```javascript
function* createLogger() {
    console.log('Start');
    yield;
    console.log('Second block');
    yield;
    console.log('Third block');
    yield;
    console.log('End');
}

// make a instance of generator
const logger = createLogger();
logger.next(); // Start
logger.next(); // Second block
logger.next(); // Third block
logger.next(); // End
```
---

## Send Message by argument of nex();
- the first call of next executes from the start of the function until the first yield statement
```javascript 
function* createHello() {
    const word = yield;
    console.log(word);
}

const hello = createHello();
console.log(hello.next());
console.log(hello.next('Max'));

// { value: undefined, done: false }
// Max
// { value: undefined, done: true }
```
---

# what is yield
```javascript 

function* createHello() {
    yield;           // 1>
    console.log(2);  // 2>
    yield;           // 3>
    console.log(3);  // 4>
}

const hello = createHello();
console.log(hello.next());          // A>
console.log(hello.next());          // B>
console.log(hello.next('Max'));     // C>
```

A> -> 1> then { value: undefined, done: false }
B> -> 2> 3> then 2 { value: undefined, done: false }
C> -> 4> then 3 { value: undefined, done: true }

```javascript
function* createHello() {   
    yield;                  // 1>
    console.log(2);         // 2>
    console.log(yield);     // 3>
}

const hello = createHello();    
console.log(hello.next());      // A>
console.log(hello.next());      // B>
console.log(hello.next('Max')); // C>
```
A> -> 1> then { value: undefined, done: false }
B> -> 2> before the meet 3>'s yield then 2 { value: undefined, done: false }
C> -> 3>'s yield then 'Max' { value: undefined, done: true }

next() 메서드를 인자 값과 함께 호출 하게 되면 진행이 멈췄던 부분의 yield 문을  next() 메서드에서 받은 인자값 으로 치환 하고 그 부분 부터 다시 실행 하게 됩니다. 따라서 C>의 'Max' 는 3>의 yield의 값으로 치환되고 console.log('Max'); 로 실행됩니다.

---

# Iterate
```javascript
function* createCounter() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

const counter = createCounter();
// The for-of loop pauses and resumes the generator automatically, and passes us back the values that the generator yields.
for (let i of counter) {
    console.log(i)
}
```

# Delegate by yield* expression

```javascript
function* create3To4Counter() {
    yield 3;
    return 4;
}

function* createCounter() {
    yield 1;
    yield 2;
    const four = yield* create3To4Counter();    //A>
    console.log(four);
    yield 5;
}

for (let i of createCounter()) {
    console.log(i);
    // 1
    // 2
    // 3
    // 4
    // 5
}
```

실행 도중 yield* expression 을 만나면 다른 generator 함수로 진행이 넘어가게 됩니다. 이후 next() 메서드가 호출되면 진행이 멈췄던 부분에서부터 다시 실행됩니다.
따라서 A> 에서 만나는 yield* create3To4Counter();에 의해 create3To4Counter로 이동합니다.





