import { googleBookService } from "../services/googleBook.service.js"

export default {
  template: `
  <header class="add-google-book">
    <h1>Google Search</h1>
    <form @submit.prevent="search">
        <input type="text"
                v-model="term"
                placeholder="Enter title">
                <button>Search</button>
    </form>

  </header>
  <ul v-if="books" v-for="book in books">
    <li>{{book.volumeInfo.title}}<button @click="onAddBook(book.id)">+</button></li>
  `,
  data() {
    return {
      term : '',
      book : null
    }
  },
  methods : {
    search() {
        googleBookService.query(this.term)
            .then(books => {
                this.books = books
            })
    },
    onAddBook(bookId) {
        const googleBook = this.books.find(book => book.id === bookId)
                            console.log('googleBook', ({ ...googleBook }));
                            googleBookService.addGoogleBook(googleBook)
    }
  },
  watch: {
    search() {
      console.log('search changed', this.search)
    },
  },
}
