import { bookService } from "../services/book.service.js"

export default {
    template: `
        <section class="book-edit">
            <h2>Add a book</h2>
            <form @submit.prevent="save">
                <input type="text" v-model="book.bookName" placeholder="bookName">
                <input type="number" v-model.number="book.bookPrice">
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            book: bookService.getEmptyBook()
        }
    },
    methods: {
        save() {
            bookService.save(this.book)
                .then(savedbook => {
                    this.book = bookService.getEmptyBook()
                    this.$emit('book-saved', savedbook)
                })
        }
    }
}