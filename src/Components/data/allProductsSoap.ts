// build SOAP request
interface Props {
    accesToken: string;
    companyCode: string;
  }
  
  export const allProductsSoap = ({ accesToken, companyCode }: Props) => {
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
      `<twin:xmlRequest><![CDATA[<read><type>article</type><office>${companyCode}</office></read>]]></twin:xmlRequest>` +
      "</twin:ProcessXmlString>" +
      "</soapenv:Body>" +
      "</soapenv:Envelope>";
    return sr;
  };
  