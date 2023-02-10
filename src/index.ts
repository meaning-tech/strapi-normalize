export const Normalize = (data: any) => {
  const isObject = (dataObj: any) =>
      Object.prototype.toString.call(dataObj) === '[object Object]'
  const isArray = (dataObj: any) =>
      Object.prototype.toString.call(dataObj) === '[object Array]'

  const flatten = (dataObj: any) => {
    if (!dataObj.attributes) {
      return dataObj
    }

    return {
      id: dataObj.id,
      ...dataObj.attributes
    }
  }

  if (isArray(data)) {
    return data.map((item: any) => Normalize(item))
  }

  if (isObject(data)) {
    if (isArray(data.data)) {
      data = [...data.data]
    } else if (isObject(data.data)) {
      data = flatten({ ...data.data })
    } else if (data.data === null) {
      data = null
    } else {
      data = flatten(data)
    }

    // tslint:disable-next-line:forin
    for (const key in data) {
      data[key] = Normalize(data[key])
    }

    return data
  }

  return data
}
