var findServer = require('../app').findServer;
var expect = require('chai').expect;
const nock = require('nock');


describe('Promise Testing', () => {

    const response = {};

    //setting up a mock server using 'nock' package for below urls.
    beforeEach(() => {
        nock('http://doesNotExist.boldtech.co')
            .get('/')
            .reply(500, response);

        nock('http://boldtech.co')
            .get('/')
            .reply(200, response);

        nock('http://offline.boldtech.co')
            .get('/')
            .reply(404, response);

        nock('http://google.com')
            .get('/')
            .reply(200, response);
    });

    it('should return http://google.com', function (done) {

        const inputArr = [
            {
                "url": "http://doesNotExist.boldtech.co",
                "priority": 1
            },
            {
                "url": "http://boldtech.co",
                "priority": 7
            },
            {
                "url": "http://offline.boldtech.co",
                "priority": 2
            },
            {
                "url": "http://google.com",
                "priority": 4
            }
        ];
        findServer(inputArr).then((res) => {
            expect(res).to.equal('http://google.com');
            done();
        });
    });

    it('should return http://boldtech.co', function (done) {

        const inputArr = [
            {
                "url": "http://doesNotExist.boldtech.co",
                "priority": 1
            },
            {
                "url": "http://boldtech.co",
                "priority": 7
            },
            {
                "url": "http://offline.boldtech.co",
                "priority": 2
            }
        ];
        findServer(inputArr).then((res) => {
            expect(res).to.equal('http://boldtech.co');
            done();
        });
    });
});