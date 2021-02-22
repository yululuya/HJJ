/* const fs = require('fs');
const airData = {}
types = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'];
airData.types = types;
const data = [];
const year = [];
for(let i=1920;i<2200;i++){
  year.push(i)
}

for(let i=0;i<5000;i++){
    const item = [];
    item.push(i);
    item.push(year[Math.floor(Math.random()*100)]) ;
    item.push(Math.floor(Math.random()*(types.length) ));
    item.push(((Math.random()-0.5)*2*(Math.random())*(180)).toFixed(2));
    item.push(((Math.random()-0.5)*2*(Math.random())*(90)).toFixed(2));
    data.push(item);
}
airData.data = data;
fs.writeFileSync('./data.json',JSON.stringify(airData)) */
const years = [];
var year = 1950;
for (var i = 0; i < 68; i++) {
  years.push(year++)
}
//const years = [1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017]
const types = ["contryGround",""]
const fs =  require('fs');
var dataAll  = {}


/* const countryGround = require('./guojiadimian.json');//国家地面站
function getCountryGround(coutrySr){
 return countryGround.map(function(item){
      var year = Math.floor(Math.random()*68)
      return [item['code'],years[year],item['lat'],item['lng'],item['name'],item['Provincecode']]
  })
}
dataAll.countryGround =  getCountryGround(countryGround); */


/* const regionGround = require('./quyudimian.json');//区域地面站
function getRegionGround(data){
 return countryGround.map(function(item){
      var year = Math.floor(Math.random()*68)
      console.log(item);
      return [item.prostation['total'],years[year],item.prostation['provincecode'],item.prostation['provincename']]
  })
}
dataAll.regionGround =  getRegionGround(regionGround); */


/* const space = require('./tankongzhan.json');//全球高空探测资料
// console.log(dataALl)
function getSpace(data){
  return  data.map(function(item){
    var year = Math.floor(Math.random()*68);
    return [item['code'],years[year],item['lat'],item['lng'],item['name'],item['Provincecode'],item['val'],item['val2']]
  })
}

dataAll.space = getSpace(space) */


var leida = require('./leidazhan.json')
function getLeida(data){
  return data.map(function(item){
    var year = Math.floor(Math.random()*68);
    return [item['code'],years[year],item['lat'],item['lng'],item['name'],item['Provincecode'],item['val']]
  })
}
dataAll.leida = getLeida(leida);


var  GpsMet=require('./GPSMET.json')//地基GPS/MET水汽资料
function getGpsmet(data){
	 return data.map(function(item){
   var year = Math.floor(Math.random()*68);
    return [item['code'],years[year],item['lat'],item['lng'],item['name'],item['Provincecode'],item['val']]    
	 })
}
dataAll.GpsMet=getGpsmet(GpsMet)


var  fengkuoleida=require('./fengkuoleida.json')//风廓线雷达资料
function getFengLeida(data){
	 return data.map(function(item){
   var year = Math.floor(Math.random()*68);
    return [item['code'],years[year],item['lat'],item['lng'],item['name'],item['Provincecode'],item['val']]    
	 })
}
dataAll.fengkuoleida=getFengLeida(fengkuoleida);


var  GpsSpace=require('./GPStankongzhan.json')//GPS探空站
function getGpsSpace(data){
	 return data.map(function(item){
   var year = Math.floor(Math.random()*68);
    return [item['code'],years[year],item['lat'],item['lng'],item['name'],item['Provincecode'],item['val']]    
	 })
}
dataAll.GpsSpace=getGpsSpace(gpstankongzhan);

var  windgps=require('./windGPS.json')//风能观测塔
function getWindgps(data){
	 return data.map(function(item){
   var year = Math.floor(Math.random()*68);
    return [item['code'],years[year],item['lat'],item['lng'],item['name'],item['Provincecode'],item['val']]    
	 })
}
dataAll.windgps=getWindgps(windgps);

var  windgps=require('./windGPS.json')//中国区域自动站
function getWindgps(data){
	 return data.map(function(item){
   var year = Math.floor(Math.random()*68);
    return [item['code'],years[year],item['lat'],item['lng'],item['name'],item['Provincecode'],item['val']]    
	 })
}
dataAll.windgps=getWindgps(windgps);


var  baseradiation=require('./jizhunfushezhan.json')//基准辐射站
function getBaseRadiation(data){
	 return data.map(function(item){
   var year = Math.floor(Math.random()*68);
    return [item['code'],years[year],item['lat'],item['lng'],item['Provincecode']]    
	 })
}
dataAll.baseradiation=getBaseRadiation(baseradiation);


var  countryradiation=require('./guojiazhanfushezhan.json')//国家站辐射站
function getCountryRadiation(data){
	 return data.map(function(item){
   var year = Math.floor(Math.random()*68);
    return [item['code'],years[year],item['lat'],item['lng'],item['Provincecode'],item['name']]    
	 })
}
dataAll.countryradiation=getCountryRadiation(countryradiation);

var  oceansurface=require('./haimian.json')//全球海洋海面资料
function getOceanSurface(data){
	 return data.map(function(item){
   var year = Math.floor(Math.random()*68);
    return [item['code'],years[year],item['lat'],item['lng'],item['name'],item['Provincecode'],item['val']]    
	 })
}
dataAll.oceansurface=getOceanSurface(oceansurface);


var  oceantide=require('./chaowei.json')//全球海洋潮位资料
function getOceanTide(data){
	 return data.map(function(item){
   var year = Math.floor(Math.random()*68);
    return [item['code'],years[year],item['lat'],item['lng'],item['name'],item['Provincecode']]    
	 })
}
dataAll.oceantide=getOceanTide(oceantide);

var  agriculture=require('./nongye.json')//农业气象站
function getAgriculture(data){
	 return data.map(function(item){
   var year = Math.floor(Math.random()*68);
    return [item['code'],years[year],item['lat'],item['lng'],item['name'],item['Provincecode']]    
	 })
}
dataAll.agriculture=getAgriculture(agriculture);


var  aircomponent=require('./daqi.json')//大气成分观测资料
function getAirComponent(data){
	 return data.map(function(item){
   var year = Math.floor(Math.random()*68);
    return [item['code'],years[year],item['lat'],item['lng'],item['name'],item['Provincecode'],item['val']]    
	 })
}
dataAll.aircomponent=getAirComponent(aircomponent);


// var weixin = require('./weixing.json')

dataAll.weixin = [
  [3000,2012,0,40,'北斗1号'],
  [3000,2013,0,160,'北斗2号'],
  [3000,2014,0,-80,'北斗3号'],
]

console.log(dataAll)

// var allData = {
//   types : ['image:/asset/img/0.png','image:/asset/img/1.png','image:/asset/img/2.png'],
//   data : dataAll
// }
// fs.writeFileSync('data4.json',JSON.stringify(dataAll))