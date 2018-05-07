$(document).ready(function(){
	//Chart js
	var ctx = $("#myChart");

	var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Positivo',
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }, {
                x: 7,
                y: 9
            }],
            backgroundColor: [
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
                'rgba(153, 102, 255, 0.9)',
                'rgba(255, 159, 64, 0.9)'
            ],
             borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        }, {
            label: 'Negativo',
            data: [{
                x: -3,
                y: 8
            }, {
                x: 9,
                y: 10
            }, {
                x: 0,
                y: 5
            }, {
                x: 8,
                y: 9
            }],
            backgroundColor: [
                'rgba(99,132,255, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
                'rgba(153, 102, 255, 0.9)',
                'rgba(255, 159, 64, 0.9)'
            ],
             borderColor: [
                'rgba(99,132,255,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        },
        {
            label: 'Nuevo',
            data: [{
                x: 2,
                y: 0
            }],
            backgroundColor: [
                'rgba(132,255,99, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
                'rgba(153, 102, 255, 0.9)',
                'rgba(255, 159, 64, 0.9)'
            ],
             borderColor: [
                'rgba(132,255,99,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        },]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
}); 

	var classA = "positivo";
	var classB = "negativo";

	//Create array of objects
	var trainingObjects = [];
	var trainingSize = 10;
	var half = Math.floor(trainingSize / 2);
	var chartCounter = 0;
	for (i = 0; i < 10; i++) {
		if (half == i) {
			//reset counter at half
			chartCounter = 0;
		}
		var object = getRandomObject(classA);
		if (i >= half) {
			object = getRandomObject(classB);
			//Add to chart
			addDataToChart(1, object, chartCounter);
		} else {
			//Add to chart
			addDataToChart(0, object, chartCounter);
		}
		chartCounter++;
		trainingObjects.push(object);
	}

	console.log('s');

	/*for (i = 0; i < trainingObjects.length; i++) {
		console.log("Label: " + trainingObjects[i].label + "\nX: " + trainingObjects[i].x + " - Y: " + trainingObjects[i].y);
	}*/

	$("#start").click(function() {
		//Get values from inputs
		var k = $("#k").val();
		var x = $("#x").val();
		var y = $("#y").val();
		var newLabel = "";

		//Update chart with new val
		scatterChart.data.datasets[2].data[0] = {
				x: x,
                y: y};
		scatterChart.update();

		//Calculate distances
		var distances = [];
		for (i = 0; i < trainingObjects.length; i++) {
			var currentObject = trainingObjects[i];
			var distance = calcEuclidianDistance(x,y,currentObject.x,currentObject.y);
			var object = {
				d:distance,
				label:currentObject.label
			};
			distances.push(object);
		}

		/*for (i = 0; i < distances.length; i++) {
			console.log("Label: " + distances[i].label + "\ndistance: " + distances[i].d);
		}*/

		//sort based on distance from min to max
		distances.sort(compare);

		//Get k closest
		var kClosest = [];
		for (i = 0; i < k; i++)
			kClosest.push(distances[i]);
		
		//Asign label
		var classACounter = 0;
		var classBCounter = 0;
		for (i = 0; i < kClosest.length; i++) {
			if (kClosest[i].label == classA)
				classACounter++;
			else
				classBCounter++;
		}

		if (classACounter > classBCounter)
			newLabel = classA;
		else
			newLabel = classB;

		$("#newLabel").val(newLabel);
	});

	//Compare function
	function compare(a,b) {
	  if (a.d < b.d)
	    return -1;
	  if (a.d > b.d)
	    return 1;
	  return 0;
	}


	function calcEuclidianDistance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
	}

	function getRandomObject(lb) {
		var xCoor = getRandomInt(1, 15);
		var yCoor = getRandomInt(1, 15);
		var object = {
			x:xCoor,
			y:yCoor,
			label:lb
		};
		return object;
	}

	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function addDataToChart(dataset, object, pos) {
		scatterChart.data.datasets[dataset].data[pos] = {
				x: object.x,
                y: object.y};
		scatterChart.update();
	}

});
