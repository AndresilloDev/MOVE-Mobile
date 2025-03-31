import React, { useCallback } from "react";
import {
    FlatList,
    Modal,
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

const DeviceModalListItem = ({ item, connectToPeripheral, closeModal }) => {
    const connectAndCloseModal = useCallback(() => {
        connectToPeripheral(item);
        closeModal();
    }, [closeModal, connectToPeripheral, item]);

    return (
        <TouchableOpacity onPress={connectAndCloseModal} style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>{item.name || "Unknown Device"}</Text>
        </TouchableOpacity>
    );
};

const DeviceModal = ({ devices = [], visible, connectToPeripheral, closeModal }) => {
    const renderDeviceModalListItem = ({ item }) => (
        <DeviceModalListItem item={item} connectToPeripheral={connectToPeripheral} closeModal={closeModal} />
    );

    return (
        <Modal animationType="slide" transparent={false} visible={visible}>
            <SafeAreaView style={styles.modalContainer}>
                <Text style={styles.modalTitleText}>Tap on a device to connect</Text>
                {devices.length > 0 ? (
                    <FlatList
                        contentContainerStyle={styles.modalFlatlistContainer}
                        data={devices}
                        keyExtractor={(item) => item.id}
                        renderItem={renderDeviceModalListItem}
                    />
                ) : (
                    <View style={styles.noDevicesContainer}>
                        <Text style={styles.noDevicesText}>No devices found</Text>
                    </View>
                )}
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalFlatlistContainer: {
        flexGrow: 1,
        justifyContent: "center",
    },
    modalTitleText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    ctaButton: {
        backgroundColor: "#FF6060",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: "100%",
        marginBottom: 10,
        borderRadius: 8,
    },
    ctaButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    closeButton: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    closeButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    noDevicesContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    noDevicesText: {
        fontSize: 16,
        color: "gray",
    },
});

export default DeviceModal;