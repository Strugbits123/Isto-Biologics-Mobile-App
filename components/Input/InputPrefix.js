import { StyleSheet, TextInput, View } from "react-native";
import { HelperText, Icon } from "react-native-paper";
import { ThemeTextColors } from "../../theme/theme";

export const InputPrefix = ({
  iconName,
  error = false,
  errorMessage = "",
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          props.style,
          {
            borderColor: error ? "red" : "#E8ECF4",
          },
        ]}
      >
        <Icon source={iconName} size={24} color={"#403f2b"} />
        <TextInput style={styles.input} {...props} />
      </View>
      {error && (
        <HelperText type="error" visible={error}>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E8ECF4",
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    marginLeft: 1,
  },
  error: {
    color: "red",
    fontSize: 12,
    paddingHorizontal: 20,
  },
});
