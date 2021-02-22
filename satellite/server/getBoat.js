const fs = require("fs");
const request = require("request");
var c = 100;

request('http://10.20.76.31:8008/cimiss-web/api?userId=usr_sjw&pwd=usr_sjw_150706&interfaceId=getOcenEleByTimeRange&dataCode=OCEN_GLB_SHB&elements=Station_Id_C,Lat,Lon,DateTime&timeRange=[20180401000000,20180430000000]&orderBy=DateTime:asc&dataFormat=json',function(error,response,body){
    // console.log(body)
    fs.writeFile('./boat1.json',body);

    // [{"his":[["48.5","-126.1"],["37.9","154.6"],["37.6","153.3"],["36.5","148.3"],["35.4","143"]],"name":"VRBI2","lng":35.4,"lat":143.0},
    const data = [];
    const record = {};
    console.log(typeof body)
    body = JSON.parse(body);
 
    body["DS"].forEach(function(item){

        var lat = item["Lat"];
        var lon = item["Lon"];

        if(Math.abs(+lat)>90||Math.abs(+lon)>180){
            
            console.log(lon)
            return null;
        }
        
        // {"Station_Id_C":"4601509","Lat":"49.0746","Lon":"-153.7891","DateTime":"20180519000000"}
        if(!record[item["Station_Id_C"]]){
                      
            
                record[item["Station_Id_C"]] = {
                    "his":[],
                    "name":item["Station_Id_C"],
                    "lng":parseFloat(item["Lon"]).toFixed(2),
                    "lat":parseFloat(item["Lat"]).toFixed(2)
                }
                record[item["Station_Id_C"]]["his"].push([item["Lat"],item["Lon"]])
        }else{
            var his = record[item["Station_Id_C"]]["his"];
            var pre = his[his.length-1];
            var now = [parseFloat(item["Lat"]).toFixed(2),parseFloat(item["Lon"]).toFixed(2)];
            if(removeFalseData(pre,now)){
                
                
                
                record[item["Station_Id_C"]]["his"].push([parseFloat(item["Lat"]).toFixed(2),parseFloat(item["Lon"]).toFixed(2)]);
                
                
                
                
                
                record[item["Station_Id_C"]]["lng"] = parseFloat(item['Lon']).toFixed(2);
                record[item["Station_Id_C"]]["lat"] = parseFloat(item['Lat']).toFixed(2);
            }
            
        }
    })
    console.log(Object.keys(record).length)
    for(var key in record){
        // console.log(record[key]["his"].length)
        if(record[key]["his"].length>10){
          // console.log(key)
        }
        data.push(record[key]);
    }
    console.log(data.length)
       fs.writeFile('../data/boatData.json',JSON.stringify(data));
   

})

function removeFalseData(pre,now){
    return (Math.abs(pre[0]-now[0])>0.1)||(Math.abs(pre[1]-now[1])>0.1)
}