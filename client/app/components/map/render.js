/*
function clicked(d) {
  var centroid = path.centroid(d),
      translate = projection.translate();

  projection.translate([
    translate[0] - centroid[0] + width / 2,
    translate[1] - centroid[1] + height / 2
  ]);

  zoom.translate(projection.translate());

  g.selectAll('path').transition()
      .duration(700)
      .attr('d', path);
}

function zoomed() {
  projection.translate(d3.event.translate).scale(d3.event.scale);
  g.selectAll('path').attr('d', path);
}

var width = 960,
    height = 500;

var projection = d3.geo.albersUsa()
    .scale(1070)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var zoom = d3.behavior.zoom()
    .translate(projection.translate())
    .scale(projection.scale())
    .scaleExtent([height, 8 * height])
    .on('zoom', zoomed);

var svg = d3.select('main').append('svg')
    .attr('width', width)
    .attr('height', height);

var g = svg.append('g')
    .call(zoom);

g.append('rect')
    .attr('class', 'background')
    .attr('width', width)
    .attr('height', height);

d3.json('/app/components/map/us.json', function(error, us) {
  g.append('g')
      .attr('id', 'states')
    .selectAll('path')
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append('path')
      .attr('d', path)
      .on('click', clicked);

  g.append('path')
      .datum(topojson.mesh(us, us.objects.states,
      function(a, b) { return a !== b; }))
      .attr('id', 'state-borders')
      .attr('d', path);
});

*/

// TODO test group by *.type
// TODO group by region
// TODO verify number of supply

var
  addAbbr =  R.mapObj.idx( R.flip( R.assoc( 'abbr' ) ) ),
  getProvs = R.compose( R.values, addAbbr ),
  abbr = R.prop( 'path' ),
  mkPath = function( terrirory ) {
    return 'M' + terrirory.path.reduce( function( acc, nextPoint ) {
      return acc + ( nextPoint[0] * 20 ) + ',' + ( nextPoint[1] * 20 ) + ' ';
    }, '' ) + 'z';
  };

d3.json( '/app/components/map/map-data.json', function( err, board ) {

  if ( err ) {
    throw err;
  }

  d3.select( 'main' )
    .append( 'svg' )
    .attr( 'width', 960 )
    .attr( 'height', 500 )

    .selectAll( 'path' )
    .data( getProvs( board ) )
    .enter()
      .append( 'path' )
      .attr( 'd', mkPath  )
      .attr( 'class', R.prop( 'region' ) );

} );
