

//const CSV = ".\syntethic hoop 3.csv";

const fileSelector = document.getElementById('file-selector');
    fileSelector.addEventListener('change', (event) => {
      const fileList = event
        .target.files;
      console.log(fileList);
      for (const file of fileList) {
        readFile(file);
      }
    });

    function readFile(file) {
      // Check if the file is an image.
      //if (file.type && !file.type.startsWith('image/')) {
      //  console.log('File is not an image.', file.type, file);
      //  return;
      //}

      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        //img.src = event.target.result;

        /*Plotly.d3.text(event.target.result, function(text) {
          var data = Plotly.d3.csvParseRows(text).map(function(row) {
            return row.map(function(value) {
              return +value;
            });
          });
          console.log(data);
        });*/
        
        ttt = Plotly.d3.text(event.target.result, function (text) {
          var nums = [];
          resultlines = text.split(/\r?\n/);
          //nums.push(resultlines.forEach(parseLine));
          for (var i = 0; i < resultlines.length; i++) {
            var tLine = parseLine(resultlines[i]);
            if (!isNaN(tLine[0])) {
              //console.log(tLine);
              nums.push(tLine);
            }
          }
          //console.log(nums);
          return nums;
        });
        function parseLine(row) {
          num = row.split(",").map(Number);
          //nums = row.split(",").filter(x => x.trim().length && !isNaN(x)).map(Number)
          //console.log(nums);
          return num;
        }


        plotFromCSV(event.target.result);
      });
      reader.readAsDataURL(file);
    }


function plotFromCSV(CSV) {
  Plotly.d3.csv(CSV, function (err, rows) {
    var x = [];
    var y = [];
    var z = [];
    processData(rows);
    //makePlotly(x, y, z);
  });
}

function processData(allRows) {
    let x = [];
    let y = [];
    let z = [];
    let row;

    let i = 0;
    while (i < allRows.length) {
        row = allRows[i];
        x.push(row["x"]);
        y.push(row["y"]);
        z.push(row["z"]);
        i += 1;
    }

    //console.log("X", x);
    var data=[
      {
        opacity:0.8,
        color:'rgb(300,100,200)',
        type: 'mesh3d',
        x: x,
        y: y,
        z: z,
      }
  ];
  //Plotly.newPlot('plot', data);
  Plotly.newPlot('plot', [{
    type: 'scatter3d',
    mode: 'lines',
    x: x,
    y: y,
    z: z,
    opacity: 1,
    line: {
      width: 6,
      color: '#FF8C00',
      reversescale: false
    }
  }], {
    height: 640
  });
}

function makePlotly(x, y1, y2) {
    let traces = [
        {
            x: x,
            y: y1,
            name: "A",
            line: {
                color: "#387fba",
                width: 3
            }
        },
        {
            x: x,
            y: y2,
            name: "B",
            line: {
                color: "#54ba38",
                width: 3,
                // dash: "dash"
            }
        }
    ];

    let layout = {
        title: "Basic Line Chart",
        yaxis: {
            range: [0, 100]
        },
        xaxis: {
            // tickformat: "%d/%m/%y"
        },
    };

    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot", traces, layout, config);
}
