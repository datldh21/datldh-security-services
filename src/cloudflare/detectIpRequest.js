const fs = require("fs");
var ipRangeCheck = require("ip-range-check");
var axios = require("axios");

const BASE_PATH = "./";

const getIPsGoogle = () => {
    let rawdata = fs.readFileSync(BASE_PATH + "googlebotIp.json");
    let datas = JSON.parse(rawdata.toString());
    let allIPs = datas.prefixes.map((e) =>
        e.ipv6Prefix ? e.ipv6Prefix : e.ipv4Prefix
    );
    rawdata = fs.readFileSync(BASE_PATH + "goog_ip_rang.json");
    datas = JSON.parse(rawdata.toString());
    allIPs = allIPs.concat(
        datas.prefixes.map((e) => (e.ipv6Prefix ? e.ipv6Prefix : e.ipv4Prefix))
    );
    return allIPs;
};

const getDate = (isFull) => {
    let currentDate = new Date(Date.now());
    let time =
        currentDate.getFullYear() +
        "-" +
        getNumberString(currentDate.getMonth() + 1) +
        "-" +
        getNumberString(currentDate.getDate());
    if (isFull) {
        time +=
            "T" +
            getNumberString(currentDate.getHours()) +
            ":" +
            getNumberString(currentDate.getMinutes());
    }
    return time;
};

const getNumberString = (number) => {
    if (number < 10) {
        return "0" + number;
    }
    return number;
};

const replaceListIp = ({
    newIpsBlock,
    APIUrl,
    X_Auth_Email,
    X_Auth_Key,
    Cookie,
}) => {
    var config = {
        method: "put",
        url: APIUrl,
        headers: {
            "X-Auth-Email": X_Auth_Email,
            "X-Auth-Key": X_Auth_Key,
            "Content-Type": "application/json",
            Cookie: Cookie,
        },
        data: JSON.stringify(newIpsBlock),
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
};

const getAllIPCloudFlare = async ({
    newIpsBlock,
    APIUrl,
    X_Auth_Email,
    X_Auth_Key,
    Cookie,
}) => {
    let cursor = null;
    let allIPs = [];
    while (true) {
        let url = APIUrl;
        if (cursor) {
            url += "?cursor=" + cursor;
        }
        var config = {
            method: "get",
            url: url,
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Key": X_Auth_Key,
                "X-Auth-Email": X_Auth_Email,
            },
        };

        let response = await axios(config);
        let ips = response.data.result.map((data) => {
            return { ip: data.ip };
        });
        allIPs = allIPs.concat(ips);
        let newCursor = response.data.result_info.cursors?.after;
        if (newCursor) {
            cursor = newCursor;
        } else {
            break;
        }
    }
    if (newIpsBlock?.length) {
        allIPs = allIPs.concat(newIpsBlock);
        replaceListIp({
            newIpsBlock,
            APIUrl,
            X_Auth_Email,
            X_Auth_Key,
            Cookie,
        });
    }
};

const checkData = ({ rawDataFilePath, newDataFilePath }) => {
    let rawdata = fs.readFileSync(rawDataFilePath);
    let datas = JSON.parse(rawdata.toString());
    let newDatas = [];
    let keys = [];
    datas.forEach((data) => {
        let ip = data.ip.substr(data.ip.indexOf(":") + 1);
        data.ip = ip;
        let key = data.ip + "-" + data.time;
        if (!keys.includes(key)) {
            newDatas.push(data);
            keys.push(key);
        }
    });
    let mapIPData = {};
    const mapIPs = newDatas.reduce((acc, data) => {
        let arr = 0;
        let ip = data.ip.toString().trim();
        if (acc[ip]) {
            arr = acc[ip];
        }
        mapIPData[ip] = data;
        arr++;
        acc[ip] = arr;
        return acc;
    }, {});
    let ipRequestLargest = [];
    while (ipRequestLargest.length < 5) {
        let valueMax = 0;
        let ip;
        Object.keys(mapIPs).forEach((key) => {
            if (mapIPs[key] > valueMax) {
                let exit = ipRequestLargest.find((e) => e.ip == key);
                if (!exit) {
                    valueMax = mapIPs[key];
                    ip = key;
                }
            }
        });
        if (!ip) {
            break;
        } else {
            ipRequestLargest.push({
                ip: ip,
                value: valueMax,
                data: mapIPData[ip],
            });
        }
    }
    let whitelistIps = getIPsGoogle();
    ipRequestLargest = ipRequestLargest.filter(
        (item) => !ipRangeCheck(item.ip, whitelistIps) && item.value >= 100
    );
    if (ipRequestLargest?.length) {
        let date = getDate(false);
        let path = newDataFilePath + date + ".log";
        fs.writeFileSync(
            path,
            getDate(true) + "\n" + JSON.stringify(ipRequestLargest),
            {
                flag: "a",
            }
        );
        getAllIPCloudFlare(ipRequestLargest.map((data) => data.ip));
    }
};
