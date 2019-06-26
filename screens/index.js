import React from 'react'
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from 'react-native'

import AppNavigator from '../navigation/AppNavigator'
import LoginNavigator from './Login/index'
import { connect } from 'react-redux'

import Login from './Login'

export class App extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount = () => {
        this._retrieveData()
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                // fetch('http://139.59.18.237/api/driver/token', {
                //     method: 'POST',
                //     headers: {
                //         "Content-Type": "application/json; charset=utf-8",
                //     },
                //     body: JSON.stringify({
                //         token: value
                //     })
                // })
                //     .then((response) => response.json())
                //     .then((data) => {
                //         if (data.success) {
                //             this.props.logMeIn();
                //         }
                //     })
                //     .catch((error) => console.error(error))
                console.log("Token:", value)
            } else {
                console.log("No token found.")
            }
        } catch (error) {
            console.info(error)
        }
    }


    render() {
        return (
            <React.Fragment>
                <StatusBar hidden={true} />
                {
                    this.props.login.isLoggedIn === true
                        ? <AppNavigator />
                        : this.props.login.isLoggedIn === false
                            ?
                            // <Login logMeIn={this.props.logMeIn} />
                            <LoginNavigator />

                            :
                            <View style={styles.container}>
                                <Text>Can't Connect to Redux</Text>
                            </View>
                }
            </React.Fragment>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state
    }
}

export default connect(mapStateToProps)(App)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
