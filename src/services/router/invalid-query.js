function invalidQuery(searchString) { return !searchString || typeof searchString.split !== 'function' || searchString === '' }
export default invalidQuery