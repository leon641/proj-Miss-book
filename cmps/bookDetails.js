export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.subtitle }}</h3>
            <h4>{{ book.authors[0] }}</h4>
            <h4>{{ book.publishedDate }}</h4>
            <img :src="book.thumbnail" alt="">
            <pre>{{ book.description }}</pre>
            <pre>{{ book.pageCount }}</pre>
            <pre>{{ book.categories[0] + book.categories[1] }}</pre>
            <pre>{{ book.language }}</pre>
            <pre>Price:{{ book.listPrice.amount + book.listPrice.currencyCode }}</pre>
            <pre>{{ book.listPrice.isOnSale }}</pre>
            <button @click="closeDetails">Close</button>
        </section>
    `,
    methods: {
        closeDetails(){
            this.$emit('hide-details')
        }
    }
}