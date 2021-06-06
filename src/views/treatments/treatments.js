import $ from 'jquery';
import axios from 'axios';
import { calendar } from '../../cart/calendar';
import { addToBasket } from '../../cart/cartBehaviour';

export const treatments = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2>Treatments</h2>');
    const treatmentList = $('<section></section>');

    fragment.append(h2)
    fragment.append(treatmentList)

    // Object { id: 1, name: "Masaż rozgrzanym monitorem", area: "back", time: 30, price: 80} 
    axios
        .get('http://localhost:3000/treatments')
        .then(response => response.data)
        .then(treatments => treatments.map(treatment => {
            const h4 = $(
                        `<div class="room-header-img" d-flex>
                            <h3 class="room-name">${treatment.name}</h3>
                            <img class="room-img" src=${treatment.img}/>
                        </div>`);
            const article = $(`
                <article>
                   <div class="article-container d-flex">
                    <p><strong>Area:</strong> ${treatment.area}</p>
                    <p><strong>Time:</strong> ${treatment.time}</p>
                    <p class="price-of-item"><strong>Price:</strong> ${treatment.price.toFixed(2)}</p>
                    </div>
                    </article>
            `);
            
             const basketButton = $(`
                <button class="basket-button">Add to Cart
                 </button>`);

            const datepicker = (`<div class="start-datepicker">Choose the Date:
                                 <input type="date" id="start"></div>`) 

            h4.on('click', () => {
                const customEvent = new CustomEvent('navigation', {
                    detail: {
                        name: 'treatment-details',
                        treatmentId: treatment.id
                    }
                });

                document.dispatchEvent(customEvent);
            });
            basketButton.on('click', (e) => {
                addToBasket(e);});

            article.prepend(h4);
            article.find('.article-container').append(datepicker);
            article.find('.article-container').append(basketButton);
            return article;
        }))

    .then(articles => treatmentList.append(articles));


    // add elements to 'fragment'


    return fragment;
};