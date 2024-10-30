import { createClient, OAuthStrategy } from "@wix/sdk";
import { members } from "@wix/members";
import { redirects } from "@wix/redirects";
import { items } from "@wix/data";
import { files } from "@wix/media";

const clientId = process.env.WIX_CLIENT_ID || "";

export const myWixClient = createClient({
  auth: OAuthStrategy({
    clientId: clientId,
  }),
  modules: {
    members,
    redirects,
    items,
    files,
  },
});
