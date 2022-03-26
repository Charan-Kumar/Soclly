import {JVB_SERVER} from "../../consts";

const loadScript = (callback) => {
    const existingScript = document.getElementById('externailApiJs');
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://${JVB_SERVER}/external_api.js`;
        script.id = 'externailApiJs';
        document.body.appendChild(script);

        script.onload = () => {
            if (callback) callback();
        };
    }
    if (existingScript && callback) callback();
};
export default loadScript;