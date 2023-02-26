export default {
  props: ['book'],
  template: `
        <article class="book-preview">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.listPrice.amount + book.listPrice.currencyCode }}</h3>
      <img :src="book.thumbnail" alt="">
      <h4>{{ book.description }}</h4>

        </article>
    `,
}
