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
    provs  = svg
      .append( 'g' )
      .attr( 'class', 'provinces' ),
    labels = svg
      .append( 'g' )
      .attr( 'class', 'labels' ),

    labelX = R.compose( R.subtract( void( 0 ), 20 ), R.head, path.centroid ),
    labelY = R.compose( R.add( 5 ), R.nth( 1 ), path.centroid ),
    labelText = R.prop( 'abbr' ),

    addAbbr = R.flip( R.assoc ( 'abbr' ) ),
    addPolygonType = R.assoc( 'type', 'Polygon' ),

    addAbbrs = R.mapObj.idx( addAbbr ),
    mkPolygons = R.mapObj( addPolygonType ),

    polygonizeBoard = R.compose( R.values, addAbbrs, mkPolygons ),
    polygonBoard = polygonizeBoard( rawBoard );

  provs
    .selectAll( 'path' )
    .data( polygonBoard )
    .enter()
      .append( 'path' )
      .attr( 'id', R.prop( 'abbr' ) )
      .attr( 'class', R.prop( 'region' ) )
      .attr( 'd', path );

  labels
    .selectAll( 'path' )
    .data( polygonBoard )
    .enter()
      .append( 'text' )
      .attr( 'id', R.compose( R.concat( 'label-' ), R.prop( 'abbr' ) ) )
      .attr( 'x', labelX )
      .attr( 'y', labelY )
      .text( labelText );

} );
