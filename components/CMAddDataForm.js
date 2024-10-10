import { StyleSheet, Text, View } from "react-native";
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

      // const dateString = firstCaseDate;
      // const dateObject = new Date(dateString);

      // const optionValue = {
      //   day: "numeric",
      //   month: "short",
      //   year: "numeric",
      // };
      // const firstCaseFormattedDate = dateObject.toLocaleDateString(
      //   "en-US",
      //   optionValue,
      // );

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
        user_id: "ad951362-37c8-4d01-a214-46cafa628440",
        doctor_firstname: doctorFirstName,
        doctor_lastname: doctorLastName,
        hospital_name: hospitalName,
        first_case_date: firstCaseDate,
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

      console.log("run");
      console.log("dataItem==>: ", dataToSend);

      const options = {
        dataCollectionId: "entries",
        dataItem: {
          data: dataToSend,
        },
      };
      const response = await myWixClient.items.insertDataItem(options);
      console.log("response", response);
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
