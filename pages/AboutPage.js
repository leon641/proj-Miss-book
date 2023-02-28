export default {
    template: `
        <section class="about-page">
            <h2>About</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis enim rem porro delectus. Quos expedita ipsam repellendus voluptas quas, nam ea eligendi veniam ullam, modi impedit eveniet quia quaerat molestias?</p>
            <hr />
            <nav>        
                <RouterLink to="/about/books">Our books</RouterLink> |
            </nav>
            <hr />
            <RouterView/>

        </section>
    `,
}

export const aboutBooks = {
    template: ` <section>
      <h3>Our books are the best</h3>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis enim rem porro delectus. Quos expedita ipsam repellendus voluptas quas, nam ea eligendi veniam ullam, modi impedit eveniet quia quaerat molestias?</p>  </section>
    `
  }
