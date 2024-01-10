const fs = require("fs");
const cleanFile = (fileName) => {
    try{
        const content = fs.readFileSync(fileName, "utf8");
        const cleanedContent = content.replace(/\s+/g, " ");
        fs.writeFileSync(fileName, cleanedContent);
    }catch(err){
        console.log(err);
    }
};

cleanFile("clean.txt");