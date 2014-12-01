var cart2dProjection = function() {
  var
    scale = m.prop( [ 1, 1 ] ),
    translate = m.prop( [ 0, 0 ] ),
    projection = d3.geo.transform( {
      point: function( x0, x1 ) {
        var
          m = scale(),
          y = translate();

        this.stream.point( x0 * m[0] + y[0], x1 * m[1] + y[1] );
      }
    } );

  projection.scale = function() {
    scale.apply( scale, arguments );
    return projection;
  };

  projection.translate = function() {
    translate.apply( translate, arguments );
    return projection;
  };

  return projection;
};
