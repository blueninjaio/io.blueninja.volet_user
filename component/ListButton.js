import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
export const { width, height } = Dimensions.get("window");

export class ListButton extends Component {
  render() {
    return (
      <View style={styles.shadowSet}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(this.props.page,{
            goBack: this.props.goBack
          })}
          style={styles.listItemButtonSwitch}
        >
          <View style={styles.show}>
            <Image
            //   source={{uri: this.props.icon}}
              source={this.props.icon}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.listItemText}>{this.props.title}</Text>
          </View>
          {this.props.extraProps === true ? (
            <View>
              <Text style={styles.listItemText}>{this.props.desc}</Text>
            </View>
          ) : null}
          {/* <Switch value={true} /> */}
        </TouchableOpacity>
      </View>
    );
  }
}

export default ListButton;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    color: "#979797",
    fontSize: 20
  },
  listItemButtonSwitch: {
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1
  },
  show: {
    justifyContent: "flex-start",
    width: width / 1.8,
    alignItems: "center",
    flexDirection: "row"
  },
  listItemText: {
    fontSize: 15,
    color: "#979797",
    marginLeft: 20
  }
});
