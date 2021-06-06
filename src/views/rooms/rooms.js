import $ from 'jquery';
import axios from 'axios';
import { calendar } from '../../cart/calendar';
import { addToBasket } from '../../cart/cartBehaviour';

export const rooms = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2>Rooms</h2>');
    const roomList = $('<section></section>');

    fragment.append(h2).append(roomList)

    // Object { id: 1, name: "Pokój unarny", beds: 1, guests: 1, price: 170}
    axios
        .get('http://localhost:3000/rooms')
        .then(response => response.data)
        .then(rooms => rooms.map(room => {

            const h4 = $(`<div class="room-header-img" d-flex>
                            <h3 class="room-name">${room.name}</h3>
                            <img class="room-img" src=${room.img}/>
                        </div>`);
            const article = $(`
                        <article>
                        <div class="article-container d-flex">
                            <p><strong>Beds:</strong> ${room.beds}</p>
                            <p><strong>Guests:</strong> ${room.guests}</p>
                            <p class="price-of-item"><strong>Price:</strong> ${room.price}</p>
                        </div>
                        </article>
                    `);
            const basketButton = $(`
                <button class="basket-button">Add to Cart
                </button>
            `);

            h4.on('click', () => {
                const customEvent = new CustomEvent('navigation', {
                    detail: {
                        name: 'room-details',
                        roomId: room.id
                    }
                });
                document.dispatchEvent(customEvent);
            });
            basketButton.on('click', (e) => {
                addToBasket(e);});

            article.prepend(h4);
            article.find('.article-container').append(calendar);
            article.find('.article-container').append(basketButton);
            return article;
        }))
        .then(articles => roomList.empty().append(articles));

    
    // add elements to 'fragment'
    

    return fragment;
};
