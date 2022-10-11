export function getRestaurantsData(text) {
  let data;
  return fetch(
    `https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?filterByFormula=REGEX_EXTRACT(Name, "(?i)${text}.*")`,

    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer keyfXgn8PL6pB3x32',
      },
    }
  ).catch((err) => console.log(err));
}
