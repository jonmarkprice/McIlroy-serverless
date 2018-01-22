const S = require('sanctuary');
const display    = require('./parser/display');
const { result } = require('./parser/helpers');

const output = result(1, 2, '+', ':');
const error  = result(1, 2, '+'); // leave off :

// console.log(output);

console.log("RENDERED: ");

console.log(S.either(
  S.K('Error'),
  S.compose(display, S.prop('value')),
  output
));

console.log(S.either(
  S.K('Error'), // or just S.I since Left should be a string..
  S.compose(display, S.prop('value')),
  error
));



// const display = S.I;

/*
const print = data => { 
  console.log(S.either(
    S.K('error'),
    S.compose(display, S.prop('x')),
    data
  ));
}

print(S.Right({x: 3}));
print(S.Left("Mwhahahah"));

*/


// const a = S.pluck('x', S.Right({x: 3}))
// console.log(a)
