
// 合并原来的文件用
var cities1 = require("./cities.json");

var cities2 = require("./silkroad.json");
const fs = require("fs");

var len1 = cities1.length;
var len2 = cities2.length;
let n = 0;
var includeName = [];
let unexpectedName = [];

for (let i = 0; i < len2; i++) {
  let item = cities2[i];
  for (let j = 0; j < len1; j++) {
    if (item.name == cities1[j]["city"]) {
      //   console.log(item.name);
      includeName.push(item.name);
      item["staId"] = cities1[j]["staId"];
    }
  }
}

for(let k =0;k<len1;k++){
    if(includeName.indexOf(cities1[k].city)==-1){
        unexpectedName.push(cities1[k].city)
    }
}
console.log(unexpectedName)
fs.writeFile(__dirname+'/slikroad2.json',JSON.stringify(cities2),function(e){
 console.log(e)
})
