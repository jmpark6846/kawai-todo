import React from "react";
import { AppLoading } from "expo";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
  AsyncStorage
} from "react-native";
import Todo from "./Todo";
import uuid from "uuid/v1";


const { height, width } = Dimensions.get("window");
export default class App extends React.Component {
  state = {
    newTodo: "",
    loadedTodos: false,
    todos: {}
  };
  componentDidMount = () => {
    this._loadTodos();
  };
  render() {
    const { loadedTodos, newTodo, todos } = this.state;
    if (!loadedTodos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newTodo}
            onChangeText={this._controlNewTodo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addTodo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(todos).map(todo => (
              <Todo
                key={todo.id}
                {...todo}
                deleteById={this._deleteTodo}
                completeTodo={this._completeTodo}
                uncompleteTodo={this._uncompleteTodo}
                updateTodo={this._updateTodo}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
  _controlNewTodo = text => {
    this.setState({ newTodo: text });
  };
  _addTodo = () => {
    const { newTodo } = this.state;
    if (newTodo !== "") {
      this.setState(prevState => {
        const id = uuid();
        const newTodoObject = {
          [id]: {
            id,
            text: newTodo,
            isCompleted: false,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newTodo: "",
          todos: {
            ...prevState.todos,
            ...newTodoObject
          }
        };
        this._saveTodo(newState.todos)
        return { ...newState };
      });
    }
  };
  _loadTodos = async () => {
    try{
      const todos = await AsyncStorage.getItem('todos')
      this.setState({ loadedTodos: true, todos: JSON.parse(todos) });
    } catch(err){
      console.log(err)
    }
    
  };
  _deleteTodo = id => {
    this.setState(prevState => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = { ...prevState, ...todos };
      this._saveTodo(newState.todos)
      return newState
    });
  };
  _completeTodo = id => {
    this.setState(prevState => {
      const newState ={
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: true
          }
        }
      }
      this._saveTodo(newState.todos)
      return newState
    });
  };
  _uncompleteTodo = id => {
    this.setState(prevState => {
      const newState ={
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: false
          }
        }
      }
      this._saveTodo(newState.todos)
      return newState
    });
  };
  _updateTodo = (id, text) => {
    this.setState(prevState => {
      const newState ={
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            text
          }
        }
      }
      this._saveTodo(newState.todos)
      return newState
    });  
  }
  _saveTodo = (newTodos) => {
    console.log(JSON.stringify(newTodos))
    const saveTodos = AsyncStorage.setItem('todos', JSON.stringify(newTodos))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3 
      }
    }),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontWeight: "400",
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});
