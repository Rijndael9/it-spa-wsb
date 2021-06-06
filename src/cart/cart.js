import $ from 'jquery';
import { calendar } from './calendar';


export const createCart = () => {
    const cart = $( 
        `<section id="card" class="cart cart-container">
            <h2>Your order</h2>
            <div class ="iconClose">
            <svg xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
              </div>
            <div class="cart-row">
                <h5 class = "row-item">Name:</h5>
                <h5 class = "row-item">Date:</h5>
                <h5 class = "row-item">Total days:</h5>
                <h5 class = row-item">Price:</h5>
                <h5 class = "row-item">Quantity:</h5>
            </div>
            <div class="basket-total cart-row">
                <strong>Summa: </strong>
                <span class="basket-total-price"> zł</span>
            </div>
            <button class="purchase-button" type="button">Continue</button>
        </section>
        
    `);
    cart.find('.basket-date').append(calendar);

    const iconClose = cart.find('.iconClose')
    iconClose.on('click', closeCart)

    function closeCart() {
        const cart = document.getElementById("card")
        console.log(cart)
        cart.classList.remove('active')
    }
    return cart;

}