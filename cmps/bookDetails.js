export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h2>{{ book.bookName }}</h2>
            <h3>{{ book.bookPrice }}</h3>
            <button @click="closeDetails">Close</button>
        </section>
    `,
    methods: {
        closeDetails(){
            this.$emit('hide-details')
        }
    }
}