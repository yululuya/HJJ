//获取丝绸之路的城市列表和 对应城市的平均气温 降水数据 并 写到 data/silkroad 下的文件中

const fs = require('fs');
const request = require('request');
const urlCities = `http://meteor.ckcest.cn/weatherGis/web/rd/getMapData`;
const urlCities = 'http://10.20.76.32:8008/cimiss-web/api?userId=usr_sjw&pwd=usr_sjw_150706&interfaceId=getSurfEleByTime&dataCode=SURF_CHN_MUL_HOR&elements=Station_Name,Station_Id_C,TEM,TEM_Max,TEM_Min,PRE_1h,PRE_3h&times=20180815000000&dataFormat=html'
const urlYears  = `http://meteor.ckcest.cn/weatherGis/web/rd/getMonthAvgData?stationID=`;
const basePath = '../data/silkroad/';
const log4js = require('log4js');
log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: __dirname + "/log/cities.log"
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'error'
        }
    }
})

var logger = log4js.getLogger('cheegetDataUrlse');


//request promise
function rqp(url){
    return new Promise(function(resolve,reject){
        request.get(url,{timeout:30000},function(err,response){
            if(err!=null){
                logger.error(url,'error')
                return reject(err);
            }
            logger.info(url,"get");
            return resolve(JSON.parse(response.body));
        })
    })
}

// fileWrite  Promise
function fsp(data,path){
    return new Promise(function(resolve,reject){
        if(typeof data == 'object'){
            data = JSON.stringify(data);
        }
        fs.writeFile(path,data,function(err){
            if(err!=null){
                logger.error(path,'error')
                return reject(err)
            }
            logger.info(path,'writed')
            return resolve("writeComplete")
        })
    })
}


//
async function getDate(){
    try{
        
    const city = await rqp(urlCities);
    const citiesPath = basePath+"cities.json";
    await fsp(city,citiesPath);
    for(let i = 0, len = city.length;i<len; i++){
        let cityurl = urlYears+city[i]["staId"];
        const percity = await rqp(cityurl);
        await fsp(percity,basePath+city[i]["staId"]+".json")
    }
    }catch(e){
        logger.error(e)
    }
}
getDate();



const urlCitie2 = 'http://10.20.76.32:8008/cimiss-web/api?userId=usr_sjw&pwd=usr_sjw_150706&interfaceId=getSurfEleByTime&dataCode=SURF_CHN_MUL_HOR&elements=Station_Name,Station_Id_C,TEM,TEM_Max,TEM_Min,PRE_1h,PRE_3h&times=20180815000000&dataFormat=html'