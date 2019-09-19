/* TODO - use js generator to create unique ids */
const ID = (prefx = ``) => `${prefx}${
    (new Date().getTime() / 1000 | 0).toString(16)
    }xxxxxxxxxxxxxxxx`
    .replace(/[x]/g,
        () => (Math.random() * 16 | 0).toString(16))
    .toLowerCase()

export default ID