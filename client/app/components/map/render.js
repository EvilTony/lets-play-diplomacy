d3.json( '/app/components/map/map-data.json', function( err, rawBoard ) {

  if ( err ) {
    throw err;
  }

  var
    width = 550,
    height = 550,
    projection = cart2dProjection()
      .scale( R.repeatN( 26, 2 ) ),
    path = d3.geo.path()
      .projection( projection ),
    svg = d3.select( 'main' )
      .append( 'svg' )
      .attr( 'width', width )
      .attr( 'height', height ),

    addAbbr = R.mapObj.idx( R.flip( R.assoc( 'abbr' ) ) ),
    addPolygon = R.mapObj( R.assoc( 'type', 'Polygon' ) ),
    polygonizeBoard = R.compose( R.values, addAbbr, addPolygon ),
    polygonBoard = polygonizeBoard( rawBoard );

  svg
    .selectAll( 'path' )
    .data( polygonBoard )
    .enter()
      .append( 'path' )
      .attr( 'd', path  )
      .attr( 'class', R.prop( 'region' ) );

} );
