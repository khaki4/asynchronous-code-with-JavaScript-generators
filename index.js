function* createLogger() {
    console.log('Start');
    yield;
    console.log('Second block');
    yield;
    console.log('Third block');
    yield;
    console.log('End');
}

const logger = createLogger();
logger.next();
logger.next();
logger.next();
logger.next();
