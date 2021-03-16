import Socket from "./Socket";
import { baseUrl, movieEPs } from "../config/config.json";
import Gateway from "./Gateway";

// movie search
async function search(email, session, transaction, queryMap) {
  const headers = {
    email: email,
    session_id: session,
    transaction_id: transaction,
  };

  let payLoad = {
    title: queryMap.get("title"),
    year: queryMap.get("year"),
    director: queryMap.get("director"),
    genre: queryMap.get("genre"),
    hidden: false,
    limit: 100,
    offset: 0,
    orderby: "title",
    direction: "asc",
  };

  const options = {
    baseURL: baseUrl, // Base URL
    url: movieEPs.searchEP, // Path of URL
    params: payLoad,
    headers: headers,
  };

  const response = await Socket.GET(options);

  return await Gateway.getReport(response);
}

// movie browse
async function browse(email, session, transaction, phrase, queryMap) {
  const headers = {
    email: email,
    session_id: session,
    transaction_id: transaction,
  };

  let payLoad = {
    limit: 100,
    offset: 0,
    orderby: queryMap.get("orderby"),
    direction: queryMap.get("direction"),
  };

  const options = {
    baseURL: baseUrl, // Base URL
    url: movieEPs.browseEP + phrase, // Path of URL
    params: payLoad,
    headers: headers,
  };

  const response = await Socket.GET(options);

  return await Gateway.getReport(response);
}

// movie get by a movie id
async function getDetail(email, session, transaction, movie_id) {
  const headers = {
    email: email,
    session_id: session,
    transaction_id: transaction,
  };

  const options = {
    baseURL: baseUrl, // Base URL
    url: movieEPs.getEP + movie_id, // Path of URL
    headers: headers,
  };

  const response = await Socket.GET(options);

  return await Gateway.getReport(response);
}

export default {
  search,
  browse,
  getDetail,
};
