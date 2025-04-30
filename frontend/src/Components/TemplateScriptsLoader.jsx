import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const TemplateScriptsLoader = () => {
    const location = useLocation();


    useEffect(() => {
        const scriptPaths = [
            '/assets/vendor/libs/jquery/jquery.js',
            '/assets/vendor/libs/popper/popper.js',
            '/assets/vendor/js/bootstrap.js',
            '/assets/vendor/libs/node-waves/node-waves.js',
            '/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js',
            '/assets/vendor/js/menu.js',
            '/assets/vendor/libs/apex-charts/apexcharts.js',
            // '/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.js',
            '/assets/vendor/libs/jkanban/jkanban.js',
            '/assets/js/main.js',
        ];

        const scriptElements = [];

        const loadScriptsSequentially = async () => {
            for (let src of scriptPaths) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = src;
                    script.async = false;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                    scriptElements.push(script);
                });
            }
        };

        loadScriptsSequentially();

        return () => {
            scriptElements.forEach(script => {
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            });
        };
    }, []);


    return null; // no UI component
}

export default TemplateScriptsLoader; 