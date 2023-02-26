export default {
    template: `
        <section class="book-filter">
            <input 
                v-model="filterBy.bookName"
                @input="filter" 
                placeholder="Search"
                type="text" />
        </section>
    `,
    data() {
        return {
            filterBy: { bookName: '', bookPrice: 0 },
        }
    },
    methods: {
        filter(){
            this.$emit('filter', this.filterBy)
        }
    }
}