d3.json( '/app/components/map/map-data.json', function( err, rawBoard ) {

  if ( err ) {
    throw err;
  }

  var
    _,
    rows = 21,
    columns = 21,
    scale = 26,
    width = columns * scale,
    height = rows * scale,

    projection = cart2dProjection()
      .scale( R.repeatN( scale, 2 ) ),
    path = d3.geo.path()
      .projection( projection ),

    svg = d3.select( 'main' )
      .attr( 'style', 'height:' + height + 'px' )
      .append( 'svg' )
      .attr( 'width', width )
      .attr( 'height', height ),
    provs  = svg
      .append( 'g' )
      .attr( 'class', 'provinces' ),
    labels = svg
      .append( 'g' )
      .attr( 'class', 'labels' ),

    isWide = function( prov ) {
      var
        boundingBox = path.bounds( prov ),
        height = boundingBox[0][0] - boundingBox[1][0],
        width = boundingBox[0][1] - boundingBox[1][1];

      return height > width;
    },

    labelX = function( prov ) {
      return (
        prov.labelDeltas[ 0 ] * columns +
        R.head( path.centroid( prov ) )
      );
    },
    labelY = function( prov ) {
      return (
        prov.labelDeltas[ 1 ] * rows +
        prov.labelDeltas[ 1 ] + R.nth( 1, path.centroid( prov ) )
      );
    },
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
      .attr( 'class', R.ifElse( isWide, R.always( 'wide' ), R.always( '' ) ) )
      .text( labelText );

} );
