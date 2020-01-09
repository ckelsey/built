const invalidQuery = searchString => !searchString || typeof searchString.split !== `function` || searchString === ``

export default invalidQuery