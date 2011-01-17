//  Croup
//      a library for class composition without inheritance
//

(function () {
 // Set up the Croup namespace
 var Croup = this.Croup = {};
 var scope = this;

 function ClassContainer(classNames) {
    this.classNames = classNames;
    this.have = function(properties) {
        for(var a=0, l=this.classNames.length; a<l; a++) {
            var className = this.classNames[a];
            if (window[className] == undefined) {
                window[className] = function() {};
            }
            for (var key in properties) {
                window[className].prototype[key] = properties[key];
            }
        }
    };
 }

 Croup.these = function() {
    return new ClassContainer(Croup.these.arguments);
 };

}).call(this)
