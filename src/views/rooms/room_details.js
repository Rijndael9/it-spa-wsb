import $ from 'jquery';
import axios from 'axios';

export const roomDetails = (roomId) => {
    const fragment = $(document.createDocumentFragment());

    const section = $(`
        <section>
            <h2>Details</h2>
            <p class="room-name">Loading...</p>
            <p class="room-desc">Loading...</p>
        </section>
    `);

    //roomId
    axios
        .get(`http://localhost:3000/rooms/${roomId}`)
        .then(response => response.data)
        .then(room => {
            const { name, description } = room;
            section.find('.room-name').text(name).css('font-weight', 'bold');
            section.find('.room-desc').text(description);
        });

    fragment.append(section);
    return fragment;
};