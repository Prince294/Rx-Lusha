const getValue = chrome.storage.local.get('userdetails');

$(window).ready(function () {
  const decryption = (string) => {
    function decimalToText(unicodeArray) {
      var arr = [];
      for (var index in unicodeArray) {
        var text = String.fromCharCode(unicodeArray[index]);
        arr.push(text);
      }
      return arr.join("");
    }

    const xorStrings = (a) => {
      let s = "";
      let result = "";
      a = a.slice(1, -1);
      arr = a.split(",");

      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i] >> 1;
      }

      let temp = decimalToText(arr);
      return temp;
    };

    let result = xorStrings(" " + string);
    result = result.slice(1);
    result = JSON.parse(result);
    return result;
  };

  var Base64 = {
    _keyStr:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
      var t = "";
      var n, r, i, s, o, u, a;
      var f = 0;
      e = Base64._utf8_encode(e);
      while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = ((n & 3) << 4) | (r >> 4);
        u = ((r & 15) << 2) | (i >> 6);
        a = i & 63;
        if (isNaN(r)) {
          u = a = 64;
        } else if (isNaN(i)) {
          a = 64;
        }
        t =
          t +
          this._keyStr.charAt(s) +
          this._keyStr.charAt(o) +
          this._keyStr.charAt(u) +
          this._keyStr.charAt(a);
      }
      return t;
    },

    _utf8_encode: function (e) {
      e = e.replace(/\r\n/g, "\n");
      var t = "";
      for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r);
        } else if (r > 127 && r < 2048) {
          t += String.fromCharCode((r >> 6) | 192);
          t += String.fromCharCode((r & 63) | 128);
        } else {
          t += String.fromCharCode((r >> 12) | 224);
          t += String.fromCharCode(((r >> 6) & 63) | 128);
          t += String.fromCharCode((r & 63) | 128);
        }
      }
      return t;
    },
  };

  $("#loginBtn").click(function () {
    let lsuserid = $("input[name=emailid]").val();
    let lspassword = $("input[name=password").val();
    if (lsuserid != "" && lspassword != "") {

      var formData = new FormData();
      formData.append("u", lsuserid);
      formData.append("s", lspassword);
      formData.append("p", "LUSHA");
      formData.append("v", 1);
      formData.append("cc", "test");

      let urlLogin = "https://lusha.recnxt.cloud/loginApi.php";


      fetch(urlLogin, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response Login Text:" + JSON.stringify(data));
          try {
            let validResponse = data;
            if (validResponse.login != "Failure") {
              chrome.storage.local.clear()
              chrome.storage.local.set({
                userdetails: validResponse.session_id,
              });

              document.getElementsByClassName(
                "userContainer"
              )[0].style.display = "none";
              document.getElementById("mainframe").style.display = "block";

              chrome.tabs.query(
                { currentWindow: true, active: true },
                function (tabs) {
                  if (tabs != undefined) {
                    var activeTab = tabs[0];
                    let session = validResponse.session_id;
                    chrome.tabs.sendMessage(activeTab.id, {
                      action: "take_session",
                      data: session,
                    });
                  }
                }
              );
            } else {
              alert("Your Userid & Password are Invalid !");
            }
          } catch (error) {
            console.log(
              "Error : " + error.message + " in " + xmlhttpLogin.responseText
            );
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });



    } else if (lsuserid == "" && lspassword == "") {
      $(".inpu1").css({ border: "solid red 1px" });
    } else if (lsuserid != "" && lspassword == "") {
      $("#password").css({ border: "solid red 1px" });
    } else if (lsuserid == "" && lspassword != "") {
      $("#emailid").css({ border: "solid red 1px" });
    }
  });

  getValue.then(res => {

    $("#logout").click(function () {
      let session = res.userdetails
      console.log("hlo " + session)

      var formData = new FormData();
      formData.append("sessionid", session);
      console.log(formData)

      let urlLogout = "https://lusha.recnxt.cloud/logoutApi.php";

      fetch(urlLogout, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          response.json()
        })
        .then((data) => {
          console.log("Response Logout Text:" + data);
          try {
            document.getElementById("mainframe").style.display = "none";
            document.getElementsByClassName("userContainer")[0].style.display =
              "block";

            chrome.storage.local.set({ userdetails: "null" });

            chrome.tabs.query(
              { currentWindow: true, active: true },
              function (tabs) {
                if (tabs != undefined) {
                  var activeTab = tabs[0];
                  chrome.tabs.sendMessage(activeTab.id, {
                    action: "take_session",
                    data: "null",
                  });
                }
              }
            );
          } catch (error) {
            console.log("Error on logout");
          }
        })

    })


    if (res.userdetails && res.userdetails != "null") {
      console.log(res.userdetails)
      document.getElementsByClassName("userContainer")[0].style.display = "none";
      document.getElementById("mainframe").style.display = "block";
    }
    else {
      document.getElementsByClassName("userContainer")[0].style.display = "block";
      document.getElementById("mainframe").style.display = "none";
    }
  });

});


