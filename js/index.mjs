/*
  index.mjs - ComCat password reset JavaScript functions.

  (C) 2022 HOMEINFO - Digitale Informationssysteme GmbH

  This library is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this library.  If not, see <http://www.gnu.org/licenses/>.

  Maintainer: Richard Neumann <r dot neumann at homeinfo period de>
*/
'use strict';

import { request } from 'https://javascript.homeinfo.de/requests.mjs';


const URL = 'https://comcat.homeinfo.de/pwreset/confirm';


function getURLParams () {
    return new URLSearchParams(window.location.search);
}


function getNonce () {
    return getURLParams().get('nonce');
}


function resetPassword () {
    return request.post(URL, {'nonce': getNonce()});
}

function getMessage (response) {
    if (response.status != 200)
        return 'Ihr Passwort konnte leider nicht zurückgesetzt werden.';

    return 'Ihr Passwort wurde zurückgesetzt. Ein neues<br> Passwort haben wir Ihnen per E-Mail zugeschickt. <br>Bitte überprüfen Sie ihren Posteingang.';
}

function showMessage (response) {
    const messageContainer = document.getElementById('message');
    messageContainer.innerHTML = getMessage(response);
}

export function init () {
    resetPassword().then(showMessage, showMessage);
}
