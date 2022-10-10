export function getUsers() {
  let data;
  return fetch(
    'https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3&view=Grid%20view',

    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer keyfXgn8PL6pB3x32',
      },
    }
  ).catch((err) => console.log(err));
}
