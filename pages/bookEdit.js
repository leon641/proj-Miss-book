import { bookService } from '../services/book.service.js'
import { eventBusService } from '../services/event-bus.service.js'

export default {
  template: `
        <section class="book-edit">
            <h2>{{(book.id)? 'Edit' : 'Add'}} a book</h2>
            <form @submit.prevent="save">
                <input type="text" v-model="book.title" placeholder="Book name">
                <input type="number" v-model.number="book.listPrice.amount">
                <button>Save</button>
            </form>
        </section>
    `,
  data() {
    return {
      book: bookService.getEmptyBook(),
    }
  },
  created() {
    const { bookId } = this.$route.params
    if (bookId) {
      bookService.get(bookId).then((book) => (this.book = book))
    }
  },
  methods: {
    save() {
      bookService.save(this.book).then((savedBook) => {
        eventBusService.emit('show-msg', {txt: 'Book saved', type: 'success'})
        this.$router.push('/book')
      })
    },
  },
}
