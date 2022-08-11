(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
document.write(`
        <select id="dropdown">
        <option value="all">Todos</option>
        <option value="fchuri">fchuri</option>
        <option value="dlopez">dlopez</option>
        <option value="pgandini">pgandini</option>"
    </select>
    <div id="container" style="width: 25%; height: 400px;"></div>`);
    
        document.addEventListener('DOMContentLoaded', function () {

            const chart = Highcharts.chart('container', {
                chart: {
                    type: 'column',
                },
                title: {
                    text: 'Pedidos'
                },
                subtitle: {
                    text: 'por Vendedor'
                },
                xAxis: {
                    categories: ['fchuri', 'dlopez', 'pagandini'],
                    crosshair: true
                },

                yAxis: {
                    min: 0,
                    title: {
                        text: 'Monto'
                    }
                },
                tooltip: {
                    borderColor: 'rgb(148, 48, 32)',
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr style="border: 1px solid red"><td style="color:rgb(148, 48, 32);padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.25,
                        borderWidth: 0,
                        groupPadding: 0,
                        shadow: false
                    }
                },
                series: [{
                    name: 'Monto Sin Impuestos',
                    categories: ['fchuri', 'dlopez', 'pagandini'],
                    data: [360000, 260000, 4000]

                }],
                caption: {
                    text: 'Atualização: 12/09/2014 10:20',
                    align: 'right'
                }
            })
            
            const dropdown = document.querySelector("#dropdown");

            dropdown.addEventListener('change', (event) => {
                
                const data = [360000, 260000, 4000];
                let dataDict = {
                    'all': data,
                    'fchuri': [data[0]],
                    'dlopez': [data[1]],
                    'pgandini': [data[2]]
                };

                const labels = ['fchuri', 'dlopez', 'pgandini'];
                let labelsDict = {
                    'all': labels,
                    'fchuri': [labels[0]],
                    'dlopez': [labels[1]],
                    'pgandini': [labels[2]]
                }

                let selected = event.target.value;
                oldData = chart.series.data;

                if (selected === 'fchuri') {
                    chart.series[0].update({
                        data: dataDict['fchuri']
                    });
                    chart.xAxis[0].update({
                        categories: labelsDict['fchuri']
                    });
                } else if (selected === 'dlopez') {
                    chart.series[0].update({
                        data: dataDict['dlopez']
                    });
                    chart.xAxis[0].update({
                        categories: labelsDict['dlopez']
                    })
                } else if (selected === 'pgandini') {
                    chart.series[0].update({
                        data: dataDict['pgandini']
                    });
                    chart.xAxis[0].update({ categories: labelsDict['pgandini'] })
                } else {
                    chart.series[0].update({
                        data: dataDict['all']
                    });
                    chart.xAxis[0].update({ categories: labelsDict['all'] })
                }
            })
        });

},{}]},{},[1]);
