chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {


    const getValue = chrome.storage.local.get('userdetails');
    getValue.then(res => {
        const session = res.userdetails;
        const pid = 1;

        if (request.action == 'runcodemain_response') {
            let data = request.data;

            var formData = new FormData();
            formData.append('session_id', session);
            formData.append('data', data);

            let formData1 = { session_id: session, data: data }

            let linkedinURL = "https://lusha.recnxt.cloud/linkedin_parsing.php";

            fetch(linkedinURL, {
                method: 'POST',
                body: JSON.stringify(formData1),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "runcodemain_final_data", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });

        }

        if (request.action == 'get_user_notes') {
            let url = request.data[0];

            var formData = new FormData();
            formData.append('s', session);
            formData.append('platformid', pid);
            formData.append('url', url);

            let useNotesUrl = 'https://lusha.recnxt.cloud/get_notes.php';
            fetch(useNotesUrl, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "get_user_notes_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });

            chrome.runtime.sendMessage({ action: "runcodemain" });


        }

        if (request.action == 'get_notes_category') {

            var formData = new FormData();
            formData.append('s', session);

            let useNotesCategoryUrl = 'https://lusha.recnxt.cloud/get_notes_category.php';



            fetch(useNotesCategoryUrl, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "get_notes_category_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        }

        if (request.action == 'new_note_save') {
            let data = request.data;
            let note = data[0];
            let category = data[1];
            let url = data[2];

            var formData = new FormData();
            formData.append('s', session);
            formData.append('platformid', pid);
            formData.append('url', url);
            formData.append('notes', note);
            formData.append('notes_category', category);

            let useNotesNewUrl = 'https://lusha.recnxt.cloud/create_notes.php';


            fetch(useNotesNewUrl, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "new_note_save_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });

        }

        if (request.action == 'notes_edit_update') {
            let text = request.data[0];
            let note_id = request.data[1];
            let note_type = request.data[2];

            var formData = new FormData();
            formData.append('s', session);
            formData.append('notes_id', note_id);
            formData.append('notes_type', note_type);
            formData.append('notes', text);

            let noteUpdateUrl = 'https://lusha.recnxt.cloud/update_notes.php';


            fetch(noteUpdateUrl, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    let sndData = [];
                    sndData.push(request.data[3])
                    sndData.push(JSON.stringify(data));
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "notes_edit_update_response", data: sndData });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });

        }

        if (request.action == 'show_btn_encrypt_data') {
            let lsurl = request.data[0];
            let encrypt = request.data[1];
            let lscid = 1;
            let lscurl = 'www.recruitnxt.com';



            var formData = new FormData();
            formData.append('sessionid', session);
            formData.append('platformid', pid);
            formData.append('url', lsurl);
            formData.append('encrypt', encrypt);
            formData.append('cid', lscid);
            formData.append('curl', lscurl);


            let urlGetData = "https://lusha.recnxt.cloud/getdata.php";

            fetch(urlGetData, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (encrypt == 'no') {
                        data['show_popup'] = true;
                    }
                    else {
                        data['show_popup'] = false;
                    }
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "show_btn_encrypt_data_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        }

        if (request.action == 'colleagues_details') {

            let cid = request.data[0]
            var formData = new FormData();
            formData.append('s', session);
            formData.append('cid', cid);

            let colleaguesUrl = 'https://lusha.recnxt.cloud/get_company_employee.php';

            fetch(colleaguesUrl, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "colleagues_details_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });

        }


        if (request.action == 'colleagues_access_email') {
            let pid = request.data[0];
            var formData = new FormData();
            formData.append('s', session);
            formData.append('pid', pid);
            formData.append('platformid', 1);

            let colleaguesAccessUrl = 'https://lusha.recnxt.cloud/get_single_employee_data.php';

            fetch(colleaguesAccessUrl, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    data['pid'] = pid;
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "colleagues_access_email_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });


        }

        if (request.action == 'user_saved_data') {

            var formData = new FormData();
            formData.append('s', session);
            formData.append('platformid', pid);

            let lid = request.data;
            if (lid.length != 0 && lid != 'all') {
                formData.append('listid', lid);
            }

            let urlGetSaveData = "https://lusha.recnxt.cloud/get_save_data.php";

            fetch(urlGetSaveData, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "user_saved_data_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });

        }

        if (request.action == 'get_contact_list') {


            var formData = new FormData();
            formData.append('sessionid', session);

            let urlSaveData = "https://lusha.recnxt.cloud/getContactList.php";

            fetch(urlSaveData, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "get_contact_list_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        }

        if (request.action == 'move_btn_lists') {

            var formData = new FormData();
            formData.append('sessionid', session);

            let urlSaveData = "https://lusha.recnxt.cloud/getContactList.php";

            fetch(urlSaveData, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "move_btn_lists_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });

        }

        if (request.action == 'get_contact_list_saved_page') {

            var formData = new FormData();
            formData.append('sessionid', session);

            let urlSaveData = "https://lusha.recnxt.cloud/getContactList.php";


            fetch(urlSaveData, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "get_contact_list_saved_page_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        }

        if (request.action == 'save_btn') {

            let listid = request.data[0];
            let url = request.data[1];


            var formData = new FormData();
            formData.append('sessionid', session);
            formData.append('platformid', pid);
            formData.append('listid', listid);
            formData.append('url', url);

            let urlSaveData = "https://lusha.recnxt.cloud/savedata.php";

            fetch(urlSaveData, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "save_btn_data", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        }

        if (request.action == 'create_new_list') {
            let listname = request.data;

            var formData = new FormData();
            formData.append('sessionid', session);
            formData.append('platformid', pid);
            formData.append('listname', listname);

            let urlSaveData = "https://lusha.recnxt.cloud/createNewlist.php";

            fetch(urlSaveData, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "create_new_list_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });

        }
        if (request.action == 'move_create_new_list') {
            let listname = request.data;

            var formData = new FormData();
            formData.append('sessionid', session);
            formData.append('platformid', pid);
            formData.append('listname', listname);

            let urlSaveData = "https://lusha.recnxt.cloud/createNewlist.php";


            fetch(urlSaveData, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "move_create_new_list_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        }

        if (request.action == 'login_user_profile') {
            var formData = new FormData();
            formData.append('s', session);

            let urlSaveData = "https://lusha.recnxt.cloud/getPersonData.php";

            fetch(urlSaveData, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "login_user_profile_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });

        }


        if (request.action == 'move_list_save_data') {
            let listid = request.data[0];
            let url = request.data[1];

            var formData = new FormData();
            formData.append('sessionid', session);
            formData.append('url', url);
            formData.append('listid', listid);

            let urlSaveData = "https://lusha.recnxt.cloud/update_list_api.php";

            fetch(urlSaveData, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "move_list_save_data_respone", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });

        }
        // company hiring api

        if (request.action == 'company_hiring_req') {
            console.log(session)
            var formData1 = new FormData();
            formData1.append('s', session);
            formData1.append('cid', 1);
            let compny_hiring_data = "https://lusha.recnxt.cloud/get_company_hiring.php";

            fetch(compny_hiring_data, {
                method: 'POST',
                body: formData1,
            })
                .then((response) => { return response.json() })
                .then((data) => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "company_hiring_response", data: JSON.stringify(data) });
                    })
                }).catch((error) => {
                    console.log('Error:', error);
                });

        }

        // company_funding api
        if (request.action == 'company_funding_req') {

            console.log('funding')
            console.log(session)
            var formData = new FormData();
            formData.append('s', session);
            formData.append('cid', 1);
            let company_funding_api = "https://lusha.recnxt.cloud/get_company_funding.php";

            fetch(company_funding_api, {
                method: 'POST',
                body: formData,
            })
                .then((response) => { return response.json() })
                .then((data) => {
                    console.log(" company funding")
                    console.log(data)
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "company_funding_response", data: JSON.stringify(data) });
                    });
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        }

    })//end of getting session id from local storage

})

