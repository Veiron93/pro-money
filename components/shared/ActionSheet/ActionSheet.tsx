import { Modal, Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface stylesInterface {
    backdrop?: StyleProp<ViewStyle>;
    modal?: StyleProp<ViewStyle>;
    header?: StyleProp<ViewStyle>;
    title?: StyleProp<TextStyle>;
    btnClose?: StyleProp<ViewStyle>;
}

interface ActionSheetProps {
    children: React.ReactNode;
    visible: boolean;
    title?: string;
    customStyles?: stylesInterface;
    showCloseButton?: boolean;
    onClose: () => void;
}

export const ActionSheet = ({
    children,
    title,
    visible,
    onClose,
    customStyles,
    showCloseButton = true,
}: ActionSheetProps) => {
    const baseStyles = StyleSheet.create({
        backdrop: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        modal: {
            backgroundColor: '#171717',
            minHeight: '20%',
            maxHeight: '60%',
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            padding: 20,
            overflow: 'hidden',
        },
        indicator: {
            width: 35,
            height: 5,
            backgroundColor: 'red',
            borderRadius: 10,
            marginBottom: 10,
        },
        btnClose: {
            height: 30,
            backgroundColor: '#5c5c5c',
            borderRadius: 100,
            marginLeft: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 2,
            paddingHorizontal: 10,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            marginBottom: 15,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            lineHeight: 28,
        },
    });

    const styles = StyleSheet.flatten([baseStyles, customStyles]) as stylesInterface;

    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
            <Pressable style={styles.backdrop} onPress={onClose} />

            <View style={styles.modal}>
                <View style={styles.header}>
                    {title && <Text style={styles.title}>{title}</Text>}

                    {showCloseButton && (
                        <Pressable onPress={onClose} style={styles.btnClose}>
                            <Text style={{ color: '#171717' }}>Закрыть</Text>
                        </Pressable>
                    )}
                </View>

                {children}
            </View>
        </Modal>
    );
};
