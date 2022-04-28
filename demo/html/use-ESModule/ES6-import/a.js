// a.js
console.log('a')

import b from './b.js'
import c from './c.js'

// var flag = true
// if (flag) {
//   import('./c.js')
//   .then(c => {
//     c.default.say()
//   });
// }

console.log('a call')

export default {
    speak: b.speak,
    say: c.say
}