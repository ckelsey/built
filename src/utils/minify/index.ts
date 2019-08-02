const Minify = (val) => val.split(/(\r\n|\n|\r)/gm).map((v) => v.trim()).filter((v) => v && v !== ``).join(``)
export default Minify
