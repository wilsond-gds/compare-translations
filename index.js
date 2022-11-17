//https://raw.githubusercontent.com/alphagov/di-ipv-core-front/main/src/locales/cy/default.yml

// All the translation files for the entire journey

// https://raw.githubusercontent.com/alphagov/di-authentication-frontend/main/src/locales/cy|en
// translation.json
// https://raw.githubusercontent.com/alphagov/di-authentication-account-management/main/src/locales/cy|en
// translation.json
// https://raw.githubusercontent.com/alphagov/di-ipv-core-front/main/src/locales/en/translation.json
// https://raw.githubusercontent.com/alphagov/di-ipv-core-front/main/src/locales/cy/translation.json
//
// https://raw.githubusercontent.com/alphagov/di-ipv-cri-uk-passport-front/tree/main/src/locales/cy|en
// 'default.yml', 'fields.yml', 'pages.errors.yml', 'pages.yml'
// https://raw.githubusercontent.com/alphagov/di-ipv-cri-kbv-front/tree/main/src/locales/cy|en
// 'default.yml', 'fields.yml', 'pages.errors.yml', 'pages.yml'
// https://raw.githubusercontent.com/alphagov/di-ipv-cri-address-front/tree/main/src/locales/cy|en
// 'default.yml', 'fields.yml', 'pages.errors.yml', 'pages.yml'
// https://raw.githubusercontent.com/alphagov/di-ipv-cri-dl-front/tree/main/src/locales/cy|en
// 'default.yml', 'fields.yml', 'pages.errors.yml', 'pages.yml' (no Welsh yet)
// https://raw.githubusercontent.com/alphagov/di-ipv-cri-fraud-front/tree/main/src/locales/cy|en
// 'default.yml', 'fields.yml', 'pages.errors.yml', 'pages.yml'


function flattenObject(ob, prefix = false, result = null) {
    result = result || {};

    // Preserve empty objects and arrays, they are lost otherwise
    if (prefix && typeof ob === 'object' && ob !== null && Object.keys(ob).length === 0) {
        result[prefix] = Array.isArray(ob) ? [] : {};
        return result;
    }

    prefix = prefix ? prefix + '.' : '';

    for (const i in ob) {
        if (Object.prototype.hasOwnProperty.call(ob, i)) {
            if (typeof ob[i] === 'object' && ob[i] !== null) {
                // Recursion on deeper objects
                flattenObject(ob[i], prefix + i, result);
            } else {
                result[prefix + i] = ob[i];
            }
        }
    }
    return result;
}

// https://raw.githubusercontent.com/alphagov/di-authentication-frontend/main/src/locales/

let compareFiles = {};
let gitHubLocation = prompt('Enter the raw.githubusercontent location of the locales files (include a trailing slash)','https://raw.githubusercontent.com/alphagov/di-ipv-core-front/main/src/locales/');
const languages = Array('en', 'cy');
const files = Array('translation.json');

const tableData = document.querySelector('.translation');

const outputData = (jsonData) => {
    let keyHeading = '';
    tableData.insertAdjacentHTML('beforebegin', `<h1><span>Content from JSON files at</span><code> ${gitHubLocation}</code></h1>`)
    for (const [key, value] of Object.entries(jsonData.en)) {
        let keyState = key.split('.')[0];
        //console.log(keyState);
        if(keyState!==keyHeading){
            tableData.insertAdjacentHTML('beforeend', '<tr><td colspan="3"><h2>'+keyState+'</h2></td></tr>');
            keyHeading = keyState;
        }
        if (value !== undefined && jsonData.cy[key] !== undefined) {

            tableData.insertAdjacentHTML('beforeend', '<tr><td colspan="2">' + key.replace(keyHeading+'.', '') + "</td></tr><tr><td>" + value + "</td><td>" + jsonData.cy[key] + '</td></tr>')
        }
    }

}

const fetchContents = (uri, language) => {
    fetch(uri, {mode:"cors"})
        .then((response) => response.text())
        .then((data) => {
            compareFiles[language] = flattenObject(JSON.parse(data));
            if (Object.keys(compareFiles).length === 2) {
                outputData(compareFiles);
            }
        })
}

const fetchFiles = (language, files) => {
    files.forEach(file => {
        fetchContents(gitHubLocation + language + '/' + file, language);
    })
}

languages.forEach(language => {
        fetchFiles(language, files)
    }
)

