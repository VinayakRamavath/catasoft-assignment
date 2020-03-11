const axios = require('axios');


//findServer function which returns a Promise that either:
// a. Resolves with the online server that has the lowest priority number.
// b. Rejects with an error, if no Servers are online.
exports.findServer = function (collection) {

    const requests = collection.map(req => {

        return axios.get(req.url, { timeout: 5000 })
            //wrap all responses into objects and always resolve
            //so that one request fail doesn't affect the entire function.
            .then(
                (response) => ({ response }),
                (err) => ({ err })
            );
    });

    return new Promise((resolve, reject) => {

        axios.all(requests)
            .then(axios.spread((...args) => {
                //axios.all will resolve with a value of
                //[{ response: {}, err: null }, ...]

                var indexResult = 0;
                var priority;
                args.map((arg, index) => {
                    if (arg.response != null) {
                        if (arg.response.status >= 200 && arg.response.status <= 299) {
                            if (priority == undefined || collection[index].priority < priority) {
                                //assign if server is online and priority of this url is the least number yet.
                                priority = collection[index].priority;
                                indexResult = index;
                            }
                        }
                    }
                })
                if (priority != null && priority != undefined) {
                    resolve(collection[indexResult].url);
                } else {
                    reject('All servers offline');
                }
            }))
            .catch((err) => {
                //this won't be executed unless there's an error in your axios.all
                //.then block

                throw err;
            });
    });
}

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

this.findServer(inputArr)
    .then((res) => {

        console.log("Input server array is")
        console.log(inputArr)
        console.log("Online Server with lowest priority is")
        console.log(res);
    }).catch((err) => {

        console.log(err);
    })