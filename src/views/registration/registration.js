import $ from 'jquery';
import axios from 'axios';
import { required } from './required';
import { minLength } from './min_length';


export const registration = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2>Registration</h2>');
    const form = $(`
        <div class="registration-container">
        <form name="signUp" autocomplete="off" novalidate>
            <div class="form-group">
                <label class="registration">Login</label>
                <input class="form-control" id="login" type="text">
                <p class="text-danger" id="login-required">login jest wymagany</p>
            </div>

            <div class="form-group">
                <label class="registration">Password</label>
                <input class="form-control" id="password" type="password">
                <p class="text-danger" id="password-required">Hasło jest wymagany.</p>
                <p class="text-danger" id="password-min-length">Hasło musi mieć co najmniej 8 znaków.</p>
            </div>

            <p class="password-strength">
                <span class="weak"></span>
                <span class="medium"></span>
                <span class="strong"></span>
            </p>

            <button type="button">Sign up</button>
        </form>
        </div>
    `);

    const errorMessages = {
        login: {
            required: form.find('#login-required')
        },
        password: {
            required: form.find('#password-required'),
            minLength: form.find('#password-min-length'),
        }
    };

    fragment.append(h2);
    fragment.append(form);

    errorMessages.login.required.hide();
    errorMessages.password.required.hide();
    errorMessages.password.minLength.hide();

    form.find('button').on('click', event => {
        event.preventDefault();
        const login = $('#login').val();
        const password = $('#password').val();
        const min8Chars = minLength(8);

        // weryfikujemy czy wystąpiły błedy...
        const loginRequired = required(login);
        const passwordRequired = required(password);
        const passwordMinLength = min8Chars(password);

        loginRequired ? errorMessages.login.required.show() : errorMessages.login.required.hide()
        passwordRequired ? errorMessages.password.required.show() : errorMessages.password.required.hide()
        passwordMinLength ? errorMessages.password.minLength.show() : errorMessages.password.minLength.hide()

        if ( !loginRequired || !passwordRequired || !passwordMinLength ) {
        axios
            .post('http://localhost:3000/users', {login: login, password: password})
            .then(response => console.log(response));
        }
    });

    return fragment;
};
