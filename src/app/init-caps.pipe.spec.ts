import {InitCapsPipe} from './init-caps.pipe';

xdescribe('InitCapsPipe', () => {
    let pipe: InitCapsPipe;

    beforeEach(() => {
        pipe = new InitCapsPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('transforms "lorem" to "Lorem"', () => {
        expect(pipe.transform('lorem')).toEqual('Lorem');
    });

    it('transforms "lorem ipsum" to "Lorem Ipsum"', () => {
        expect(pipe.transform('lorem ipsum')).toEqual('Lorem Ipsum');
    });

    it('leaves "Lorem Ipsum" unchanged', () => {
        expect(pipe.transform('Lorem Ipsum')).toEqual('Lorem Ipsum');
    });

});
