import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import './it-spa.scss';
import { createHeader, createMain, createFooter } from './common';
import { navigation } from './navigation/navigation';
import { basketBehavior, basketCounterGetter } from './cart/cartBehaviour';
import { cartModal } from './cart/cartModal';
import { createCart } from './cart/cart';

const body = $(document.body);

const itSpaNavigation = navigation();
const itSpaHeader = createHeader();
const itSpaCart = createCart();
const itSpaCartModal = cartModal();
const itSpaMain = createMain();
const itSpaFooter = createFooter();

body.append(itSpaNavigation);
body.append(itSpaCartModal);
body.append(itSpaCart);
body.append(itSpaHeader);
body.append(itSpaMain);
body.append(itSpaFooter);

basketBehavior();
basketCounterGetter();
