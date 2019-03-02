import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput
} from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      todoValue: props.text
    };
  }
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteById: PropTypes.func.isRequired,
    uncompleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired
  };
  render() {
    const { isEditing, todoValue } = this.state;
    const { id, text, isCompleted, deleteById } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleCompleted}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedTodo : styles.uncompletedTodo
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              value={todoValue}
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
              onChangeText={this._controlInput}
              onBlur={this._finishEditing}
              multiline={true}
              returnKeyType="done"
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
            >
              {text}
            </Text>
          )}
        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actinoText}>✏️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={() => deleteById(id)}>
              <View style={styles.actionContainer}>
                <Text style={styles.acitonText}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  _startEditing = () => {
    const { text } = this.props;

    this.setState(prevState => ({
      ...prevState,
      isEditing: true
    }));
  };
  _finishEditing = () => {
    const { todoValue } = this.state;
    const { id, updateTodo } = this.props;
    updateTodo(id, todoValue);
    this.setState({ isEditing: false });
  };
  _toggleCompleted = () => {
    const { isCompleted, completeTodo, uncompleteTodo, id } = this.props;
    if (isCompleted) {
      uncompleteTodo(id);
    } else {
      completeTodo(id);
    }
  };
  _controlInput = text => {
    this.setState({
      ...this.state,
      todoValue: text
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    marginVertical: 20,
    width: width / 2
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 20,
    borderColor: "red",
    borderWidth: 3
  },
  completedTodo: {
    borderColor: "#bbb"
  },
  uncompletedTodo: {
    borderColor: "red"
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "red"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width / 2
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    padding: 0,
    width: width / 2
  }
});
