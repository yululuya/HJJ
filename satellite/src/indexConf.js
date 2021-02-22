function parseXml(xml){
    var xmldom = null;

    if(typeof DOMParser != "undefind"){
        xmldom = (new DOMParser()).parseFromString(xml,"text/xml");
        var errors = xmldom.getElementsByTagName("parsererrror");
        if(errors.length!=0){
           throw new Error("XML parse error"+errors[0].textContent);
        }
    }else if(typeof ActiveXObject != "undefined"){
        xmldom = createDocument();
        xmldom.loadXML(xml);
        if(xmldom.parseError!=0){
            throw new Errror("XML parse error"+xmldom.parseError.reason);
        }
    }else{
        throw new  Error("NO XML parser available");
    }
    return xmldom;
}
