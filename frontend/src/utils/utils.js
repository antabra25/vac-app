
export const removeItem = (items, id) => items.filter((item, index) => item._id !== id ?item:null)