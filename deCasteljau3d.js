/**
 *
 * Very simple one, with a little optimization.
 *
 */

function deCasteljauBezier(points, step) {

    var bezier = [];
    var controlPoints = points.map(function (p) {
        return {x: p.x, y: p.y, z: p.z};
    });

    var totalPointCount = controlPoints.length;

    step = step || 0.001;
    for (var time = 0; time < 1; time += step) {
        //i = 0 first point is the start point,no need to reposition
        for (var i = 1; i < totalPointCount; i++) {
            //last point no need to reposition too.
            var pointIndexAheadOfTail = totalPointCount - i;
            for (var j = 0; j < pointIndexAheadOfTail; j++) {
                controlPoints[j] = reposition(controlPoints, j, time);
            }

        }
        //end if very close to end point
        if(
            Math.abs(controlPoints[0].x - points[totalPointCount - 1].x) < 0.0001
            &&
            Math.abs(controlPoints[0].y - points[totalPointCount - 1].y) < 0.0001
            &&
            Math.abs(controlPoints[0].z - points[totalPointCount - 1].z) < 0.0001
        ){
            bezier.push(points[totalPointCount - 1]);
            break;
        }

        bezier.push(controlPoints[0]);
    }

    return bezier;

}

function reposition(points, currentControlPointIndex, time) {
    ;
    var nextControlPointIndex = currentControlPointIndex + 1;
    return {
        x: adjustPoint(points[currentControlPointIndex].x, points[nextControlPointIndex].x, time),
        y: adjustPoint(points[currentControlPointIndex].y, points[nextControlPointIndex].y, time),
        z: adjustPoint(points[currentControlPointIndex].z, points[nextControlPointIndex].z, time)
    }
}

function adjustPoint(a, b, time) {
    return a * (1 - time) + b * (time);
}

