module.exports = function (api) {
    api.cache(true);

    return {
        presets: [
            [
                'babel-preset-expo',
                {
                    jsxImportSource: 'nativewind',
                },
            ],
            'nativewind/babel',
        ],

        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],

                    alias: {
                        '@': './',
                        '@customTypes': './types',
                        '@storage': './storage',
                        '@components': './components',
                        '@services': './services',
                        '@hooks': './hooks',
                        '@repositories': './repositories',
                        '@managers': './domain/managers',
                        'tailwind.config': './tailwind.config.js',
                    },
                },
            ],
        ],
    };
};
