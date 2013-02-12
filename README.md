Gimme! lets you quickly borrow sandboxed native objects for safe, prototypal fun.
Released under the MIT license

example:

    var myString = gimme('String');
    var foo = new myString( 'bar' );
    var bar = 'hmm';
    foo instanceof String                   // false
    foo instanceof myString                 // true

    myString.prototype.hello = 'world!';
    foo.hello                               // 'world!'
    bar.hello                               // undefined

also plays well with others:
    
    var locallyScopedGimme = window.gimme.noConflict();