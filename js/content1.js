var floater_width = '20em';
var floater_width_collapse = '21em';
let move_list_url = "";

$('document').ready(function () {

    const getValue = chrome.storage.local.get('userdetails');

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

        if (request.action == 'take_session') {
            chrome.storage.local.set({ 'userdetails': request.data })
            setTimeout(() => {
                getValue.then(res => {
                    console.log("session id: " + res.userdetails)
                });
            }, 2000);

        }

        if (request.action == 'runcodemain_final_data') {
            let data = request.data;
            console.log(data);
        }

        if (request.action == 'get_user_notes_response') {
            console.log("user notes: " + request.data)
            let data = JSON.parse(request.data);

            if (data.result == 'success') {
                if (document.getElementById('notes_container')) {
                    document.getElementById('notes_container').innerHTML = "";
                }
                if (data.data_found == 'yes') {

                    data.data.forEach(el => {
                        let noteContainer = document.createElement('div');
                        noteContainer.id = el.note_id + "-" + el.note_type + "-" + el.notes_type_id;
                        noteContainer.classList.add('single_note');


                        //upper note container
                        let notesText = document.createElement('div');
                        notesText.classList.add('notes_text_date');

                        let text = document.createElement('textarea');
                        text.style.outline = 'none';
                        text.style.border = 'none';
                        text.style.resize = 'none';
                        text.style.boxShadow = 'none';
                        text.setAttribute('readonly', 'true');
                        text.setAttribute('rows', '4');
                        text.setAttribute('cols', "32");
                        text.classList.add('notes_text');
                        text.innerText = el.note;

                        let date = document.createElement('span');
                        date.classList.add('notes_date');
                        date.innerText = "On " + el.date + " : ";

                        notesText.appendChild(date);
                        let br = document.createElement('br');
                        notesText.appendChild(br);
                        notesText.appendChild(text);

                        //note footer container
                        let notesFooter = document.createElement('div');
                        notesFooter.classList.add('notes_footer_container');

                        notesFooter.innerHTML = `
                        <div class="noteFooter note_footer_initial_container">
                            <div class="notes_btns notes_edit">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="edit_existing_notes"
                                    style="width: 16px; height: 16px">
                                    <path
                                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                                    />
                                </svg>
                                <span>Edit</span>
                            </div>
                            <div class="notes_btns notes_add">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="add_new_notes"
                                    style="width: 16px; height: 16px">
                                    <path
                                    d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                                    />
                                </svg>
                                <span>Add</span>
                            </div>
                        </div>
                        <div class="noteFooter note_footer_later_container" style="display:none;">
                            <div class="notes_btns notes_edit_save_btn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="notes_hidden_save_btn">
                                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/></svg>
                                <span>Save</span>
                            </div>
                            <div class="notes_btns notes_edit_cancel_btn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="notes_hidden_save_btn">
                                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/></svg>
                                <span>Cancel</span>
                            </div>
                        </div>`;



                        let popupContainers = document.createElement('div');
                        popupContainers.classList.add('notes_popup_container');
                        popupContainers.style.display = "none";


                        let newNotePopupContainer = document.createElement('div');
                        newNotePopupContainer.classList.add('new_note_popup_container')
                        newNotePopupContainer.classList.add('popupStyling')
                        newNotePopupContainer.id = 'new_note_popup_container';
                        newNotePopupContainer.style.display = 'none';
                        newNotePopupContainer.innerHTML =
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="new_note_popup_container_close_btn">
                            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                        </svg>
                        <h5>Create new note</h5>
                        <textarea rows="4" cols="35" style="resize:none;outline:none" class="new_note_text" placeholder="Enter your note here"></textarea>
                        <select id="new_note_category_select" class="note_all_category"></select>
                        <button class="btn new_note_save">Save</button>
                        `;

                        popupContainers.appendChild(newNotePopupContainer);


                        noteContainer.appendChild(notesText);
                        noteContainer.appendChild(notesFooter);
                        noteContainer.appendChild(popupContainers);
                        document.getElementById('notes_container').appendChild(noteContainer);
                    });
                    document.getElementById('notesMainApp').style.display = 'flex';

                }
                else {
                    let noNoteContainer = document.createElement('div');
                    noNoteContainer.id = 'no_note_container';
                    noNoteContainer.innerText = 'No note found for this user';

                    if (document.querySelector('.notes_footer_container')) {
                        document.querySelector('.notes_footer_container').innerHTML = ""
                    }
                    else {

                        let notesFooter = document.createElement('div');
                        notesFooter.classList.add('notes_footer_container');

                        notesFooter.innerHTML = `
                        <div class="noteFooter note_footer_initial_container">
                            <div class="notes_btns notes_add">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="add_new_notes"
                                    style="width: 16px; height: 16px">
                                    <path
                                    d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                                    />
                                </svg>
                                <span>Add</span>
                            </div>
                        </div>`;


                        if (!document.querySelector('.notes_popup_container')) {

                            let popupContainers = document.createElement('div');
                            popupContainers.classList.add('notes_popup_container');
                            popupContainers.style.display = "none";

                            let newNotePopupContainer = document.createElement('div');
                            newNotePopupContainer.classList.add('new_note_popup_container')
                            newNotePopupContainer.classList.add('popupStyling')
                            newNotePopupContainer.id = 'new_note_popup_container';
                            newNotePopupContainer.style.display = 'none';
                            newNotePopupContainer.innerHTML =
                                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="new_note_popup_container_close_btn">
                                <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                            </svg>
                            <h5>Create new note</h5>
                            <textarea rows="4" cols="35" style="resize:none;outline:none" class="new_note_text" placeholder="Enter your note here"></textarea>
                            <select id="new_note_category_select" class="note_all_category"></select>
                            <button class="btn new_note_save">Save</button>
                            `;

                            popupContainers.appendChild(newNotePopupContainer);

                            noNoteContainer.appendChild(notesFooter);
                            noNoteContainer.appendChild(popupContainers);
                            document.getElementById('notes_container').appendChild(noNoteContainer);
                            document.getElementById('notesMainApp').style.display = 'block';
                        }

                    }
                }
                notesLoaded();
            }
            else {
                console.log(data.message)
            }

        }

        if (request.action == 'get_notes_category_response') {
            // console.log("user notes: " + request.data)
            let data = JSON.parse(request.data);
            if (data.result == 'success') {
                document.querySelectorAll('.note_all_category').forEach(ele => {
                    ele.innerHTML = "";

                    data.data.forEach(el => {
                        let option = document.createElement('option');

                        option.setAttribute('value', el.note_type_id);
                        option.innerText = el.note_type;

                        ele.appendChild(option);
                    });
                });

            }
            else {
                console.log(data.message);
            }
        }

        if (request.action == 'new_note_save_response') {
            // console.log("user notes: " + request.data)
            let data = JSON.parse(request.data);
            if (data.result == 'success') {
                document.getElementById('new_note_popup_container').style.display = 'none';
                document.querySelector('.notes_popup_container').style.display = 'none';

                let url = window.location.href;
                let data = []
                data.push(url);
                chrome.runtime.sendMessage({ action: "get_user_notes", data: data });

            }
            else {
                console.log(data.message);
            }
        }

        if (request.action == 'notes_edit_update_response') {
            let data = JSON.parse(request.data[1]);
            if (data.result == 'success') {

                let note = document.getElementById(request.data[0]);
                note.querySelector('.notes_footer_container').firstElementChild.style.display = 'flex';
                note.querySelector('.notes_footer_container').firstElementChild.nextElementSibling.style.display = 'none';

                let url = window.location.href;
                let dataurl = []
                dataurl.push(url);

                chrome.runtime.sendMessage({ action: "get_user_notes", data: dataurl });
            }
            else {
                console.log(data.message);
            }
        }


        if (request.action == 'get_contact_list_response') {
            // let data = JSON.parse(request.data);

            if (data.result == 'success') {
                let save_btn_lists = document.getElementById('save_btn_lists');
                save_btn_lists.innerHTML = '';
                if (data.list && data.list.length > 0) {
                    save_btn_lists.removeAttribute('disabled');
                    data.list.forEach(e => {
                        let option = document.createElement('option');
                        option.setAttribute('value', e.id);
                        option.innerText = e.list_name;
                        save_btn_lists.appendChild(option);
                    });
                }
                else {
                    let option = document.createElement('option');
                    option.setAttribute('value', ' ');
                    option.innerText = 'No list found';
                    option.setAttribute('selected', true);
                    save_btn_lists.appendChild(option);
                    save_btn_lists.setAttribute('disabled', true);

                }
            }
        }

        if (request.action == 'get_contact_list_saved_page_response') {
            // console.log("contact list: " + request.data);

            let data = JSON.parse(request.data);

            if (data.result == 'success') {
                let save_btn_lists = document.getElementById('filter_saved_profile_name');
                save_btn_lists.innerHTML = "";

                let option = document.createElement('option');
                option.setAttribute('value', 'all');
                option.innerText = "All Contacts";
                save_btn_lists.appendChild(option);

                if (data.list && data.list.length > 0) {
                    save_btn_lists.removeAttribute('disabled');
                    data.list.forEach(e => {
                        let option = document.createElement('option');
                        option.setAttribute('value', e.id);
                        option.innerText = e.list_name;
                        save_btn_lists.appendChild(option);
                    });
                }

            }
        }

        if (request.action == 'move_btn_lists_response') {
            let data = JSON.parse(request.data);
            if (data.result == 'success') {
                let move_btn_lists = document.getElementById('move_btn_lists');
                move_btn_lists.innerHTML = '';

                if (data.list && data.list.length > 0) {
                    move_btn_lists.removeAttribute('disabled');
                    data.list.forEach(e => {
                        let option = document.createElement('option');
                        option.setAttribute('value', e.id);
                        option.innerText = e.list_name;
                        move_btn_lists.appendChild(option);
                    });
                }
                else {
                    let option = document.createElement('option');
                    option.setAttribute('value', ' ');
                    option.innerText = 'No list found';
                    option.setAttribute('selected', true);
                    move_btn_lists.appendChild(option);
                    move_btn_lists.setAttribute('disabled', true);
                }
            }
        }


        if (request.action == 'show_btn_data') {
            console.log("Decrypt data: " + request.data);
            let data = JSON.parse(request.data);

            if (data.result == 'success') {
                if (data.coins.result == 'error') {
                    document.getElementById('main_content_message_field').innerText = data.coins.message;
                    document.getElementById('main_content_message_field').style.display = 'block';

                    setTimeout(() => {
                        document.getElementById('main_content_message_field').style.display = 'none';
                    }, 4000);
                }
                else {
                    chrome.runtime.sendMessage({ action: "login_user_profile" });

                    let phone = 1, email = 1;
                    document.getElementById('user_details_email_and_phone').innerHTML = "";

                    data.person_details.contact_details.forEach(e => {

                        if (e.datatype == 'email') {
                            let div = document.createElement('div');
                            div.classList.add('workEmail');
                            div.classList.add('hover_info_check_effect');

                            let span = document.createElement('i');
                            span.classList.add('fa-solid');
                            span.classList.add('fa-envelope');

                            let span1 = document.createElement('span');
                            span1.id = 'upperContent_work' + email + 'Email';

                            let type = document.createElement('span')
                            type.innerHTML = 'Business'
                            type.classList.add('upperContent_type')

                            if (e.value.length == 0) {
                                span1.innerText = 'No data found for now';
                                document.getElementById('no_data_found_data_valuable').style.display = 'flex';
                            }
                            else {
                                span1.innerText = e.value;
                                document.getElementById('no_data_found_data_valuable').style.display = 'none';
                            }

                            div.appendChild(span);
                            div.appendChild(span1);
                            div.appendChild(type);
                            document.getElementById('user_details_email_and_phone').appendChild(div);
                            email++;
                        }
                        else {
                            let div = document.createElement('div');
                            div.classList.add('phonenumber');
                            div.classList.add('hover_info_check_effect');

                            let span = document.createElement('i');
                            span.classList.add('fa-solid');
                            span.classList.add('fa-phone');

                            let span1 = document.createElement('span');
                            span1.id = 'upperContent_phone' + phone;

                            let type = document.createElement('span')
                            type.innerHTML = 'Business'
                            type.classList.add('upperContent_type')

                            if (e.value.length == 0) {
                                span1.innerText = 'No data found for now';
                            }
                            else {
                                span1.innerText = e.value;
                            }

                            div.appendChild(span);
                            div.appendChild(span1);
                            div.appendChild(type);
                            document.getElementById('user_details_email_and_phone').appendChild(div);
                            phone++;
                        }
                    });
                    setlushaSystem_information(data.company_details);
                    document.getElementById('show_btn').style.display = 'none';
                    document.getElementById('save_btn').style.display = 'block';
                    document.getElementById('view_And_more_save_contact').style.display = 'flex';
                }

            }
            else {
                alert("Decrypt data " + data.message);
            }
        }

        if (request.action == 'user_saved_data_response') {
            console.log('user_saved_data_response: ', request.data)
            let data = JSON.parse(request.data);

            if (data.result == 'success') {
                if (data.data.length > 0) {
                    document.getElementById('savedBtn').style.display = 'flex';
                    document.getElementById('saved_profile_names').innerHTML = "";

                    data.data.forEach(e => {
                        let div = document.createElement('div');
                        div.id = data.data[0].url;

                        div.innerHTML = e.name + `
                        <div class="svg_border" style="display:none">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" class="absolute_svg" ><path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"/></svg>
                        <div class="svg_border_popup" style="display:none">
                            <span class="saved_move_to_list_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/>
                            </svg>
                            Move to list</span>
                        </div>
                        </div>`;

                        div.classList.add('saved_hover_effect');

                        document.getElementById('saved_profile_names').appendChild(div);

                    });

                }
                else {
                    document.getElementById('savedBtn').style.display = 'none';
                }

            }
            else if (data.data_found == 'no') {
                document.getElementById('saved_profile_names').innerHTML = "";
                let div = document.createElement('div');
                div.id = 'no_user_data_found';
                div.innerText = 'No Data for this list';
                document.getElementById('saved_profile_names').appendChild(div);

            }
            else {
                alert("user save data " + data.message);

            }
        }


        if (request.action == 'show_btn_encrypt_data_response') {
            // console.log("Encrypt Data: " + request.data);
            let data = JSON.parse(request.data);

            if (data.result == 'success') {

                let phone = 1, email = 1;
                document.getElementById('user_details_email_and_phone').innerHTML = "";

                if (data.data_mode == 'decrypted') {
                    document.getElementById('show_btn').style.display = 'none';
                    document.getElementById('save_btn').style.display = 'block';
                    document.getElementById('view_And_more_save_contact').style.display = 'flex';

                }
                else {
                    document.getElementById('show_btn').style.display = 'block';
                    document.getElementById('save_btn').style.display = 'none';
                    document.getElementById('view_And_more_save_contact').style.display = 'none';

                }

                if (data.person_details.contact_details.length > 0) {
                    document.getElementById('no_data_found_data_valuable').style.display = 'none';


                    data.person_details.contact_details.forEach(e => {

                        if (e.datatype == 'email') {
                            let div = document.createElement('div');
                            div.classList.add('workEmail');

                            let span = document.createElement('i');
                            span.classList.add('fa-solid');
                            span.classList.add('fa-envelope');

                            let span1 = document.createElement('span');
                            span1.id = 'upperContent_work' + email + 'Email';
                            span1.innerText = e.value;

                            let type = document.createElement('span')
                            type.innerHTML = 'Business'
                            type.classList.add('upperContent_type')

                            div.appendChild(span);
                            div.appendChild(span1);
                            div.appendChild(type);
                            document.getElementById('user_details_email_and_phone').appendChild(div);
                            email++;


                        }
                        else {
                            let div = document.createElement('div');
                            div.classList.add('phonenumber');

                            let span = document.createElement('i');
                            span.classList.add('fa-solid');
                            span.classList.add('fa-phone');

                            let span1 = document.createElement('span');
                            span1.id = 'upperContent_phone' + phone;
                            span1.innerText = e.value;

                            let type = document.createElement('span')
                            type.innerHTML = 'Business'
                            type.classList.add('upperContent_type')

                            div.appendChild(span);
                            div.appendChild(span1);
                            div.appendChild(type);
                            document.getElementById('user_details_email_and_phone').appendChild(div);
                            phone++;
                        }

                    });
                    setlushaSystem_information(data.company_details);
                }
                else {
                    let div = document.createElement('div');
                    div.classList.add('phonenumber');
                    div.classList.add('margin_point8em');

                    let span = document.createElement('i');
                    span.classList.add('fa-solid');
                    span.classList.add('fa-phone');

                    let span1 = document.createElement('span');
                    span1.id = 'upperContent_phone' + phone;
                    span1.innerText = 'No phone detail found';

                    div.appendChild(span);
                    div.appendChild(span1);
                    document.getElementById('user_details_email_and_phone').appendChild(div);

                    let div1 = document.createElement('div');
                    div1.classList.add('workEmail');
                    div1.classList.add('margin_point8em');

                    let span2 = document.createElement('i');
                    span2.classList.add('fa-solid');
                    span2.classList.add('fa-envelope');

                    let span3 = document.createElement('span');
                    span3.id = 'upperContent_work' + email + 'Email';
                    span3.innerText = 'No email detail found';

                    div1.appendChild(span2);
                    div1.appendChild(span3);
                    document.getElementById('user_details_email_and_phone').appendChild(div1);

                    document.getElementById('no_data_found_data_valuable').style.display = 'flex';
                    setlushaSystem_information();

                }

                let autoOpen = localStorage.getItem('auto_open');
                if (autoOpen == 'true') {
                    setTimeout(() => {
                        document.getElementById('imgSlider').click();
                    }, 2000);
                }
            }
            else {
                alert("Encrypt data " + data.message);
            }
        }


        if (request.action == 'save_btn_data') {
            let data = JSON.parse(request.data);

            if (data.result == 'success') {
                document.getElementById('save_btn_popup_container').style.display = "none";
                chrome.runtime.sendMessage({ action: "user_saved_data", data: '' });

                document.getElementById('message_popup_svg').style.fill = 'green';
                document.getElementById('message_popup_container').style.color = 'green';
                document.getElementById('message_popup_text').innerText = "Saved to Lusha";

                setTimeout(() => {
                    document.getElementById('message_popup_container').style.display = 'flex';
                }, 500);

                setTimeout(() => {
                    document.getElementById('message_popup_container').style.display = 'none';
                }, 3500);
            }
            else {
                if (document.getElementById('save_btn_default_popup_container').style.display == 'block' || document.getElementById('save_btn_default_popup_container').style.display == '') {
                    document.getElementById('save_btn_popup_container').style.display = "none";

                    document.getElementById('message_popup_svg').style.fill = 'red';
                    document.getElementById('message_popup_container').style.color = 'red';
                    document.getElementById('message_popup_text').innerText = data.message;


                    setTimeout(() => {
                        document.getElementById('message_popup_container').style.display = 'flex';
                    }, 500);

                    setTimeout(() => {
                        document.getElementById('message_popup_container').style.display = 'none';
                    }, 3500);
                }
            }
        }
        if (request.action == 'create_new_list_response') {
            console.log(request.data);
            var data = JSON.parse(request.data);

            if (data.result == 'success') {

                chrome.runtime.sendMessage({ action: "move_btn_lists" });
                chrome.runtime.sendMessage({ action: "get_contact_list_saved_page" });
                chrome.runtime.sendMessage({ action: "get_contact_list" });


                let listName = document.getElementById('create_new_list_input').value;
                let href = window.location.href;
                let savedata = [];
                savedata.push(listName);
                savedata.push(href);

                chrome.runtime.sendMessage({ action: "save_btn", data: savedata });
            }
            else {

                document.getElementById('create_new_list_input').style.border = '2px solid red';
                document.getElementById('create_new_list_input').style.boxShadow = 'inset 0 0 0 1px red';

                document.getElementById('create_new_list_message').style.color = 'red';
                document.getElementById('create_new_list_message').innerText = data.message;
                document.getElementById('create_new_list_message').style.display = 'flex';

                document.getElementById('create_new_list_input').value = '';

                setTimeout(() => {
                    document.getElementById('create_new_list_message').style.display = 'none';
                    document.getElementById('create_new_list_input').style.border = '1px solid black';
                    document.getElementById('create_new_list_input').style.boxShadow = 'inset 0 0 0 1px black';
                }, 3000);

            }
        }

        if (request.action == 'move_create_new_list_response') {
            var data = JSON.parse(request.data);

            if (data.result == 'success') {

                chrome.runtime.sendMessage({ action: "move_btn_lists" });
                chrome.runtime.sendMessage({ action: "get_contact_list_saved_page" });
                chrome.runtime.sendMessage({ action: "get_contact_list" });

                let listName = document.getElementById('create_new_list_input').value;
                let href = move_list_url;
                let savedata = [];
                savedata.push(listName);
                savedata.push(href);

                chrome.runtime.sendMessage({ action: "move_list_save_data", data: savedata });
            }
            else {
                document.getElementById('move_create_new_list_input').style.border = '2px solid red';
                document.getElementById('move_create_new_list_input').style.boxShadow = 'inset 0 0 0 1px red';

                document.getElementById('move_create_new_list_message').style.color = 'red';
                document.getElementById('move_create_new_list_message').innerText = data.message;
                document.getElementById('move_create_new_list_message').style.display = 'flex';
                document.getElementById('create_new_list_input').value = '';
                setTimeout(() => {
                    document.getElementById('move_create_new_list_message').style.display = 'none';
                    document.getElementById('move_create_new_list_input').style.border = '1px solid black';
                    document.getElementById('move_create_new_list_input').style.boxShadow = 'inset 0 0 0 1px black';

                }, 3000);
            }
        }

        if (request.action == 'login_user_profile_response') {
            console.log("Loggedin User: " + request.data)
            let data = JSON.parse(request.data);

            let floater_left_side = localStorage.getItem('left_or_right');
            let autoOpen = localStorage.getItem('auto_open');

            if (floater_left_side == 'left') {
                document.getElementById('plugin_left_position').style.border = '2px solid blue';
                document.getElementById('plugin_right_position').style.border = '0px solid blue';
            }
            else {
                document.getElementById('plugin_left_position').style.border = '0px solid blue';
                document.getElementById('plugin_right_position').style.border = '2px solid blue';
            }

            if (autoOpen == 'true') {
                document.getElementById('auto_open').style.justifyContent = 'flex-end';
                document.getElementById('auto_open').style.backgroundColor = 'blue';
            }
            else {
                document.getElementById('auto_open').style.justifyContent = 'flex-start';
                document.getElementById('auto_open').style.backgroundColor = 'rgb(206, 206, 206)';
            }

            if (data.result == 'success') {
                document.getElementById('loginUserName').innerText = data.name;
                document.getElementById('loginUserPlanType').innerText = data.plan;
                document.getElementById('loginUserTotalCoin').innerText = data.total_coins;
                document.getElementById('loginUserCoinUse').innerText = parseInt(data.total_coins) - parseInt(data.remaining_coins);
                document.querySelector('.barAmount').style.width = 'calc((' + (parseInt(data.total_coins) - parseInt(data.remaining_coins)) + ') /' + parseInt(data.total_coins) + '  * 100%)';
            }

        }

        if (request.action == 'move_list_save_data_respone') {
            var data = JSON.parse(request.data);

            if (data.result == 'success') {
                document.getElementById('move_to_list_save_btn_popup_container').style.display = 'none';

                document.getElementById('message_popup_svg').style.fill = 'green';
                document.getElementById('message_popup_container').style.color = 'green';
                document.getElementById('message_popup_text').innerText = "Saved to Lusha";
                document.getElementById('message_popup_container').style.display = 'flex';

                setTimeout(() => {
                    document.getElementById('message_popup_container').style.display = 'none';
                }, 3000);
            }
            else {
                document.getElementById('move_to_list_save_btn_popup_container').style.display = 'none';

                document.getElementById('message_popup_svg').style.fill = 'red';
                document.getElementById('message_popup_container').style.color = 'red';
                document.getElementById('message_popup_text').innerText = data.message;
                document.getElementById('message_popup_container').style.display = 'flex';


                setTimeout(() => {
                    document.getElementById('message_popup_container').style.display = 'none';
                }, 3000);
            }
        }
    })






    // notes full app start at scaffold-layout__aside
    let scaffold_layout__aside = document.querySelector('.scaffold-layout__aside');
    if (scaffold_layout__aside && !document.getElementById('notesMainApp')) {
        let notesApp = document.createElement('div');
        notesApp.id = 'notesMainApp';
        notesApp.style.display = 'none';
        notesApp.classList.add('artdeco-card');
        notesApp.classList.add('p4');
        notesApp.classList.add('mb2');

        scaffold_layout__aside.insertBefore(notesApp, scaffold_layout__aside.children[0]);

        let img = document.createElement('img');
        let src = chrome.runtime.getURL("img/recruit_logo1.jpg")
        img.setAttribute('src', src);
        img.style.position = 'absolute';
        img.style.top = '10px';
        img.style.right = '-2px';
        img.style.width = '25px';
        img.style.transform = 'translateX(100%)';

        notesApp.appendChild(img);

        $.get(chrome.runtime.getURL('html/notes.html'), function (data) {

            $.get(chrome.runtime.getURL('css/notes.css'), function (data) {
                var css = document.createElement('style');
                css.innerText = data;
                document.getElementsByTagName('head')[0].appendChild(css);

            })

            var el = document.createElement('div');
            el.id = "notesMainAppHtml";
            el.style.width = '100%';

            $($.parseHTML(data)).appendTo(el);
            document.getElementById('notesMainApp').appendChild(el);
        })
    }





    //floater app full setting and code with all functions
    var mainApp = document.createElement('div');
    mainApp.style.position = 'fixed';
    mainApp.style.width = '4em';
    mainApp.style.height = '8em';
    mainApp.style.zIndex = '2147483640';
    mainApp.id = 'mainApp';
    mainApp.style.display = 'flex';
    mainApp.style.alignItems = 'center';


    let top = localStorage.getItem('positionTop');
    let leftRight = localStorage.getItem('left_or_right');
    if (leftRight == 'left') {
        if (!top) {
            mainApp.style.inset = '100px auto auto 0px';
        }
        else {
            mainApp.style.inset = top + ' auto auto 0px';
        }
        mainApp.style.justifyContent = 'flex-start';

    }
    else {
        if (!top) {
            mainApp.style.inset = '100px 0px auto auto';
        }
        else {
            mainApp.style.inset = top + ' 0px auto auto';
        }
        mainApp.style.justifyContent = 'flex-end';

    }

    let dialog = document.createElement('dialog');
    dialog.id = "dialog_scrape_email";
    let img = chrome.runtime.getURL("img/loading.gif");

    dialog.innerHTML = `<div id="modelInnerHtml"><img src="` + img + `"alt="loading..." style="width:11em"/><span>Please Wait...</span></div>`;
    document.getElementsByTagName('body')[0].appendChild(dialog);
    document.getElementsByTagName('body')[0].appendChild(mainApp);





    var image = document.createElement('div');
    image.style.position = 'absolute';
    image.style.top = '0px';
    image.style.display = 'flex';
    image.style.justifyContent = 'flex-start';
    image.style.alignItems = 'center';
    image.style.flexDirection = 'column';

    image.id = 'app_float';
    var src = chrome.runtime.getURL("img/recruit_logo1.jpg")
    var src2 = chrome.runtime.getURL("img/move.png")
    image.innerHTML = `
    <img src=` + src + ` style="width: 30px;  cursor:pointer;display:none" id="imgSlider" />
    <img src=`+ src2 + ` style="width:25px;cursor:grab;display:none;margin:auto" id="move_image" draggable/>
    
    `
    document.getElementById('mainApp').appendChild(image);

    $.get(chrome.runtime.getURL('html/frame.html'), function (data) {
        var el = document.createElement('div');

        $($.parseHTML(data)).appendTo(el);
        el.style.position = 'fixed';
        el.style.width = floater_width;
        el.style.height = '100vh';
        el.id = 'body';
        el.style.top = '0px';
        el.style.backgroundColor = 'white';

        if (leftRight == 'left') {
            el.style.left = '-' + floater_width_collapse;
        }
        else {
            el.style.right = '-' + floater_width_collapse;
        }

        el.style.boxShadow = '0 0 10px .2px black'
        el.style.fontFamily = '"Circular",Arial,Helvetica,sans-serif';
        el.style.transition = 'all 400ms linear';
        document.getElementById('mainApp').appendChild(el);

        $.get(chrome.runtime.getURL('css/frame.css'), function (data) {

            var css = document.createElement('style');
            css.innerText = data;
            document.getElementsByTagName('head')[0].appendChild(css);

        })

        var sc = document.createElement('script');
        sc.src = chrome.runtime.getURL('js/frame.js');
        sc.id = "my_script_data"
        document.getElementsByTagName('body')[0].appendChild(sc);


        var jq = document.createElement('script');
        jq.src = chrome.runtime.getURL('js/jQuery.js');
        jq.id = "my_jQuery_data"
        document.getElementsByTagName('body')[0].appendChild(jq)





        setTimeout(() => {
            let name = $(".text-heading-xlarge").text()
            if (name.length != 0) {
                let u = window.location.href;
                let noteData = []
                noteData.push(u);
                chrome.runtime.sendMessage({ action: "get_user_notes", data: noteData });
            }
        }, 2000);


        $('#scrapEmailPhoneData').click(async function () {
            let dialogBox = document.getElementById('dialog_scrape_email');
            let modelInnerHtml = document.getElementById('modelInnerHtml');
            modelInnerHtml.style.display = 'block';
            // dialogBox.show();
            dialogBox.showModal();

            let data = await scrapEmailPhoneData();
            let clear = setInterval(() => {
                if (!document.querySelector('#iframe_get_data')) {
                    setTimeout(() => {
                        modelInnerHtml.style.display = 'none';
                        dialogBox.close();
                        console.clear();
                        console.log(data)
                        emailPhoneScraperCounter = 0;
                    }, 2000);
                    clearInterval(clear);
                }
                else {
                    modelInnerHtml.style.display = 'block';
                    try {
                        dialogBox.showModal();
                    }
                    catch (e) {
                    }
                }
            }, 100);
        })

        setTimeout(() => {
            // scrapEmailPhoneData();

            document.getElementById('imgSlider').style.display = 'block';
            let name = $(".text-heading-xlarge").text()
            if (name.length != 0) {
                setTimeout(() => {
                    try {

                        let url = window.location.href;
                        let data = []
                        data.push(url);

                        document.getElementById('searched-user-profile').style.display = 'block';
                        document.getElementById('show_btn').style.display = 'flex';

                        // get user notes
                        //encrypt data
                        chrome.runtime.sendMessage({ action: "show_btn_encrypt_data", data: data });
                        // contact lists
                        chrome.runtime.sendMessage({ action: "get_contact_list_saved_page" });
                        //saved data
                        chrome.runtime.sendMessage({ action: "user_saved_data", data: '' });


                        chrome.runtime.sendMessage({ action: "runcodemain" });


                    } catch (e) {
                        alert("needs to reload the page")
                    }
                }, 1500);
            }
            else {
                document.getElementById('searched-user-profile').style.display = 'none';
                document.getElementById('show_btn').style.display = 'none';
            }
        }, 4000);



        // click button listeners code
        $('#show_btn').click(function () {

            let url = window.location.href;
            let data = [];
            data.push(url);

            chrome.runtime.sendMessage({ action: "show_btn", data: data });

        })



        $("#save_btn").click(function () {

            chrome.runtime.sendMessage({ action: "get_contact_list" });
            document.getElementById('save_btn_popup_container').style.display = "block";

        });

        $('#valuable_data_not_really').click(function () {
            document.getElementById('no_data_found_data_valuable').style.display = 'none';
        })

        $('#valuable_data_yes').click(function () {
            document.getElementById('data_valuable_btns_and_msg').innerHTML = '<h6>Thanks for your feedback!</h6>';
        })


        $('#minimize').click(function () {

            let floater_left_side = localStorage.getItem('left_or_right');

            if (floater_left_side == 'left') {
                document.getElementById('body').style.left = '-' + floater_width_collapse;
                document.getElementById('body').style.right = "auto";
                document.getElementById('body').style.transform = 'translateX(-' + floater_width_collapse + ')';
            }
            else {
                document.getElementById('body').style.right = '-' + floater_width_collapse;
                document.getElementById('body').style.left = "auto";
                document.getElementById('body').style.transform = 'translateX(' + floater_width_collapse + ')';
            }
            document.getElementById('app_float').style.display = 'block';
        })

        $('#plugin_position_left_and_right').click(function () {

            let floater_left_side = localStorage.getItem('left_or_right');

            //clicking on left
            let inset = localStorage.getItem('positionTop');
            if (floater_left_side == 'right') {

                document.getElementById('plugin_right_position').style.border = 'none'
                document.getElementById('plugin_left_position').style.border = '2px solid blue';

                document.getElementById('mainApp').style.inset = inset + ' auto auto 0px';
                document.getElementById('mainApp').style.justifyContent = 'flex-start';

                localStorage.setItem('left_or_right', 'left');

                $('#minimize').click();


            }
            //clicking of right
            else {
                document.getElementById('plugin_left_position').style.border = 'none'
                document.getElementById('plugin_right_position').style.border = '2px solid blue';

                document.getElementById('mainApp').style.inset = inset + ' 0px auto auto';
                document.getElementById('mainApp').style.justifyContent = 'flex-end';


                localStorage.setItem('left_or_right', 'right');
                $('#minimize').click();

            }
        })

        $('#save_data_to_list').click(function () {

            let save_btn_lists_value = document.getElementById('save_btn_lists').value;
            let href = window.location.href;
            let data = [];
            data.push(save_btn_lists_value);
            data.push(href);

            chrome.runtime.sendMessage({ action: "save_btn", data: data });
        })

        $('#create_and_save_new_list').click(function () {

            let listName = document.getElementById('create_new_list_input').value;

            if (listName.length == 0) {

                document.getElementById('create_new_list_message').style.display = 'flex';
                document.getElementById('create_new_list_message').style.color = 'red';
                document.getElementById('create_new_list_message').innerText = 'Listname Should not be empty';


                document.getElementById('create_new_list_input').style.border = '2px solid red';
                setTimeout(() => {
                    document.getElementById('create_new_list_input').style.border = '1px solid black';
                    document.getElementById('create_new_list_message').style.display = 'none';
                }, 2500);
            }
            else {
                chrome.runtime.sendMessage({ action: "create_new_list", data: listName });
            }
        })


        $('#create_new_list').click(function () {

            document.getElementById('create_new_list_popup_container').style.display = 'block';
            document.getElementById('save_btn_default_popup_container').style.display = 'none';
            document.getElementById('create_new_list_input').style.border = '1px solid black';

        })

        $('#close_save_contact').click(function () {

            document.getElementById('save_btn_popup_container').style.display = "none";

        });
        $('#close_new_list_save_contact').click(function () {

            document.getElementById('create_new_list_popup_container').style.display = "none";
            document.getElementById('save_btn_default_popup_container').style.display = "block";
            document.getElementById('save_btn_popup_container').style.display = "none";

        });

        $('#create_new_list_back').click(function () {
            chrome.runtime.sendMessage({ action: "get_contact_list" });

            document.getElementById('create_new_list_popup_container').style.display = 'none';
            document.getElementById('save_btn_default_popup_container').style.display = 'block';
        })
        $('#create_new_list_cancel').click(function () {
            chrome.runtime.sendMessage({ action: "get_contact_list" });

            document.getElementById('create_new_list_popup_container').style.display = 'none';
            document.getElementById('save_btn_default_popup_container').style.display = 'block';
        })


        $('#auto_open').click(function () {

            let autoOpen = localStorage.getItem('auto_open');
            if (autoOpen == 'true') {
                this.style.justifyContent = 'flex-start';
                this.style.backgroundColor = 'rgb(206, 206, 206)';
                localStorage.setItem('auto_open', false);

            }
            else {
                this.style.justifyContent = 'flex-end';
                this.style.backgroundColor = 'blue';
                localStorage.setItem('auto_open', true);

            }
        })

        $('#enable_lusha_everywhere').click(function () {

            if (this.style.justifyContent == 'flex-start' || this.style.justifyContent.length == 0) {
                this.style.justifyContent = 'flex-end';
                this.style.backgroundColor = 'blue';
            }
            else {
                this.style.justifyContent = 'flex-start';
                this.style.backgroundColor = 'rgb(206, 206, 206)';
            }
        })


        //footer event listener

        $('.prospectBtn').click(function () {
            document.getElementById('prospect_footer_svg').style.fill = 'blue';
            this.style.fontWeight = '700';
            document.querySelector('.moreBtn').style.fontWeight = '400';
            document.getElementById('more_footer_svg').style.fill = 'rgb(156, 156, 156)';
            document.querySelector('.main_content').style.display = 'block';

            document.querySelector('.footer_container').style.height = '11.7vh';
            document.querySelector('.top_container').style.backgroundColor = 'white';

            document.getElementById('mainframe2').style.display = 'none';
            document.getElementById('main_content_mainframe1').style.display = 'flex';

            document.getElementById('mainframe3').style.display = 'none';
            document.getElementById('saved_footer_svg').style.fill = 'rgb(156, 156, 156)';
            document.getElementById('savedBtn').style.fontWeight = '400';

            document.querySelector('.top_bar').style.backgroundColor = 'transparent';

        })
        $('.moreBtn').click(function () {
            document.getElementById('prospect_footer_svg').style.fill = 'rgb(156, 156, 156)';
            this.style.fontWeight = '700';
            document.querySelector('.prospectBtn').style.fontWeight = '400';
            document.getElementById('more_footer_svg').style.fill = 'blue';
            document.querySelector('.main_content').style.display = 'none';
            document.querySelector('.top_container').style.backgroundColor = 'transparent';

            document.querySelector('.footer_container').style.height = '9.6vh';

            document.getElementById('mainframe2').style.display = 'flex';
            document.getElementById('main_content_mainframe1').style.display = 'none';

            document.getElementById('mainframe3').style.display = 'none';
            document.getElementById('saved_footer_svg').style.fill = 'rgb(156, 156, 156)';
            document.getElementById('savedBtn').style.fontWeight = '400';

            document.querySelector('.top_bar').style.backgroundColor = 'transparent';

        })


        $('#savedBtn').click(function () {

            document.getElementById('mainframe3').style.display = 'flex';
            document.getElementById('saved_footer_svg').style.fill = 'blue';
            this.style.fontWeight = '700';

            document.querySelector('.prospectBtn').style.fontWeight = '400';
            document.getElementById('prospect_footer_svg').style.fill = 'rgb(156, 156, 156)';

            document.getElementById('more_footer_svg').style.fill = 'rgb(156, 156, 156)';
            document.querySelector('.main_content').style.display = 'none';
            document.querySelector('.top_container').style.backgroundColor = 'transparent';

            document.querySelector('.footer_container').style.height = '0vh';

            document.getElementById('mainframe2').style.display = 'none';
            document.getElementById('main_content_mainframe1').style.display = 'none';

            document.querySelector('.top_bar').style.backgroundColor = 'white';



            let saved_hover_effect = document.querySelectorAll('.saved_hover_effect');
            for (const saved of saved_hover_effect) {
                saved.addEventListener('mouseover', function () {
                    this.querySelector('.svg_border').style.display = 'flex';
                    this.querySelector('.svg_border').style.fill = 'black';


                })
                saved.addEventListener('mouseleave', function () {
                    this.querySelector('.svg_border').style.display = 'none';
                    this.querySelector('.svg_border_popup').style.display = 'none';

                })
            }

            let svg_borders = document.querySelectorAll('.svg_border');
            for (const svg of svg_borders) {
                svg.addEventListener('click', function () {
                    let elem = this.querySelector('.svg_border_popup');
                    elem.style.display = 'flex';
                    move_list_url = this.parentElement.id;

                })
            }

            let move_to_list_btns = document.querySelectorAll('.saved_move_to_list_btn');

            for (const btn of move_to_list_btns) {
                btn.addEventListener('click', function () {
                    chrome.runtime.sendMessage({ action: "move_btn_lists" });
                    this.parentElement.parentElement.style.display = 'none';
                    document.getElementById('move_to_list_save_btn_popup_container').style.display = 'flex';
                })
            }

            $('#filter_saved_profile_name').on('change', function () {
                // console.log(this.value);

                chrome.runtime.sendMessage({ action: "user_saved_data", data: this.value });
            })
        })

        $('#move_data_to_list').click(function () {

            let move_btn_lists_value = document.getElementById('move_btn_lists').value;
            let href = move_list_url;
            let data = [];
            data.push(move_btn_lists_value);
            data.push(href);

            chrome.runtime.sendMessage({ action: "move_list_save_data", data: data });
        })

        $('#create_new_list_move_data').click(function () {
            document.getElementById('move_list_create_new_list_popup_container').style.display = 'block';
            document.getElementById('move_btn_default_popup_container').style.display = 'none';
            document.getElementById('move_create_new_list_input').style.border = '1px solid black';


        })

        $('#move_create_new_list_cancel').click(function () {
            chrome.runtime.sendMessage({ action: "move_btn_lists" });

            document.getElementById('move_list_create_new_list_popup_container').style.display = 'none';
            document.getElementById('move_btn_default_popup_container').style.display = 'block';
            document.getElementById('move_create_new_list_input').style.border = '1px solid black';


        })

        $('#move_create_new_list_back').click(function () {
            chrome.runtime.sendMessage({ action: "move_btn_lists" });

            document.getElementById('move_list_create_new_list_popup_container').style.display = 'none';
            document.getElementById('move_btn_default_popup_container').style.display = 'block';
            document.getElementById('move_create_new_list_input').style.border = '1px solid black';

        })

        $('#move_close_save_contact').click(function () {
            chrome.runtime.sendMessage({ action: "move_btn_lists" });
            document.getElementById('move_to_list_save_btn_popup_container').style.display = 'none';

        })
        $('#move_close_new_list_save_contact').click(function () {
            chrome.runtime.sendMessage({ action: "move_btn_lists" });
            document.getElementById('move_list_create_new_list_popup_container').style.display = 'none';
            document.getElementById('move_btn_default_popup_container').style.display = 'block';
            document.getElementById('move_to_list_save_btn_popup_container').style.display = 'none';
        })

        $('#move_create_and_save_new_list').click(function () {
            let listName = document.getElementById('move_create_new_list_input').value;

            if (listName.length == 0) {

                document.getElementById('move_create_new_list_message').style.display = 'flex';
                document.getElementById('move_create_new_list_message').style.color = 'red';
                document.getElementById('move_create_new_list_message').innerText = 'Listname Should not be empty';


                document.getElementById('move_create_new_list_input').style.border = '2px solid red';
                setTimeout(() => {
                    document.getElementById('move_create_new_list_input').style.border = '1px solid black';
                    document.getElementById('move_create_new_list_message').style.display = 'none';
                }, 2500);
            }
            else {
                chrome.runtime.sendMessage({ action: "move_create_new_list", data: listName });
            }

        })

        $('#valuable_data_not_really').click(function () {
            document.getElementById('lushaSystem_information').style.minHeight = 'calc(100vh - 265px)'
        })


    })


    $('#app_float').mouseover(function () {
        this.style.height = '100%';
        document.getElementById('move_image').style.display = 'block';
    })
    $('#app_float').mouseleave(function () {
        this.style.height = 'initial';
        document.getElementById('move_image').style.display = 'none';
    })

    function getID(id) {
        return document.getElementById(id);
    }

    var dragObj = new Object();


    $('#move_image').on('mousedown', function (event) {
        var y;
        let id = 'mainApp';
        dragObj.elNode = getID(id);
        // Get cursor position with respect to the page.
        try {
            y = window.event.clientY + document.documentElement.scrollTop
                + document.body.scrollTop;
        }
        catch (e) {
            y = event.clientY + window.scrollY;
        }

        dragObj.cursorStartY = y;
        dragObj.elStartTop = parseInt(dragObj.elNode.style.top, 10);
        if (isNaN(dragObj.elStartTop)) dragObj.elStartTop = 0;
        // Capture mousemove and mouseup events on the page.
        try {
            document.attachEvent("onmousemove", dragGo);
            document.attachEvent("onmouseup", dragStop);
            window.event.cancelBubble = true;
            window.event.returnValue = false;
        }
        catch (e) {
            document.addEventListener("mousemove", dragGo, true);
            document.addEventListener("mouseup", dragStop, true);
            event.preventDefault();
        }
    })

    function dragGo(event) {
        var y;
        try {
            y = window.event.clientY + document.documentElement.scrollTop
                + document.body.scrollTop;
        }
        catch (e) {
            y = event.clientY + window.scrollY;
        }
        var drTop = (dragObj.elStartTop + y - dragObj.cursorStartY);

        if (drTop > 50 && drTop < 630) {
            dragObj.elNode.style.top = drTop + "px";
        }
        else {
            if (drTop <= 50) {
                dragObj.elNode.style.top = "50px";
            }
            else {
                dragObj.elNode.style.top = "630px";

            }
        }
        try {
            window.event.cancelBubble = true;
            window.event.returnValue = false;
        }
        catch (e) {
            event.preventDefault();
        }
    }

    function dragStop(e) {
        try {
            document.detachEvent("onmousemove", dragGo);
            document.detachEvent("onmouseup", dragStop);
        }
        catch (e) {
            document.removeEventListener("mousemove", dragGo, true);
            document.removeEventListener("mouseup", dragStop, true);
        }
        localStorage.setItem('positionTop', document.getElementById('mainApp').style.top);

    }




    $("#imgSlider").click(function () {


        document.getElementById('app_float').style.display = 'none';
        chrome.runtime.sendMessage({ action: "user_saved_data", data: '' });
        chrome.runtime.sendMessage({ action: "login_user_profile" });


        let leftRightFloaterPosition = localStorage.getItem('left_or_right');
        if (leftRightFloaterPosition == 'left') {
            document.getElementById('body').style.transform = 'translateX(' + floater_width_collapse + ')';
        }
        else {
            document.getElementById('body').style.transform = 'translateX(-' + floater_width_collapse + ')';
        }

        let name = $(".text-heading-xlarge").text()

        if (name.length != 0) {

            document.getElementById('searched-user-name').innerText = name;
        }


        let imgLink;

        if (document.getElementsByClassName('pv-top-card-profile-picture__image').length != 0) {
            imgLink = document.getElementsByClassName('pv-top-card-profile-picture__image')[0].getAttribute('src');
        }
        else if (document.getElementsByClassName('profile-photo-edit__preview').length != 0) {
            imgLink = document.getElementsByClassName('profile-photo-edit__preview')[0].getAttribute('src');
        }
        document.getElementById('searched-user-profile').setAttribute('src', imgLink);

        let width = document.getElementsByClassName('prospectContainer')[0].getBoundingClientRect().width;
        document.getElementById('footer').style.width = width - 4 + 'px';


    });



})



