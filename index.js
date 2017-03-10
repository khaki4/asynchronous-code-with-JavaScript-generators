function* createHello() {
    const word = yield;
    console.log(word);
}

const hello = createHello();
console.log(hello.next());
console.log(hello.next('Max'));