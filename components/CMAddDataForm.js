import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CMInput from "./CMInput";
import CMDateInput from "./CMDateInput";
import CMProductLine from "./CMProductLine";
import CMThemedButton from "./CMThemedButton";
import ArrowRight from "../Icons/ArrowRight";

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

  //form validations
  const validateFields = () => {
    let validationErrors = {};

    // Check required fields for the doctor submission type
    if (submisionType === "doctor") {
      if (!data.doctorFirstName) {
        validationErrors.doctorFirstName = "Doctor's first name is required";
      }
      if (!data.doctorLastName) {
        validationErrors.doctorLastName = "Doctor's last name is required";
      }
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
  const handleSubmit = () => {
    setIsLoading(true);

    // Validate form fields
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // Combine all data into one object
    const submitData = {
      ...data,
      selectedProducts, // This will include the structured state of checkboxes
    };

    console.log("checkedForms", checkedForms);
    console.log("Submitted Data: ", submitData);

    // Add your submit logic here (e.g., API call)

    setIsLoading(false);
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
