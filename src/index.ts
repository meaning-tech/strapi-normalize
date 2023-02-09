export const Normalize = (objectToConvert: any) => {
  const isObject = (data: any) => Object.prototype.toString.call(data) === '[object Object]';
  const isArray = (data: any) => Object.prototype.toString.call(data) === '[object Array]';

  const flatten = (data: any) => {
    if (!data.attributes) {
      return data;
    }

    return {
      id: data.id,
      ...data.attributes,
    };
  };

  if (isArray(objectToConvert)) {
    return objectToConvert.map((item: any) => Normalize(item));
  }

  if (isObject(objectToConvert)) {
    if (isArray(objectToConvert.data)) {
      objectToConvert = [...objectToConvert.data];
    } else if (isObject(objectToConvert.data)) {
      objectToConvert = flatten({ ...objectToConvert.data });
    } else if (objectToConvert.data === null) {
      objectToConvert = null;
    } else {
      objectToConvert = flatten(objectToConvert);
    }

    for (const key of objectToConvert) {
      objectToConvert[key] = Normalize(objectToConvert[key]);
    }

    return objectToConvert;
  }

  return objectToConvert;
};
