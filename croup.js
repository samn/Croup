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
                scope[className] = function(argDict) {
                    for(var b=0, l=scope[className].constructors.length; b<l; b++) {
                       scope[className].constructors[b].call(this, argDict);
                    }
                };
                scope[className].constructors = [];
            }
            for (var key in properties) {
                if (key == 'constructor') {
                    scope[className].constructors.push(properties[key]);
                    continue;
                }
                scope[className].prototype[key] = properties[key];
            }
        }
    };
 }

 Croup.these = function() {
    return new ClassContainer(Croup.these.arguments);
 };

}).call(this)
