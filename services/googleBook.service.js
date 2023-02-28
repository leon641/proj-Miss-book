import { utilService } from "./util.service.js"
import { bookService } from "./book.service.js"

const SEARCH_KEY ='searchDB'
let gCacheSearch = utilService.loadFromStorage(SEARCH_KEY) || {}

export const googleBookService = {
    query,
    addGoogleBook
}

function query(term) {
    if(gCacheSearch[term]) return Promise.resolve(gCacheSearch[term])

    const url = `https://www.googleapis.com/books/v1/volumes?q=search+${term}`
    return fetch(url)
    .then(res => res.json())
    .then(res => {
        const books = res.items

        console.log('id', books[0].id)
        console.log('title', books[0].volumeInfo.title)
        console.log('id', books[0].id)
        
        gCacheSearch[term] = books
        utilService.saveToStorage(SEARCH_KEY, gCacheSearch)
        return books
    })
}

function addGoogleBook(googleBook) {
    const book = promise.resolve(googleBook)
    .then(res => res)
    .then(res => console.log('res', res))
}


