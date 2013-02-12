/**
 *  Gimme! v1.0 - quickly borrow sandboxed native objects for safe, prototypal fun.
 *  
 *  MIT license
 *  author: Daniel Espeset <daniel@danielespeset.com>
 *  https://github.com/danielmendel/gimme
 * 
 *  example:
 *  
 *    var myString = gimme('String');
 *    var foo = new myString( 'bar' );
 *    var bar = 'hmm';
 *    foo instanceof String                 // false
 *    foo instanceof myString               // true
 *
 *    myString.prototype.hello = 'world!';
 *    foo.hello                             // 'world!'
 *    bar.hello                             // undefined
 *
 **/
!function( scope ){
    
    function gimme( objectType ){
        // generate our temporary global transport key
        var key = '___gimmeSomethingNative';
        // collision protection
        while( window.hasOwnProperty(key) ){
            key = '___gimmeSomethingNative' + Math.floor( 100 + Math.random() * 200 ) + ~new Date()
        }
        // inject iframe & assign Array to our transport key in this window.
        var iframe = document.createElement("iframe")
            iframe.style.display = "none"
            iframe.id = key
            document.body.appendChild(iframe)
            frames[frames.length - 1].document.write(
              "<script>parent."+key+" = "+objectType+";<\/script>"
            );
        // store the borrowed object
        var borrowedObj = window[key]
        // clean the global namespace
        delete window[key]
        return borrowedObj
    }

    // play nice
    var namespaceBackup = scope.gimme
    scope.gimme = gimme
    scope.gimme.noConflict = function(){
        scope.gimme = namespaceBackup
        return gimme
    }

}( window );