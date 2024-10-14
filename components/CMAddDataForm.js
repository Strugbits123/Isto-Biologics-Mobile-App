import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import CMInput from "./CMInput";
import CMDateInput from "./CMDateInput";
import CMProductLine from "./CMProductLine";
import CMThemedButton from "./CMThemedButton";
import ArrowRight from "../Icons/ArrowRight";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

const CMAddDataForm = ({ submisionType, checkedForms }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // State to hold checkbox values categorized
  const [selectedProducts, setSelectedProducts] = useState({
    Magellan: [],
    Influx: [],
    SPARC: [],
    InQu: [],
    Fibrant: [],
    ProteiOS: [],
  });

  const myWixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: "0715f53d-fb36-46bd-8fce-7f151bf279ee",
    }),
    // Include the auth strategy and host as relevant
  });

  // Input fields handleOnChange
  const handle_onChange_Text = (field, value) => {
    setData((pre) => ({ ...pre, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (category, product) => {
    setSelectedProducts((prev) => {
      const currentProducts = prev[category];
      if (currentProducts.includes(product)) {
        // If product is already checked, remove it
        return {
          ...prev,
          [category]: currentProducts.filter((item) => item !== product),
        };
      } else {
        // If not checked, add it to the array
        return {
          ...prev,
          [category]: [...currentProducts, product],
        };
      }
    });
  };

  //form validations function
  const validateFields = () => {
    let validationErrors = {};

    // Check required fields for the doctor submission type
    if (submisionType === "doctor") {
      if (!data.doctorFirstName) {
        validationErrors.doctorFirstName = "Doctor's first name is required";
      }
      // if (!data.doctorLastName) {
      //   validationErrors.doctorLastName = "Doctor's last name is required";
      // }
    }

    // Hospital name is required for both doctor and hospital submission
    if (!data.hospitalName) {
      validationErrors.hospitalName = "Hospital/Facility name is required";
    }

    // First case date is required
    if (!data.firstCaseDate) {
      validationErrors.firstCaseDate = "First case date is required";
    }

    // Check if at least one product is selected from any category
    const hasSelectedProducts = Object.values(selectedProducts).some(
      (products) => products.length > 0,
    );
    if (!hasSelectedProducts) {
      validationErrors.selectedProducts =
        "At least one product must be selected";
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);

    // Validate form fields
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }
    try {
      //De Structure data
      const { doctorFirstName, doctorLastName, firstCaseDate, hospitalName } =
        data;

      const dateString = firstCaseDate;
      const firstCaseDateObject = new Date(dateString);

      //de structure products
      const { Magellan, Influx, SPARC, InQu, Fibrant, ProteiOS } =
        selectedProducts;
      //de structure points for hospital or doctor
      // console.log("checkedForms", checkedForms);
      const { doctorChecked, hospitalChecked } = checkedForms;
      //Points distributions
      const doctorPoints = doctorChecked ? 3 : 0;
      const hospitalPoints = hospitalChecked ? 5 : 0;

      const magellanPoints = Magellan.length;
      const influxPoints = Influx.length;
      const sparcPoints = SPARC.length;
      const inQuPoints = InQu.length;
      const fibrantPoints = Fibrant.length;
      const proteiOSPoints = ProteiOS.length;

      //total points
      let totalEntryPoints = 0;
      if (doctorChecked && hospitalChecked) {
        totalEntryPoints =
          doctorPoints +
          hospitalPoints +
          magellanPoints +
          influxPoints +
          sparcPoints +
          inQuPoints +
          fibrantPoints +
          proteiOSPoints;
      } else if (doctorChecked) {
        totalEntryPoints =
          doctorPoints +
          magellanPoints +
          influxPoints +
          sparcPoints +
          inQuPoints +
          fibrantPoints +
          proteiOSPoints;
      } else if (hospitalChecked) {
        totalEntryPoints =
          hospitalPoints +
          magellanPoints +
          influxPoints +
          sparcPoints +
          inQuPoints +
          fibrantPoints +
          proteiOSPoints;
      }

      // Combine all data into one object
      const dataToSend = {
        user_id: "ee0eeaf5-663b-4c35-aeee-c1f504b91dc8",
        doctor_firstname: doctorFirstName,
        doctor_lastname: doctorLastName,
        hospital_name: hospitalName,
        first_case_date: firstCaseDateObject,
        magellan_category: Magellan,
        magellan_points: magellanPoints,
        influx_category: Influx,
        influx_points: influxPoints,
        sparc_category: SPARC,
        sparc_points: sparcPoints,
        inqu_category: InQu,
        inqu_points: inQuPoints,
        fibrant_category: Fibrant,
        fibrant_points: fibrantPoints,
        proteios_category: ProteiOS,
        proteios_points: proteiOSPoints,
        doctor_points: doctorPoints,
        hospital_points: hospitalPoints,
        total_entry_points: totalEntryPoints,
      };
      // console.log("dataItem==>: ", dataToSend);
      const addEntriesOptions = {
        dataCollectionId: "entries",
        dataItem: {
          data: dataToSend,
        },
      };

      const response =
        await myWixClient.items.insertDataItem(addEntriesOptions);
      console.log("response", response);

      const leaderboardOptions = {
        dataCollectionId: "leaderboard",
      };

      //query for checking if user is available in leaderboard or not
      const getLeaderboardUsers = await myWixClient.items
        .queryDataItems(leaderboardOptions)
        .eq("user_id", response.dataItem.data.user_id)
        .find();
      console.log("getLeaderboardUsers", getLeaderboardUsers);

      //condition for if this users is first time adding a product so leaderboard accept new entry otherwise update the old entry
      if (getLeaderboardUsers._items.length === 0) {
        console.log("item not found");
        const dataToSendInLeaderboard = {
          user_id: "ee0eeaf5-663b-4c35-aeee-c1f504b91dc8",
          total_magellan_points: response.dataItem.data.magellan_points,
          total_influx_points: response.dataItem.data.influx_points,
          total_sparc_points: response.dataItem.data.sparc_points,
          total_inqu_points: response.dataItem.data.inqu_points,
          total_fibrant_points: response.dataItem.data.fibrant_points,
          total_proteios_points: response.dataItem.data.proteios_points,
          total_entries_points: response.dataItem.data.total_entry_points,
        };

        const addLeaderboardOptions = {
          dataCollectionId: "leaderboard",
          dataItem: {
            data: dataToSendInLeaderboard,
          },
        };
        const resLeaderboardNewEntry = await myWixClient.items.insertDataItem(
          addLeaderboardOptions,
        );
        console.log("resLeaderboardNewEntry", resLeaderboardNewEntry);
      } else {
        console.log("item found");
        const dataToSendInLeaderboardForUpdate = {
          user_id: "ee0eeaf5-663b-4c35-aeee-c1f504b91dc8",
          total_magellan_points:
            response.dataItem.data.magellan_points +
            getLeaderboardUsers._items[0].data.total_magellan_points,
          total_influx_points:
            response.dataItem.data.influx_points +
            getLeaderboardUsers._items[0].data.total_influx_points,
          total_sparc_points:
            response.dataItem.data.sparc_points +
            getLeaderboardUsers._items[0].data.total_sparc_points,
          total_inqu_points:
            response.dataItem.data.inqu_points +
            getLeaderboardUsers._items[0].data.total_inqu_points,
          total_fibrant_points:
            response.dataItem.data.fibrant_points +
            getLeaderboardUsers._items[0].data.total_fibrant_points,
          total_proteios_points:
            response.dataItem.data.proteios_points +
            getLeaderboardUsers._items[0].data.total_proteios_points,
          total_entries_points:
            response.dataItem.data.total_entry_points +
            getLeaderboardUsers._items[0].data.total_entries_points,
        };
        console.log(
          "dataToSendInLeaderboardForUpdate",
          dataToSendInLeaderboardForUpdate,
        );
        const updateLeaderboardOptions = {
          dataCollectionId: "leaderboard",
          dataItem: {
            data: dataToSendInLeaderboardForUpdate,
          },
        };
        console.log(
          "getLeaderboardUsers._items[0]._id",
          getLeaderboardUsers._items[0]._id,
        );
        const resLeaderboardUpdate = await myWixClient.items.updateDataItem(
          getLeaderboardUsers._items[0]._id,
          updateLeaderboardOptions,
        );
      }

      ToastAndroid.show("Data Added Successfully!", ToastAndroid.SHORT);
      // // Reset all fields and uncheck products
      // setData({});
      // setSelectedProducts({
      //   Magellan: [],
      //   Influx: [],
      //   SPARC: [],
      //   InQu: [],
      //   Fibrant: [],
      //   ProteiOS: [],
      // });
      // setErrors({});
    } catch (error) {
      console.log("error in handle submit", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {/* Inputs container */}
      <View>
        {submisionType === "doctor" ? (
          <>
            <CMInput
              title={"Doctor First Name"}
              placeholderText={"Enter"}
              onChange={(text) => handle_onChange_Text("doctorFirstName", text)}
              error={!!errors.doctorFirstName}
              errorMessage={errors.doctorFirstName}
            />
            <CMInput
              title={"Doctor Last Name"}
              placeholderText={"Enter"}
              onChange={(text) => handle_onChange_Text("doctorLastName", text)}
              error={!!errors.doctorLastName}
              errorMessage={errors.doctorLastName}
            />
          </>
        ) : (
          <></>
        )}
        <CMInput
          title={"Hospital/Facility"}
          placeholderText={"Enter"}
          onChange={(text) => handle_onChange_Text("hospitalName", text)}
          error={!!errors.hospitalName}
          errorMessage={errors.hospitalName}
        />
        <CMDateInput
          title={"First Case Date"}
          type="date"
          value={data.firstCaseDate}
          placeholderText={"Select Date"}
          onChange={(date) => handle_onChange_Text("firstCaseDate", date)}
          error={!!errors.firstCaseDate}
          errorMessage={errors.firstCaseDate}
        />
      </View>
      {/* Product Line container */}
      <CMProductLine
        checkboxes={selectedProducts}
        onCheckboxChange={handleCheckboxChange}
        error={!!errors.selectedProducts}
        errorMessage={errors.selectedProducts}
      />

      {/* Submit button */}
      <View style={{ width: "100%", height: 45 }}>
        <CMThemedButton
          gradientStyle={{ paddingVertical: 10 }}
          title="Submit"
          onPress={handleSubmit}
          icon={<ArrowRight width={20} height={20} />}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

export default CMAddDataForm;

const styles = StyleSheet.create({});
