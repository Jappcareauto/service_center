export const getFirtsLetters = (text: string) => {
  const err = new Error();
  const textType = typeof text;
  if (textType !== "string") {
    err.message = `invalide type error : type ${textType} can't be assigned to type string `;
    throw err;
  }
  const textArr = text.split(" ").map((t) => t.charAt(0));
 
  return textArr;
};
