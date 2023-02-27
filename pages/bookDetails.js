import { bookService } from '../services/book.service.js'

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
            <RouterLink to="/book">Back to list</RouterLink>
        </section>
    `,
  data() {
    return {
      book: null,
    }
  },
  created() {
    const { bookId } = this.$route.params
    bookService.get(bookId).then((book) => (this.book = book))
  },
  methods: {
    formattedPrice() {
      const { amount, currencyCode } = this.book.listPrice
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: currencyCode,
      }).format(amount)
    },
  },
}
