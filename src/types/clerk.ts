export type ClerkUserIdentity = {
  tokenIdentifier: string;
  issuer: string;
  subject: string;
  name: string;
  givenName: string;
  nickname: string | undefined;
  // the clerk user id
  pictureUrl: string;
  email: string;
  emailVerified: boolean;
  phoneNumberVerified: boolean;
  updatedAt: string;
};
