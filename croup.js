//  Croup
//      a library for class composition without inheritance
//

(function () {
 // Set up the Croup namespace
 var Croup = this.Croup = {};

 // A reference to the global scope of the interpreter.
 var globalScope = this;

 function ClassContainer(classNames) {
    this.classNames = classNames;

    this.have = function(properties, scope) {
        if (scope == undefined) { scope = globalScope; }
        for(var a=0, l=this.classNames.length; a<l; a++) {
            var className = this.classNames[a];
            if (scope[className] == undefined) {
                scope[className] = function() {};
            }
            for (var key in properties) {
                scope[className].prototype[key] = properties[key];
            }
        }
    };
 }

 Croup.these = function() {
    return new ClassContainer(Croup.these.arguments);
 };

}).call(this)
