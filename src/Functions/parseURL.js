const replaceAllChar = async (string, char1, char2) => {
  while (string.includes(char1)) {
    string = string.replace(char1, char2);
  }
  return string;
};

export const parseURL = async (query) => {
  query = await replaceAllChar(query, "%20", " ");
  query = await replaceAllChar(query, "%23", "#");
  query = await replaceAllChar(query, "%26", "&");
  query = await replaceAllChar(query, "%25", "%");
  query = await replaceAllChar(query, "%22", '"');
  query = await replaceAllChar(query, "%27", "'");
  query = await replaceAllChar(query, "%28", "(");
  query = await replaceAllChar(query, "%29", ")");
  query = await replaceAllChar(query, "%2B", "+");
  return query;
};

export const encodeURL = async (query) => {
  //   query = await replaceAllChar(query, " ", "%20");
  query = await replaceAllChar(query, "#", "%23");
  //   query = await replaceAllChar(query, "&", "%26");
  //   query = await replaceAllChar(query, "%", "%25");
  //   query = await replaceAllChar(query, '"', "%22");
  //   query = await replaceAllChar(query, "'", "%27");
  //   query = await replaceAllChar(query, "(", "%28");
  //   query = await replaceAllChar(query, ")", "%29");
  //   query = await replaceAllChar(query, "+", "%2B");
  return query;
};
