// 1996-12-19T16:39:57-08:00
// 1990-12-31T23:59:60Z
// 1990-12-31T15:59:60-08:00
// 1937-01-01T12:00:27.87+00:20
// https://gist.github.com/marcelotmelo/b67f58a08bee6c2468f84
var RFC3339 = {
    name:"RFC3339",
    example:"1996-12-19T16:39:57-08:00",
    link:"https://tools.ietf.org/html/rfc3339#section-5.6",
    rfcDef:"full-date \"T\" full-time",
    regex:/^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])[Tt]([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(([Zz])|([\+|\-]([01][0-9]|2[0-3]):[0-5][0-9]))$/
};
var RFC822 = {
    name:"RFC822",
    example:"Thu, 13 Feb 69 23:32:54 -0330",
    obsoletedBy:"RFC2822",
    link:"https://tools.ietf.org/html/rfc822#section-5.1",
    rfcDef:"[ day \",\" ] date time",
    regex:/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat),\s(\d{2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2})\s(\d{2}):(\d{2})(:(\d{2}))?\s?([-+][0-9]{2}[0-5][0-9]|(?:UT|GMT|(?:E|C|M|P)(?:ST|DT)|[A-IK-Z]))$/
};
// EEE, dd MMM yyyy HH:mm:ss zzz
var RFC2822 = {
    name:"RFC2822",
    obsoletedBy:"RFC5322",
    example:"Thu, 13 Feb 1969 23:32:54 -0330",
    link:"https://tools.ietf.org/html/rfc2822#section-3.3",
    rfcDef:"[ day-of-week \",\" ] date FWS time [CFWS]",
    regex:/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat),\s(\d{2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{4})\s(\d{2}):(\d{2})(:(\d{2}))?\s?([-+][0-9]{2}[0-5][0-9]|(?:UT|GMT|(?:E|C|M|P)(?:ST|DT)|[A-IK-Z]))$/
};
var RFC5322 = {
    name:"RFC5322",
    example:"Fri, 21 Nov 1997 11:00:00 -0600",
    link:"https://tools.ietf.org/html/rfc5322#section-3.3",
    rfcDef:"[ day-of-week \",\" ] date time [CFWS]",
    regex:/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat),\s(\d{2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{4})\s(\d{2}):(\d{2})(:(\d{2}))?\s?([-+][0-9]{2}[0-5][0-9]|(?:UT|GMT|(?:E|C|M|P)(?:ST|DT)|[A-IK-Z]))$/
};
var rfcs = [RFC3339,RFC822,RFC2822,RFC5322];

function parseDate(datetime) {
    var matchFound = false;
    for (var i = 0; i<rfcs.length; i++) {
        var rfc = rfcs[i];
        var rfcDiv = document.getElementById(rfc.name);
        console.log(datetime);
        console.log(rfc.regex.toString());
        var result = rfc.regex.exec(datetime);
        if (result !== null) {
            // match found
            location.hash = "#" + rfc.name;
            matchFound = true;
            rfcDiv.className = "matched";

            result.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
        });
        } else {
            rfcDiv.className = "";
        }
    }
}

function checkRfcFormat(datetime) {
    var matches = new Array();
    for (var i = 0; i<rfcs.length; i++) {
        var rfc = rfcs[i];
        console.log(rfc.regex.toString());
        var result = rfc.regex.exec(datetime);
        if (result !== null) {
            matches.push(rfc.name);
        }
    }
    return matches;
}

function getAllRfcs() {
    return rfcs;
}

function getRfcByName(name) {
    for (var i = 0; i<rfcs.length; i++) {
        var rfc = rfcs[i];
        if (rfc.name === name) {
            return rfc;
        }
    }
}

function getRfcInfoSnippet(name) {
    var rfc = getRfcByName(name);
    var outputHtml = "";
    if (rfc.obsoletedBy) {
        outputHtml=outputHtml.concat("<strike>");
    }
    outputHtml=outputHtml.concat("<a style=\"font-size:1.17em;\" href=\"" + rfc.link + "\" target=_blank>" + rfc.name + "</a>");
    if (rfc.obsoletedBy) {
        var nextRfc = getRfcByName(rfc.obsoletedBy);
        outputHtml=outputHtml.concat("</strike>");
        outputHtml=outputHtml.concat(" obsoleted by: " + "<a href=\"" + nextRfc.link + "\" target=\"_blank\">" + nextRfc.name + "</a></strong>");
    }
    outputHtml=outputHtml.concat("<br/>");
    outputHtml=outputHtml.concat("<br/>");
    outputHtml=outputHtml.concat("<strong>example:</strong><br/>" + rfc.example);
    outputHtml=outputHtml.concat("<br/>");
    outputHtml=outputHtml.concat("<br/>");
    outputHtml=outputHtml.concat("<strong>rfc definition:</strong><br/>" + rfc.rfcDef);
    outputHtml=outputHtml.concat("<br/>");
    outputHtml=outputHtml.concat("<br/>");
    outputHtml=outputHtml.concat("<strong>regex:</strong><br/><code>" + rfc.regex.toString() + "</code>");
    return outputHtml;
}