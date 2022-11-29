
// build SOAP request
interface Props{
    accesToken: string;
}

export const customersSoap = ({accesToken}:Props) => {
     const sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:twin="http://www.twinfield.com/">' +
    "<soapenv:Header> " +
    "<twin:Header> " +
    `<twin:AccessToken>${accesToken}</twin:AccessToken>` +
    `<twin:CompanyCode>NLA002606</twin:CompanyCode>` +
    "</twin:Header>" +
    "</soapenv:Header>" +
    "<soapenv:Body>" +
    "<twin:ProcessXmlString>" +
    "<twin:xmlRequest><![CDATA[<read><type>dimensions</type><office>NLA002606</office><dimtype>CRD</dimtype></read>]]></twin:xmlRequest>" +
    "</twin:ProcessXmlString>" +
    "</soapenv:Body>" +
    "</soapenv:Envelope>";
    return sr
}

  