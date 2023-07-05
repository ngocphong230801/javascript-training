
/*const languages = new Array(
    'Javascript',
    'PHP',
    'Python',
    'HTML'
    );
    */
   
const languages = [
       'Javascript',
       'PHP',
       'Python',
       'HTML'
];

console.log(languages);
console.log(typeof languages.toString());
console.log(languages.join(', '));

// pop >> Shift
/*console.log(languages.pop());
console.log(languages.pop());
console.log(languages.pop());
console.log(languages.pop());
console.log(languages.pop());*/
console.log(languages.push('React'))
console.log(languages)
// push >> unshift
languages.splice(2,0,'Dart')
console.log(languages)


const languages2 = [
    'Ruby'
]

console.log(languages.concat(languages2));

console.log(languages.slice(5));
