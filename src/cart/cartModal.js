import $ from 'jquery';
import { calendar } from './calendar';

export const cartModal = () => {
  const fragment = $(document.createDocumentFragment());
  const createCartModal =$(``);

//   const createCartModal =$(`
  
//   <div id="cart" class="cart">
//   </div>
// `)

  fragment.append(createCartModal);

  return fragment;
}