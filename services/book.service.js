'use strict'
import booksJSON from '../data/booksData.json' assert { type: 'json' }
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
  addReview,
  removeReview,
}

function query(filterBy = {}) {
  return storageService.query(book_KEY).then((books) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      books = books.filter((book) => regex.test(book.bookName))
    }
    if (filterBy.bookPrice) {
      books = books.filter((book) => book.bookPrice >= filterBy.bookPrice)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(book_KEY, bookId)
  .then(book =>{
    return setNextPrevBookId(book)
  }) 
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

function getEmptyBook(title = '', amount = 0) {
  return {
    id: '',
    title,
    subtitle: 'some subtitle',
    authors: ['barbara, shem'],
    publishedDate: 1986,
    description: 'some lorem',
    pageCount: 245,
    categories: ['romance', 'love'],
    thumbnail: 'http://ca.org/books-photos/20.jpg',
    language: 'en',
    listPrice: {
      amount: 100,
      currencyCode: 'EUR',
      isOnSale: true,
    },
  }
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

function removeReview(bookId, reviewId) {
  return get(bookId).then((book) => {
    const idx = book.reviews.findIndex((review) => review.id === reviewId)
    book.reviews.splice(idx, 1)
    return save(book)
  })
}
//new function cr

function addReview(bookId, review) {
  return get(bookId).then((book) => {
    review.id = utilService.makeId(4)
    if (!book.reviews) {
      book.reviews = []
    }
    book.reviews.push(review)
    return save(book)
  })
}

function setNextPrevBookId(book) {
  return storageService.query(book_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
      book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
      book.prevBookId = books[bookIdx - 1]
          ? books[bookIdx - 1].id
          : books[books.length - 1].id
      return book
  })
}
