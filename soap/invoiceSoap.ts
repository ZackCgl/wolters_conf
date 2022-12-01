
// build SOAP request
interface Props{
    accesToken: string;
    companyCode: string;
    requestedInvoiceNumber: string;
}

export const invoiceSoap = ({accesToken, companyCode, requestedInvoiceNumber}:Props) => {
     const sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:twin="http://www.twinfield.com/">' +
    "<soapenv:Header> " +
    "<twin:Header> " +
    `<twin:AccessToken>${accesToken}</twin:AccessToken>` +
    `<twin:CompanyCode>${companyCode}</twin:CompanyCode>` +
    "</twin:Header>" +
    "</soapenv:Header>" +
    "<soapenv:Body>" +
    "<twin:ProcessXmlString>" +
    `<twin:xmlRequest><![CDATA[<read><type>salesinvoice</type><office>${companyCode}</office><code>FACTUUR</code><invoicenumber>${requestedInvoiceNumber}</invoicenumber></read>]]></twin:xmlRequest>` +
    "</twin:ProcessXmlString>" +
    "</soapenv:Body>" +
    "</soapenv:Envelope>";
    return sr
}

  