function setlushaSystem_information(data) {
    if (data) {
        document.getElementById('show_save_buttons').style.display = 'flex';

        document.getElementById('user_profile_website').innerText = data.website;
        document.getElementById('user_profile_about').innerText = data.about;
        document.getElementById('user_profile_no_of_employee').innerText = data.number_of_employes;
        document.getElementById('user_profile_industry').innerText = data.main_industries;
        document.getElementById('user_profile_annual_revenue').innerText = data.annual_revenue;

        document.getElementById('lushaSystem_information_not_found').style.display = 'none';
        document.getElementById('information_section').style.display = 'block';


        document.getElementsByClassName('footer_container')[0].style.display = 'block';
        document.getElementsByClassName('footer_container')[0].style.height = '12vh';

    }
    else {
        document.getElementById('show_save_buttons').style.display = 'none';

        document.getElementById('lushaSystem_information_not_found').style.display = 'block';
        document.getElementById('information_section').style.display = 'none';

        document.getElementById('user_profile_website').innerText = '';
        document.getElementById('user_profile_about').innerText = '';
        document.getElementById('user_profile_no_of_employee').innerText = '';
        document.getElementById('user_profile_industry').innerText = '';
        document.getElementById('user_profile_annual_revenue').innerText = '';
        document.getElementsByClassName('footer_container')[0].style.display = 'none';
    }

}


