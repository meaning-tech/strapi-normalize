export const Normalize = (data: any) => {
  const isObject = (dataItem: any) => Object.prototype.toString.call(dataItem) === '[object Object]';
  const isArray = (dataItem: any) => Object.prototype.toString.call(dataItem) === '[object Array]';

  const flatten = (dataItem: any) => {
    if (!dataItem.attributes) {
      return dataItem;
    }

    return {
      id: dataItem.id,
      ...dataItem.attributes,
    };
  };

  if (isArray(data)) {
    return data.map((item: any) => Normalize(item));
  }

  if (isObject(data)) {
    if (isArray(data.data)) {
      data = [...data.data];
    } else if (isObject(data.data)) {
      data = flatten({ ...data.data });
    } else if (data.data === null) {
      data = null;
    } else {
      data = flatten(data);
    }

    for (const key of data) {
      data[key] = Normalize(data[key]);
    }

    return data;
  }

  return data;
};
