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