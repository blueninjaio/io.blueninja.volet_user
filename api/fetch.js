import { dev, prod, url } from "../config";
import { Alert, AsyncStorage } from 'react-native';

async function _fetch(route, method, body) {
    const headers = {};
    if (body) {
        headers['Content-Type'] = 'application/json; charset=utf-8';
    }
    try {
        let token = await AsyncStorage.getItem('token');
        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }
        try {
            let response = await fetch(`${url}${route}`, {
                method: method,
                mode: "cors",
                headers: headers,
                body: body && JSON.stringify(body)
            });
            try {
                let data = await response.json();
                if (response.status !== 200) {
                    Alert.alert(
                        response.statusText,
                        data.message,
                        [{ text: "OK", onPress: () => null }],
                        { cancelable: false }
                    );
                }
                return data;
            } catch (e) {
                Alert.alert(
                    'Volet data error',
                    'Response body cannot be parsed.',
                    [{ text: "OK", onPress: () => null }],
                    { cancelable: false }
                );
            }
        } catch (e) {
            Alert.alert(
                'Error connecting to server Volet',
                `Please check your internet or try again later`,
                [{ text: "OK", onPress: () => null }],
                { cancelable: false }
            );
        }
    } catch (e) {
        Alert.alert(
            'Error',
            `Could not fetch token from storage.`,
            [{ text: "OK", onPress: () => null }],
            { cancelable: false }
        );
    }
}

export async function post(route, body) {
    let data = await _fetch(route, "POST", body);
    if (data.success) {
        return data;
    }
    throw new Error(data.message);
}

export async function get(route) {
    let data = await _fetch(route, "GET");
    if (data.success) {
        return data;
    }
    throw new Error(data.message);
}