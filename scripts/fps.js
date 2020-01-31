function averageFps() {
    let frames = UI.panels.timeline._flameChart._model._frameModel._frames
    let duration = (frames[frames.length - 1].endTime - frames[0].startTime) / 1000
    let average = frames.length / duration

    return +average.toFixed(2)
}