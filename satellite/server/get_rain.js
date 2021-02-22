// import {NationalGroundStation as gdata} from '../data/data5.json';  // 获取data
const {NationalGroundStation} = require('../data/data5.json')
// console.log(NationalGroundStation);
const data5 = NationalGroundStation;
const tem = {};
// const http = require('http');
const rq = require("request-promise");
const async = require('async');

// let data
let keys = Object.keys(data5);
const promiseAll = []
let fs =require('fs');



async function getTemp(){
    for(let i=0,len=keys.length;i<len;i++){
        let year = data5[keys[i]];
        for(let j=0,len2= year.length;j<len2;j++){
            var code = year[j][0];
           try{
            result=   await rq({
                uri:"http://10.1.64.154/cimiss-web/api?userId=usr_sjw&pwd=usr_sjw_150706&interfaceId=getSurfEleByTimeRangeAndStaID&dataCode=SURF_CHN_MUL_YER&elements=Year,PRE_Time_2020&timeRange=[19500929000000,20170929010000]&staIds=" + code + "&orderBy=Year&dataFormat=json",
                json:true
            });
            tem[code] = result['DS'];
           } catch(e){
             tem[code] = undefined;
           }
        }
    }
}

getTemp().then(function(){
    fs.writeFileSync('../data/rain.json',JSON.stringify(tem));  
})