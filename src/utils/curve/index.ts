/** BORROWED HEAVILY FROM: https://stackoverflow.com/a/15528789 */

export const GetCurve = (points, tension = 0.5, closedPath = false, frames = 16) => {
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

    if (isPairs) {
        pts = pts.concat.apply([], pts)
    } else {
        pts = pts.concat.apply([], pts.map(p => [p, p]))
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

    return isPairs ? res : res.map(p => p[0])
}

const distance = v => v[1] - v[0]

export const EasePower = (stepDecimal, pow = 4) => 1 - Math.pow(1 - stepDecimal, pow)

export const GetEase = (values, duration, pow, powerFn) => {
    const results = []
    let index = 0

    while (index < duration - 1) {
        const current = Math.round((distance(values) * powerFn(index, duration, pow)) * 1000) / 1000
        results.push(values[0] + current)
        index = index + 1
    }

    results.push(values[1])

    return results
}

export const EaseIn = (values, duration, pow = 4) =>
    GetEase(
        values,
        duration,
        pow,
        (index, frames) => {
            const t = index / frames
            return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        }
    )

export const EaseOut = (values, duration, pow = 4) =>
    GetEase(
        values,
        duration,
        pow,
        (index, frames, pow) => EasePower(index / frames, pow)
    )

export const EaseInOut = (values, duration, pow = 4) =>
    GetEase(
        values,
        duration,
        pow,
        (index, frames, pow) => EasePower((index / frames) * (index / frames), pow)
    )

export const EaseBounce = (values, duration, pow = 4) =>
    GetEase(
        values,
        duration,
        pow,
        (index, frames, pow) => EasePower(1 - (index / frames), pow)
    )

export default GetCurve