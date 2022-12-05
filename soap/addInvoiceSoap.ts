
// build SOAP request
interface Props{
    accesToken: string;
    companyCode: string;
    chosenCustomer: String;
}

export const addInvoicesSoap = ({accesToken, companyCode, chosenCustomer}:Props) => {
     const sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:twin="http://www.twinfield.com/">' +
    "<soapenv:Header> " +
    "<twin:Header> " +
    `<twin:AccessToken>${accesToken}</twin:AccessToken>` +
    `<twin:CompanyCode>${companyCode}</twin:CompanyCode>` +
    "</twin:Header>" +
    "</soapenv:Header>" +
    "<soapenv:Body>" +
    "<twin:ProcessXmlString>" +
    `<twin:xmlRequest><![CDATA[<salesinvoice>
        <header>
            <office>${companyCode}</office>
            <invoicetype>FACTUUR</invoicetype>
            <invoicedate></invoicedate>
            <duedate></duedate>
            <bank></bank>
            <customer>${chosenCustomer}</customer>
            <period></period>
            <currency>EUR</currency>
            <status>concept</status>
            <paymentmethod>cash</paymentmethod>
        </header>
        <lines>
            <line>
                <article>12345</article>
                <subarticle>1000</subarticle>
                <quantity>2.00</quantity>
                <units>1</units>
            </line>
        </lines>
    </salesinvoice>]]></twin:xmlRequest>` +
    "</twin:ProcessXmlString>" +
    "</soapenv:Body>" +
    "</soapenv:Envelope>";
    return sr
}

  