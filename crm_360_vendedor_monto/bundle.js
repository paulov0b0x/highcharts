(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
document.write(`
        <select id="dropdown">
        <option value="all">all</option>
        <option value="person1">person1</option>
        <option value="person2">person2</option>
        <option value="person3">person3</option>"
    </select>
    <div id="container" style="width: 25%; height: 400px;"></div>`);

document.addEventListener("DOMContentLoaded", function () {
  const chart = Highcharts.chart("container", {
    chart: {
      type: "column",
    },
    title: {
      text: "Pedidos",
    },
    subtitle: {
      text: "por Vendedor",
    },
    xAxis: {
      categories: ["person1", "person2", "person3"],
      crosshair: true,
    },

    yAxis: {
      min: 0,
      title: {
        text: "Monto",
      },
    },
    tooltip: {
      borderColor: "rgb(148, 48, 32)",
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr style="border: 1px solid red"><td style="color:rgb(148, 48, 32);padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.25,
        borderWidth: 0,
        groupPadding: 0,
        shadow: false,
      },
    },
    series: [
      {
        name: "Monto Sin Impuestos",
        categories: ["person1", "person2", "pagandini"],
        data: [360000, 260000, 4000],
      },
    ],
    caption: {
      text: "Atualização: 12/09/2014 10:20",
      align: "right",
    },
  });

  const dropdown = document.querySelector("#dropdown");

  dropdown.addEventListener("change", (event) => {
    const data = [360000, 260000, 4000];

    let dataDict = {
      "all": data,
      "person1": [data[0]],
      "person2": [data[1]],
      "person3": [data[2]],
    };


    let selected = event.target.value;
    oldData = chart.series.data;

    // This
    /* if (selected === 'person1') {
                    chart.series[0].update({
                        data: dataDict['person1']
                    });
                    chart.xAxis[0].update({
                        categories: labelsDict['person1']
                    });
                } else if (selected === 'person2') {
                    chart.series[0].update({
                        data: dataDict['person2']
                    });
                    chart.xAxis[0].update({
                        categories: labelsDict['person2']
                    })
                } else if (selected === 'person3') {
                    chart.series[0].update({
                        data: dataDict['person3']
                    });
                    chart.xAxis[0].update({ categories: labelsDict['person3'] })
                } else {
                    chart.series[0].update({
                        data: dataDict['all']
                    });
                    chart.xAxis[0].update({ categories: labelsDict['all'] })
                } */
    
    // Became this (thank God!)                
    Object.keys(dataDict).map((label, index) => {
      if (selected == label && label != "all") {
        chart.series[0].update({ data: dataDict[label] });
        chart.xAxis[0].update({ categories: [label] });
      } else if (label == "all") {
        chart.series[0].update({
          data: dataDict[label],
        });
        chart.xAxis[0].update({ categories: Object.keys(dataDict).slice(1, dataDict.len) });
      }
    });

    
  });
});

},{}]},{},[1]);
