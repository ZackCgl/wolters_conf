
// build SOAP request


export const OfficesSoap = ({accesToken}:any) => {
    const sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:twin="http://www.twinfield.com/">' +
    "<soapenv:Header> " +
    "<twin:Header> " +
    `<twin:AccessToken>${accesToken}</twin:AccessToken>` +
    "</twin:Header>" +
    "</soapenv:Header>" +
    "<soapenv:Body>" +
    "<twin:ProcessXmlString>" +
    "<twin:xmlRequest><![CDATA[<list><type>offices</type></list>]]></twin:xmlRequest>" +
    "</twin:ProcessXmlString>" +
    "</soapenv:Body>" +
    "</soapenv:Envelope>";
    return sr
}

  