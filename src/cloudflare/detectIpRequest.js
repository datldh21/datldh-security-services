const fs = require("fs");
var ipRangeCheck = require("ip-range-check");
var axios = require("axios");

const myArgs = process.argv.slice(2);
const site = myArgs[myArgs.length - 1];
const BASE_PATH = "/home/code/tests/detect_ip_request/";

// const BASE_PATH = "";

const getAllIPCloudFlare = async (newIpsBlock) => {
    let cursor = null;
    let allIPs = [];
    while (true) {
        let url =
            "https://api.cloudflare.com/client/v4/accounts/6082f5baa9e6b2d2784464cef3e40a0d/rules/lists/5d3692bef853438aad8c2b7b4b8f6953/items";
        if (cursor) {
            url += "?cursor=" + cursor;
        }
        var config = {
            method: "get",
            url: url,
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Key": "404630dfe9b94c8ec56715bea2c11a01e21cd",
                "X-Auth-Email": "lampt2509@gmail.com",
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
        replaceListIp(newIpsBlock);
    }
};

const replaceListIp = (newIpsBlock) => {
    var config = {
        method: "put",
        url: "https://api.cloudflare.com/client/v4/accounts/6082f5baa9e6b2d2784464cef3e40a0d/rules/lists/5d3692bef853438aad8c2b7b4b8f6953/items",
        headers: {
            "X-Auth-Email": "lampt2509@gmail.com",
            "X-Auth-Key": "404630dfe9b94c8ec56715bea2c11a01e21cd",
            "Content-Type": "application/json",
            Cookie: "__cflb=0H28vgHxwvgAQtjUGU4vq74ZFe3sNVUZQCToZfyUmMP; __cfruid=bc32de7f0870ba1238d8d08cfd8eb98007e0f262-1651678327",
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

const checkData = () => {
    let rawdata = fs.readFileSync(BASE_PATH + site + "/" + site + ".json");
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
    let whitelistIps = getIPIsGoogle();
    ipRequestLargest = ipRequestLargest.filter(
        (item) => !ipRangeCheck(item.ip, whitelistIps) && item.value >= 100
    );
    if (ipRequestLargest?.length) {
        let date = getDate(false);
        let path = BASE_PATH + site + "/" + date + ".log";
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

const getIPIsGoogle = () => {
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

checkData();
