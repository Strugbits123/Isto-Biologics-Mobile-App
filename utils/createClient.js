import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { members } from "@wix/members";

//Wix headless create client method for auth clientId
export const myWixClient = createClient({
  modules: {
    items,
    members,
  },
  auth: OAuthStrategy({
    clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
  }),
});
