import $ from 'jquery';
import * as views from "../views";
import { roomDetails } from '../views/rooms/room_details';
import { treatments } from '../views/treatments/treatments';
import { treatmentDetails } from '../views/treatments/treatment_details';

export const createMain = () => {
    const main = $(`<main></main>`);

    console.log(views)
    console.log(views.home)
    console.log(views.rooms)
    console.log(views.treatments)

    document.addEventListener('navigation', event => {
        // na jaki view chcesz przejść?
        const viewName = event.detail.name;

        switch (viewName) {
            case 'room-details':
                main.empty().append(roomDetails(event.detail.roomId));
                break;
            case 'treatments':
                main.empty().append(treatments());
                break;
            case 'treatment-details':
                main.empty().append(treatmentDetails(event.detail.treatmentId));
                break;
            default:
                // return function
                const viewFn = views[viewName];
                // wstaw nowy view do main
                main.empty().append(viewFn());
        }
    });

    return main;
};