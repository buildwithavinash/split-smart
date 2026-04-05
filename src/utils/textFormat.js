const textFormatter = (text) => {
  if (!text || text.trim() === "") return "";
  return text.at(0).toUpperCase() + text.slice(1).toLowerCase();
};

export default textFormatter;