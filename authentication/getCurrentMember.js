import { myWixClient } from "../utils/createClient";

export const fetchCurrentMember = async () => {
    try {
      const { member } = await myWixClient.members.getCurrentMember({
        fieldSet: "FULL",
      });
      return member;
    } catch (error) {
      console.error("Error fetching current member: ", error);
      throw error; // You can handle this in the calling function if needed
    }
  };