const glob = require("glob");
//方便多页面打包时可以在不用修改入口文件配置 
function getEntry(entryDir) {
    var entry = {};
    //读取src/pages目录所有入口文件
    glob.sync(entryDir)
        .forEach(function(name) {
            if (name.indexOf('-entrance') > -1) {
                let start = name.indexOf('src/pages/') + 10,
                    end = name.lastIndexOf('.');
                let ext = name.slice(end, name.length);
                if (ext === '.js') {
                    let eArr = [];
                    let nameKey = '';
                    let nameStr = name.slice(start, end);
                    let pageEntranceFlagIndex = nameStr.lastIndexOf('-entrance');
                    if ((nameStr.length - 9) == pageEntranceFlagIndex) {
                        let nameStrArry = nameStr.split('/');
                        for (let i = 0; i < nameStrArry.length; i++) {
                            if (nameStrArry[i]) {
                                nameKey += nameStrArry[i];
                                if (i !== (nameStrArry.length - 1)) {
                                    nameKey += '-';
                                }
                            }
                            //保存各个组件的入口 
                        }
                        console.log(`key:${nameKey};filename:${name}`)
                        eArr.push(name);
                        entry[nameKey] = eArr;
                    }
                }
            }
        });
    return entry;
};

module.exports = { getEntry }