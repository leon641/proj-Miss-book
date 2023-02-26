'use strict'
import booksJSON from '../data/booksData.json' assert {type:'json'}
import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const book_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook: getEmptyBook,
}

function query(filterBy = {}) {
    return storageService.query(book_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regex.test(book.bookName))
            }
            if (filterBy.bookPrice) {
                books = books.filter(book => book.bookPrice >= filterBy.bookPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(book_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(book_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(book_KEY, book)
    } else {
        return storageService.post(book_KEY, book)
    }
}

function getEmptyBook(bookName = '', bookPrice = 0) {
    return { id: '', bookName, bookPrice }
}

function _createBooks() {
    let books = utilService.loadFromStorage(book_KEY)
    if (!books || !books.length) {
        books = booksJSON
        utilService.saveToStorage(book_KEY, books)
    }
}

function _createBook(bookName, bookPrice = 250) {
    const book = getEmptyBook(bookName, bookPrice)
    book.id = utilService.makeId()
    return book
}