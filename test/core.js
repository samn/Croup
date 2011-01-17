describe('ClassContainer', function() {
    it('Croup.these(...) should return a ClassContainer', function() {
        var cc = Croup.these('ClassA', 'ClassB');
        expect(cc.classNames).toBeDefined();
        expect(cc.have).toBeDefined();
    });
});

describe('Class construction', function() {
    var props = {
        methodA: function() { return 'methodA'; },
        propertyA: 'propertyA'
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
            (function() {
                Croup.these('InnerClass').have(props);
                ic = new InnerClass();
                expect(ic.methodA).toBeDefined();
            })();
            expect(InnerClass).not.toBeDefined();        
        });
    });
});
