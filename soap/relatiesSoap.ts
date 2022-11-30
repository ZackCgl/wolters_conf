
// build SOAP request
interface Props{
    accesToken: string;
    companyCode: string;
}

export const relatiesSoap = ({accesToken, companyCode}:Props) => {
     const sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:twin="http://www.twinfield.com/">' +
    "<soapenv:Header> " +
    "<twin:Header> " +
    `<twin:AccessToken>${accesToken}</twin:AccessToken>` +
    `<twin:CompanyCode>${companyCode}</twin:CompanyCode>` +
    "</twin:Header>" +
    "</soapenv:Header>" +
    "<soapenv:Body>" +
    "<twin:ProcessXmlString>" +
    `<twin:xmlRequest><![CDATA[<read><type>dimensions</type><office>${companyCode}</office><dimtype>DEB</dimtype></read>]]></twin:xmlRequest>` +
    "</twin:ProcessXmlString>" +
    "</soapenv:Body>" +
    "</soapenv:Envelope>";
    return sr
}

  