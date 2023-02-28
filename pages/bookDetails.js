import { bookService } from '../services/book.service.js'
import AddReview from '../cmps/AddReview.js'

export default {
  props: ['book'],
  template: `
        <section class="book-details" v-if="book">
            <h2><span>Title:</span> {{ book.title }}</h2>
            <h3><span>Subtitle:</span> {{ book.subtitle }}</h3>
            <h3><span>Authors:</span> {{ book.authors[0] }}</h3>
            <h3><span>PublishedDate:</span> {{ book.publishedDate }}</h3>
            <pre>{{ book.description }}</pre>
            <h3><span>Page Count:</span> {{ book.pageCount }}</h3>
            <h3><span>Categories:</span> {{ book.categories[0] + book.categories[1] }}</h3>
            <h3><span>Language:</span> {{ book.language }}</h3>
            <h3><span>Price:</span> {{ book.listPrice.amount}}  {{book.listPrice.currencyCode }}</h3>
            <pre>{{ book.listPrice.isOnSale }}</pre>
            <img :src="book.thumbnail" alt="">
            <nav>
              <RouterLink :to="'/book/' + book.nextBookId">Next book</RouterLink> |
              <RouterLink :to="'/book/' + book.prevBookId">Previous book</RouterLink> |
                <hr />
              <RouterLink to="/book">Back to list</RouterLink>
              <AddReview  @save-review="saveReview"/>
            </nav>
            
        </section>
    `,
  data() {
    return {
      book: null,
    }
  },
  created() {
    this.loadBook()
  },
  computed: {
    bookId() {
      return this.$route.params.bookId
    },
  },
  watch: {
    bookId() {
      this.loadBook()
    },
  },
  methods: {
    loadBook() {
      bookService.get(this.bookId).then((book) => (this.book = book))
    },
    formattedPrice() {
      const { amount, currencyCode } = this.book.listPrice
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: currencyCode,
      }).format(amount)
    },
  },
  components: {
    AddReview,
  },
}
