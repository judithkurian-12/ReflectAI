// Created by Judith Kurian (B00940475)

import { Snackbar } from 'react-native-paper';
import { Text } from 'react-native';
import { SnackbarStyles } from './SnackbarStyles';

const ErrorModal = (props) => {
    return (
        <Snackbar
        style={SnackbarStyles.snackbar}
        visible={props.visibility}
        onDismiss={props.onDismiss}
        duration={5000}
        action={{
            label: 'Close',
            labelStyle: SnackbarStyles.snackLabel,
            onPress: props.onDismiss,
            }}
        >
            <Text style={SnackbarStyles.errorText}>{props.message}</Text>
        </Snackbar>
    )
}

export default ErrorModal;