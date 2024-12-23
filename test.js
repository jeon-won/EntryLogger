let a = new Date(new Date(Date.now()).setMonth(new Date().getMonth() - 1))
.toISOString().slice(0, 10) + " 00:00:00"
let b = new Date(a);
console.log(a);
console.log(b);