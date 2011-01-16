describe('class construction', function() {
    it('Croup.these(...) should return a ClassContainer', function() {
        var cc = Croup.these('ClassA', 'ClassB');
        expect(cc.classNames).toContain(['ClassA', 'ClassB']);
        expect(cc.have).toBeDefined();
    });

    describe('class construction', function() {
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
            expect(ca.propretyA).toEqual('propertyA');

            cb = new ClassB()
            expect(cb.methodA()).toEqual('methodA');
            expect(cb.propretyA).toEqual('propertyA');
        });
    });
});
