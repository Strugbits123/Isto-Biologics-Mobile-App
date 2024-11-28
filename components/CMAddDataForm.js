import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import CMInput from "./CMInput";
import CMDateInput from "./CMDateInput";
import CMProductLine from "./CMProductLine";
import CMThemedButton from "./CMThemedButton";
import ArrowRight from "../Icons/ArrowRight";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { myWixClient } from "../utils/createClient";
import { PointsContext } from "./PointsHandler";
import Toast from "./Toast/Toast";
import { Dimensions, PixelRatio } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const scaleFontSize = (size) => {
  const scale = SCREEN_WIDTH / 430; // iPhone 14 Plus width as the base
  return PixelRatio.roundToNearestPixel(size * scale);
};
// Adjusts dimensions based on iPhone 14 Plus width
const scaleSize = (size) => {
  const scale = SCREEN_WIDTH / 430;
  return PixelRatio.roundToNearestPixel(size * scale);
};
const CMAddDataForm = ({
  submisionType,
  checkedForms,
  isUpdateItem,
  currentMember,
}) => {
  const navigation = useNavigation();
  const { totalPoints, updatePoints } = useContext(PointsContext);
  const [data, setData] = useState({}); // Holds form input data
  const [isLoading, setIsLoading] = useState(false); // Loading state for submission
  const [errors, setErrors] = useState({}); // Holds validation errors
  const [toastVisible, setToastVisible] = useState(false); // Toast visibility state
  const [iconType, setIconType] = useState(""); // Icon type for toast
  const [errorMessage, setErrorMessage] = useState(""); // Error or success message for toast

  const doctorFirstNameRef = useRef(null);
  const doctorLastNameRef = useRef(null);
  const hospitalNameRef = useRef(null);

  // Checkbox product selection state categorized by product
  const [selectedProducts, setSelectedProducts] = useState({
    Magellan: [],
    Influx: [],
    SPARC: [],
    InQu: [],
    Fibrant: [],
    ProteiOS: [],
  });

  useFocusEffect(
    React.useCallback(() => {
      // Reset form only if not updating an item
      if (!isUpdateItem) {
        setData({});
        setSelectedProducts({
          Magellan: [],
          Influx: [],
          SPARC: [],
          InQu: [],
          Fibrant: [],
          ProteiOS: [],
        });
      }
      return () => {};
    }, [isUpdateItem]),
  );

  // Reset form if not updating an item when screen refocuses
  useFocusEffect(
    React.useCallback(() => {
      if (!isUpdateItem) {
        resetForm();
      }
      return () => {};
    }, [isUpdateItem]),
  );

  // Prefill the form when updating an existing item
  useEffect(() => {
    if (isUpdateItem) {
      prefillForm(isUpdateItem.data);
    }
  }, [isUpdateItem]);

  // Reset form fields
  const resetForm = () => {
    setData({});
    setData({
      firstCaseDate: new Date()
    });
    setSelectedProducts({
      Magellan: [],
      Influx: [],
      SPARC: [],
      InQu: [],
      Fibrant: [],
      ProteiOS: [],
    });
    setErrors({});
  };

  // Prefill form with existing item data for update
  const prefillForm = (itemData) => {
    const {
      doctor_firstname,
      doctor_lastname,
      hospital_name,
      first_case_date,
      magellan_category,
      influx_category,
      sparc_category,
      inqu_category,
      fibrant_category,
      proteios_category,
    } = itemData;

    setData({
      doctorFirstName: doctor_firstname || "",
      doctorLastName: doctor_lastname || "",
      hospitalName: hospital_name || "",
      firstCaseDate: first_case_date || "",
    });

    setSelectedProducts({
      Magellan: magellan_category || [],
      Influx: influx_category || [],
      SPARC: sparc_category || [],
      InQu: inqu_category || [],
      Fibrant: fibrant_category || [],
      ProteiOS: proteios_category || [],
    });
  };

  // Update input field data and clear corresponding errors
  const handle_onChange_Text = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  // Toggle checkbox state for product selection
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

  // Form field validation
  const validateFields = () => {
    const validationErrors = {};

    if (submisionType === "doctor" && !data.doctorFirstName) {
      validationErrors.doctorFirstName = "Doctor's first name is required";
    }

    if (!data.hospitalName) {
      validationErrors.hospitalName = "Hospital/Facility name is required";
    }

    if (!data.firstCaseDate) {
      validationErrors.firstCaseDate = "First case date is required";
    }

    // Ensure at least one product is selected
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

      // console.log("firstCaseDate", firstCaseDate);
      const firstCaseDateObject = new Date(dateString);

      const formattedDate = firstCaseDateObject.toLocaleString("en-US", {
        weekday: "short",
        month: "short", // "short" for abbreviated month (e.g., "Nov")
        day: "numeric", // Numeric day (e.g., 21)
        year: "numeric", // Full year (e.g., 2024)
      });

      // console.log("Formatted Date:", formattedDate);

      //de structure products
      const { Magellan, Influx, SPARC, InQu, Fibrant, ProteiOS } =
        selectedProducts;
      //de structure points for hospital or doctor
      const { doctorChecked, hospitalChecked } = checkedForms;
      //Points distributions
      const doctorPoints = doctorChecked ? 3 : 0;
      const hospitalPoints = hospitalChecked ? 5 : 0;
      //points calculation
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
      // Clear doctor names if the doctor is unchecked
      if (!doctorChecked) {
        setData({
          doctorFirstName: "",
          doctorLastName: "",
        });
      }
      // Clear doctor names in dataToSend if the doctor is unchecked
      const doctorFirstNameToSend = doctorChecked ? doctorFirstName : "";
      const doctorLastNameToSend = doctorChecked ? doctorLastName : "";

      // Combine all data into one object for add a entry
      const dataToSend = {
        user_id: currentMember._id,
        doctor_firstname: doctorFirstNameToSend,
        doctor_lastname: doctorLastNameToSend,
        hospital_name: hospitalName,
        first_case_date: formattedDate,
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
        products_points: totalEntryPoints - (doctorPoints + hospitalPoints),
        total_entry_points: totalEntryPoints,
      };
      // console.log("dataItem==>: ", dataToSend);
      const addEntriesOptions = {
        dataCollectionId: "entries",
        dataItem: {
          data: dataToSend,
        },
      };
      //this part is checking if when user update the entry else condition will run for update
      let response;
      if (!isUpdateItem) {
        response = await myWixClient.items.insertDataItem(addEntriesOptions);
        // console.log("response of add entry", response);
      } else {
        response = await myWixClient.items.updateDataItem(
          isUpdateItem._id,
          addEntriesOptions,
        );

        //query call for getting leaderboard points
        const leaderboardOptions = {
          dataCollectionId: "leaderboard",
        };
        //query for getting update leaderboard data by user id for updated points
        const getLeaderboardUsers = await myWixClient.items
          .queryDataItems(leaderboardOptions)
          .eq("user_id", response.dataItem.data.user_id)
          .find();
        // console.log("getLeaderboardUsers", getLeaderboardUsers._items[0].data);
        // console.log("response of update entry", response);
        //data to send for minus when user update the entry old points minus from total leaderboard points
        const dataToSendInLeaderboardForUpdatePoints = {
          user_id: currentMember._id,
          total_magellan_points:
            getLeaderboardUsers._items[0].data.total_magellan_points -
            isUpdateItem.data.magellan_points,
          total_influx_points:
            getLeaderboardUsers._items[0].data.total_influx_points -
            isUpdateItem.data.influx_points,
          total_sparc_points:
            getLeaderboardUsers._items[0].data.total_sparc_points -
            isUpdateItem.data.sparc_points,
          total_inqu_points:
            getLeaderboardUsers._items[0].data.total_inqu_points -
            isUpdateItem.data.inqu_points,
          total_fibrant_points:
            getLeaderboardUsers._items[0].data.total_fibrant_points -
            isUpdateItem.data.fibrant_points,
          total_proteios_points:
            getLeaderboardUsers._items[0].data.total_proteios_points -
            isUpdateItem.data.proteios_points,
          total_entries_points:
            getLeaderboardUsers._items[0].data.total_entries_points -
            isUpdateItem.data.total_entry_points,
          total_doctor_points:
            getLeaderboardUsers._items[0].data.total_doctor_points -
            isUpdateItem.data.doctor_points,
          total_hospital_points:
            getLeaderboardUsers._items[0].data.total_hospital_points -
            isUpdateItem.data.hospital_points,
          total_products_points:
            getLeaderboardUsers._items[0].data.total_products_points -
            isUpdateItem.data.products_points,
        };
        const updateLeaderboardOptions = {
          dataCollectionId: "leaderboard",
          dataItem: {
            data: dataToSendInLeaderboardForUpdatePoints,
          },
        };
        const resLeaderboardUpdatePoints =
          await myWixClient.items.updateDataItem(
            getLeaderboardUsers._items[0]._id,
            updateLeaderboardOptions,
          );
        // console.log("resLeaderboardUpdatePoints", resLeaderboardUpdatePoints);
      }

      //Now again call for addition of points when user enter new entry points
      const leaderboardOptions = {
        dataCollectionId: "leaderboard",
      };
      //query for checking if user is available in leaderboard or not
      const getLeaderboardUsers = await myWixClient.items
        .queryDataItems(leaderboardOptions)
        .eq("user_id", response.dataItem.data.user_id)
        .find();
      // console.log("getLeaderboardUsers", getLeaderboardUsers);

      //condition for if this users is first time adding a product so leaderboard accept new entry otherwise update the old entry
      if (getLeaderboardUsers._items.length === 0) {
        // console.log("item not found");
        const dataToSendInLeaderboard = {
          user_id: currentMember._id,
          total_magellan_points: response.dataItem.data.magellan_points,
          total_influx_points: response.dataItem.data.influx_points,
          total_sparc_points: response.dataItem.data.sparc_points,
          total_inqu_points: response.dataItem.data.inqu_points,
          total_fibrant_points: response.dataItem.data.fibrant_points,
          total_proteios_points: response.dataItem.data.proteios_points,
          total_entries_points: response.dataItem.data.total_entry_points,
          total_doctor_points: response.dataItem.data.doctor_points,
          total_hospital_points: response.dataItem.data.hospital_points,
          total_products_points: response.dataItem.data.products_points,
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
        // console.log("resLeaderboardNewEntry", resLeaderboardNewEntry);
        updatePoints(
          {
            total_leaderboard_points:
              resLeaderboardNewEntry.dataItem.data.total_entries_points,
            total_doctor_points:
              resLeaderboardNewEntry.dataItem.data.total_doctor_points,
            total_hospital_points:
              resLeaderboardNewEntry.dataItem.data.total_hospital_points,
            total_products_points:
              resLeaderboardNewEntry.dataItem.data.total_products_points,
          },
          // resLeaderboardNewEntry.dataItem.data.total_entries_points
        );
      } else {
        // console.log("item found");
        const dataToSendInLeaderboardForUpdate = {
          user_id: currentMember._id,
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
          total_doctor_points:
            response.dataItem.data.doctor_points +
            getLeaderboardUsers._items[0].data.total_doctor_points,
          total_hospital_points:
            response.dataItem.data.hospital_points +
            getLeaderboardUsers._items[0].data.total_hospital_points,
          total_products_points:
            response.dataItem.data.products_points +
            getLeaderboardUsers._items[0].data.total_products_points,
        };

        const updateLeaderboardOptions = {
          dataCollectionId: "leaderboard",
          dataItem: {
            data: dataToSendInLeaderboardForUpdate,
          },
        };

        const resLeaderboardUpdate = await myWixClient.items.updateDataItem(
          getLeaderboardUsers._items[0]._id,
          updateLeaderboardOptions,
        );
        // console.log("resLeaderboardUpdate", resLeaderboardUpdate.dataItem.data);
        updatePoints({
          total_leaderboard_points:
            resLeaderboardUpdate.dataItem.data.total_entries_points,
          total_doctor_points:
            resLeaderboardUpdate.dataItem.data.total_doctor_points,
          total_hospital_points:
            resLeaderboardUpdate.dataItem.data.total_hospital_points,
          total_products_points:
            resLeaderboardUpdate.dataItem.data.total_products_points,
        });
        // updatePoints(resLeaderboardUpdate.dataItem.data.total_entries_points);
      }

      if (!isUpdateItem) {
        setToastVisible(true);
        setIconType("success");
        setErrorMessage("Data Added Successfully!");
        setTimeout(() => {
          setToastVisible(false);
          navigation.navigate("home");
        }, 3000);
      } else {
        setToastVisible(true);
        setIconType("success");
        setErrorMessage("Data Updated Successfully!");
        setTimeout(() => {
          setToastVisible(false);
          navigation.replace("Bottom_Navigation", {
            screen: "entries",
          });
        }, 3000);
      }
      // Reset all fields and uncheck products
      setData({});
      setSelectedProducts({
        Magellan: [],
        Influx: [],
        SPARC: [],
        InQu: [],
        Fibrant: [],
        ProteiOS: [],
      });
      setErrors({});
    } catch (error) {
      console.log("error in handle submit", error);
    } finally {
      setIsLoading(false);
    }
  };
console.log("data.firstCaseDate",data.firstCaseDate)
  return (
    <View>
      {/* Inputs container */}
      <View>
        {submisionType === "doctor" ? (
          <>
            <CMInput
              ref={doctorFirstNameRef}
              title={"Doctor First Name"}
              placeholderText={"Enter"}
              value={data.doctorFirstName || ""}
              onChange={(text) => handle_onChange_Text("doctorFirstName", text)}
              error={!!errors.doctorFirstName}
              errorMessage={errors.doctorFirstName}
              onSubmitEditing={() => doctorLastNameRef.current.focus()}
              returnKeyType="next"
            />
            <CMInput
              ref={doctorLastNameRef}
              title={"Doctor Last Name"}
              placeholderText={"Enter"}
              value={data.doctorLastName || ""}
              onChange={(text) => handle_onChange_Text("doctorLastName", text)}
              error={!!errors.doctorLastName}
              errorMessage={errors.doctorLastName}
              onSubmitEditing={() => hospitalNameRef.current.focus()}
              returnKeyType="next"
            />
          </>
        ) : (
          <></>
        )}
        <CMInput
          ref={hospitalNameRef}
          title={"Hospital/Facility"}
          placeholderText={"Enter"}
          value={data.hospitalName || ""}
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
      <View style={{ width: "100%", height: scaleSize(45) }}>
        <CMThemedButton
          gradientStyle={{ paddingVertical: scaleSize(10) }}
          title={isUpdateItem ? "Update" : "Submit"}
          onPress={handleSubmit}
          icon={<ArrowRight width={scaleSize(20)} height={scaleSize(20)} />}
          loading={isLoading}
        />
      </View>
      <Toast visible={toastVisible} type={iconType} message={errorMessage} />
    </View>
  );
};

export default CMAddDataForm;

const styles = StyleSheet.create({});
