// import { isString } from '../type'

export const replaceWith = (
    value,
    searchReplace,
    // replace = ``, 
    // ignoreCase = true
) => {
    const time = window.performance.now()
    const keys = Object.keys(searchReplace)
    let result = value.slice(0)
    let index = 0

    while(index < keys.length){
        const key = keys[index]
        const replacement = searchReplace[key]
        const reg = new RegExp(key, 'gi')
        // result = result.split(`/${key}/gi`).join(searchReplace[key])
        result = result.split(reg).join(replacement)
        index = index + 1
    }

    // for (let i = 0, length = value.length; i < length; i++) {
    //     const char = value[i]
    //     const index = keys.indexOf(char)
    //     if (index>-1) {
    //         result += searchReplace[keys[index]];
    //     } else {
    //         result += char;
    //     }
    // }

    console.log(window.performance.now() - time, result.length)
    return result


    // If not an object with find:replace, create it
    // if (isString(searchReplace)) {
    //     searchReplace = {
    //         [searchReplace]: {
    //             to: replace,
    //             ignoreCase
    //         }
    //     }
    // }

    // Object.keys(searchReplace).forEach(searchKey => {
    //     value = value.replace(searchKey, searchReplace[searchKey].to)
    //     // value = value.replace(new RegExp(searchKey, `gi`), searchReplace[searchKey].to)
    // })

    // let currentCharacterIndex = 0

    // const searchKeys = Object.keys(searchReplace).map(k => ({
    //     searchTerm: searchReplace[k].ignoreCase ? k.toLowerCase() : k,
    //     key: k
    // }))

    // while (currentCharacterIndex < value.length) {
    //     let currentSearchIndex = 0

    //     while (currentSearchIndex < searchKeys.length) {

    //         const currentSearch = searchKeys[currentSearchIndex]
    //         const searchTerm = currentSearch.searchTerm
    //         const searchKey = currentSearch.key
    //         let currentValue = value.slice(currentCharacterIndex, currentCharacterIndex + searchTerm.length)

    //         if (searchReplace[searchKey].ignoreCase) {
    //             currentValue = currentValue.toLowerCase()
    //         }

    //         if (searchTerm === currentValue) {
    //             const prefix = value.slice(0, currentCharacterIndex)
    //             const suffix = value.slice(currentCharacterIndex + searchTerm.length)
    //             const replacement = searchReplace[searchKey].to
    //             value = prefix + replacement + suffix
    //             currentCharacterIndex = (currentCharacterIndex + replacement.length) - 1
    //             break;
    //         }

    //         currentSearchIndex = currentSearchIndex + 1
    //     }

    //     currentCharacterIndex = currentCharacterIndex + 1
    // }

    // console.log(window.performance.now() - time, result.length)
    // return value
}