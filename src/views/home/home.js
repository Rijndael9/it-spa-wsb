import $ from 'jquery';

export const home = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2>Welcome to hotel IT-SPA</h2>');
    const p = $(`<p class="description">The <i>IT-SPA</i> is a modern, elegant 4-star hotel overlooking the sea,
                 perfect for a romantic, charming vacation. The rooms are new, well-lit and inviting.
                 Our reception staff will be happy to help you during your stay, suggesting itineraries,
                 guided visits and some good restaurants in the historic centre. While you enjoy a cocktail by the
                 swimming pool on the rooftop terrace, you will be stunned by the breathtaking view.
                 Here, during your summer stays, our bar serves traditional dishes, snacks and salads.</p>`);
    const services = $ (`<h4 class="home-services">Services & Facilities</h4>
                         <ul class="home-services-description"><li>Disabled accessible</li>
                         <li>24h reception</li>
                         <li>Buffet Breakfast</li>
                         <li>Wi-Fi internet (at an additional charge)</li><ul>`);

    fragment.append(h2).append(p).append(services);
    return fragment;
}
