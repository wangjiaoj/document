  // Dependencies  
  const fs = require('fs');
  const url = require('url');
  const http = require('http');
  const exec = require('child_process').exec;
  const path = require('path');
  //var util = require('util');
  (async() => {
      var host;
      var pages = [];
      var DOWNLOAD_DIR = './libs/';
      var packageJsonName = '../package.json';
      var DOWNLOAD_DIR_JSON = '../libs/component.file.json'
      var webpackConfig;
      var importList;
      //璇诲彇package.json 鑾峰彇缁勪欢搴撲緷璧杋mportList鍜岀粍浠跺簱缁勪欢缁撴瀯鏂囦欢componentFile(component.file.json)
      var packageJson = fs.readFileSync(path.join(__dirname, packageJsonName), 'utf8');
      if (packageJson) {
          webpackConfig = JSON.parse(packageJson);
          if (webpackConfig.componentFile && webpackConfig.host && webpackConfig.host) {
              importList = webpackConfig.importList;
              host = webpackConfig.host;
              mkDirSync(DOWNLOAD_DIR);
              download_file_httpget(host + webpackConfig.componentFile, null, (rawData) => {
                  //  console.log(importList.length);
                  if (importList.length > 0) {
                      downLibsAndBuild(rawData);
                  }
              });
          } else {
              var err = "package.json didn't exist componentFile or importList or host";
              console.log(err);
              throw new Error(err);
          }
      }


      //   function getName(url) {
      //       url = url.split('/');
      //       url = url[url.length - 1];
      //       if (url.indexOf("?") > -1) {
      //           url = url.split('?');
      //           url = url[0];
      //       }
      //       return url;
      //   }

      function rmDirSync(DIR) {
          if (fs.existsSync(DIR)) {
              fs.readdirSync(DIR).forEach((file) => {
                  var curPath = DIR + "/" + file;
                  if (fs.statSync(curPath).isDirectory()) {
                      rmDirSync(curPath);
                  } else {
                      fs.unlinkSync(curPath);
                  }
              })
              fs.rmdirSync(DIR);
          }
      }

      /**
       * Function to make Dir  
       *  */
      function mkDirSync(path) {
          if (fs.existsSync(path)) {
              // console.log(`the dir of ${path} exists already`);
              return false;
          } else {
              let status = fs.mkdirSync(path);
              // console.log(`mk dir:${path} status:${status}`)
              return true;
          }
      }

      /**
       * Function to download file using HTTP.get  
       * param:dir瀛樺湪鏃朵娇鐢╠ir浣滀负鐩綍,鍚﹀垯浣跨敤 DOWNLOAD_DIR浣滀负鐩綍
       *  */
      async function download_file_httpget(file_url, dir, callback) {
          var file_name = url.parse(file_url).pathname.split('/').pop();
          var dirFile = dir ? dir + file_name : DOWNLOAD_DIR + file_name;
          //濡傛灉../libs宸茬粡瀛樺湪璇ユ枃浠跺氨涓嶅啀閲嶆柊浠庣嚎涓婃媺鍙�
          if (fs.existsSync(dirFile)) {
              console.log(`${file_url} exist in libs already`);
              if (callback) {
                  callback();
              }
          } else {
              console.log(`start download--${dirFile}`);
              //涓嬭浇鏂囦欢
              var file = fs.createWriteStream(dirFile);
              var rawData = '';
              const response = await httpGetFile(file_url);
              if (response.statusCode !== 200) {
                  var err = new Error(`${file_url} -- status:${response.statusCode} didn't exist`);
                  console.error(err.message);
                  response.resume();
                  throw err;
              }
              response.setEncoding('utf8');
              response.on('data', function(data) {
                  rawData += data;
                  file.write(data);
              }).on('end', function() {
                  file.end();
                  if (callback) {
                      callback(JSON.parse(rawData));
                  }
              }).on('error', (e) => {
                  console.error(`error:${e.message}`);
              });;
          }
      };

      function httpGetFile(url) {
          return new Promise((resolve, reject) => {
              http.get(url, (res) => {
                  resolve(res);
              });
          });
      }

      /**
       * 璇诲彇component.file.json涓殑缁勪欢鏂囦欢缁撴瀯锛屽苟灏唒ackage.json涓緷璧栫殑缁勪欢涓嬭浇鍒發ibs涓�
       * param:dir瀛樺湪鏃朵娇鐢╠ir浣滀负鐩綍,鍚﹀垯浣跨敤 DOWNLOAD_DIR浣滀负鐩綍
       *  */
      function downLibsAndBuild(rawData) {
          var componentStruct;
          if (rawData) {
              componentStruct = rawData;
          } else {
              var componentJson = fs.readFileSync(path.join(__dirname, DOWNLOAD_DIR_JSON), 'utf8');
              componentStruct = JSON.parse(componentJson);
          }
          if (componentStruct) {
              for (var key in componentStruct.component) {
                  var item = componentStruct.component[key];
                  for (var i = 0; i < importList.length; i++) {
                      if (importList[i].name == key) {
                          let versionFlag = false;
                          for (var j = 0; j < item.length; j++) {
                              if (importList[i].version == item[j].version) {
                                  versionFlag = true;
                                  pages.push({ name: key, list: item[j] });
                                  break;
                              }
                          }
                          if (versionFlag) {
                              console.log(`find ${key} of version:${importList[i].version}`);
                          } else {
                              let err = new Error(`error!!! can't find  ${key} of version ${importList[i].version}`);
                              console.error(err.message);
                          }
                      }
                  }
              };
          }

          if (pages.length) {
              //鎸夌収渚濊禆鐨勭粍浠跺拰鍦╨ibs涓垱寤虹洰褰�/name/version
              pages.map((item, key) => {
                  let dir = DOWNLOAD_DIR + item.name;
                  mkDirSync(dir);
                  dir = dir + "/" + item.list.version;
                  mkDirSync(dir);
                  analysisFile(item.list.file, dir);
              });
              console.log('import sucess!');
          }
      }
      //鎸夌収item[j].file涓殑缁勪欢缁撴瀯鍦╨ibs/name/version涓媺鍙栧搴旂粍浠剁殑鏂囦欢鍒版湰鍦�
      function analysisFile(files, dir) {
          if (files && typeof files === "object") {
              if (Array.isArray(files)) {
                  for (var i = 0; i < files.length; i++) {
                      let pageUrl = files[i];
                      if (typeof pageUrl === "string") {
                          pageUrl = host + pageUrl;
                          download_file_httpget(pageUrl, dir + "/");
                      } else if (typeof pageUrl === "object") {
                          analysisFile(pageUrl, dir);
                      }
                  }
              } else {
                  //瀵硅薄
                  for (var floder in files) {
                      //鍒涘缓鏂囦欢澶�
                      let tempdir = dir + "/" + floder;
                      mkDirSync(tempdir);
                      analysisFile(files[floder], tempdir);
                  }
              }
          }
      }
  })();