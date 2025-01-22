module.exports = {
    bracketSameLine: false,
    bracketSpacing: true,
    endOfLine: 'auto',
    printWidth: 120,
    singleQuote: true,
    tabWidth: 4,
    overrides: [
        {
            files: ['**.*.scss', '*.scss'],
            options: {
                singleQuote: false,
            },
        },
    ],
    plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],
    tailwindFunctions: ['tva'],
    importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
