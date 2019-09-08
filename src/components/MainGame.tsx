import React, {Component} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

let countFillAllGameBoard = 0;

export default class MainGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
    };
  }

  componentDidMount() {
    this.newGame();
  }

  onNewGame = () => {
    this.newGame();
  };

  onPress = (row, column) => {
    const currentPlayer = this.state.currentPlayer;
    countFillAllGameBoard++;
    // one time pick tile
    const value = this.state.gameState[row][column];
    if (value !== 0) {
      return;
    }

    // set tile
    const array = this.state.gameState.slice();
    array[row][column] = currentPlayer;
    array.forEach(element => {
      console.log(element);
    });
    this.setState({gameState: array});

    // switch to other player
    const nextPlayer = currentPlayer === 1 ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    // check winner
    const winner = this.winnerPlayer();
    console.log('Winner: ' + winner);
    console.log('countFillAllGameBoard: ' + countFillAllGameBoard);
    if (winner === 1) {
      Alert.alert('Player 1 is the Winner');
      this.newGame();
    } else if (winner === -1) {
      Alert.alert('Player 2 is the Winner');
      this.newGame();
    } else if (countFillAllGameBoard === 9) {
      Alert.alert('Ahhh! draw game. Good job guys!');
      this.newGame();
    }
  };

  newGame = () => {
    this.setState({gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]});
    countFillAllGameBoard = 0;
  };

  renderIcon = (row, column) => {
    const value = this.state.gameState[row][column];
    switch (value) {
      case 1:
        return <Text style={styles.iconX}>X</Text>;
      case -1:
        return <Text style={styles.iconO}>O</Text>;
      default:
        return <View />;
    }
  };

  winnerPlayer = () => {
    let sum = 0;
    const array = this.state.gameState;
    const all_tiles = 3;

    // Check row
    for (let i = 0; i < all_tiles; i++) {
      sum = array[i][0] + array[i][1] + array[i][2];
      console.log('Sum row ' + (i + 1) + ': ' + sum);
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    // Check column
    for (let i = 0; i < all_tiles; i++) {
      sum = array[0][i] + array[1][i] + array[2][i];
      console.log('Sum column ' + (i + 1) + ': ' + sum);
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }

    // check diagnals
    sum = array[0][0] + array[1][1] + array[2][2];
    console.log('Sum 1st Diagmals: ' + sum);
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }
    sum = array[2][0] + array[1][1] + array[0][2];
    console.log('Sum 2nd Diagmals: ' + sum);
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    // no winner
    //   check row
    let isGameDone = false;
    for (let i = 0; i < all_tiles; i++) {
      if (array[i][0] !== 0 && array[i][1] !== 0 && array[i][2] !== 0) {
        isGameDone = true;
      }
    }
    console.log('isGameDone: ' + isGameDone);
    if (!isGameDone) {
      return 0;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.newGameContainer}>
          <Button
            onPress={this.onNewGame}
            style={styles.newGame}
            title="New Game"
          />
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity
            onPress={() => this.onPress(0, 0)}
            style={[styles.slot, styles.borderTrimTopLeft]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPress(0, 1)}
            style={[styles.slot, styles.borderTrimTop]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPress(0, 2)}
            style={[styles.slot, styles.borderTrimTopRight]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity
            onPress={() => this.onPress(1, 0)}
            style={[styles.slot, styles.borderTrimMiddleLeft]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPress(1, 1)}
            style={styles.slot}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPress(1, 2)}
            style={[styles.slot, styles.borderTrimMiddleRight]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity
            onPress={() => this.onPress(2, 0)}
            style={[styles.slot, styles.borderTrimBottomLeft]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPress(2, 1)}
            style={[styles.slot, styles.borderTrimBottomMiddle]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPress(2, 2)}
            style={[styles.slot, styles.borderTrimBottomRight]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  borderTrimBottomLeft: {
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  borderTrimBottomMiddle: {
    borderBottomWidth: 0,
  },
  borderTrimBottomRight: {
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  borderTrimMiddleLeft: {
    borderLeftWidth: 0,
  },
  borderTrimMiddleRight: {
    borderRightWidth: 0,
  },
  borderTrimTop: {
    borderTopWidth: 0,
  },
  borderTrimTopLeft: {
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  borderTrimTopRight: {
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  iconX: {
    alignItems: 'center',
    color: 'red',
    fontSize: 70,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginLeft: 18,
    marginTop: 1,
  },
  iconO: {
    alignItems: 'center',
    color: 'green',
    fontSize: 70,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginLeft: 15,
  },
  newGame: {
    marginBottom: 20,
  },
  newGameContainer: {
    justifyContent: 'flex-end',
    marginBottom: 80,
  },
  slot: {
    borderColor: 'black',
    borderWidth: 7,
    height: 100,
    width: 100,
  },
  subContainer: {
    flexDirection: 'row',
  },
});
