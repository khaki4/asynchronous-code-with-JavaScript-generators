const fetch = require('node-fetch');
const co = require('co');

function* createQuoteFetcher() {
  const response = yield fetch('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json')
  const quote = yield response.json()
  return `${quote.quoteText} —${quote.quoteAuthor}`
}

const quoteFetcher = co(createQuoteFetcher)
quoteFetcher.then(quote => console.log(quote))

// replace by Module co
// const coroutine = (gen) => {
//   const generator = gen()

//   const handle = (result) => {
//     if (result.done) return Promise.resolve(result.value)
//     return Promise.resolve(result.value)
//       .then(res => handle(generator.next(res)))
// 	}

//   return handle(generator.next())
// }
