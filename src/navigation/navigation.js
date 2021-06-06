import $ from 'jquery';
import * as views from "../views";

export const navigation = () => {
    const fragment = $(document.createDocumentFragment());

    const nav = $(`<nav>
                    <div class="productCounter"><span class=basketCounter></span></div>
                   </nav>`);
    const buttons = Object
        .keys(views) // => ['home', 'rooms', itd.]
        .map(viewName => {
            const button = $(`<button class="nav-button" type="button">
                              <a>${viewName.toUpperCase()}</a>
                              </button>`);
            button.on('click', () => {
                // tworzymy autorskie zdarzenie 'navigation'
                const customEvent = new CustomEvent('navigation', {
                    detail: {
                        name: viewName
                    }
                });
                // wywołujemy zdarzenie 'navigation'
                document.dispatchEvent(customEvent);
            });

            return button;
        })

    nav.append(buttons);

    fragment.append(nav);

    return fragment;
}