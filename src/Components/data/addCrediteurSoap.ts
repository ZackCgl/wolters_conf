// build SOAP request
interface Props {
  accesToken: string;
  companyCode: string;
  naam: String;
}

export const addCrediteurSoap = ({ accesToken, companyCode, naam }: Props) => {
  const sr =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:twin="http://www.twinfield.com/">' +
    "<soapenv:Header> " +
    "<twin:Header> " +
    `<twin:AccessToken>${accesToken}</twin:AccessToken>` +
    `<twin:CompanyCode>${companyCode}</twin:CompanyCode>` +
    "</twin:Header>" +
    "</soapenv:Header>" +
    "<soapenv:Body>" +
    "<twin:ProcessXmlString>" +
    `<twin:xmlRequest><![CDATA[<dimension><office>${companyCode}</office><type>CRD</type><name>${naam}</name></dimension>]]></twin:xmlRequest>` +
    "</twin:ProcessXmlString>" +
    "</soapenv:Body>" +
    "</soapenv:Envelope>";
  return sr;
};
