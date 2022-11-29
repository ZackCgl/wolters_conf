
// build SOAP request


export const customersSoap = ({accesToken}:any) => {
    const sr = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' +
    '<soap:Header>'+
        '<Header xmlns="http://www.twinfield.com/">' +
            `<AccessToken>${accesToken}</AccessToken>` +
            '<CompanyCode>NLA002606</CompanyCode>' +
        '</Header>' +
    '</soap:Header>' +
    '<soap:Body>' +
        '<ProcessXmlDocument xmlns="http://www.twinfield.com/">' +
            '<xmlRequest>' +
                '<columns code="100">' +
                    '<column xmlns="">' +
                        '<field>fin.trs.head.yearperiod</field>' +
                        '<operator>between</operator>' +
                        '<from>2021/01</from>' +
                        '<to>2022/01</to>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.head.code</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.head.shortname</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.head.number</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.head.status</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.head.date</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.line.dim2</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.line.dim2name</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.head.curcode</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.line.valuesigned</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.line.basevaluesigned</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.line.repvaluesigned</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        'column xmlns="">' +
                        '<field>fin.trs.line.openbasevaluesigned</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.line.invnumber</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.line.datedue</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.line.matchstatus</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.line.matchnumber</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.line.matchdate</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.line.openvaluesigned</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.line.availableforpayruns</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '<column xmlns="">' +
                        '<field>fin.trs.line.modified</field>' +
                        '<visible>true</visible>' +
                        '</column>' +
                        '</columns>' +
                        '</xmlRequest>' +
                        '</ProcessXmlDocument>' +
                        '</soap:Body>' +
                        '</soap:Envelope>';
    return sr
}

  