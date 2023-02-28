import { bookService } from '../services/book.service.js'

import bookFilter from '../cmps/bookFilter.js'
import bookList from '../cmps/bookList.js'
import {eventBusService} from '../services/event-bus.service.js'


export default {
    template: `
        <section class="book-index">
            <RouterLink to="/book/edit">Add a book</RouterLink>
            <bookFilter @filter="setFilterBy"/>
            <bookList 
                :books="filteredBooks" 
                v-if="books"
                @remove="removeBook"/>
            
        </section>
    `,
    data() {
        return {
            books: null,
            
            filterBy: {bookName: '', bookPrice: 250},
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    eventBusService.emit('show-msg', {txt: 'Book removed', type: 'success'})
                })
        },
       
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredBooks() {
            const regex = new RegExp(this.filterBy.bookName, 'i')
            return this.books.filter(book => regex.test(book.title) && 
                   this.filterBy.bookPrice >= book.listPrice.amount)
        }
    },
   
    components: {
        bookFilter,
        bookList,
    }
}