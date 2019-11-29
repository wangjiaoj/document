  var color = {
      axisLine: '#ccc',
      abAxis: '#de422e',
      beAxis: '#3e9663',
      eqAxis: '#444',
      ma5: '#1F6195',
      ma10: '#E0AC58',
      ma30: '#9C73AF',
      // 悬停十字线
      hoverLine: '#A0A0A0'
  };
  var tooltipStyle = {
      position: 'absolute',
      zIndex: 99999,
      backgroundColor: "rgba(255,255,255,0.9) ",
      borderRadius: "5px ",
      borderColor: "#e6e6e6 ",
      borderStyle: "solid ",
      borderWidth: "0px ",
      padding: "3px ",
      color: "#1E2024 ",
      fontSize: "12px "
  };


  // kline数据配置
  var klinedata = {
      type: 'klineCommon',
      code: '',
      dType: '',
      ma: [5, 10, 30]
  };
  var fsToday = {
      type: 'fsToday',
      code: '',
      isKeepingGet: true,
      // 间隔多久更新一次(推荐大于60秒,因为现在服务端缓存是1分钟)
      intervalTime: 60000
  };
  var klinePrice_tooltip = D3Charts.hqHelper.klinePrice_tooltip;
  var filterNum = D3Charts.hqHelper.filterNum;
  var dataPool = D3Charts.getDataPool();
  /**
   * 代码类型-目前分为外汇(97_|1)、期货、股票(hs_|2)三大类.
   * 期货分为股指期货(gzqh_|3)和商品期货(qh_|4) 
   * 股指期货：IC1912、IF1912( 测试结果129_拼接)                             
   * 商品期货：大豆   a2001、    a2005    苹果  AP1912、AP2005( 测试结果qh_拼接)
   * (国外期货和国内期货，国内的用qh_ 链接  国外期货可以用gqh_ ) 
   * 绘制图的区别：
   *    1) 外汇k线的macd等类型较少,期货类型比较多
   *    2) 期货的分时图包括：现价、成交价、成交量
   *    3) 外汇分时图仅包括现价
   * */
  function ChartHq(ops) {
      this.id = ops.id;
      this.code = ops.code;

      if (!this.codeType && this.code) {
          this.codeType = this.code.indexOf("97_") == 0 ? 1 : this.code.indexOf("hs_") == 0 ? 2 : (this.code.indexOf("129_") == 0 || this.code.indexOf("gzqh_") == 0) ? 3 : 4;
      }

      this.width = ops.width || '600px';
      this.height = ops.height || '600px';
      this.init();
  }

  ChartHq.prototype.init = function() {
      let id = this.id;
      let wrapper = document.getElementById(id);
      this.wrapper = wrapper;
      this.restDom();
      wrapper.style.width = this.width;
      wrapper.style.height = this.height;
      let chartContainer = wrapper.getElementsByClassName('chart-hq-chart')[0];
      chartContainer.style.width = this.width;
      chartContainer.style.height = this.height;
      this.chart = D3Charts.init(chartContainer);
      this.tabDom = wrapper.getElementsByClassName('hq-type-time')[0];
      this.fqDom = wrapper.getElementsByClassName('hq-type-fq')[0];
      this.addIndicator();
      this.handleTabEvent();
      this.setChart();
  }

  ChartHq.prototype.restDom = function() {
      let fqHtml = this.codeType === 2 ? '<div class="hq-type-fq"><span>不复权</span><div class="hq-type-fq-list"><ul> <li data-hq-type="qfq">前复权</li> <li data-hq-type="hfq">后复权</li>   <li data-hq-type="bfq">不复权</li> </ul></div> </div>  ' : '';
      let mr = this.codeType === 2 ? 'mr-60' : '';
      var dom = ` <div class="chart-real-head">
            <div class="base-info">
                <div class="base-info-name">
                    <span class="fs-14"></span>
                    <span></span>
                </div>
                <div class="base-info-rate">
                    <span class="fs-22"></span>
                    <div class="up-down-rate">
                        <span class=""></span>
                    </div>
                </div>
            </div>
            <div class="chart-options">
                <div class="hq-type-time ${mr}">
                    <span class="active" data-hq-type="fsToday">分时</span>
                    <span data-hq-type="bfqDay">日k</span>
                    <span data-hq-type="bfqWeek">周k</span>
                    <span data-hq-type="bfqMonth">月k</span>
                </div>
                 ${fqHtml}
            </div>
        </div>
        <div class="chart-hq-chart">

        </div>`;
      this.wrapper.innerHTML = dom;
  }
  ChartHq.prototype.setCurrent = function(name, shortStockCode, preClosePrice, kData) {
      let baseInfoNameDom = this.wrapper.getElementsByClassName('base-info-name')[0];
      baseInfoNameDom.innerHTML = ` <span class="fs-14">${name}</span> <span>${shortStockCode}</span>`;

      if (kData) {
          let headerDom = this.wrapper.getElementsByClassName('chart-real-head')[0];
          let upDownRateDom = this.wrapper.getElementsByClassName('base-info-rate')[0];
          let price = kData[kData.length - 1].nowp;
          let rate = ((price - preClosePrice) * 100 / preClosePrice).toFixed(2);
          if (rate > 0) {
              headerDom.classList.add('up');
          } else {
              headerDom.classList.add('down');
          }
          rate = rate + '%';
          upDownRateDom.innerHTML = `<span class="fs-22">${price}</span><div class="up-down-rate"><span>${rate}</span></div>`;
      }
  };
  ChartHq.prototype.getFsData = function() {
      fsToday.code = this.code;
      // 获得数据
      var dataProvider = dataPool.register(fsToday);
      var that = this;
      dataPool.onAction(dataProvider, 'PROVIDER_UPDATE.fs' + this.uuid, function(d) {
          if (d.fetchStatus.code !== '000') return;
          console.log(d.data);

          var totalTimeNum, stockType, tradeTime, kData;
          for (var j in d.data) {
              totalTimeNum = d.data[j].totalTimeNum;
              stockType = d.data[j].stockType;
              tradeTime = d.data[j].tradeTime;
              kData = d.data[j].dataArray;
          }
          var xDataObj = D3Charts.hqHelper.getXData(stockType, totalTimeNum, tradeTime);
          that.setCurrent(d.data[j].name, stockType.shortStockCode, d.data[j].preClosePrice, kData);
          if (that.codeType == 1) {
              that.drawFs(kData, xDataObj, stockType, {
                  min: d.data[j].min,
                  max: d.data[j].max,
                  preClosePrice: d.data[j].preClosePrice
              });
          } else {
              that.drawQHFs(kData, xDataObj, stockType, {
                  min: d.data[j].min,
                  max: d.data[j].max,
                  preClosePrice: d.data[j].preClosePrice
              });
          }

      });
  };
  /**
   * 期货数据描述
    *   [{
         av: 69.722 // 均价 , 外汇等市场此内容为空
         n: 9200 // 成交量
         nowp: 69.7 // 现价
         np: 641438 // 成交金额
         t: "20180828 1500" // 时间
         nowpPct: -0.008264462809917363, // 现价对比昨收价（转换成%的话，需要乘以100）
         avPct: -0.007489669421487582 // 均价对比昨收价（转换成%的话，需要乘以100）
     }] */
  ChartHq.prototype.drawQHFs = function(kData, xDataObj, stockType, otherDeatil) {
      let chart = this.chart;
      var min = otherDeatil.min;
      var max = otherDeatil.max;
      var pre = otherDeatil.preClosePrice;

      /* 成交量是否需要除以100 */
      var needConvertoShou = stockType.needConvertoShou;
      var keepLen = stockType.keepLen;
      var xData = xDataObj.xData;
      var xTick = xDataObj.xTick;
      var fixedFloat = 2;
      var showJunJia = true;
      // this.codeType == 2 || this.codeType == 4 ? true : false;;
      //
      console.log('pre' + pre);
      var option = {
          data: [{
              originData: kData
          }, {
              $dataIndex: 0,
              formatter: function(data) {
                  for (var i = 0; i < data.length; i++) {
                      xData[i] = data[i].t.split(' ')[1];
                  }
                  return xData;
              }
          }],

          grid: [{
              left: 55,
              right: 50,
              top: 15,
              bottom: '50%',
              background: {
                  show: true,
                  borderEnable: [0, 0, 0, 0],
                  style: {
                      stroke: color.axisLine,
                      lineWidth: 1
                  }
              },
              topPlaceHolder: {
                  show: true,
                  height: 10,
                  borderEnable: [0, 0, 0, 0],
              },
              bottomPlaceHolder: {
                  show: true,
                  borderEnable: [0, 0, 0, 0]
              }
          }, {
              left: 55,
              right: 50,
              top: '60%',
              bottom: 1,
              background: {
                  show: true,
                  borderEnable: [0, 0, 0, 0],
                  style: {
                      stroke: color.axisLine,
                      lineWidth: 1
                  }
              },

          }],
          series: [{
                  type: 'line',
                  aliasType: 'hqline',
                  name: '现价',
                  $dataIndex: 0,
                  dataKey: 'nowp', // 现价
                  color: '#53A8E2',
                  line: {
                      style: {
                          lineWidth: 1
                      }
                  },
                  area: {
                      show: true,
                      snapToBottom: true,
                      style: {
                          fill: {
                              y2: 1,
                              x2: 0,
                              colorStops: [{
                                  offset: 0,
                                  color: '#1f8ceb'
                              }, {
                                  offset: 1,
                                  color: 'rgba(255,255,255,0.2)'
                              }]
                          },
                          opacity: 0.5
                      }
                  }
              },

              {
                  type: 'hqbar',
                  name: 'fs_vol',
                  hqbarType: 'vol',
                  $axisIndex: [0, 3], // 依赖哪两个轴
                  $dataIndex: 0,
                  getXKey: function(d) {
                      return d.t.split(' ')[1];
                  },

              },
          ],
          axis: [{
                  position: 'bottom',
                  type: 'band',
                  $dataIndex: 1,
                  $gridIndex: [0, 1],
                  paddingOuter: 0,
                  tick: {
                      show: false
                  },
                  label: {
                      padding: 4,
                      inRange: true,
                      formatter: function(d) {
                          return d.substr(0, 2) + ':' + d.substr(2, 2);
                      },
                      style: {
                          fill: color.eqAxis
                      }
                  },
                  line: {
                      show: false,
                      onZero: true
                  },
                  tickValues: xTick,
                  ifTriggerMove: function(event) {
                      if (event.axisData.match('___') || event.data.series.length ===
                          0) {
                          return false;
                      } else {
                          return true;
                      }
                  },
                  //   findLastIndex: function(data, startIndex, endIndex) { /* 获取最后一条数据 */
                  //       for (var i = startIndex; i <= endIndex; i++) {
                  //           if (data[i].match('___')) {
                  //               i--;
                  //               return i;
                  //           }
                  //       }

                  //       return endIndex;
                  //   }
              },
              {
                  position: 'right',
                  type: 'linear',
                  xOrY: 'y',
                  $gridIndex: 0,
                  domainScale: 1.2,
                  /*对domin进行缩放,仅适用于linear*/
                  domainEqualZero: [0, 1], //[-0.1, 0.1],
                  tickValues: function(domain) {
                      var min = Math.min(domain[0], domain[1]);
                      var max = Math.max(domain[0], domain[1]);
                      return [min, (max - min) / 2 + min, max];
                  },
                  label: {
                      padding: 4,
                      style: function(v) {
                          var fill;
                          if (v > pre) {
                              fill = color.abAxis;
                          } else if (v === pre) {
                              fill = color.eqAxis;
                          } else {
                              fill = color.beAxis;
                          }
                          return {
                              fill: fill
                          }
                      },
                      formatter: function(v) {
                          console.log(`--v:${v}`)
                          return ((v - pre) / pre * 100).toFixed(2) + '%'
                      }
                  },
                  line: {
                      show: false
                  },
                  tick: {
                      show: false
                  }
              },
              {
                  position: 'left',
                  relyOtherAxis: true,
                  $axisIndex: 1,
                  $gridIndex: 0,
                  type: 'linear',
                  xOrY: 'y',
                  label: {
                      padding: 4,
                      style: function(v) {
                          var fill;
                          if (v > pre) {
                              fill = color.abAxis;
                          } else if (v === pre) {
                              fill = color.eqAxis;
                          } else {
                              fill = color.beAxis;
                          }

                          return {
                              fill: fill
                          }
                      },
                      formatter: function(v) {
                          return v.toFixed(fixedFloat);
                      }
                  },
                  line: {
                      show: false
                  },
                  tick: {
                      show: false
                  }
              },
              /** 成交量图y轴*/
              {
                  z: 3,
                  position: 'left',
                  type: 'linear',
                  $gridIndex: 1,
                  inRange: true,
                  domainEqualZero: [0, 1],
                  xOrY: 'y',
                  tickValues: function(domain) {
                      var min = Math.min(domain[0], domain[1]);
                      var max = Math.max(domain[0], domain[1]);
                      return [min, (max - min) / 2 + min, max];
                  },
                  label: {
                      show: true,
                      padding: 4,
                      inRange: true,
                      style: {
                          fill: color.eqAxis
                      },
                      formatter: function(v) {

                          return filterNum(v, needConvertoShou);
                      }
                  },
                  line: {
                      show: false
                  },
                  tick: {
                      show: false
                  }
              },
          ],
          axisPointer: [{
              $axisIndex: 0,
              line: {
                  style: {
                      stroke: color.hoverLine,
                      lineDash: [2, 3],
                      lineWidth: 1
                  }
              },
              label: {
                  gap: 0,
                  style: {
                      fill: 'white',
                      textBorderRadius: 0,
                      textBackgroundColor: '#555'
                  },
              }
          }, {
              $axisIndex: [1, 2],
              $axisPointerIndex: 0,
              $seriesIndex: 0,
              label: {
                  gap: 0,
                  style: function(v) {
                      var fill;

                      if (v > 0) {
                          fill = color.abAxis;
                      } else if (v === 0) {
                          fill = color.eqAxis;
                      } else {
                          fill = color.beAxis;
                      }

                      return {
                          textPadding: 4,
                          fill: 'white',
                          textBackgroundColor: fill
                      }
                  }
              },
              // 指示线
              line: {
                  style: {
                      stroke: color.hoverLine,
                      lineDash: [2, 3],
                      lineWidth: 1
                  }
              }
          }],

          tooltip: [{
              trigger: 'axis',
              $axisIndex: 0,
              position: function(t) {
                  var gridModel = chart.getModel("grid", 0);
                  return {
                      x: gridModel.position.left + 40,
                      y: gridModel.position.top - 10
                  }
              },
              alwaysShowContent: true,

              formatter: function(d) {
                  var result = kData[d.series[0].dataIndex];
                  var tpl;
                  if (showJunJia) {
                      tpl = '<%t%> 现价：<span><%nowp%></span> 均价：<span><%av%></span>    昨收：<span><%closeP%></span> 涨跌：<span><%nowpP%></span>  量：<span><%n%> </span>';
                  } else {
                      tpl = '<%t%> 现价：<span><%nowp%></span>   昨收：<span><%closeP%></span> 涨跌：<span><%nowpP%></span>  量：<span><%n%> </span>';
                  }

                  return tpl.replace(/<%([^%>]+)?%>/g, function(s0, s1) {
                      if (s1 === 'nowpP') {
                          return (result['nowpPct'] * 100).toFixed(2) + '%';
                      } else if (s1 == 'closeP') {
                          return pre;
                      } else {
                          return result[s1];
                      }
                  });
              },
              // 浮窗的css样式
              style: tooltipStyle
          }],
          animation: false
      };
      if (showJunJia) {
          option.series.push({
              type: 'line',
              aliasType: 'hqline',
              name: '均价',
              $dataIndex: 0,
              space: [20, 50],
              dataKey: 'av', // 均价 
              color: '#efaa50',
              line: {
                  style: {
                      lineWidth: 1
                  }
              }
          });
      }
      chart.setOption(option);
  };
  ChartHq.prototype.drawFs = function(kData, xDataObj, stockType, otherDeatil) {
      var min = otherDeatil.min;
      var max = otherDeatil.max;
      var pre = otherDeatil.preClosePrice;
      let chart = this.chart;
      /* 成交量是否需要除以100 */
      var needConvertoShou = stockType.needConvertoShou;
      var keepLen = stockType.keepLen;
      var xData = xDataObj.xData;
      var xTick = xDataObj.xTick;
      var fixedFloat = this.codeType === 1 ? 6 : 2;
      console.log('pre' + pre);

      var option = {
          data: [{
              originData: kData
          }, {
              $dataIndex: 0,
              formatter: function(data) {
                  for (var i = 0; i < data.length; i++) {
                      xData[i] = data[i].t.split(' ')[1];
                  }
                  return xData;
              }
          }],
          grid: [{
              top: ' 5%',
              left: '10%',
              right: '10%',
              bottom: '10%'
          }],
          series: [{
              type: 'line',
              aliasType: 'hqline',
              name: code,
              $dataIndex: 0,
              dataKey: 'nowp', // 现价
              color: '#53A8E2',
              line: {
                  style: {
                      lineWidth: 1
                  }
              },
              area: {
                  show: true,
                  snapToBottom: true,
                  style: {
                      fill: {
                          y2: 1,
                          x2: 0,
                          colorStops: [{
                              offset: 0,
                              color: '#1f8ceb'
                          }, {
                              offset: 1,
                              color: 'rgba(255,255,255,0.2)'
                          }]
                      },
                      opacity: 0.5
                  }
              }
          }],
          axis: [{
              position: 'bottom',
              type: 'band',
              $dataIndex: 1,
              $gridIndex: [0],
              paddingOuter: 0,
              tick: {
                  show: false
              },
              label: {
                  padding: 4,
                  inRange: true,
                  formatter: function(d) {
                      return d.substr(0, 2) + ':' + d.substr(2, 2);
                  },
                  style: {
                      fill: color.eqAxis
                  }
              },
              line: {
                  show: false,
                  onZero: true
              },
              tickValues: xTick,
              ifTriggerMove: function(event) {
                  if (event.axisData.match('___') || event.data.series.length ===
                      0) {
                      return false;
                  } else {
                      return true;
                  }
              }
          }, {
              position: 'right',
              type: 'linear',
              xOrY: 'y',
              domainScale: 1.2,
              /*对domin进行缩放,仅适用于linear*/
              domainEqualZero: [0, 1], //[-0.1, 0.1],
              tickValues: function(domain) {
                  var min = Math.min(domain[0], domain[1]);
                  var max = Math.max(domain[0], domain[1]);
                  return [min, (max - min) / 2 + min, max];
                  //return [domain[0], domain[0] / 2, 0, domain[1] / 2, domain[1]];
              },
              label: {
                  padding: 4,
                  style: function(v) {
                      var fill;
                      if (v > pre) {
                          fill = color.abAxis;
                      } else if (v === pre) {
                          fill = color.eqAxis;
                      } else {
                          fill = color.beAxis;
                      }
                      return {
                          fill: fill
                      }
                  },
                  formatter: function(v) {
                      return ((v - pre) / pre * 100).toFixed(2) + '%'
                  }
              },
              line: {
                  show: false
              },
              tick: {
                  show: false
              }
          }, {
              position: 'left',
              relyOtherAxis: true,
              $axisIndex: 1,
              type: 'linear',
              xOrY: 'y',
              label: {
                  padding: 4,
                  style: function(v) {
                      var fill;
                      if (v > pre) {
                          fill = color.abAxis;
                      } else if (v === pre) {
                          fill = color.eqAxis;
                      } else {
                          fill = color.beAxis;
                      }

                      return {
                          fill: fill
                      }
                  },
                  formatter: function(v) {
                      return v.toFixed(fixedFloat);
                  }
              },
              line: {
                  show: false
              },
              tick: {
                  show: false
              }
          }],

          axisPointer: [{
              $axisIndex: 0,
              line: {
                  style: {
                      stroke: color.hoverLine,
                      lineDash: [2, 3],
                      lineWidth: 1
                  }
              },
              label: {
                  gap: 0,
                  style: {
                      fill: 'white',
                      textBorderRadius: 0,
                      textBackgroundColor: '#555'
                  },
              }
          }, {
              $axisIndex: [1, 2],
              $axisPointerIndex: 0,
              $seriesIndex: 0,
              label: {
                  gap: 0,
                  style: function(v) {
                      var fill;

                      if (v > 0) {
                          fill = color.abAxis;
                      } else if (v === 0) {
                          fill = color.eqAxis;
                      } else {
                          fill = color.beAxis;
                      }

                      return {
                          textPadding: 4,
                          fill: 'white',
                          textBackgroundColor: fill
                      }
                  }
              },
              // 指示线
              line: {
                  style: {
                      stroke: color.hoverLine,
                      lineDash: [2, 3],
                      lineWidth: 1
                  }
              }
          }],

          //   tooltip: [{
          //       trigger: 'axis',
          //       $axisIndex: 0,
          //       position: [0, 0],
          //       alwaysShowContent: true,

          //       formatter: function(d) {
          //           return '<span>价格：' + d.series[0].value[1] + '</span>'
          //               // return klinePrice_tooltip(
          //               //     kData[d.series[0].dataIndex], {
          //               //         needConvertoShou: needConvertoShou,
          //               //         keepLen: keepLen
          //               //     },
          //               //     function(d) {
          //               //         var tpl = d.tpl.slice(0, -5) + ' 量：<span><%n%> </span><br/>';
          //               //         var maTpl = d.maTpl;
          //               //         var result = d.result;
          //               //         var data = d.data;
          //               //         return (tpl + maTpl).replace(/<%([^%>]+)?%>/g, function(s0, s1) {
          //               //             if (s1 === 'status' ||
          //               //                 s1 === 'openPStatus' ||
          //               //                 s1 === 'maxPStatus' ||
          //               //                 s1 === 'minPStatus') {
          //               //                 return color[result[s1] + 'Axis'];
          //               //             } else if (/^(ma[{0-9}]+Status)$/.test(s1)) {
          //               //                 return color[s1.slice(0, -6)];
          //               //             } else if (/^(ma[{0-9}]+)$/.test(s1)) {
          //               //                 return parseFloat(data[s1]).toFixed(keepLen);
          //               //                 // }else if(s1 === 'n'){
          //               //                 //     debugger;
          //               //             } else {
          //               //                 return result[s1];
          //               //             }
          //               //         })
          //               //     })
          //       },
          //       // 浮窗的css样式
          //       style: tooltipStyle
          //   }],
          animation: false
      };
      chart.setOption(option);
  };
  ChartHq.prototype.getKLData = function(klineType) {
      klinedata.code = this.code;
      klinedata.dType = klineType;
      let that = this;
      // 获得数据
      var dataProvider = dataPool.register(klinedata);
      dataPool.onAction(dataProvider, 'PROVIDER_UPDATE.kl' + this.uuid, function(d) {
          if (d.fetchStatus.code !== '000') return;
          console.log(d.data);
          that.setCurrent(d.data.name, d.data.stockType.shortStockCode);
          that.drawKline(d);

      });
  };
  /***
   * [{
   *   a: 8.93  // 最高价 max
   *   c: 7.859999999999999 // 收盘价 close
   *   i: 7.85 // 最低价 min
   *   ma5: 7.86 // ma5 均价线
   *   ma10: 7.86
   *   ma30: 7.86
   *   n: 9661747 // 成交量 volume
   *   o: 8.32 // 开盘价 open
   *   yc: 8.32 // 昨收价 yesterdayClose
   *   np： 198423455 // 成交额 volumePrice
   *  afn: 23434444 // 盘后成交量，仅 科创板市场有该值
   *   s: "be" // k线颜色  be --> 下跌, up--> 上涨  eq -> 持平
   *   t: "20091225"  // 时间 time
   *   }]
   *  */
  ChartHq.prototype.drawKline = function(d) {
      let chart = this.chart;
      var needConvertoShou = d.data.stockType.needConvertoShou;
      var keepLen = d.data.stockType.keepLen;
      var minValueSpan = 20;
      var kData = d.data.dataArray;
      //外汇没有成交量数据-不展示成交量的纵坐标
      var showGridIndex1 = this.codeType === 1 ? false : true;
      var option = {
          axis: [{
              position: 'bottom',
              type: 'band',
              $gridIndex: [0, 1, 2],
              xOrY: 'x',
              $dataIndex: 0,
              dataKey: 't',
              paddingInner: 0.3,
              paddingOuter: 0.3,
              barGap: 0,
              $dataZoomIndex: 0,
              tickValues: function(domain) {
                  var n = domain.length - 1;
                  if (n < 6) {
                      return [domain[0]];
                  } else if (n < minValueSpan) {
                      return [domain[0], domain[n]];
                  } else {
                      var split = n / 6;
                      return [domain[Math.round(n / 6)], domain[Math.round(n * 3 / 6)], domain[Math.round(n * 5 / 6)]];
                  }
              },
              splitLine: {
                  show: false,
                  style: {
                      stroke: color.axisLine,
                      lineDash: [3, 4],
                      lineWidth: 1
                  }
              },
              label: {
                  padding: 4,
                  inRange: true,
                  style: {
                      fill: color.eqAxis
                  },
                  formatter: function(d) {
                      return d.substr(0, 4) + '-' + d.substr(4, 2) + '-' + d.substr(6, 2);
                  }
              },
              /***轴线， 坐标轴线 */
              line: {
                  show: false
              },
              tick: {
                  show: false
              }
          }, {
              position: 'left',
              type: 'linear',
              space: 30,
              $gridIndex: 0,
              xOrY: 'y',
              tickValues: function(domain) {
                  var min = domain[0];
                  var max = domain[1];
                  var detar = max - min;
                  return [domain[0], detar / 4 + domain[0], detar * 2 / 4 + domain[0], detar * 3 / 4 + domain[0], domain[1]];
              },
              splitLine: {
                  show: false,
                  style: function(value, i) {
                      switch (i) {
                          case 0:
                          case 4:
                          case 1:
                          case 3:
                              return {
                                  stroke: 'rgba(255,255,255,0)',
                                  lineWidth: 1
                              }
                          default:
                              return {
                                  stroke: color.axisLine,
                                  lineWidth: 1
                              }
                      }
                  }
              },
              label: {
                  padding: 4,
                  style: {
                      fill: color.eqAxis
                  }
              },
              line: {
                  show: false
              },
              tick: {
                  show: false
              }
          }, {
              position: 'left',
              type: 'linear',
              $gridIndex: 1,
              //   space: [0, 20],
              domainEqualZero: [0, 1],
              xOrY: 'y',
              tickValues: function(domain) {
                  var min = domain[0];
                  var max = domain[1];
                  var detar = max - min;
                  return [domain[0], detar * 2 / 4 + domain[0], domain[1]];
              },
              label: {
                  show: showGridIndex1,
                  padding: 4,
                  inRange: true,
                  style: {
                      fill: color.eqAxis
                  },
                  formatter: function(v) {
                      return filterNum(v, needConvertoShou);
                  }
              },
              line: {
                  show: false
              },
              tick: {
                  show: false
              }
          }, {
              position: 'left',
              type: 'linear',
              /*依赖的grid的index, 若为数组，将在多个grid触发axis事件，但仅在数组第一项grid位置进行axis的绘制; 如果有上下两个grid，此时x轴的配置就该为$gridIndex: [ 0, 1 ]*/
              $gridIndex: 2,
              space: 20,
              xOrY: 'y',
              tickValues: function(domain) {
                  var min = domain[0];
                  var max = domain[1];
                  var detar = max - min;
                  console.log(`max:${max};min:${min}`)
                  return [domain[0], detar * 2 / 4 + domain[0], domain[1]];
              },
              label: {
                  padding: 4,
                  inRange: true,
                  style: {
                      fill: color.eqAxis
                  }
              },
              line: {
                  show: false
              },
              tick: {
                  show: false
              }
          }],
          grid: [{
              left: 50,
              top: 10,
              right: 0,
              bottom: "50%",
              background: {
                  show: false,
                  borderEnable: [1, 1, 1, 1],
                  style: {
                      stroke: color.axisLine,
                  }
              },
              topPlaceHolder: {
                  show: false,
                  borderEnable: [1, 1, 0, 1],
              },
              bottomPlaceHolder: {
                  show: false,
                  borderEnable: [0, 1, 0, 1],
              }
          }, {
              left: 50,
              top: '58%',
              right: 0,
              bottom: '25%',
              background: {
                  show: true,
                  borderEnable: [0, 0, 0, 0],
                  style: {
                      stroke: color.axisLine,
                  }
              },
              bottomPlaceHolder: {
                  show: false,
                  borderEnable: [0, 0, 1, 0],
              }
          }, {
              left: 50,
              top: '78%',
              right: 0,
              bottom: 0,
              background: {
                  show: true,
                  borderEnable: [0, 0, 0, 0],
                  style: {
                      stroke: color.axisLine,
                  }
              },
              bottomPlaceHolder: {
                  show: true,
                  borderEnable: [0, 0, 1, 0],
              }
          }],
          /**坐标轴指示器是指示坐标轴当前刻度的工具。鼠标悬浮到图上，可以出现标线和刻度文本。依赖于axis
           * 纵向和横向的坐标轴指示器分开写
           */
          axisPointer: [{
              /*依赖的axis的index，可以为数组 */
              $axisIndex: [1, 2, 3],
              line: {
                  style: {
                      stroke: color.hoverLine,
                      lineDash: [2, 3],
                      lineWidth: 1
                  }
              },
              label: {
                  gap: 0,
                  style: {
                      fill: 'white',
                      textBorderRadius: 0,
                      textBackgroundColor: '#555'
                  },
              }
          }, {
              $axisIndex: 0,
              line: {
                  style: {
                      stroke: color.hoverLine,
                      lineDash: [2, 3],
                      lineWidth: 1
                  }
              },
              label: {
                  gap: 0,
                  style: {
                      fill: 'white',
                      textBorderRadius: 0,
                      textBackgroundColor: '#555'
                  },
              }
          }],
          tooltip: [{
                  trigger: 'axis',
                  $axisIndex: 0,
                  //   position: [0, 0],
                  position: function(t) {
                      var gridModel = chart.getModel("grid", 0);
                      return {
                          x: gridModel.position.left + 40,
                          y: gridModel.position.top - 10
                      }
                  },
                  alwaysShowContent: true,
                  formatter: function(d) {
                      return klinePrice_tooltip(
                          kData[d.series[0].dataIndex], {
                              needConvertoShou: needConvertoShou,
                              keepLen: keepLen
                          },
                          function(d) {
                              var tpl = d.tpl.slice(0, -5) + ' 量：<span><%n%> </span><br/>';
                              var maTpl = d.maTpl;
                              var result = d.result;
                              var data = d.data;
                              return (tpl + maTpl).replace(/<%([^%>]+)?%>/g, function(s0, s1) {
                                  if (s1 === 'status' ||
                                      s1 === 'openPStatus' ||
                                      s1 === 'maxPStatus' ||
                                      s1 === 'minPStatus') {
                                      return color[result[s1] + 'Axis'];
                                  } else if (/^(ma[{0-9}]+Status)$/.test(s1)) {
                                      return color[s1.slice(0, -6)];
                                  } else if (/^(ma[{0-9}]+)$/.test(s1)) {
                                      return parseFloat(data[s1]).toFixed(keepLen);
                                      // }else if(s1 === 'n'){
                                      //     debugger;
                                  } else {
                                      return result[s1];
                                  }
                              })
                          })
                  },
                  // 浮窗的css样式
                  style: tooltipStyle
              },
              /*成交量 tooltip*/
              {
                  trigger: "axis",
                  $axisIndex: 0,
                  alwaysShowContent: true,
                  position: function(t) {
                      var gridModel = chart.getModel("grid", 1);
                      return {
                          x: gridModel.position.left,
                          y: gridModel.position.top - 6
                      }
                  },
                  formatter: function(d) {
                      var val = kData[d.series[0].dataIndex].n;
                      return "成交量: " + filterNum(val, needConvertoShou)
                  },
                  style: {
                      position: "absolute",
                      zIndex: 99999,
                      backgroundColor: void 0,
                      borderRadius: "0px",
                      padding: "2px",
                      color: "#1E2024",
                      fontSize: "12px",
                      display: "none"
                  }
              },
              /*macdde tooltip*/
              {
                  trigger: 'axis',
                  $axisIndex: 0,
                  alwaysShowContent: true,
                  position: function(d) {
                      var gridModel = chart.getModel('grid', 2);
                      return {
                          x: gridModel.position.left,
                          y: gridModel.position.top - 4
                      }
                  },
                  formatter: function(d) {

                      var color = d.series[5].color;
                      var obj = d.series[5].value[2];
                      var str = '';
                      for (var i in obj) {
                          if (i !== 'xIndex') {
                              str += '' + i + ':' + obj[i].toFixed(3) + ' '
                          }
                      }
                      return str;
                  },
                  // 浮窗的css样式
                  style: {
                      position: 'absolute',
                      zIndex: 99999,
                      backgroundColor: undefined,
                      borderRadius: '0px',
                      padding: '2px',
                      color: '#555',
                      fontSize: '12px',
                      display: 'none',
                  }
              }
          ],
          dataZoom: [{
              /*依赖的gridIndex，事件将加在该grid内，可以为数组，在多个grid中添加事件*/
              $gridIndex: [0, 1], //
              minValueSpan: minValueSpan,
              startValue: -60,
          }],
          series: [
              /***hqbar
               * --hqbarType：{string} kline类型 kline | vol | bamboo, 如果是vol类型，字段对象需要有 {t: "", n: ""} 两个属性,如果是kline类型，字段对象需要有 {t: "", o: "", a: "", i: "", c:""} 5个属性 */
              {
                  type: 'hqbar', //k线图
                  name: '价格',
                  hqbarType: 'kline',
                  /**所依赖axis的index，需包括一个x轴和y轴 */
                  $axisIndex: [0, 1],
                  $dataIndex: 0,
              }, {
                  type: 'hqbar', //k线图
                  name: '成交量',
                  hqbarType: 'vol',
                  $axisIndex: [0, 2],
                  $dataIndex: 0,
                  // 行情相关配置
                  hq: {
                      // 因为缩放后使用的是 stroke的颜色，
                      // 默认如果 up和down配置相同的stroke颜色，缩放后使用各自的fill颜色
                      up: {
                          // k线 边框线色
                          stroke: 'rgba(247,48,75,0.3)',
                          // k线填充色
                          fill: 'rgba(247,48,75,0.3)'
                      },
                      down: {
                          stroke: 'rgba(48,172,99,0.3)',
                          fill: 'rgba(48,172,99,0.3)'
                      },
                      eq: {
                          stroke: 'rgba(68,68,68,0.3)',
                          fill: 'rgba(68,68,68,0.3)'
                      }
                  }
              }, {
                  type: 'line',
                  aliasType: 'hqline',
                  $dataIndex: 0,
                  dataKey: 'ma5',
                  name: 'ma5',
                  line: {
                      show: true,
                      style: {
                          normal: {
                              stroke: color.ma5,
                              lineWidth: 1
                          }
                      }
                  }
              }, {
                  type: 'line',
                  aliasType: 'hqline',
                  $dataIndex: 0,
                  dataKey: 'ma10',
                  name: 'ma10',
                  line: {
                      show: true,
                      style: {
                          normal: {
                              stroke: color.ma10,
                              lineWidth: 1
                          }
                      }
                  }
              }, {
                  type: 'line',
                  aliasType: 'hqline',
                  $dataIndex: 0,
                  dataKey: 'ma30',
                  name: 'ma30',
                  line: {
                      show: true,
                      style: {
                          normal: {
                              stroke: color.ma30,
                              lineWidth: 1
                          }
                      }
                  }
              }, {
                  type: 'hqIndicator', //k线指标
                  name: 'macd',
                  $dataIndex: 1,
                  //indicator类型 macd | asi | bias | boll | kdj | rsi | vr | wr
                  indicatorType: 'macd',
                  $axisIndex: [0, 3]
              }
          ],
          markPoint: [{
              /*依赖的axis*/
              $axisIndex: [0, 1],
              $seriesIndex: 0,
              symbol: {
                  type: 'none'
              },
              label: {
                  normal: {
                      show: true,
                      style: {
                          fill: 'black',
                          textDistance: 0,
                          position: function(d, item, position) {
                              var gridModel = chart.getModel('grid', 0);

                              if (position[0] > (gridModel.position.left + gridModel.position.width / 2)) {
                                  return 'left';
                              } else {
                                  return 'right';
                              }
                          }
                      },
                      formatter: function(item, position) {
                          var gridModel = chart.getModel('grid', 0);

                          if (position[0] > (gridModel.position.left + gridModel.position.width / 2)) {
                              return item.data[1].toFixed(2) + ' ←'
                          } else {
                              return '→ ' + item.data[1].toFixed(2)
                          }
                      }
                  }
              },
              data: [{
                  type: 'max',
                  valueIndex: 1
              }, {
                  type: 'min',
                  valueIndex: 2
              }]
          }],
          animation: false,
          data: [{
              originData: kData
          }, {
              /**依赖的$data的index，优先级低于data，取得的数据需符合data的格式 */
              $dataIndex: 0,
              formatter: function(data) {
                  var i = D3Charts.Indicator.getClass('macd');
                  return i.calculate(data);
              },
          }]
      };

      chart.setOption(option);
      var axisModel = chart.getModel('axis', 0);
      var tooltipModel = chart.getModel('tooltip', 0);
      var tooltipView = chart.getViewOfComponentModel(tooltipModel);

      chart.registerAction(axisModel, 'AXIS_OUT', function(d) {
          var lastData = d.lastData;
          if (lastData) {
              tooltipView.showTooltip(tooltipModel, lastData);
          }
      });
  };
  ChartHq.prototype.addIndicator = function() {
      this.setIndicatorDom();
      this.handleIndicatorSwitch();
  };
  /**
   * 生成行情指数的Dom
   */
  ChartHq.prototype.setIndicatorDom = function() {
      var arr;
      if (this.codeType == 1) {
          arr = ['MACD', 'KDJ'];
      } else {
          arr = ['MACD', 'KDJ', 'BOLL', 'ASI', 'BIAS', 'RSI', 'WR', 'VR'];
      }

      var div = document.createElement('div');
      div.className = 'chart-hq-indicator no';
      var str = arr.map(function(item, index) {
          if (index === 0) {
              return '<span class="active">' + item + '</span>';
          } else {
              return '<span>' + item + '</span>';
          }
      });
      div.innerHTML = str.join('');
      this.wrapper.appendChild(div);
      this.indicatorDom = div;
  };
  ChartHq.prototype.handleIndicatorSwitch = function() {
      var spans = this.indicatorDom.querySelectorAll('span');
      for (var i = 0, len = spans.length; i < len; i++) {
          spans[i].addEventListener('click', function(e) {
              var ele = e.target;
              var content = ele.textContent;
              this.handleIndicatorActive(content);
              this.setChartIndicator(content.toLowerCase());
          }.bind(this), false);
      }
  };
  ChartHq.prototype.handleTabEvent = function() {
      this.handleTabSwitch();
      if (this.codeType === 2) {
          this.handleFQTabSwitch();
      }
  };

  /**
   * 分时k线切换事件
   */
  ChartHq.prototype.handleTabSwitch = function() {

      var tabs = this.tabDom.querySelectorAll('span');
      var type;
      for (var i = 0, len = tabs.length; i < len; i++) {
          tabs[i].addEventListener('click', function(e) {
              var ele = e.target;
              for (var i = 0, len = tabs.length; i < len; i++) {
                  if (tabs[i] === ele) {
                      tabs[i].classList.add('active');
                  } else {
                      tabs[i].classList.remove('active');
                  }
              }
              type = ele.dataset['hqType'];

              if (this.codeType === 2) {
                  if (type !== "fsToday") {
                      this.fqDom.classList.add('show-fq');
                  } else {
                      this.fqDom.classList.remove('show-fq');
                  }
                  let tabs = this.fqDom.querySelectorAll('li');
                  let bfq = tabs[2];
                  //重置不复权
                  for (var i = 0, len = tabs.length; i < len; i++) {
                      tabs[i].classList.remove('active');
                  }
                  bfq.classList.add('active');
                  this.fqDom.querySelectorAll('span')[0].innerHTML = bfq.innerHTML;
              }
              this.setChart(type);
          }.bind(this), false)
      }
  };
  ChartHq.prototype.handleFQTabSwitch = function() {
      var tabs = this.fqDom.querySelectorAll('li');
      var fqTypeText = this.fqDom.querySelectorAll('span')[0];
      var fqType;
      for (var i = 0, len = tabs.length; i < len; i++) {
          tabs[i].addEventListener('click', function(e) {
              var ele = e.target;
              for (var i = 0, len = tabs.length; i < len; i++) {
                  if (tabs[i] === ele) {
                      tabs[i].classList.add('active');
                  } else {
                      tabs[i].classList.remove('active');
                  }
              }
              fqType = ele.dataset['hqType'];
              var currentType = this.tabDom.querySelectorAll('span.active')[0];
              var type = currentType.dataset['hqType'];
              fqTypeText.innerHTML = ele.innerHTML;
              this.setChart(type, fqType);
          }.bind(this), false)
      }
  };

  ChartHq.prototype.setChart = function(type, fqType) {
      var typeSet = ['fsToday', 'bfqDay', 'bfqWeek', 'bfqMonth'];
      type = typeSet.indexOf(type) > -1 ? type : typeSet[0];
      if (fqType) {
          type = fqType + type.slice(3, type.length);
      }
      console.log(type);
      if (type === 'fsToday') {
          this.toggleFs();
      } else {
          this.toggleKline(type);
      }
  };
  ChartHq.prototype.toggleFs = function() {
      //  this.hqAddLoading();
      dataPool.offAction('.kl' + this.uuid);
      this.indicatorDom.classList.add('no');
      this.getFsData();
  }
  ChartHq.prototype.toggleKline = function(klineType) {
      dataPool.offAction('.fs' + this.uuid);
      dataPool.offAction('.kl' + this.uuid);
      this.indicatorDom.classList.remove('no');
      this.handleIndicatorActive('MACD');
      this.getKLData(klineType);
  };
  ChartHq.prototype.offChart = function() {
      dataPool.offAction('.fs' + this.uuid);
      dataPool.offAction('.kl' + this.uuid);
      this.wrapper.innerHTML = '';
  };
  /**
   * 传入行情指数名设置活动标记
   */
  ChartHq.prototype.handleIndicatorActive = function(indicatorName) {
      var spans = this.indicatorDom.querySelectorAll('span');
      for (var j = 0, len = spans.length; j < len; j++) {
          if (spans[j].textContent === indicatorName) {
              spans[j].classList.add('active');
          } else {
              spans[j].classList.remove('active');
          }
      }
  };
  /**
   * 设置chart的行情指数
   */
  ChartHq.prototype.setChartIndicator = function(indicatorName) {
      var chart = this.chart;
      var data1Model = chart.getModel('data', 1);
      var series5Model = chart.getModel('series', 5);

      series5Model.set({
          name: indicatorName,
          indicatorType: indicatorName,
          indicator: undefined
      })
      data1Model.set({
          formatter: function(data) {
              var i = D3Charts.Indicator.getClass(indicatorName);
              return i.calculate(data);
          }
      })

      chart.update();

      var tooltipModel = chart.getModel('tooltip', 1); //
      var tooltipView = chart.getViewOfComponentModel(tooltipModel);
      var axisModel = chart.getModel('axis', 0);

      tooltipView.showTooltip(tooltipModel, axisModel.getLastData());
  }



  var code = window.location.search.substr(1) || '97_AUDUSD'; //'129_IC1912'
  new ChartHq({
      id: 'chart',
      code: code,
      width: '1000px',
      height: '500px'
  })