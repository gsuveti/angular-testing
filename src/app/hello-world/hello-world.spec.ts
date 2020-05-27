import {helloWorld} from './hello-world';

xdescribe('Hello world', () => {

    let expected = '';

    beforeEach(() => {
        expected = 'Hello world!';
    });

    afterEach(() => {
        expected = '';
    });

    it('says hello', () => {
        expect(helloWorld())
            .toEqual(expected);
    });
});
