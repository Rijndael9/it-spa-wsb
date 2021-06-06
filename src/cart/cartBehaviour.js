import $ from 'jquery';
import {calendar, daysCounter} from './calendar';

export let basketCounterGetter = (length = 0) => {
    let basketCounterParagraph = $(document).find('.basketCounter')[0];
    $(basketCounterParagraph).text(length);
}

export let addToBasket = (e) => {
    let basketRows = $(document).find('.cart-row');

    let addItemToBasket = (title, price, dateFrom, dateTo, daysCount) => {
        let basketRow = document.createElement('div');
        $(basketRow).attr('class', 'cart-row');
        let basketTotal = $(document).find('.basket-total')[0];
        let basketItem = $(document).find('.cart-container')[0];
        let basketItemNames = $(basketItem).find('.room-name');
        for(let i = 0; i < basketItemNames.length; i++){
            if(basketItemNames[i].innerText == title){
                console.log('Already added');
                return undefined;
            }
        }
        let basketRowContent = `
            <div class = "basket-product">
                <span class = "room-name treatments-name">${title}</span>
            </div>
            <div class="basket-date">${dateFrom} ${dateTo} Change the date: </div>
            <input class = "total-days" type="number" value=${daysCount}>
            <div class="basket-price">${price} zł</div>
            <div>
                <input class="basket-quantity" type="number" value="1">
                <button class="btn btn-danger" type="button">Usuń</button>
            </div>
        `;
        basketRow.innerHTML = basketRowContent;
        let basketContainer = $(document).find('.cart-container')[0];
        basketContainer.insertBefore(basketRow, basketTotal);
        $(basketContainer).find('.basket-date').last().append(calendar);
        basketBehavior();
        basketCounterGetter(basketRows.length-1);
    }

    let addToBasketClicked = (e) => {
        let button = e.target;
        let addedItem = button.parentElement.parentElement;

        let title = $(addedItem).find('.room-name')[0].innerText;
        let priceRow = $(addedItem).find('.price-of-item')[0].innerText;
        var price = priceRow.replace( /^\D+/g, '');
        let dateFrom = $(addedItem).find('.datepicker')[0].value;
        let dateTo = $(addedItem).find('.datepicker')[1].value;
        let daysCount = daysCounter(dateFrom, dateTo);
        console.log(dateFrom);
        console.log(dateTo);
        console.log(daysCount)
        addItemToBasket(title, price, dateFrom, dateTo, daysCount);
    }

    addToBasketClicked(e);
}

export let basketBehavior = () => {
    let removeBasketItemButtons = $(document).find('.btn-danger');
    let quantityInputs = $(document).find('.basket-quantity');
    let daysInputs = $(document).find('.total-days');

        let updateBasketTotal = () => {
        let basketRows = $(document).find('.cart-row');
        let total = 0;
        for(let i = 1; i < basketRows.length-1; i++){
            let basketRow = basketRows[i];
            let priceContainer = $(basketRow).find('.basket-price')[0];
            let quantityContainer = $(basketRow).find('.basket-quantity')[0];
            let daysCountContainer = $(basketRow).find('.total-days')[0];
            let price = priceContainer.innerText.replace('zł', '');
            let quantity = quantityContainer.value;
            let daysCount = daysCountContainer.value;
            console.log(quantity);
            console.log(price);
            console.log(daysCount);
            total += quantity * price * daysCount;
            console.log(total);
        }
        total = Math.round(total*100)/100;
        $(basketRows).find('.basket-total-price').empty().append(total+" zł");
        basketCounterGetter(basketRows.length-2);
    }
    updateBasketTotal();

    let quantityChanged = (e) => {
        let input = e.target;
        if( isNaN(input.value) || input.value <= 0 ) input.value = 1;
        updateBasketTotal();
    }

    for(let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i];
        $(input).on('change', quantityChanged);
    }

    let daysCountChanged = (e) => {
        let input = e.target;
        if( isNaN(input.value) || input.value <= 0 ) input.value = 1;
        updateBasketTotal();
    }
    for(let i = 0; i < daysInputs.length; i++){
        let input = daysInputs[i];
        $(input).on('change', daysCountChanged);
    }

    let removeBasketItem = (e) => {
        let buttonClicked = e.target;
        buttonClicked.parentElement.parentElement.remove();
        updateBasketTotal();
    }

    for(let i = 0; i < removeBasketItemButtons.length; i++){
        let button = removeBasketItemButtons[i];
        $(button).on('click', removeBasketItem);
    }
}