import axios from 'axios';

export function getUsers() {
  axios
    .get(
      'https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3&view=Grid%20view',
      { headers: { Authorization: 'Bearer keyfXgn8PL6pB3x32' } }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