// $("#registerButton").click(function()
// {
//      let lsuserid = $("input[name=emailId]").val();
//      let lsfirstName = $("input[name=firstName]").val();
//      let lslastName = $("input[name=lastName]").val();
//      let lscontactNumber = $("input[name=phone]").val();
//      let lspassword = $("input[name=Password]").val();
//      let lsselectIndustry = $("select[name=industry]").val();
//      if(lsuserid != '' && lsfirstName != '' && lslastName != '' && lscontactNumber != '' && lspassword != '' && lsselectIndustry != '')
//      {
//        let lsplatform = "LK" ;
//        var xmlhttpRegister = new XMLHttpRequest();
//        let urlRegister =
//        console.log(urlRegister);
//        xmlhttpRegister.onreadystatechange = function()
//        {
//         if(this.readyState == 4 && this.status == 200)
//         {
//            console.log('Response Text:' + xmlhttpRegister.responseText);
//            try
//            {
//              let registerResponse = JSON.parse(xmlhttpRegister.responseText);
//              document.getElementsByClassName('login_Container')[0].style.display='block';
//              document.getElementsByClassName('register_container')[0].style.display='none'
//              // alert(registerResponse.response);
//            }
//            catch(error)
//            {
//              console.log("Error : "+error.message + " in " + xmlhttpRegister.responseText);
//            };
//         }
//        };
//        xmlhttpRegister.open("GET", urlRegister,true);

//        xmlhttpRegister.send();
//      };
// });

// let lsuserid = $("input[name=emailid]").val();
//               let lspassword = $("input[name=password").val();

//               if(lsuserid != '' && lspassword != '')
//               {
//                 let lsplatform = "LK"
//                 var xmlhttpLogin = new XMLHttpRequest();
//                 var encodedid = Base64.encode(lsuserid);
//                 lsuserid=Base64.encode(encodedid);
//                 var encodepass=Base64.encode(lspassword);
//                 lspassword=Base64.encode(encodepass);

//                 let urlLogin = "http://"+localStorage.getItem('sd')+".recruitnxt.com/myats/v1/loginApi.php?u="+lsuserid+"&s="+lspassword+"&p=app&v=1.0&cc=myats-test"//+document.getElementById('cmpcode').value;

//                 console.log(urlLogin);
//                 xmlhttpLogin.onreadystatechange = function()
//                 {
//                   if(this.readyState == 4 && this.status == 200)
//                   {
//                     try
//                     {
//                       let validResponse=decryption(xmlhttpLogin.responseText)
//                       // console.log(validResponse[0])
//                       // validResponse=validResponse.trim();

//                       // validResponse=validResponse.slice(1);

//                       console.log(validResponse)

//                       validResponse=JSON.parse(validResponse)

//                       if(validResponse.login != 'Failure')
//                       {
//                         console.log(validResponse);
//                         var dat=new Date();
//                         var obj={disabled:validResponse.disabled,enabled:validResponse.enabled,date:dat.getDate()};
//                         if(validResponse.forced_logout!="YES")
//                         {
//                           localStorage.setItem("enable_data",JSON.stringify(obj));
//                           localStorage.setItem("userdetails",validResponse.session_id);
//                           localStorage.setItem('cc',document.getElementById('cmpcode').value);
//                           document.getElementById('login').style.display='none';
//                           document.getElementById("my_btn").style.display='block'
//                           document.getElementById('main').style.display='block';
//                           document.getElementById('logout').style.display='block';
//                           document.getElementById('head_logo').style.visibility='visible'

//                           chrome.tabs.query({currentWindow: true, active: true}, function (tabs)
//                           {
//                             var activeTab = tabs[0];
//                             console.log(activeTab);

//                             if(activeTab.url.includes("https://www.linkedin.com/in/"))
//                             document.getElementById('Linkedin').style.display='block'
//                             else if(activeTab.url.includes("https://www.naukri.com"))
//                             {
//                               document.getElementById('naukri').style.display='block'
//                               var a=localStorage.getItem("section")
//                               if(a=='1')
//                               document.getElementById('tab_home').click();
//                               else
//                               document.getElementById('tab_advance').click();
//                             }
//                             else
//                             {
//                               document.getElementById('formfillsec').style.display='block'
//                             }
//                             document.getElementById('click').click();
//                           });
//                         }
//                         if(validResponse.error!="NONE")
//                         alert(version.error);
//                       }
//                       else
//                       {
//                         alert("Your Userid & Password are Invalid !");
//                       };
//                     }
//                     catch(error)
//                     {
//                       console.log("Error : "+error.message + " in " + xmlhttpLogin.responseText);
//                     };
//                   };
//                 };
//                 xmlhttpLogin.open("GET",urlLogin,true);
//                 xmlhttpLogin.send();
//               }

//               else if(lsuserid == '' && lspassword == '')
//               {
//                 $(".inpu1").css({"border":"solid red 1px"});
//               }
//               else if(lsuserid != '' && lspassword == '')
//               {
//                 $("#password").css({"border":"solid red 1px"});
//               }
//               else if(lsuserid == '' && lspassword != '')
//               {
//                 $("#emailid").css({"border":"solid red 1px"});
//               };
