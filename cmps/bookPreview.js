export default {
  props: ['book'],
  template: `
        <article class="book-preview">
            <h2>{{ book.title }}</h2>
            <img :src="book.thumbnail" alt="">
            <h3>{{ formattedCurrency }}</h3>
        </article>
    `,
    computed: {
        formattedCurrency() {
            const { amount, currencyCode } = this.book.listPrice
            return Intl.NumberFormat('en', { style: 'currency', currency: currencyCode }).format(amount)
        }
    },
}
