describe('ClassContainer', function() {
    it('Croup.these(...) should return a ClassContainer', function() {
        var cc = Croup.these('ClassA', 'ClassB');
        expect(cc.classNames).toBeDefined();
        expect(cc.have).toBeDefined();
    });
});

describe('Class Definition', function() {
    var props = {
        methodA: function() { return 'methodA'; },
        propertyA: 'propertyA',
    };
    Croup.these('ClassA', 'ClassB').have(props);

    it('classes should be created', function() {
        expect(ClassA).toBeDefined();
        expect(ClassB).toBeDefined();
    });

    it('classes should have properties and methods defined', function() {
        ca = new ClassA()
        expect(ca.methodA()).toEqual('methodA');
        expect(ca.propertyA).toEqual('propertyA');

        cb = new ClassB()
        expect(cb.methodA()).toEqual('methodA');
        expect(cb.propertyA).toEqual('propertyA');
    });

    describe('in non-global scopes', function() {
        it('classes should be be defined in their local scope', function() {
            (function Foo() {
                Croup.these('InnerClass').have(props, Foo);
                ic = new Foo.InnerClass();
                expect(ic.methodA).toBeDefined();
            })();
            expect(window['InnerClass']).not.toBeDefined();        
        });
    });

    describe('in multiple places', function() {
        it('should include all properties', function() {
            Croup.these('ClassA', 'ClassB').have({
                method1: function() { return 'method1'; }
            });

            Croup.these('ClassA', 'ClassB').have({
                method2: function() { return 'method2'; }
            });
            expect(ClassA).toBeDefined(); 
            ca = new ClassA();
            expect(ca.method1).toBeDefined(); 
            expect(ca.method2).toBeDefined(); 
        });
    });

    describe('constructors', function() {
       beforeEach(function() {
            Croup.these('ClassA', 'ClassB').have({
                constructor: function() {
                    this.propA = 'propA';
                }
            });

            Croup.these('ClassA', 'ClassB').have({
                constructor: function() {
                    this.objectProperty = new Object();
                }
            });
        });

        it('all of them should execute', function() {
            expect(ClassA).toBeDefined(); 
            ca = new ClassA();
            expect(ca.propA).toEqual('propA');
            expect(ca.objectProperty).toBeDefined();
        });

        it('reference properties should be unique per instance', function () {
            instanceA = new ClassA();
            instanceA.objectProperty.foo = 'foo';

            instanceB = new ClassA();
            expect(instanceB.objectProperty.foo).not.toBeDefined();
        });
    });
});
