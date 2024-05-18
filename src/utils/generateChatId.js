export const generateChatId = (doctorId, userName) => {
  // Ensure "Dr " is at the beginning of userName if it's not already there
  const formattedUserName = userName.startsWith('Dr') ? userName : `Dr ${userName}`;

  // Add a space before the userName
  const formattedUserNameWithSpace = ` ${formattedUserName}`;

  // Remove invalid characters from userName
  const sanitizedUserName = formattedUserNameWithSpace.replace(/[.#$[\]]/g, '');

  return `${doctorId}${sanitizedUserName}`;
};
