import $ from 'jquery';

export const createHeader = () => {
    const header = $(`
        <header>
            <div class="iconShopping">
                <img src="https://icons.iconarchive.com/icons/graphicloads/100-flat/256/cart-icon.png"
                width='50'
                hight='50'
                border-radius='50'
                alt='Naciśnij zeby otworzyc koszyk'>
            </div>
        </header>
    `);
    
    // Show order detalis view
    const iconShopping = header.find('.iconShopping')
    iconShopping.on('click', showCart)

    function showCart() {
        const cart = document.getElementById('card')
        cart.classList.add('active')
    }

    return header;
};
