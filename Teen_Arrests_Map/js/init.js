var pymChild = null;

var winwidth = parseInt(d3.select('#map').style('width'));

var margin = {top: 8, right: 21, bottom: 77, left: 40},
    mapRatio = 0.5,
    Ratio = 1,
    mapwidth = winwidth,
    mapwidth = mapwidth,
    mapheight = mapwidth * mapRatio;

var map = d3.select("#map").append("svg")
    .attr("width", mapwidth)
    .attr("height", mapheight);


var projection = d3.geo.mercator();


       var path = d3.geo.path()
           .projection(projection);



           var rateById = d3.map();




var outline;
var olympicplace;

// The tooltip
var div = d3.select("#map").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 1)
    .html("<h2>All of Rio de Janeiro</h2><div id='infobox'><h3>Total Detention of Minors (2015 - 2016): <br><span class='number'>5,538</span></h3><h4>2016 (Jan. & Feb.)</h4> <p>Out of <b>944</b> youths arrested, <b>648</b> then went on through the juvenile justice system.</p><h4>2015</h4> <p>Out of <b>4,594</b> youths arrested, <b>4,187</b> then went on through the juvenile justice system.</p></div>")



d3.selection.prototype.moveToFront = function() {
           return this.each(function() {
               this.parentNode.appendChild(this);
           });
       };


queue()
    .defer(d3.json, "js/rio_limite_dp.json")
    .defer(d3.csv, "data/nabe_total_sum.csv")
    .await(ready);

      function ready(error, us, data) {

        var Total = {};

        var Nabe = {};

        var TakenDP_2015 = {};

        var TakenDP_2016 = {};

        var TakenSocial_2015 = {};

        var TakenSocial_2016 = {};

        data.forEach(function(d) {
    Total[d.ID1] = +d.TOTAL_nabe;
    TakenDP_2015[d.ID1] = +d.TakenDP_2015;
    TakenDP_2016[d.ID1] = +d.TakenDP_2016;
    TakenSocial_2015[d.ID1] = +d.TakenSocial_2015;
    TakenSocial_2016[d.ID1] = +d.TakenSocial_2016;
    Nabe[d.ID1] = d.units;
 
  });

        var color = d3.scale.quantize()
    .domain([
      5,
    400
      ])
    .range(["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"]);
  



var legend = d3.select('#legend')
  .append('ul')
    .attr('class', 'list-inline');

var keys = legend.selectAll('li.key')
    .data(color.range());

keys.enter().append('li')
    .attr('class', 'key')
    .style('border-top-color', String)
    .text(function(d) {
        var r = color.invertExtent(d);
        return d3.round(r[0]);
    });




  if (error) return console.error(error);

   outline = topojson.feature(us, us.objects.rio_limite_dp)



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
               .attr('class', 'rio')
               .attr('d', path);


           nabes = map.selectAll('path.rio_limite_dp')
               .data(outline.features)
               .enter().append('path')
               .attr('class', 'rionabes')
               .attr('id', function(d) {
                   return d.properties.ID1;
               })
               .attr('d', path)
               .on("mouseover", function(d) { 
                
               d3.select(this.parentNode.appendChild(this))
               .style({
                   'stroke-opacity': 1,
                   'stroke': '#5C5C5C',
                   "stroke-width": 2
               });   
            div .style("opacity", .9)   
            div .html("<h2>" + Nabe[d.id] + "</h2><div id='infobox'><h3>Total Detention of Minors (2015 - 2016): <br><span class='number'>"  + Total[d.id] + "</span></h3><h4>2016 (Jan. & Feb.)</h4> <p>Out of <b>"  + TakenDP_2016[d.id] + "</b> youths arrested, <b>"  + TakenSocial_2016[d.id] + "</b> then went on through the juvenile justice system.</p><h4>2015</h4><p>Out of <b> "  + TakenDP_2015[d.id] + "</b> youths arrested, <b>"  + TakenSocial_2015[d.id] + "</b> then went on through the juvenile justice system.</p></div>")
  
            })          
        .on("mouseout", function(d) { 

          nabes.style({
                   'stroke-opacity': 1,
                   'stroke': '#E6E6E6',
                   "stroke-width": 1
               });  
            div.html("<h2>All of Rio de Janeiro</h2><div id='infobox'><h3>Total Detention of Minors (2015 - 2016): <br><span class='number'>5,538</span></h3><h4>2016 (Jan. & Feb.)</h4> <p>Out of <b>944</b> youths arrested, <b>648</b> then went on through the juvenile justice system.</p><h4>2015</h4> <p>Out of <b>4,594</b> youths arrested, <b>4,187</b> then went on through the juvenile justice system.</p></div>")
        });


          nabes.style("fill", function(d) { return color(Total[d.id])

            


            ; })
  

pymChild = new pym.Child();




         

               };

       d3.select(window).on('resize', resize);


       function resize() {
           // adjust widths and heights for window changes
           mapwidth = parseInt(d3.select('#map').style('width'));
           mapwidth = mapwidth - margin.left - margin.right;
           mapheight = mapwidth * mapRatio;

       

           // Update projection for resize
           projection
               .scale(1)
               .translate([0, 0]);

           var b = path.bounds(outline),
               s = .95 / Math.max((b[1][0] - b[0][0]) / mapwidth, (b[1][1] - b[0][1]) / mapheight),
               t = [(mapwidth - s * (b[1][0] + b[0][0])) / 2, (mapheight - s * (b[1][1] + b[0][1])) / 2];


           projection
               .scale(s)
               .translate(t);


           // resize map container
           map
               .style('width', mapwidth + 'px')
               .style('height', mapheight + 'px');





           // resize map
           map.selectAll('.rio').attr('d', path);
           map.selectAll('.rionabes').attr('d', path);


           
       }

 var svg;


       








