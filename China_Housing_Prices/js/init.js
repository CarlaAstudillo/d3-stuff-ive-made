var pymChild = null;

var winwidth = parseInt(d3.select('#map').style('width'));

var margin = {
        top: 8,
        right: 21,
        bottom: 77,
        left: 40
    },
    mapRatio = 0.5,
    Ratio = 1,
    mapwidth = winwidth,
    mapwidth = mapwidth,
    mapheight = mapwidth * mapRatio;

if (winwidth < 450) {

    var width = winwidth / 2 - margin.left - margin.right;

} else {

    var width = winwidth / 3 - margin.left - margin.right;

}

var height = width * Ratio;




var parseDate = d3.time.format("%y-%b").parse;

var map = d3.select("#map").append("svg")
    .attr("width", mapwidth)
    .attr("height", mapheight);


var projection = d3.geo.mercator();


var path = d3.geo.path()
    .projection(projection);


var x = d3.time.scale()
    .range([0, width]);


var y = d3.scale.linear()
    .range([height, 0]);

var area = d3.svg.area()
    .x(function(d) {
        return x(d.date);
    })
    .y0(height)
    .y1(function(d) {
        return y(d.price);
    });

var line = d3.svg.line()
    .x(function(d) {
        return x(d.date);
    })
    .y(function(d) {
        return y(d.price);
    });




var outline;
var chinacity;


d3.selection.prototype.moveToFront = function() {
    return this.each(function() {
        this.parentNode.appendChild(this);
    });
};

d3.json("js/CHN_adm0.json", function(error, us) {


    if (error) return console.error(error);

    outline = topojson.feature(us, us.objects.CHN_adm0)



    projection
        .scale(1)
        .translate([0, 0]);

    var b = path.bounds(outline),
        s = .95 / Math.max((b[1][0] - b[0][0]) / mapwidth, (b[1][1] - b[0][1]) / mapheight),
        t = [(mapwidth - s * (b[1][0] + b[0][0])) / 2, (mapheight - s * (b[1][1] + b[0][1])) / 2];


    projection
        .scale(s)
        .translate(t);


    map.append('path')
        .datum(outline)
        .attr('class', 'china')
        .attr('d', path);


    d3.csv("data/china_cities.csv", function(error, data) {


        chinacity = map.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "chinacities")
            .attr("transform", function(d) {
                return "translate(" + projection([d.Lng, d.Lat]) + ")";
            });

        chinacity.append("circle")
            .attr("r", 3)
            .style("fill", "#1280A6")
            .style("opacity", 1);

        chinacity.append("text")
            .attr("x", 5)
            .attr("y", function(d) {

                if (d.chinacities == "Beijing") {
                    return -4;
                } else if (d.chinacities == "Dalian" || d.chinacities == "Changde") {
                    return 6;
                } else {
                    return 0
                }
            })
            .style("fill", "#1280A6")
            .style("font-weight", "bold")
            .style("font-size", "1.1em")
            .style("font-style", "'Helvetica Neue', Helvetica, Arial, Geneva, sans-serif;")
            .style("text-shadow", "0px 0px 3px rgba(255, 255, 255, 0.6)")
            .text(function(d) {
                return d.chinacities;
            });

        chinacity.moveToFront();
        pymChild = new pym.Child();

    });




});

d3.select(window).on('resize', resize);


function resize() {
    // adjust things when the window size changes
    mapwidth = parseInt(d3.select('#map').style('width'));
    mapwidth = mapwidth - margin.left - margin.right;
    mapheight = mapwidth * mapRatio;

    if (winwidth < 450) {

        var width = winwidth / 2 - margin.left - margin.right;

    } else {

        var width = winwidth / 3 - margin.left - margin.right;

    }

    // update projection
    projection
        .scale(1)
        .translate([0, 0]);

    var b = path.bounds(outline),
        s = .95 / Math.max((b[1][0] - b[0][0]) / mapwidth, (b[1][1] - b[0][1]) / mapheight),
        t = [(mapwidth - s * (b[1][0] + b[0][0])) / 2, (mapheight - s * (b[1][1] + b[0][1])) / 2];


    projection
        .scale(s)
        .translate(t);

    chinacity.attr("transform", function(d) {
        return "translate(" + projection([d.Lng, d.Lat]) + ")";
    });

    chinacity.moveToFront();


    // resize the map container
    map
        .style('width', mapwidth + 'px')
        .style('height', mapheight + 'px');


    // resize the map
    map.select('.china').attr('d', path);

    pymChild = new pym.Child();
}

var svg;




d3.csv("data/chinahousingprices.csv", type, function(error, data) {




    var industries = d3.nest()
        .key(function(d) {
            return d.city;
        })
        .entries(data);




    var $chart = $('#chart');




    prepareGraphic();

    function prepareGraphic() {




        x.domain([
            d3.min(industries, function(city) {
                return city.values[0].date;
            }),
            d3.max(industries, function(city) {
                return city.values[city.values.length - 1].date;
            })
        ]);

        y.domain([
            d3.min(industries, function(city) {
                return city.values[0].price;
            }) - 30,
            d3.max(industries, function(city) {
                return city.values[city.values.length - 1].price;
            }) + 30

        ]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(d3.time.format("%b '%y"))
            .tickValues(x.domain());

        //Define Y axis
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(8)
            .tickFormat(function(d) {
                return parseInt(d, 10)
            });



        svg = d3.select("#chart").selectAll("svg")
            .data(industries)
            .enter().append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .each(multiple);

        svg.append("text")
            .attr("x", width / 3)
            .attr("y", height + 40)
            .attr("height", 60)
            .style("text-anchor", "start")
            .style("fill", "#333")
            .style("font-size", "1.5em")
            .style("font-weight", "bold")
            .text(function(d) {
                return d.key;
            })


        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .style("font-size", "1.3em")
            .style("font-weight", "bold")
            .style("fill", "#1280A6")
            .call(xAxis);


        if (winwidth < 450) {

            svg.style("font-size", "0.8em")

        }



        //Create Y axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0,0)")
            .call(yAxis);


    }




});



function multiple(city) {
    var svg = d3.select(this);




    svg.append("path")
        .attr("class", "area")
        .attr("d", area(city.values));

    svg.append("path")
        .attr("class", "line")
        .attr("d", line(city.values));

    svg.append("text")
        .attr("class", "price1")
        .attr("dx", 5)
        .attr("dy", y(city.values[0].price) - 10)
        .style("font-size", "1.3em")
        .style("font-weight", "bold")
        .style("fill", "#1280A6")
        .text(city.values[0].price + " ¥")



    svg.append("text")
        .attr("class", "price2")
        .attr("dx", width - margin.right - 10)
        .attr("dy", y(city.values[city.values.length - 1].price) - 10)
        .style("font-size", "1.3em")
        .style("font-weight", "bold")
        .style("fill", "#1280A6")
        .text(city.values[city.values.length - 1].price + " ¥")



    pymChild = new pym.Child();

}



function type(d) {
    d.price = +d.price;
    d.date = parseDate(d.date);
    return d;
}

