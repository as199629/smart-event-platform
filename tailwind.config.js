// ... existing code ...
module.exports = {
    darkMode: 'class', // 確保啟用class-based dark mode
    theme: {
        extend: {
            colors: {
                // 添加或修改顏色
                primary: '#3b82f6',
                secondary: '#10b981',
                dark: {
                    900: '#0a0a0a',
                    800: '#1a1a1a',
                },
            },
        },
    },
}
