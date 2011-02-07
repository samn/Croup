#Croup
*Class composition by Grouping in JavaScript*

##Motivation
Sharing code between classes is good but doing it with inheritance can introduce
unwanted semantic side effects.  Inheritance models an `is-a` relationship which
is sometimes appropriate but problems can occur when classes are refactored,
changing the taxonomy.  


Croup aims to provide the code reuse benefits of inheritance without the
semantic implications.  Rather than defining a relationship between code through
ancestry, code that is shared among classes is grouped together in a flat
taxonomy.  Classes that have common code are 'Crouped' together.

For Example:

    Croup.these('ClassA', 'ClassB').have({
        aMethod: function(arg1, arg2) {
            // do something
        }
    });

    a = new ClassA();
    typeof a.aMethod // method

    b = new ClassB();
    typeof b.aMethod // method

##Multiple Definitions
Croup automatically defines ClassA and ClassB, which both have a method called
aMethod. Classes can also be defined in multiple places and are constructed as a
composition of their definitions.  This allows code to be shared between
multiple classes without an additional semantic relation.


    // Methods common to ClassA & ClassB
    Croup.these('ClassA', 'ClassB').have({
        methodA: function() {
            // ...
        },
        methodB: function() {
            // ...
        }
    });

    // Methods common to ClassA & ClassC
    Croup.these('ClassA', 'ClassC').have({
        methodC: function() {
            // ...
        }
    });

    ca = new ClassA();
    typeof ca.methodA // method
    typeof ca.methodB // method
    typeof ca.methodC // method

    cb = new ClassB();
    typeof cb.methodA // method
    typeof cb.methodB // method
    typeof cb.methodC // undefined

    cc = new ClassC();
    typeof cc.methodA // undefined
    typeof cc.methodB // undefined
    typeof cc.methodC // method

If you want to override the definition of a method you can redefine it like you
normally would:

    ClassA.prototype.methodA = function() { ... };


##Constructors
Constructors can be defined as well.  If multiple constructors are included in a
class's definitions they will all execute.  Arguments can be passed to a
constructor using a dictionary.

    
    Croup.these('ClassA', 'ClassB').have({
        constructor: function(args) {
            this.property = args['message1'];
            alert(this.property);
        }
    });

    Croup.these('ClassA', 'ClassC').have({
        constructor: function(args) {
            alert(args['message2']);
        }
    });

    ca = new ClassA({message1: 'Hello', message2: 'World!'});
    // alerts 'Hello' then 'World!'

##Namespaces
By Default Croup injects classes into the global namespace, but if you'd like to
define a class in a different scope you can pass a reference to that scope to
the `have` method:

    function Foo() {
        Croup.these('Bar').have({
            method1: function() {
                // ...
            }
        }, Foo);
        bar = new Foo.Bar();
        bar.method1();
    }
    
    typeof Bar // undefined

##Drawbacks
* No polymorphism since there is no relationship between classes
    * though JavaScript doesn't dispatch on argument types
* The name is really dumb `(CROUP -> Class gROUP ??)`

##Feedback
This is an experiment, not sure if it's useful or not, but I'd love to hear any feedback:
samneubardt+croup@gmail.com
[@gnubardt](http://twitter.com/gnubardt)

**LICENSE**
Croup is Copyright (c) 2011 Sam Neubardt and distributed under the MIT license.
See the `LICENSE` file for more info.