function notesLoaded() {
    let edit_existing_notes = document.querySelectorAll('.notes_btns');

    for (const note of edit_existing_notes) {
        note.addEventListener('click', () => {
            if (note.classList.contains('notes_edit')) {
                let parentofparent = note.parentElement.parentElement.parentElement;
                let parent = note.parentElement;

                let textArea = parentofparent.querySelector('.notes_text');

                parent.style.display = 'none';
                parent.nextElementSibling.style.display = 'flex';

                textArea.removeAttribute('readonly');
                textArea.style.border = '1px solid black';
            }
            else if (note.classList.contains('notes_edit_save_btn')) {
                let parentOfParent = note.parentElement.parentElement.parentElement;

                let textArea = parentOfParent.querySelector('.notes_text');
                let text = textArea.value;

                let id = parentOfParent.id;
                idd = id.split('-');
                let note_id = parseInt(idd[0]);
                let note_type = idd[2];


                let data = [];
                data.push(text);
                data.push(note_id);
                data.push(note_type);
                data.push(id);


                chrome.runtime.sendMessage({ action: "notes_edit_update", data: data });

            }
            else if (note.classList.contains('notes_edit_cancel_btn')) {
                let parentofparent = note.parentElement.parentElement.parentElement;
                let textArea = parentofparent.querySelector('.notes_text');
                textArea.setAttribute('readonly', 'true');
                textArea.style.border = '0px solid black';

                note.parentElement.style.display = 'none';
                note.parentElement.previousElementSibling.style.display = 'flex';

            }
            else if (note.classList.contains('notes_add')) {
                chrome.runtime.sendMessage({ action: "get_notes_category" });

                let parent = note.parentElement.parentElement;

                parent.nextElementSibling.style.display = 'block';
                parent.nextElementSibling.querySelector('.new_note_popup_container').style.display = 'flex';

                parent.nextElementSibling.querySelector('.new_note_popup_container_close_btn').addEventListener('click', () => {
                    parent.nextElementSibling.style.display = 'none';

                    parent.nextElementSibling.querySelector('.new_note_popup_container').style.display = 'none';
                })


                parent.nextElementSibling.querySelector('.new_note_save').addEventListener('click', (e) => {
                    let text = e.target.parentElement.querySelector('.new_note_text').value;
                    let url = window.location.href;
                    let category = parent.nextElementSibling.querySelector('#new_note_category_select').value;

                    let data = [];
                    data.push(text);
                    data.push(category);
                    data.push(url);


                    chrome.runtime.sendMessage({ action: "new_note_save", data: data });


                })


            }
        })
    }

}






