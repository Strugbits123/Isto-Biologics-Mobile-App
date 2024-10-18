import { createClient, OAuthStrategy } from "@wix/sdk";
import { members } from "@wix/members";
import { redirects } from "@wix/redirects";
import { items } from "@wix/data";
import { files } from "@wix/media";


// const clientId = process.env.WIX_CLIENT_ID || "";

export const myWixClient = createClient({
  auth: OAuthStrategy({
    clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
  }),
  modules: {
    members,
    redirects,
    items,
    files
  },
});
