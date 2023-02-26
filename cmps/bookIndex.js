import { bookService } from '../services/book.service.js'

import bookFilter from './bookFilter.js'
import bookList from './bookList.js'

import bookDetails from './bookDetails.js'
import bookEdit from './bookEdit.js'

export default {
    template: `
        <section class="book-index">
            <bookFilter @filter="setFilterBy"/>
            <bookList 
                :books="filteredBooks" 
                v-if="books"
                @remove="removeBook" 
                @show-details="showBookDetails" />
            <bookEdit @book-saved="onSaveBook"/>
            <bookDetails 
                v-if="selectedBook" 
                @hide-details="selectedBook = null"
                :book="selectedBook"/>
        </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: {bookName: '', bookPrice: 100},
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                })
        },
        showBookDetails(bookId) {
            this.selectedBook = this.books.find(book => book.id === bookId)
        },
        onSaveBook(newBook) {
            this.books.unshift(newBook)
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredBooks() {
            const regex = new RegExp(this.filterBy.bookName, 'i')
            return this.books.filter(book => regex.test(book.title) && this.filterBy.bookPrice >= book.listPrice.amount)
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        bookFilter,
        bookList,
        bookDetails,
        bookEdit,
    }
}