let oldLocation = window.location.href;
let oldLocation1 = window.location.href;

setInterval(() => {
    var newLocation = window.location.href;
    if (oldLocation != newLocation) {

        // scrapEmailPhoneData();


        let name = $(".text-heading-xlarge").text()

        if (name.length != 0) {
            setTimeout(() => {
                let url = window.location.href;

                let data = [];
                data.push(url);

                document.getElementById('searched-user-profile').style.display = 'block';
                chrome.runtime.sendMessage({ action: "show_btn_encrypt_data", data: data });

            }, 2000);
        }
        else {
            document.getElementById('searched-user-profile').style.display = 'none';
            document.getElementById('searched-user-name').innerText = 'Open any user profile';
            document.getElementById('show_btn').style.display = 'none';
        }

        if (document.getElementById('app_float').style.display == 'none') {
            document.getElementById('minimize').click();
        }

    }

    if (oldLocation != newLocation) {
        let name = $(".text-heading-xlarge").text()
        if (name.length != 0) {

            // notes full app start at scaffold-layout__aside
            let scaffold_layout__aside = document.querySelector('.scaffold-layout__aside');
            if (scaffold_layout__aside && !document.getElementById('notesMainApp')) {
                let notesApp = document.createElement('div');
                notesApp.id = 'notesMainApp';
                notesApp.style.display = 'none';
                notesApp.classList.add('artdeco-card');
                notesApp.classList.add('p4');
                notesApp.classList.add('mb2');

                scaffold_layout__aside.insertBefore(notesApp, scaffold_layout__aside.children[0]);

                let img = document.createElement('img');
                let src = chrome.runtime.getURL("img/recruit_logo1.jpg")
                img.setAttribute('src', src);
                img.style.position = 'absolute';
                img.style.top = '10px';
                img.style.right = '0';
                img.style.width = '25px';
                img.style.transform = 'translateX(100%)';

                notesApp.appendChild(img);

                $.get(chrome.runtime.getURL('html/notes.html'), function (data) {
                    var el = document.createElement('div');
                    el.id = "notesMainAppHtml";
                    el.style.width = '100%';

                    $($.parseHTML(data)).appendTo(el);
                    document.getElementById('notesMainApp').appendChild(el);

                    $.get(chrome.runtime.getURL('css/notes.css'), function (data) {
                        var css = document.createElement('style');
                        css.innerText = data;
                        document.getElementsByTagName('head')[0].appendChild(css);
                    })
                })
            }


            let url = window.location.href;
            let data = []
            data.push(url);
            chrome.runtime.sendMessage({ action: "get_user_notes", data: data });

        }
        oldLocation = newLocation;
    }
}, 1000);

