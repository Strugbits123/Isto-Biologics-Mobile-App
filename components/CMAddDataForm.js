import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CMInput from "./CMInput";
import CMDateInput from "./CMDateInput";
import CMProductLine from "./CMProductLine";
import CMThemedButton from "./CMThemedButton";
import ArrowRight from "../Icons/ArrowRight";

const CMAddDataForm = ({ submisionType }) => {
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

  // Handle form submission
  const handleSubmit = () => {
    setIsLoading(true);

    // Combine all data into one object
    const submitData = {
      submisionType,
      ...data,
      selectedProducts, // This will include the structured state of checkboxes
    };

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
            />
            <CMInput
              title={"Doctor Last Name"}
              placeholderText={"Enter"}
              onChange={(text) => handle_onChange_Text("doctorLastName", text)}
            />
          </>
        ) : (
          <></>
        )}
        <CMInput
          title={"Hospital/Facility"}
          placeholderText={"Enter"}
          onChange={(text) => handle_onChange_Text("hospitalName", text)}
        />
        <CMDateInput
          title={"First Case Date"}
          type="date"
          value={data.firstCaseDate}
          placeholderText={"Select Date"}
          onChange={(date) => handle_onChange_Text("firstCaseDate", date)}
        />
      </View>
      {/* Product Line container */}
      <CMProductLine
        checkboxes={selectedProducts}
        onCheckboxChange={handleCheckboxChange}
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
