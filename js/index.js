chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  if (tabs != undefined) {
    var activeTab = tabs[0];

    var session = chrome.storage.local.get("userdetails");
    chrome.tabs.sendMessage(activeTab.id, { "action": 'take_session', data: session });
  }
});


$(window).ready(function () {
  //xray btn click
  $('#xraySearchBtn').click(function () {
    document.getElementById('userContainer').style.display = 'none';
    document.getElementById('backXrayBtn').style.display = 'block';
    document.getElementById('x-ray').style.display = 'block';
  })

  $('#backXrayBtn').click(function () {
    document.getElementById('userContainer').style.display = 'block';
    document.getElementById('backXrayBtn').style.display = 'none';
    document.getElementById('x-ray').style.display = 'none';
  })

  $('#xraySearchLoginBtn').click(function () {
    document.getElementById('mainframe').style.display = 'none';
    document.getElementById('backXrayLoginBtn').style.display = 'block';
    document.getElementById('x-ray').style.display = 'block';
  })

  $('#backXrayLoginBtn').click(function () {
    document.getElementById('mainframe').style.display = 'block';
    document.getElementById('backXrayLoginBtn').style.display = 'none';
    document.getElementById('x-ray').style.display = 'none';
  })

  //working of registre icon
  $("#phone").keypress(function (evt) {
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
      return false;
    return true;
  });
  $("#registerShowDisplay").click(function () {
    $(".login_Container").hide();
    $("#smmreg2").show();
  });
  $(".reveal").on('click', function () {
    var $pwd = $(".pwd");
    if ($pwd.attr('type') === 'password') {
      $pwd.attr('type', 'text');
    } else {
      $pwd.attr('type', 'password');
    };
  });
  $("#anotherreveal").on('click', function () {
    var $pwd = $(".pwd1");
    if ($pwd.attr('type') === 'password') {
      $pwd.attr('type', 'text');
    } else {
      $pwd.attr('type', 'password');
    }
  });

  $("#smmClose12").click(function () {
    $("#smmreg2").hide();
    $(".login_Container").show();
  });

  $('input[type=password]').keyup(function () {
    var lspswd = $(this).val();
    if (lspswd.length < 8) {
      $('#length').removeClass('valid').addClass('invalid');
      let diabled = document.getElementById("registerButton");
      diabled.disabled = true;
    } else {
      $('#length').removeClass('invalid').addClass('valid');
      let diabled = document.getElementById("registerButton");
      diabled.disabled = false;
    };
    //validate letter
    if (lspswd.match(/[A-z]/)) {
      $('#letter').removeClass('invalid').addClass('valid');
      let diabled = document.getElementById("registerButton");
      diabled.disabled = false;
    } else {
      $('#letter').removeClass('valid').addClass('invalid');
      let diabled = document.getElementById("registerButton");
      diabled.disabled = true;
    };
    //validate capital letter
    if (lspswd.match(/[A-Z]/)) {
      $('#capital').removeClass('invalid').addClass('valid');
      let diabled = document.getElementById("registerButton");
      diabled.disabled = false;
    } else {
      $('#capital').removeClass('valid').addClass('invalid');
      let diabled = document.getElementById("registerButton");
      diabled.disabled = true;
    };
    //validate number
    if (lspswd.match(/\d/)) {
      $('#number').removeClass('invalid').addClass('valid');
      let diabled = document.getElementById("registerButton");
      diabled.disabled = false;
    } else {
      $('#number').removeClass('valid').addClass('invalid');
      let diabled = document.getElementById("registerButton");
      diabled.disabled = true;
    };
  }).focus(function () {
    $('#pswd_info').show();
  }).blur(function () {
    $('#pswd_info').hide();
  });

  $("#registerButton").click(function () {
    var currentStaus = $("*").hasClass("invalid");
    if (currentStaus == false) {
      let diabled = document.getElementById("registerButton");
      diabled.disabled = false;
    } else {
      let diabled = document.getElementById("registerButton");
      diabled.disabled = true;
      $('#pswd_info').show();
    };
  });
  $("#emailid").click(function () {
    $("#emailid").css({ "border": "solid #CECECE 1px" });
  });
  $("#password").click(function () {
    $("#password").css({ "border": "solid #CECECE 1px" });
  });




  chrome.runtime.onMessage.addListener(function (request) {
    if (request.action == 'jsondata') {
      console.log(request.text)
      console.log(request.text.basics.email)
      data = request.text;

      //document.getElementById("searched-user-name").innerText=value_name[0];
      document.getElementById('data').innerHTML = name_of_person;
      var br = document.createElement('br');
      var hr = document.createElement('hr');
      hr.style.marginTop = '10px'
      hr.style.marginBottom = '10px'


      var div = document.createElement('div');
      var button = document.createElement('button')
      button.innerHTML = '<i class="fa fa-envelope"></i>'
      button.style.border = 'none'
      button.style.backgroundColor = 'white'
      button.style.color = '#6666f6'
      var l1 = document.createElement('label');
      l1.innerHTML = request.text.basics.email;
      l1.style.border = 'none'
      l1.id = 'l1';
      l1.style.marginLeft = '12px';
      // let in1=document.createElement('input');
      // in1.value=request.text.basics.email;
      // in1.style.display='none';
      // in1.id='my_input'
      // var b1=document.createElement('span');
      // b1.innerHTML='<i class="fa fa-copy"></i>';
      // b1.style.float='right';
      // b1.style.marginRight="-20px"
      // b1.style.padding='0';
      // b1.style.width='14%';
      // b1.onclick=function()
      // {

      //   in1.select();
      //   document.execCommand('copy');
      // }
      div.appendChild(button);
      // div.appendChild(in1);
      div.appendChild(l1);
      // div.appendChild(b1);
      div.appendChild(hr.cloneNode());

      var button1 = document.createElement('button')
      button1.innerHTML = '<i class="fa fa-phone"></i>'
      button1.style.border = 'none'
      button1.style.backgroundColor = 'white'
      button1.style.color = '#6666f6'
      var l11 = document.createElement('label');
      l11.innerHTML = request.text.basics.phone;
      l11.style.border = 'none'
      l11.id = 'l1';
      l11.style.marginLeft = '12px';
      // let in11=document.createElement('input');
      // in11.value=request.text.basics.email;
      // in11.style.display='none';
      // in11.id='my_input'
      // var b11=document.createElement('span');
      // b11.innerHTML='<i class="fa fa-copy"></i>';
      // // b11.style.marginLeft='14px';
      // b11.style.float='right';
      // b11.style.marginRight="-20px"
      // b11.style.padding='0';
      // b11.style.width='14%';
      // b11.onclick=function()
      // {

      //   in11.select();
      //   document.execCommand('copy');
      // }
      div.appendChild(button1);
      // div.appendChild(in11);
      div.appendChild(l11);
      // div.appendChild(b11);
      // div.appendChild(hr.cloneNode());



      document.getElementById('data').style.display = 'block';
      document.getElementById('data').appendChild(div);

    }
  })

  // document.getElementById('logout').addEventListener('click',function(){

  //   document.getElementById('mainframe').style.display='none';
  //   document.getElementsByClassName('userContainer')[0].style.display='block';
  //   localStorage.removeItem('userdetails')

  // })


  // document.getElementById('click').addEventListener('click',function(){

  //   $.get(chrome.extension.getURL('frame.html'), function (data) {
  //     var el = document.createElement('div');
  //     el.setAttribute('style', 'width:300px');
  //     el.setAttribute('style', 'height: 100%');
  //     $($.parseHTML(data)).appendTo(el);

  //     $(document.body).append(el);
  //   });

  // })

});