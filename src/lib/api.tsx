
const baseURL = 'http://localhost:5000/api';

export const fetchAPI = ({route}:{route:string}) => {
    // Where we're fetching data from
    return fetch(`${baseURL}${route}`)
    // We get the API response and receive data in JSON format
      .then((response) => response.json())
      .then((data) => data)
      .catch ((error) => error);
}
