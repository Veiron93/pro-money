export const COLORS = {
    active: '#14532d',
    background: '#171717',
    white: '#ffffff',
} as const;

export const TAB_OPTIONS = {
    headerShown: false,
    tabBarActiveTintColor: COLORS.active,
    headerTintColor: COLORS.white,
    tabBarStyle: {
        backgroundColor: COLORS.background,
        borderTopWidth: 0,
    },
    headerStyle: {
        backgroundColor: COLORS.background,
        borderBottomWidth: 0,
    },
    sceneStyle: {
        backgroundColor: COLORS.background,
        padding: 15,
        paddingTop: 0,
    },
} as const;
