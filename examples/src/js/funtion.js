function show() {
    const a = [
        'rubi',
        'php',
        'html',
    ]
    console.log(a);
}

show();

function write(messege) {
    console.log(messege)
}

write('test messege')
write(5+2)


function loop () {
    for (const a of arguments) {
        console.log(a)
    }
}
loop('1','2','3')


const isConfim = confirm('messege');

console.log(isConfim)
