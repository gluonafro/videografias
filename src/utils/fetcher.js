export default async function fetcher(endpoint, fetchParams = {}) {
  const headers = { "content-type": "application/json" };

  // if (token) {
  //headers.Authorization = `Bearer ${token}`;
  // }

  const config = {
    headers: {
      ...headers,
    },
  };

  const response = await window.fetch(
    process.env.PUBLIC_URL + endpoint,
    config
  );

  let data = undefined;
  try {
    data = await response.json();
  } catch (error) {
    console.log("No se encuentra body en el response de " + endpoint);
  }
  console.log(data);

  if (response.ok) {
    return data ? data : response;
  } else {
    return Promise.reject(response);
  }
}
