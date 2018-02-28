/*function test1() {
    let a = 20;
    let b = (a > 41) ? "hello" : "world";

    console.log(b);
}*/


function foo(){
    console.log ( this.bar );
}

bar = "global";

const obj1 = {
    bar: "obj1",
    foo: foo
};

const obj2 = {
    bar: "obj2"
}

foo();
obj1.foo();
foo.call ( obj2 );
new foo();