var floater_width = '320px';
var floater_width_collapse = '336px';

$('document').ready(() => {
    var mainApp = document.createElement('div');
    mainApp.style.position = 'fixed';
    mainApp.style.width = '2em';
    mainApp.style.height = '8em';
    mainApp.style.zIndex = '2147483647';
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


    // implementation remaining
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
    image.style.gap = '5px';
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
        el.style.height = '650px';
        el.style.border = '1px solid rgb(216, 216, 255)'
        el.style.borderRadius = '10px'
        el.id = 'body';
        el.style.top = '16px';
        el.style.backgroundColor = 'white';
        el.style.zIndex = '2147483648';

        if (leftRight == 'left') {
            el.style.left = '-' + floater_width_collapse;
        }
        else {
            el.style.right = '-' + floater_width_collapse;
        }

        el.style.fontFamily = '"Circular",Arial,Helvetica,sans-serif';
        el.style.transition = 'all 500ms linear';
        document.getElementById('mainApp').appendChild(el);

        $.get(chrome.runtime.getURL('css/frame.css'), function (data) {

            var css = document.createElement('style');
            css.innerText = data;
            document.getElementsByTagName('head')[0].appendChild(css);
        })


        var jq = document.createElement('script');
        jq.src = chrome.runtime.getURL('js/jQuery.js');
        jq.id = "my_jQuery_data"
        document.getElementsByTagName('body')[0].appendChild(jq)


        ///////////////////////////////// function starts ////////////////////////////////////////

        //notifications script
        $('#close_popup_notification').click(function () {
            document.getElementById('popup_notification').style.display = 'none';
        })

        $('#colleagues_close_popup_notification').click(function () {
            document.getElementById('colleagues_popup_notification').style.display = 'none';
        })


        // mainframe minimization
        $('#minimize_mainframe').click(function () {

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

        // footer tabs click event 
        let all_footer_tabs = document.querySelectorAll('.footer_btns');
        for (const footer of all_footer_tabs) {
            footer.addEventListener('click', () => {
                removingOtherActiveFooter();
                footer.classList.add('active_footer');
                if (footer.classList.contains('prospect_section_btn')) {
                    document.getElementById('prospect_section').style.display = 'flex'
                }
                else if (footer.classList.contains('insights_section_btn')) {
                    document.getElementById('insights_section').style.display = 'flex';

                }
                else if (footer.classList.contains('colleagues_section_btn')) {
                    document.getElementById('colleagues_section').style.display = 'flex'
                }
                else if (footer.classList.contains('activities_section_btn')) {
                    document.getElementById('activities_section').style.display = 'flex'
                }
            })
        }

        // insights table tabs click event 
        let all_insights_table_tabs = document.querySelectorAll('.insights_table_tabs');
        for (const table_tabs of all_insights_table_tabs) {
            table_tabs.addEventListener('click', () => {
                removeActiveClassTable('.insights_table_tabs')
                table_tabs.classList.add('active_table_tab');
                if (table_tabs.classList.contains('insights_table_technologies')) {
                    document.getElementById('insights_table_technologies').style.display = 'flex'
                }
                else if (table_tabs.classList.contains('insights_table_hiring')) {
                    document.getElementById('insights_table_hiring').style.display = 'flex'
                }
                else if (table_tabs.classList.contains('insights_table_funding')) {
                    document.getElementById('insights_table_funding').style.display = 'flex'
                }

            })
        }

        // colleagues table tabs click event 
        let all_colleagues_table_tabs = document.querySelectorAll('.colleagues_table_tabs');
        for (const table_tabs of all_colleagues_table_tabs) {
            table_tabs.addEventListener('click', () => {
                removeActiveClassTable('.colleagues_table_tabs')
                table_tabs.classList.add('active_table_tab');
                if (table_tabs.classList.contains('colleagues_all_employees')) {
                    document.getElementById('colleagues_all_employees').style.display = 'flex'
                }
                else if (table_tabs.classList.contains('colleagues_saved_employees')) {
                    document.getElementById('colleagues_saved_employees').style.display = 'flex'
                }
            })
        }

        $('#header_setting_btn').click(function () {
            document.getElementById('header_setting_section').style.transform = 'translateX(0px)';
        })

        $('#header_setting_close_btn').click(function () {
            document.getElementById('header_setting_section').style.transform = 'translateX(100%)';
        })

        $('#prospect_show_btn').click(function () {
            let url = window.location.href;
            let data = [];
            data.push(url);
            data.push('no');

            chrome.runtime.sendMessage({ action: "show_btn_encrypt_data", data: data });

        })




        // ///////////////////////////////////////////////////plugin position button 
        $('#plugin_position_left_and_right').click(function () {

            let floater_left_side = localStorage.getItem('left_or_right');

            //clicking on left
            let inset = localStorage.getItem('positionTop');
            if (floater_left_side == 'right') {

                document.querySelector('#plugin_position_left_and_right .ball').style.transform = 'translateX(0)'
                document.querySelector('#plugin_position_left_and_right .ball').innerHTML = 'L';
                document.querySelector('#plugin_position_left_and_right').style.backgroundColor = 'grey';

                document.getElementById('mainApp').style.inset = inset + ' auto auto 0px';
                document.getElementById('mainApp').style.justifyContent = 'flex-start';
                document.getElementById('mainApp').style.left = '0px';

                localStorage.setItem('left_or_right', 'left');

            }
            else {
                document.querySelector('#plugin_position_left_and_right .ball').style.transform = 'translateX(20px)'
                document.querySelector('#plugin_position_left_and_right .ball').innerHTML = 'R';
                document.querySelector('#plugin_position_left_and_right').style.backgroundColor = 'rgb(0, 255, 255)';

                document.getElementById('mainApp').style.inset = inset + ' 0px auto auto';
                document.getElementById('mainApp').style.justifyContent = 'flex-end';
                document.getElementById('mainApp').style.right = '0px';


                localStorage.setItem('left_or_right', 'right');
            }
            setTimeout(() => {
                $('#minimize_mainframe').click();
            }, 1000);
            setTimeout(() => {
                $('#imgSlider').click();
            }, 2000);
        })

        $('#plugin_auto_expand').click(function () {

            let autoOpen = localStorage.getItem('auto_open');
            if (autoOpen == 'true') {
                document.querySelector('#plugin_auto_expand .ball').style.transform = 'translateX(0px)';
                document.querySelector('#plugin_auto_expand').style.backgroundColor = 'grey';
                localStorage.setItem('auto_open', false);

            }
            else {
                document.querySelector('#plugin_auto_expand .ball').style.transform = 'translateX(20px)';
                document.querySelector('#plugin_auto_expand').style.backgroundColor = 'rgb(0, 255, 255)';
                localStorage.setItem('auto_open', true);
            }
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
        let autoOpen = localStorage.getItem('auto_open');
        if (autoOpen == 'true') {
            document.querySelector('#plugin_auto_expand .ball').style.transform = 'translateX(20px)';
            document.querySelector('#plugin_auto_expand').style.backgroundColor = 'rgb(0, 255, 255)';
        }
        else {
            document.querySelector('#plugin_auto_expand .ball').style.transform = 'translateX(0px)';
            document.querySelector('#plugin_auto_expand').style.backgroundColor = 'grey';
        }


        //left or right floater switch setter 
        let floater_left_side = localStorage.getItem('left_or_right');
        if (floater_left_side == 'left') {
            document.querySelector('#plugin_position_left_and_right .ball').style.transform = 'translateX(0px)'
            document.querySelector('#plugin_position_left_and_right .ball').innerHTML = 'L';
            document.querySelector('#plugin_position_left_and_right').style.backgroundColor = 'grey';

            document.getElementById('body').style.transform = 'translateX(calc(' + floater_width_collapse + ' + 18px))';
        }
        else {

            document.querySelector('#plugin_position_left_and_right .ball').style.transform = 'translateX(20px)'
            document.querySelector('#plugin_position_left_and_right .ball').innerHTML = 'R';
            document.querySelector('#plugin_position_left_and_right').style.backgroundColor = 'rgb(0, 255, 255)';
            document.getElementById('body').style.transform = 'translateX(calc(-' + floater_width_collapse + ' - 18px))';
        }

        //header image and name setter
        var src = chrome.runtime.getURL("img/recruit_logo_header.jpg")
        document.getElementById('header_section_logo').setAttribute('src', src)

        document.getElementById('app_float').style.display = 'none';
        chrome.runtime.sendMessage({ action: "user_saved_data", data: '' });
        chrome.runtime.sendMessage({ action: "login_user_profile" });

        // header name setter 
        let name = $(".text-heading-xlarge").text()
        if (name.length != 0) {
            document.getElementById('searched_user_name').innerText = name;
        }

        let imgLink;

        if (document.getElementsByClassName('pv-top-card-profile-picture__image').length != 0) {
            imgLink = document.getElementsByClassName('pv-top-card-profile-picture__image')[0].getAttribute('src');
        }
        else if (document.getElementsByClassName('profile-photo-edit__preview').length != 0) {
            imgLink = document.getElementsByClassName('profile-photo-edit__preview')[0].getAttribute('src');
        }
        document.getElementById('searched_user_profile').setAttribute('src', imgLink);

    });

    // start api call 
    setTimeout(() => {
        // scrapEmailPhoneData();
        OnLoadAPICall();
    }, 2500);


    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        const getValue = chrome.storage.local.get('userdetails');

        if (request.action == 'take_session') {
            chrome.storage.local.set({ 'userdetails': request.data })
            setTimeout(() => {
                getValue.then(res => {
                    console.log("session id: " + res.userdetails)
                });
            }, 2000);

        }

        if (request.action == 'show_btn_encrypt_data_response') {
            console.log("Encrypt Data: " + request.data);
            let data = JSON.parse(request.data);

            if (data.result == 'success') {

                if (data.show_popup == true) {
                    document.getElementById('popup_notification_content').innerHTML = `<i
                class="fa-solid fa-square-check"style = "margin-right: 8px; color: green;font-size:16px"></i>`+ "Data Save Successfully";
                    document.getElementById('popup_notification').style.display = 'block';

                    setTimeout(() => {
                        document.getElementById('popup_notification').style.display = 'none';
                    }, 6000);
                }

                // colleagues data 
                let cid = []
                cid.push(data.company_details.company_id);
                chrome.runtime.sendMessage({ action: "colleagues_details", data: cid });

                let phone = 1, email = 1;
                document.getElementById('prospect_user_details').innerHTML = "";

                if (data.data_mode == 'decrypted') {
                    document.getElementById('prospect_sequence_btn').style.display = 'flex';
                    document.getElementById('prospect_show_btn').style.display = 'none';
                    document.getElementById('prospect_sequence_right_btns').style.display = 'flex';

                }
                else {
                    document.getElementById('prospect_sequence_btn').style.display = 'none';
                    document.getElementById('prospect_show_btn').style.display = 'flex';
                    document.getElementById('prospect_sequence_right_btns').style.display = 'none';
                }

                if (data.person_details.contact_details.length > 0) {
                    document.getElementById('prospect_no_data_found').style.display = 'none';

                    data.person_details.contact_details.forEach(e => {

                        if (e.datatype == 'email') {
                            let div = document.createElement('div');
                            div.classList.add('workEmail');

                            let span = document.createElement('i');
                            span.classList.add('fa-solid');
                            span.classList.add('fa-envelope');

                            let span1 = document.createElement('span');
                            span1.id = 'prospect_user_work' + email + 'Email';
                            span1.innerText = e.value;

                            let check = document.createElement('i')

                            check.classList.add('fa-solid');
                            check.classList.add('fa-circle-check');
                            check.style.color = 'green';
                            check.style.marginLeft = '-15px';


                            let type = document.createElement('span');
                            type.innerHTML = e.sub_type;
                            type.classList.add('prospect_user_details_type');

                            div.appendChild(span);
                            div.appendChild(span1);
                            if (e.isverified == 1 && data.data_mode == 'decrypted') {
                                div.appendChild(check);
                            }
                            div.appendChild(type);
                            document.getElementById('prospect_user_details').appendChild(div);
                            email++;


                        }
                        else {
                            let div = document.createElement('div');
                            div.classList.add('phonenumber');

                            let span = document.createElement('i');
                            span.classList.add('fa-solid');
                            span.classList.add('fa-phone');

                            let span1 = document.createElement('span');
                            span1.id = 'prospect_user_phone' + phone;
                            span1.innerText = e.value;

                            let check = document.createElement('i')
                            check.classList.add('fa-solid');
                            check.classList.add('fa-circle-check');
                            check.style.color = 'green';
                            check.style.marginLeft = '-15px';

                            let type = document.createElement('span')
                            type.innerHTML = e.sub_type;
                            type.classList.add('prospect_user_details_type')

                            div.appendChild(span);
                            div.appendChild(span1);
                            if (e.isverified == 1 && data.data_mode == 'decrypted') {
                                div.appendChild(check)
                            }
                            div.appendChild(type);
                            document.getElementById('prospect_user_details').appendChild(div);
                            phone++;
                        }

                    });
                    setlushaSystem_information(data.company_details);
                }
                else {
                    let div = document.createElement('div');
                    div.classList.add('phonenumber');

                    let span = document.createElement('i');
                    span.classList.add('fa-solid');
                    span.classList.add('fa-phone');

                    let span1 = document.createElement('span');
                    span1.id = 'upperContent_phone' + phone;
                    span1.innerText = 'No Phone Detail Found';

                    div.appendChild(span);
                    div.appendChild(span1);
                    document.getElementById('prospect_user_details').appendChild(div);

                    let div1 = document.createElement('div');
                    div1.classList.add('workEmail');
                    div1.classList.add('margin_point8em');

                    let span2 = document.createElement('i');
                    span2.classList.add('fa-solid');
                    span2.classList.add('fa-envelope');

                    let span3 = document.createElement('span');
                    span3.id = 'upperContent_work' + email + 'Email';
                    span3.innerText = 'No Email Detail Found';

                    div1.appendChild(span2);
                    div1.appendChild(span3);
                    document.getElementById('prospect_user_details').appendChild(div1);

                    document.getElementById('prospect_no_data_found').style.display = 'flex';
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
                if (data.message != "invalid session id") {

                    document.getElementById('popup_notification_content').innerHTML = `<i
                    class="fa-solid fa-square-check"style = "margin-right: 8px; color: red;font-size:16px"></i>`+ data.message;
                    document.getElementById('popup_notification').style.display = 'block';

                    setTimeout(() => {
                        document.getElementById('popup_notification').style.display = 'none';
                    }, 6000);
                }
                else {
                    // window.reload();
                }
            }
        }

        if (request.action == 'colleagues_details_response') {
            console.log("Colleagues Data: " + request.data);
            let data = JSON.parse(request.data);

            if (data.result == 'success') {

                let colleagues_all_employees = document.querySelector('#colleagues_all_employees');
                let colleagues_saved_employees = document.querySelector('#colleagues_saved_employees');


                let colleagues_all_employeesUL = document.querySelector('#colleagues_all_employees ul');
                colleagues_all_employeesUL.innerHTML = '';

                let colleagues_saved_employeesUL = document.querySelector('#colleagues_saved_employees ul');
                colleagues_saved_employeesUL.innerHTML = '';
                let no_saved = true;
                if (data.data_found == 'yes') {

                    if (colleagues_all_employees.classList.contains('no_table_tab_content')) {
                        colleagues_all_employees.classList.remove('no_table_tab_content');
                    }
                    data.data.forEach(e => {
                        let li = document.createElement('li');
                        li.classList.add('list_hover_effect');

                        let span1 = document.createElement('span');
                        span1.style.fontWeight = '700';
                        span1.style.color = 'black';
                        span1.innerText = e.name;

                        let span2 = document.createElement('span');
                        span2.style.fontSize = '13px';
                        span2.style.color = 'rgb(168, 168, 168)';
                        span2.innerText = e.designation;



                        li.appendChild(span1);
                        li.appendChild(span2);



                        if (e.is_viewed == 1) {
                            let li2 = li.cloneNode(true);

                            let div = document.createElement('div');
                            div.classList.add('colleagues_saved_employees_list_btns');

                            let div2 = document.createElement('div');
                            let btn1 = document.createElement('button');
                            btn1.innerHTML = '<i class="fa-solid fa-envelope"></i>';
                            if (e.contact_data != null) {
                                btn1.id = 'colleagues_email_btn_' + e.contact_data.email;
                            }
                            btn1.classList.add('colleagues_email_btn');
                            btn1.setAttribute('hoverTitle', 'Email');

                            // email button popup 
                            let btn1Div = document.createElement('div');
                            btn1Div.classList.add('colleagues_email_btn_popup');
                            // popup id is same as email button only adding '_popup' to id for differentitaion

                            btn1Div.id = 'colleagues_email_btn_' + e.contact_data.email + '_popup';
                            `Button Content`;
                            btn1Div.style.display = 'none';
                            btn1.appendChild(btn1Div);

                            let btn2 = document.createElement('button');
                            btn2.innerHTML = '<i class="fa-solid fa-phone"></i>';
                            if (e.contact_data != null) {
                                btn2.id = e.contact_data.phone;
                            }
                            btn2.classList.add('colleagues_phone_btn');
                            btn2.setAttribute('hoverTitle', 'Phone');


                            let btn3 = document.createElement('button');
                            btn3.innerHTML = '<i class="fa-solid fa-list"></i>';
                            btn3.classList.add('colleagues_list_btn');
                            btn3.setAttribute('hoverTitle', 'Add To List');



                            let btn4 = document.createElement('button');
                            btn4.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
                            btn4.classList.add('colleagues_sequence_btn');
                            btn4.setAttribute('hoverTitle', 'Add To Sequence');


                            // let btn5 = document.createElement('button');
                            // btn5.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';

                            div2.appendChild(btn1);
                            div2.appendChild(btn2);
                            div2.appendChild(btn3);
                            div2.appendChild(btn4);
                            // div2.appendChild(btn5);
                            div.appendChild(div2);

                            let span3 = document.createElement('span');
                            span3.innerText = 'Cold';
                            div.appendChild(span3);

                            let saveDiv = div.cloneNode(true)
                            li.appendChild(saveDiv);

                            li2.appendChild(div);


                            colleagues_saved_employeesUL.appendChild(li2);
                            if (colleagues_saved_employees.classList.contains('no_table_tab_content')) {
                                colleagues_saved_employees.classList.remove('no_table_tab_content');
                            }
                            no_saved = false;
                        }
                        else {
                            let btn = document.createElement('button');
                            btn.innerText = 'Access Email';
                            btn.id = e.pid;
                            btn.classList.add('colleagues_access_email');

                            li.appendChild(btn);

                        }
                        colleagues_all_employeesUL.appendChild(li);

                    });
                }

                colleagues_all_employees.classList.add('no_table_tab_content');

                let li = document.createElement('li');
                li.classList.add('no_table_content_li');

                let i = document.createElement('i');
                i.classList.add('fa-solid');
                i.classList.add('fa-users');

                let h4 = document.createElement('h4');
                h4.style.fontWeight = '700';
                h4.style.marginTop = '15px';
                h4.innerText = 'No Details Found';

                let span1 = document.createElement('span');
                span1.innerText = 'There is no information available for this company.';

                li.appendChild(i);
                li.appendChild(h4);
                li.appendChild(span1);
                if (data.data_found == 'no') {
                    colleagues_all_employeesUL.appendChild(li);
                }
                if (no_saved) {
                    let li2 = li.cloneNode(true)
                    colleagues_saved_employees.classList.add('no_table_tab_content');
                    colleagues_saved_employeesUL.appendChild(li2);
                }

            }
            else {
                document.getElementById('colleagues_popup_notification_content').innerHTML = `<i
                class="fa-solid fa-square-check"style = "margin-right: 8px; color: red;font-size:16px"></i>`+ data.message;
                document.getElementById('colleagues_popup_notification').style.display = 'block';

                setTimeout(() => {
                    document.getElementById('colleagues_popup_notification').style.display = 'none';
                }, 6000);
            }
            // all the functioning of above injected data are done in below function 
            colleaguesSectionFunction();
        }

        if (request.action == 'colleagues_access_email_response') {
            let data = JSON.parse(request.data);
            if (data.result == 'success') {
                document.getElementById('colleagues_popup_notification_content').innerHTML = `<i
                class="fa-solid fa-square-check"style = "margin-right: 8px; color: green;font-size:16px"></i>`+ "Data Access Successfully";
                document.getElementById('colleagues_popup_notification').style.display = 'block';

                setTimeout(() => {
                    document.getElementById('colleagues_popup_notification').style.display = 'none';
                }, 6000);

                let el = []
                el.push(1);
                chrome.runtime.sendMessage({ action: "colleagues_details", data: el });

            }
            else {
                document.getElementById('colleagues_popup_notification_content').innerHTML = `<i
                class="fa-solid fa-square-check"style = "margin-right: 8px; color: red;font-size:16px"></i>`+ data.message;
                document.getElementById('colleagues_popup_notification').style.display = 'block';

                setTimeout(() => {
                    document.getElementById('colleagues_popup_notification').style.display = 'none';
                }, 6000);
            }
        }

        // company hiring api response
        if (request.action == "company_hiring_response") {
            console.log(request.data);
            let hirig_data = "";
            let hirig_data_array = [];
            for (let i = 0; i < request.data.data.length; i++) {
                hirig_data = JSON.parse(request.data.data[i])
                hirig_data_array.push(hirig_data);
            }
            let div = document.getElementById('insights_table_hiring')
            if (div.classList.contains('no_table_tab_content')) {
                div.classList.remove('no_table_tab_content');
                div.classList.add('insights_table_tab_content');
            }

            let ul = document.getElementById('insights_table_hiring').children[0];
            ul.innerHTML = ""
            hirig_data_array.forEach(e => {
                const li = document.createElement('li')
                li.innerHTML = `<span style="margin-bottom: 5px;">${e.hiring_position}</span>
                     <span class="compny_span" > CTC : ${e.ctc} <span><br>
                     <span class="compny_span" >Hiring Date : ${e.hiring_date}</span>`
                ul.appendChild(li);
            })
            div.appendChild(ul);
        }

        // company funding api response
        if (request.action == "company_funding_response") {
            console.log(request.data);
            let funding_data = ""
            let funding_data_array = [];
            for (let i = 0; i < request.data.data.length; i++) {
                funding_data = JSON.parse(request.data.data[i])
                funding_data_array.push(funding_data)
            }
            let div = document.getElementById('insights_table_funding')
            if (div.classList.contains('no_table_tab_content')) {
                div.classList.remove('no_table_tab_content');
                div.classList.add('insights_table_tab_content')
            }

            let ul = document.getElementById('insights_table_funding').children[0];
            ul.innerHTML = ""
            funding_data_array.forEach(e => {
                const li = document.createElement('li')
                li.innerHTML = `<span style="margin-bottom: 5px;">${e.funding_company}</span>
                      <span class="compny_span">Amount : ${e.amount}</span>
                      <span class="compny_span"> Funding Date : ${e.funding_date} <span>`
                ul.appendChild(li);
            })
            div.appendChild(ul);
        }



    });
})

function OnLoadAPICall() {
    document.getElementById('imgSlider').style.display = 'block';
    let name = $(".text-heading-xlarge").text();
    if (name.length != 0) {
        try {
            let url = window.location.href;
            let data = [];
            data.push(url);
            data.push('yes');
            // get user notes
            //encrypt data

            chrome.runtime.sendMessage({ action: "show_btn_encrypt_data", data: data });

            // hiring api call 
            chrome.runtime.sendMessage({ action: 'company_hiring_req' })
            // funding api call 
            chrome.runtime.sendMessage({ action: 'company_funding_req' })

            // contact lists
            // chrome.runtime.sendMessage({ action: "get_contact_list_saved_page" });
            //saved data
            // chrome.runtime.sendMessage({ action: "user_saved_data", data: '' });

            // chrome.runtime.sendMessage({ action: "runcodemain" });
        } catch (e) {
            alert("needs to reload the page");
        }
    }
}

function removingOtherActiveFooter(e) {
    let all_footer = document.querySelectorAll('.footer_btns');
    all_footer.forEach(el => {
        if (el.classList.contains('active_footer')) {
            el.classList.remove('active_footer');
            if (el.classList.contains('prospect_section_btn')) {
                document.getElementById('prospect_section').style.display = 'none'
            }
            else if (el.classList.contains('insights_section_btn')) {
                document.getElementById('insights_section').style.display = 'none'
            }
            else if (el.classList.contains('colleagues_section_btn')) {
                document.getElementById('colleagues_section').style.display = 'none'
            }
            else if (el.classList.contains('activities_section_btn')) {
                document.getElementById('activities_section').style.display = 'none'
            }
        }
    });
}

function removeActiveClassTable(data) {
    let all_table_tabs = document.querySelectorAll(data);

    if (data == '.insights_table_tabs') {

        all_table_tabs.forEach(el => {
            if (el.classList.contains('active_table_tab')) {
                el.classList.remove('active_table_tab');
                if (el.classList.contains('insights_table_technologies')) {
                    document.getElementById('insights_table_technologies').style.display = 'none'
                }
                else if (el.classList.contains('insights_table_hiring')) {
                    document.getElementById('insights_table_hiring').style.display = 'none'
                }
                else if (el.classList.contains('insights_table_funding')) {
                    document.getElementById('insights_table_funding').style.display = 'none'
                }
            }
        });
    }
    else {
        all_table_tabs.forEach(el => {
            if (el.classList.contains('active_table_tab')) {
                el.classList.remove('active_table_tab');
                if (el.classList.contains('colleagues_all_employees')) {
                    document.getElementById('colleagues_all_employees').style.display = 'none'
                }
                else if (el.classList.contains('colleagues_saved_employees')) {
                    document.getElementById('colleagues_saved_employees').style.display = 'none'
                }
            }
        });
    }
}

function setlushaSystem_information(data) {
    if (data) {

        document.getElementById('prospect_company_details').style.display = 'flex';

        document.getElementById('prospect_comapny_name').innerText = data.name;

        document.getElementById('prospect_company_description').innerText = data.about;

        document.getElementById('prospect_company_employees').innerText = data.number_of_employes;

        document.getElementById('prospect_company_type').innerText = data.main_industries;

        document.getElementById('prospect_company_revenue').innerText = data.annual_revenue;

        document.getElementById('prospect_company_location').innerText = data.country;

        document.getElementById('prospect_company_logo').setAttribute('src', data.logo);

        if (data.website) {
            document.getElementById('company_website').setAttribute('src', data.website);
            document.getElementById('company_website').style.display = 'block';
            document.querySelector('#company_website').setAttribute('hoverTitle', data.website);

        }

        for (const [key, value] of Object.entries(data.social_media)) {
            if (key == 'linkedin') {
                document.getElementById('company_linkedin').setAttribute('src', value);
                document.getElementById('company_linkedin').style.display = 'block';
                document.querySelector('#company_linkedin').setAttribute('hoverTitle', value);
            }
            else if (key == 'facebook') {
                document.getElementById('company_facebook').setAttribute('src', value);
                document.getElementById('company_facebook').style.display = 'block';
                document.querySelector('#company_facebook').setAttribute('hoverTitle', value);

            }
            else if (key == 'twitter') {
                document.getElementById('company_twitter').setAttribute('src', value);
                document.getElementById('company_twitter').style.display = 'block';
                document.querySelector('#company_twitter').setAttribute('hoverTitle', value);

            }
        }

    }
}

function colleaguesSectionFunction() {
    //////////////////// colleagues access email btns click events 
    let colleagues_access_email = document.querySelectorAll('.colleagues_access_email');
    colleagues_access_email.forEach(el => {
        el.addEventListener('click', () => {
            let pid = el.id;
            let data = [];
            data.push(pid);


            chrome.runtime.sendMessage({ action: "colleagues_access_email", data: data });
        })
    });


    let colleagues_email_btn = document.querySelectorAll('.colleagues_email_btn');
    colleagues_email_btn.forEach(ele => {
        ele.addEventListener('click', () => {
            let popup_id = ele.id + '_popup';
            let popup_div = document.getElementById(popup_id);
            if (popup_div.classList.contains('colleagues_active_popup')) {
                popup_div.style.display = 'none';
                popup_div.classList.remove('colleagues_active_popup');
            }
            else {
                popup_div.style.display = 'block';
                popup_div.classList.add('colleagues_active_popup');
            }
        })
    });
}