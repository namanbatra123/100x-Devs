/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, n * 1000);
    });
}

wait(3).then(() => console.log('PROMISE RESOLVED AFTER N SECONDS!'));

module.exports = wait;
