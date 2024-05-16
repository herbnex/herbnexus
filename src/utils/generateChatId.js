export const generateChatId = (doctorId, userName) => {
  // Remove invalid characters from userName
  const sanitizedUserName = userName.replace(/[.#$[\]]/g, '');
  return `${doctorId}${sanitizedUserName}`;
};
