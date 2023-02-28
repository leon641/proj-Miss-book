import { utilService } from './util.service.js'
import { bookService } from './book.service.js'

const SEARCH_KEY = 'searchDB'
let gCacheSearch = utilService.loadFromStorage(SEARCH_KEY) || {}

export const googleBookService = {
  query,
  addGoogleBook,
}

function query(term) {
  if (gCacheSearch[term]) return Promise.resolve(gCacheSearch[term])

  const url = `https://www.googleapis.com/books/v1/volumes?q=search+${term}`
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
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
  const bookIdx = gSavedBooks.findIndex((book) => book.id === googleBook.id)
  if (bookIdx > -1) return

  const id = googleBook.id
  const title = googleBook.volumeInfo.title
  const subtitle = googleBook.volumeInfo.subtitle
  const authors = { ...googleBook.volumeInfo.authors }
  const categories = googleBook.volumeInfo.categories
  const country = googleBook.saleInfo.country
  const forSale = googleBook.saleInfo.isEbook
  const description = googleBook.volumeInfo.description
  const img =
    googleBook.volumeInfo.imageLinks.smallThumbnail ||
    'http://coding-academy.org/books-photos/20.jpg'
  const language = googleBook.volumeInfo.language
  const publishedDate = googleBook.volumeInfo.publishedDate
  const ratingCount = googleBook.volumeInfo.averageRating
  const pageCount = googleBook.volumeInfo.ratingCount

  const googleFormattedBook = {
    isGoogleBook: true,
    id: id,
    title: title,
    subtitle: subtitle,
    authors: authors,
    publishedDate: publishedDate,
    description: description,
    pageCount: pageCount,
    categories: categories,
    thumbnail: img,
    language: language,
    listPrice: {
      amount: 109,
      currencyCode: country,
      isOnSale: forSale,
    },
    review: { rating: ratingCount },
  }

  gSavedBooks.push(googleFormattedBook)
  utilService.saveToStorage(SAVED_BOOKS, gSavedBooks)
  bookService.save(googleFormattedBook)
}
