const fs = require('fs');

const fileReadCallback = async(filename) => {

    try {
        const data = fs.readFileSync(filename, 'utf8');
        let a = 0;
        for(let i = 0; i < 10000000000; i++) {
            a += 1;
        }
        console.log(data);
    }catch (err) {
        console.error(err);
    }
}

fileReadCallback('./data.txt');