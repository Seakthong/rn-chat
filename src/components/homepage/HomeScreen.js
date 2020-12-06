import {Card, Header, Left} from 'native-base';
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {getUser, getUsers} from '../../network/user';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    console.log();
    this.state = {
      myId: props.route.params.myId,
      users: [],
    };
  }

  componentDidMount() {
    console.log(this.state.myId);
    getUser(this.state.myId).then((res) => {
      console.log(res.val());
    });

    getUsers().then((res) => {
      var u = [];
      res.forEach((user) => {
        console.log(user.val());
        u.push({id: user.val().uuid, username: user.val().name});
      });
      this.setState({
        users: u,
      });
      // console.log(res.val())
      // this.setState({data: res.val()})
      // console.log(this.state.data)
    });
  }

  render() {
    return (
      <View>
        <Header>
          <Left></Left>
        </Header>
        <FlatList
          data={this.state.users}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  name: '',
                  img: 'profileImg',
                  receiverId: item.id,
                  senderId: this.state.myId,
                })
              }>
              <Card>
                <Image
                  source={{
                    uri:
                      'https://img2.pngio.com/default-image-png-picture-710225-default-image-png-default-png-376_356.png',
                  }}
                  style={{width: 35, height: 35}}
                />
                <Text>{item.username}</Text>
              </Card>
            </TouchableOpacity>
          )}></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
