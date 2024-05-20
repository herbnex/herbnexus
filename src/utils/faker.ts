import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    id: faker.string.uuid(),
    name: `${faker.person.prefix()} ${faker.person.fullName()}`,
    online: faker.datatype.boolean(),
    avatar: faker.image.avatar(),
    username: faker.internet.userName(),
    jobTitle: faker.person.jobTitle(),
  };
}

export const getFakeUsers = (count: number) =>
  faker.helpers.multiple(createRandomUser, {
    count: count,
  });

export const getFakeMessages = (count: number) => {
  return faker.helpers.multiple(
    () => ({
      id: faker.string.uuid(),
      isSender: faker.datatype.boolean(),
      message: faker.lorem.paragraph(),
    }),
    { count },
  );
};
