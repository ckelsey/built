/** BORROWED HEAVILY FROM: https://stackoverflow.com/a/15528789 */

export function GetCurve(points, tension, closedPath, frames) {
    tension = tension === undefined ? 0.5 : tension
    closedPath = closedPath ? true : false
    frames = frames === undefined ? 16 : frames

    const numOfSegments = Math.round(frames * .3295)
    const isPairs = Array.isArray(points[0])
    const res = []
    let pts = points.slice(0)
    let pts2 = pts.slice(0)
    let x
    let y
    let t1x
    let t2x
    let t1y
    let t2y
    let c1
    let c2
    let c3
    let c4
    let st
    let t
    let i

    function ptsMapper(p) {
        return [p, p]
    }

    if (isPairs) {
        pts = pts.concat.apply([], pts)
    } else {
        pts = pts.concat.apply([], pts.map(ptsMapper))
    }

    pts2 = pts.slice(0)

    if (closedPath) {
        pts.unshift(pts2[pts2.length - 1])
        pts.unshift(pts2[pts2.length - 2])
        pts.unshift(pts2[pts2.length - 1])
        pts.unshift(pts2[pts2.length - 2])
        pts.push(pts2[0])
        pts.push(pts2[1])
    } else {
        pts.unshift(pts2[1])
        pts.unshift(pts2[0])
        pts.push(pts[pts2.length - 2])
        pts.push(pts[pts2.length - 1])
    }

    for (i = 2; i < (pts.length - 4); i += 2) {
        for (t = 0; t <= numOfSegments; t++) {

            // calc tension vectors
            t1x = (pts[i + 2] - pts[i - 2]) * tension
            t2x = (pts[i + 4] - pts[i]) * tension

            t1y = (pts[i + 3] - pts[i - 1]) * tension
            t2y = (pts[i + 5] - pts[i + 1]) * tension

            // calc step
            st = t / numOfSegments

            // calc cardinals
            c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1
            c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2)
            c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st
            c4 = Math.pow(st, 3) - Math.pow(st, 2)

            // calc x and y cords with common control vectors
            x = c1 * pts[i] + c2 * pts[i + 2] + c3 * t1x + c4 * t2x
            y = c1 * pts[i + 1] + c2 * pts[i + 3] + c3 * t1y + c4 * t2y

            res.push([x, y])
        }
    }

    function resMapper(p) {
        return p[0]
    }

    return isPairs ? res : res.map(resMapper)
}