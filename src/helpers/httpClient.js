function checkStatus(response) {
  if (!response) {
    throw new Error("Empty response");
  }

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

async function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const contentType = response.headers.get("content-type");
  if (
    contentType &&
    (contentType.includes("application/pdf") ||
      contentType.includes("image/jpeg") ||
      contentType.includes("image/Jpeg") ||
      contentType.includes("image/png") ||
      contentType.includes("image/svg+xml") ||
      contentType.includes("application/octel-stream"))
  ) {
    return response.blob();
  }

  if (contentType && contentType.includes("text/plain")) {
    return response.text();
  }

  const text = await response.text();

  return text ? JSON.parse(text) : {};
}

export default async function request(url, options = {}) {
  const config = {
    method: "GET",
    ...options,
  };

  let reqContentType = "application/json";
  if (options.contentType) {
    reqContentType = options.contentType;
  }

  const headers = {
    Accept: "text/plain",
    "Content-Type": reqContentType,
    ...config.headers,
  };

  const params = {
    headers,
    method: config.method,
  };

  if (params.method !== "GET") {
    params.body = JSON.stringify(config.payload);
  }

  return fetch(url, params).then(checkStatus).then(parseJSON);
}
