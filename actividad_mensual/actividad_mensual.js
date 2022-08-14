document.write(`
<select id="dropdown">
<option value="all">Todos</option>
        <option value="Actual">Actual</option>
        <option value="Anterior">Anterior</option>
        <option value="Previsto Actual">Previsto</option>
        <option value="Previsto Anterior">Previsto Anterior</option>
</select>
<select id="dropdownStartDate">
</select>
<div id="container" style="width: 50%; height: 400px;"></div> `);

document.addEventListener("DOMContentLoaded", function () {
  const startDate = Date.UTC(2012, 12, 1);
  const endDate = Date.UTC(2015, 12, 1);

  const drawChart = (series) => {
    let chart = Highcharts.chart("container", {
      chart: {
        type: "line",
      },
      title: {
        text: "Actividad Mensual",
      },
      subtitle: {
        useHTML: true,
        text: "Evolución Mensual (por Tipo)",
      },
      xAxis: {
        min: startDate,
        max: endDate,
        type: "datetime",
        labels: {
          style: {
            fontSize: "10px",
          },
          format: "{value: %m/%Y}",
          align: "center",
        },
      },
      yAxis: {
        min: 20000000,
        max: 40000000,
        title: {
          text: "MONTO",
        },
      },
      plotOptions: {
        series: {
          enableMouseTracking: false,
          stickyTracking: false,
          allowPointSelect: true,
          states: {
            hover: {
              enabled: true,
            },
          },
          events: {
            onMouseOver: function (index, all) {
              let chart = this.chart;

              chart.series[index].points.forEach((elem) => {
                elem.setState("hover");
              });
            },
            mouseOut: function () {
              let series = this.series;
              let chart = this;

              series.points[0].onMouseOver(0);
            },
          },
          marker: {
            enabled: false,
          },
        },
        line: {
          pointStart: startDate,
          pointEnd: endDate,
        },
      },

      tooltip: {
        xDateFormat: "%m/%Y",
        split: false,
      },
      series: series,
    });

    return chart;
  }

  $(document).ready(function () {
    let chart = drawChart(series);

    const dropdownPeriods = document.querySelector("#dropdown");
    dropdownPeriods.addEventListener("change", (event) => {
      const selected = event.target.value;

      const periodDropDict = {
        Actual: 0,
        Anterior: 1,
        "Previsto Actual": 2,
        "Previsto Anterior": 3,
      };

      switch (selected) {
        case "all":
          obj = $("#container").highcharts().destroy();
          chart = drawChart(series);
          break;
        case "Actual":
          chart.series[0].points[0].onMouseOver(0);
          break;
        case "Anterior":
          chart.series[1].points[0].onMouseOver(1);
          break;
        case "Previsto Actual":
          chart.series[2].points[0].onMouseOver(2);
          break;
        case "Previsto Anterior":
          chart.series[3].points[0].onMouseOver(3);
          break;
      }
    });
  });

  const dropdownStartDate = document.querySelector("#dropdownStartDate");

  const series = [
    {
      name: "Actual",
      color: "#4bd91c",
      data: [
        [Date.UTC(2013, 11, 1), 28665938],
        [Date.UTC(2014, 0, 1), 27987344],
        [Date.UTC(2014, 1, 1), 28988432],
        [Date.UTC(2014, 2, 1), 30556234],
        [Date.UTC(2014, 3, 1), 30987654],
        [Date.UTC(2014, 4, 1), 31098124],
        [Date.UTC(2014, 5, 1), 30992556],
        [Date.UTC(2014, 6, 1), 31879344],
      ],
    },
    {
      name: "Anterior",
      color: "#3218a3",
      data: [
        [Date.UTC(2013, 11, 1), 27232640],
        [Date.UTC(2014, 0, 1), 27147724],
        [Date.UTC(2014, 1, 1), 27828896],
        [Date.UTC(2014, 2, 1), 28417296],
        [Date.UTC(2014, 3, 1), 29438272],
        [Date.UTC(2014, 4, 1), 29854198],
        [Date.UTC(2014, 5, 1), 28823076],
        [Date.UTC(2014, 6, 1), 29966584],
      ],
    },
    {
      name: "Previsto Actual",
      color: "#db6f30",
      data: [
        [Date.UTC(2013, 12, 1), 30000000],
        [Date.UTC(2014, 1, 1), 30000000],
        [Date.UTC(2014, 2, 1), 30000000],
        [Date.UTC(2014, 3, 1), 31000000],
        [Date.UTC(2014, 4, 1), 31000000],
        [Date.UTC(2014, 5, 1), 31000000],
        [Date.UTC(2014, 6, 1), 32000000],
        [Date.UTC(2014, 7, 1), 32000000],
      ],
    },
    {
      name: "Previsto Anterior",
      color: "#d3db3d",
      data: [
        [Date.UTC(2013, 12, 1), 27800000],
        [Date.UTC(2014, 1, 1), 27800000],
        [Date.UTC(2014, 2, 1), 27800000],
        [Date.UTC(2014, 3, 1), 28500000],
        [Date.UTC(2014, 4, 1), 28500000],
        [Date.UTC(2014, 5, 1), 28500000],
        [Date.UTC(2014, 6, 1), 29200000],
        [Date.UTC(2014, 7, 1), 29200000],
      ],
    },
  ];

  series[0].data.forEach((item) => {
    var dateIso6801 = new Date(item[0]);
    console.log(dateIso6801);
    const currentDate = dateIso6801.getDate() + "-" + (dateIso6801.getMonth() + 1) + "-" + dateIso6801.getFullYear();
    console.log(currentDate);
  });
 ;
});
