document.getElementById("portal").addEventListener("change", function () {
  let a = parseInt(document.getElementById("portal").selectedIndex) + 1;
  document.getElementById("l" + a).click();
});

document.getElementById("l1").addEventListener("click", function () {
  this.classList.add("active");
  document.getElementById("linkedin").style.display = "inline-block";
  document.getElementById("dribble").style.display = "none";
  document.getElementById("l2").classList.remove("active");
  document.getElementById("github").style.display = "none";
  document.getElementById("l3").classList.remove("active");
  document.getElementById("stackoverflow").style.display = "none";
  document.getElementById("l4").classList.remove("active");
  document.getElementById("twitter").style.display = "none";
  document.getElementById("l5").classList.remove("active");
  document.getElementById("xing").style.display = "none";
  document.getElementById("l6").classList.remove("active");
  // document.getElementById('por_label').style.marginLeft='35px';
  // document.getElementById('portal').style.marginLeft='95px';
  // document.getElementById('save_div').style.marginLeft='35px'
  // document.getElementById('por_label').style.marginLeft='30px';
  // document.getElementById('por_label').style.width='165px';
});

document.getElementById("l2").addEventListener("click", function () {
  this.classList.add("active");
  // alert('hi')
  document.getElementById("dribble").style.display = "inline-block";
  document.getElementById("linkedin").style.display = "none";
  document.getElementById("l1").classList.remove("active");
  document.getElementById("github").style.display = "none";
  document.getElementById("l3").classList.remove("active");
  document.getElementById("stackoverflow").style.display = "none";
  document.getElementById("l4").classList.remove("active");
  document.getElementById("twitter").style.display = "none";
  document.getElementById("l5").classList.remove("active");
  document.getElementById("xing").style.display = "none";
  document.getElementById("l6").classList.remove("active");
  //   document.getElementById("por_label").style.marginLeft = "5px";
  //   document.getElementById("por_label").style.width = "210px";
  // document.getElementById('portal').style.width='139px';

  // document.getElementById('save_div').style.marginLeft='10px'
});

document.getElementById("l3").addEventListener("click", function () {
  this.classList.add("active");
  document.getElementById("github").style.display = "inline-block";
  document.getElementById("dribble").style.display = "none";
  document.getElementById("l2").classList.remove("active");
  document.getElementById("linkedin").style.display = "none";
  document.getElementById("l1").classList.remove("active");
  document.getElementById("stackoverflow").style.display = "none";
  document.getElementById("l4").classList.remove("active");
  document.getElementById("twitter").style.display = "none";
  document.getElementById("l5").classList.remove("active");
  document.getElementById("xing").style.display = "none";
  document.getElementById("l6").classList.remove("active");
  // document.getElementById('por_label').style.marginLeft='45px';
  // document.getElementById('portal').style.marginLeft='66px';
  // document.getElementById('por_label').style.marginLeft='30px';
  // document.getElementById('por_label').style.width='165px';

  // document.getElementById('save_div').style.marginLeft='45px'
});

document.getElementById("l4").addEventListener("click", function () {
  this.classList.add("active");
  document.getElementById("stackoverflow").style.display = "inline-block";
  document.getElementById("dribble").style.display = "none";
  document.getElementById("l2").classList.remove("active");
  document.getElementById("github").style.display = "none";
  document.getElementById("l3").classList.remove("active");
  document.getElementById("linkedin").style.display = "none";
  document.getElementById("l1").classList.remove("active");
  document.getElementById("twitter").style.display = "none";
  document.getElementById("l5").classList.remove("active");
  document.getElementById("xing").style.display = "none";
  document.getElementById("l6").classList.remove("active");
  // document.getElementById('por_label').style.marginLeft='5px';
  // document.getElementById('portal').style.marginLeft='141px';
  // document.getElementById('save_div').style.marginLeft='10px'
  // document.getElementById('por_label').style.marginLeft='5px';
  // document.getElementById('por_label').style.width='210px';
  // document.getElementById('portal').style.width='195px';
});

document.getElementById("l5").addEventListener("click", function () {
  this.classList.add("active");
  document.getElementById("twitter").style.display = "inline-block";
  document.getElementById("dribble").style.display = "none";
  document.getElementById("l2").classList.remove("active");
  document.getElementById("github").style.display = "none";
  document.getElementById("l3").classList.remove("active");
  document.getElementById("stackoverflow").style.display = "none";
  document.getElementById("l4").classList.remove("active");
  document.getElementById("linkedin").style.display = "none";
  document.getElementById("l1").classList.remove("active");
  document.getElementById("xing").style.display = "none";
  document.getElementById("l6").classList.remove("active");
  // document.getElementById('por_label').style.marginLeft='10px';
  // document.getElementById('portal').style.marginLeft='136.5px';

  // document.getElementById('save_div').style.marginLeft='10px'
  // document.getElementById('por_label').style.marginLeft='5px';
  // document.getElementById('por_label').style.width='210px';
  // document.getElementById('portal').style.width='195px';
});

document.getElementById("l6").addEventListener("click", function () {
  this.classList.add("active");
  document.getElementById("xing").style.display = "inline-block";
  document.getElementById("dribble").style.display = "none";
  document.getElementById("l2").classList.remove("active");
  document.getElementById("github").style.display = "none";
  document.getElementById("l3").classList.remove("active");
  document.getElementById("stackoverflow").style.display = "none";
  document.getElementById("l4").classList.remove("active");
  document.getElementById("twitter").style.display = "none";
  document.getElementById("l5").classList.remove("active");
  document.getElementById("linkedin").style.display = "none";
  document.getElementById("l1").classList.remove("active");
  // document.getElementById('por_label').style.marginLeft='0px';
  // document.getElementById('portal').style.marginLeft='162px';
  // document.getElementById('save_div').style.marginLeft='0px'
  // document.getElementById('por_label').style.marginLeft='5px';
  // document.getElementById('por_label').style.width='240px';
  // document.getElementById('portal').style.width='165px';
});

document.getElementById("close1").onclick = function () {
  document.getElementById("myModal2").style.display = "none";
};

document.getElementById("submit2").addEventListener("click", function () {
  this.style.border = "none";
  this.style.outline = "none";
  var si = document.getElementById("skillinc").value.replace(" or ", " OR ");
  var se = document.getElementById("skillexc").value.replace(" or ", " OR ");
  var link =
    "https://www.google.com/search?q=site:dribbble.com%20-inurl:(followers|type|members|following|jobs|designers|players|buckets|places|skills|projects|tags|search|stories|users|draftees|likes|lists)%20-intitle:(following|likes)%20-%22Hire%20Us%22";

  if (si != "") {
    si = si.trim();
    link = link + " +";
    var s = "";
    if (si.includes(",")) {
      var sub = si.split(",");
      for (var i = 0; i < sub.length; i++) sub[i] = sub[i].trim();
      for (let i = 0; i < sub.length; i++) {
        var l = "";
        if (sub[i].includes(" ")) {
          var subs = sub[i].split(" ");
          for (let j = 0; j < subs.length; j++) {
            l = l + subs[j];
            if (j != subs.length - 1) l = l + "+";
          }
        } else l += sub[i];
        if (i != sub.length - 1) s = s + "%22" + l + "%22" + "%20AND%20";
        else s = s + "%22" + l + "%22";
      }
      link += s;
    } else {
      si = si.trim();
      var st = "";
      for (let i = 0; i < si.length; i++) {
        if (si[i] == " ") {
          st += "+";
          continue;
        }
        st += si[i];
      }
      link = link + '"' + st + '"';
    }
  }
  if (se != "") {
    link = link + " -";
    se = se.trim();
    link = link + '"' + se + '"';
  }

  var ans = link;
  document.getElementById("myModal2").style.display = "block";
  document.getElementById("popup_input").style.border = "1px solid black";
  document.getElementById("popup_input").value = ans;
  document.getElementById("copy_url").addEventListener("click", function () {
    var copyText = document.getElementById("popup_input");
    document.getElementById("copy_url").disabled = true;
    copyText.select();
    document.execCommand("copy");
  });
  document.getElementById("jump_bt").addEventListener("click", function () {
    document.getElementById("go_to_link").href = ans;
    document.getElementById("go_to_link").click();
  });
});

document.getElementById('rsubmit').addEventListener("click", function () {
  document.getElementById("linkform").reset()
})

document.getElementById('rsubmit2').addEventListener("click", function () {
  document.getElementById("dribform").reset()
})

document.getElementById('rsubmit3').addEventListener("click", function () {
  document.getElementById("gitform").reset()
})

document.getElementById('rsubmit4').addEventListener("click", function () {
  document.getElementById("stackform").reset()
})

document.getElementById('rsubmit5').addEventListener("click", function () {
  document.getElementById("twitform").reset()
})

document.getElementById('rsubmit6').addEventListener("click", function () {
  document.getElementById("xingform").reset()
})

document.getElementById("submit").addEventListener("click", function () {
  this.style.border = "none";
  this.style.outline = "none";
  var ctr = document.getElementById("country").value.replace(" or ", " OR ");
  var job = document.getElementById("job-title").value.replace(" or ", " OR ");
  var inc = document
    .getElementById("include-keywords")
    .value.replace(" or ", " OR ");
  var exc = document
    .getElementById("exclude-keywords")
    .value.replace(" or ", " OR ");
  var edu = document.getElementById("education").value.replace(" or ", " OR ");
  var cmp = document.getElementById("company").value.replace(" or ", " OR ");

  var ctr_url;
  if (ctr == "all") {
    ctr_url =
      ' -intitle:"profiles" -inurl:"dir/+"+site:linkedin.com/in/+OR+site:linkedin.com/pub/';
  } else {
    ctr_url =
      ' -intitle:"profiles" -inurl:"dir/+"+site:' +
      ctr +
      ".linkedin.com/in/+OR+site:" +
      ctr +
      ".linkedin.com/pub/";
  }

  var job_url = "http://www.google.com/search?q=";
  if (job != "") {
    job = job.trim();
    job_url = job_url + "+";
    var s = "";
    if (job.includes(" OR ")) {
      var sub = job.split(" OR ");
      for (var i = 0; i < sub.length; i++) sub[i] = sub[i].trim();
      for (let i = 0; i < sub.length; i++) {
        var l = "";
        if (sub[i].includes(" ")) {
          var subs = sub[i].split(" ");
          for (let j = 0; j < subs.length; j++) {
            l = l + subs[j];
            if (j != subs.length - 1) l = l + "+";
          }
        } else l += sub[i];
        if (i != sub.length - 1) s = s + "%22" + l + "%22" + "%20OR%20";
        else s = s + "%22" + l + "%22";
      }
      job_url += s;
    } else {
      job = job.trim();
      var st = "";
      for (let i = 0; i < job.length; i++) {
        if (job[i] == " ") {
          st += "+";
          continue;
        }
        st += job[i];
      }
      job_url = job_url + '"' + st + '"';
    }
  }
  if (inc != "") {
    inc = inc.trim();
    job_url = job_url + "+";
    if (inc.includes(" OR ")) {
      var s = "";
      var sub = inc.split(" OR ");
      for (var i = 0; i < sub.length; i++) sub[i] = sub[i].trim();
      for (let i = 0; i < sub.length; i++) {
        var l = "";
        if (sub[i].includes(" AND ")) {
          var subs = sub[i].split(" AND ");
          for (var k = 0; k < subs.length; k++) subs[k] = subs[k].trim();
          var p = "";
          for (let j = 0; j < subs.length; j++) {
            l = "";
            if (subs[j].includes(" ")) {
              var subss = subs[j].split(" ");
              for (var k = 0; k < subss.length; k++) subss[k] = subss[k].trim();
              for (let k = 0; k < subss.length; k++) {
                l = l + subss[k];
                if (k != subss.length - 1) l = l + "+";
              }
            } else l += subs[j];
            if (j == 0) p = p + l + "%22" + "%20AND%20";
            else if (j != subs.length - 1) p = p + "%22" + l + "%20AND%20";
            else p = p + "%22" + l;
          }
          l = p;
        } else if (sub[i].includes(" ")) {
          l = "";
          var subss = sub[i].split(" ");
          for (var k = 0; k < subss.length; k++) subss[k] = subss[k].trim();
          for (let k = 0; k < subss.length; k++) {
            l = l + subss[k];
            if (k != subss.length - 1) l = l + "+";
          }
        } else {
          l += sub[i];
        }
        if (i != sub.length - 1) s = s + "%22" + l + "%22" + "%20OR%20";
        else s = s + "%22" + l + "%22";
      }
      job_url += s;
    } else if (inc.includes(" AND ")) {
      var s = "";
      var sub = job.split(" AND ");
      for (var i = 0; i < sub.length; i++) sub[i] = sub[i].trim();
      for (let i = 0; i < sub.length; i++) {
        var l = "";
        if (sub[i].includes(" ")) {
          var subs = sub[i].split(" ");
          for (let j = 0; j < subs.length; j++) {
            l = l + subs[j];
            if (j != subs.length - 1) l = l + "+";
          }
        } else l += sub[i];
        if (i != sub.length - 1) s = s + "%22" + l + "%22" + "%20OR%20";
        else s = s + "%22" + l + "%22";
      }
      job_url += s;
    } else {
      inc = inc.trim();
      var st = "";
      for (let i = 0; i < inc.length; i++) {
        if (inc[i] == " ") {
          st += "+";
          continue;
        }
        st += inc[i];
      }
      job_url = job_url + '"' + st + '"';
    }
  }

  if (exc != "") {
    exc = exc.trim();
    job_url = job_url + " -";
    var s = "";
    if (exc.includes(" OR ")) {
      var sub = exc.split(" OR ");
      for (var i = 0; i < sub.length; i++) sub[i] = sub[i].trim();
      for (let i = 0; i < sub.length; i++) {
        var l = "";
        if (sub[i].includes(" ")) {
          var subs = sub[i].split(" ");

          for (let j = 0; j < subs.length; j++) {
            l = l + subs[j];
            if (j != subs.length - 1) l = l + "+";
          }
        } else l += sub[i];

        if (i != sub.length - 1) s = s + "%22" + l + "%22" + "%20OR%20";
        else s = s + "%22" + l + "%22";
      }
      job_url += s;
    } else {
      exc = exc.trim();
      var st = "";
      for (let i = 0; i < exc.length; i++) {
        if (exc[i] == " ") {
          st += "+";
          continue;
        }
        st += exc[i];
      }
      job_url = job_url + '"' + st + '"';
    }
  }

  if (edu != "all") {
    ctr_url = ctr_url + "&as_oq=" + edu;
  }

  if (cmp != "") {
    var st = "";
    for (var i = 0; i < cmp.length; i++) {
      if (cmp[i] == " ") {
        st += "+";
        continue;
      }
      st += cmp[i];
    }
    ctr_url = ctr_url + '+"Current+%2A+' + st + '+%2A+"';
  }

  var ans = job_url + ctr_url;

  document.getElementById("myModal2").style.display = "block";

  document.getElementById("popup_input").style.border = "1px solid black";
  document.getElementById("popup_input").value = ans;
  document.getElementById("jump_bt").addEventListener("click", function () {
    document.getElementById("go_to_link").href = ans;
    document.getElementById("go_to_link").click();
  });
});

document.getElementById("save").addEventListener("click", function () {
  if (document.getElementById("l1").classList.contains("active")) {
    var val = document.getElementById("popup_input").value;
    var file = localStorage.getItem("file");
    if (file == null) {
      var f = [];
      localStorage.setItem("file", f);
    }
    file = localStorage.getItem("file");
    file = file ? file.split(",") : [];

    var ctr = document.getElementById("country");
    ctr = ctr.options[ctr.selectedIndex].text;
    var job = document.getElementById("job-title").value;
    var string = "";
    if (job == "") string = string + "Blank Search in ";
    else string += job + " in ";
    if (ctr == "all") string += "All countries";
    else string += ctr;
    var flag = 0;
    for (let i = 0; i < file.length; i++) {
      if (file[i] == string) flag = 1;
    }
    if (flag == 0) {
      localStorage.setItem(string, val);
      file.push(string);
      if (file.length > 20) {
        localStorage.removeItem(file[0]);
        file.shift();
      }
      localStorage.setItem("file", file);
    }
  }

  if (document.getElementById("l2").classList.contains("active")) {
    // alert('clicked')
    var val = document.getElementById("popup_input").value;
    var file = localStorage.getItem("file");
    if (file == null) {
      var f = [];
      localStorage.setItem("file", f);
    }
    file = localStorage.getItem("file");
    file = file ? file.split(",") : [];
    var ctr = document.getElementById("skillinc").value;
    var string = "";
    if (ctr == "") string = "Blank Search";
    else string += ctr;
    var flag = 0;
    for (let i = 0; i < file.length; i++) {
      if (file[i] == string) flag = 1;
    }
    if (flag == 0) {
      localStorage.setItem(string, val);
      file.push(string);
      if (file.length > 3) {
        localStorage.removeItem(file[0]);
        file.shift();
      }
      localStorage.setItem("file", file);
    }
  }

  if (document.getElementById("l3").classList.contains("active")) {
    var val = document.getElementById("popup_input").value;
    var file = localStorage.getItem("file");
    if (file == null) {
      var f = [];
      localStorage.setItem("file", f);
    }
    file = localStorage.getItem("file");
    file = file ? file.split(",") : [];

    var job = document.getElementById("gitskillinc").value;
    var ctr = document.getElementById("city").value;

    var string = "";

    if (ctr == "" && job == "") string = "Blank search";

    if (job != "") string = job;
    else string = "Blank search";

    if (ctr != "") string += " in " + ctr;

    var flag = 0;
    for (let i = 0; i < file.length; i++) {
      if (file[i] == string) flag = 1;
    }
    if (flag == 0) {
      localStorage.setItem(string, val);
      file.push(string);

      if (file.length > 3) {
        localStorage.removeItem(file[0]);
        file.shift();
      }
      localStorage.setItem("file", file);
    }
  }

  if (document.getElementById("l4").classList.contains("active")) {
    var val = document.getElementById("popup_input").value;
    var file = localStorage.getItem("file");

    if (file == null) {
      var f = [];
      localStorage.setItem("file", f);
    }
    file = localStorage.getItem("file");
    file = file ? file.split(",") : [];

    var job = document.getElementById("stackskillinc").value;
    var ctr = document.getElementById("stackcity").value;

    var string = "";

    if (ctr == "" && job == "") string = "Blank search";
    if (job != "") string += job;
    if (ctr != "") string += " in " + ctr;

    var flag = 0;
    for (let i = 0; i < file.length; i++) {
      if (file[i] == string) flag = 1;
    }
    if (flag == 0) {
      localStorage.setItem(string, val);
      file.push(string);

      if (file.length > 3) {
        localStorage.removeItem(file[0]);
        file.shift();
      }
      localStorage.setItem("file", file);
    }
  }

  if (document.getElementById("l5").classList.contains("active")) {
    var val = document.getElementById("popup_input").value;
    var file = localStorage.getItem("file");

    if (file == null) {
      var f = [];
      localStorage.setItem("file", f);
    }
    file = localStorage.getItem("file");
    file = file ? file.split(",") : [];

    var job = document.getElementById("twitterskillinc").value;
    var ctr = document.getElementById("twittercity").value;

    var string = "";

    if (ctr == "" && job == "") string = "Blank search";

    if (job != "") string = job;
    else string = "Blank search";

    if (ctr != "") string += " in " + ctr;

    var flag = 0;
    for (let i = 0; i < file.length; i++) {
      if (file[i] == string) flag = 1;
    }
    if (flag == 0) {
      localStorage.setItem(string, val);
      file.push(string);

      if (file.length > 3) {
        localStorage.removeItem(file[0]);
        file.shift();
      }
      localStorage.setItem("file", file);
    }
  }

  if (document.getElementById("l6").classList.contains("active")) {
    var val = document.getElementById("popup_input").value;
    var file = localStorage.getItem("file");
    if (file == null) {
      var f = [];
      localStorage.setItem("file", f);
    }
    file = localStorage.getItem("file");
    file = file ? file.split(",") : [];

    var job = document.getElementById("xingjob").value;
    var string = "";

    if (job == "") string = "blank search";

    if (job != "") string += job;

    var flag = 0;
    for (let i = 0; i < file.length; i++) {
      if (file[i] == string) flag = 1;
    }
    if (flag == 0) {
      localStorage.setItem(string, val);
      file.push(string);

      if (file.length > 3) {
        localStorage.removeItem(file[0]);
        file.shift();
      }
      localStorage.setItem("file", file);
    }
  }

  // var save=document.getElementById('saved_file');
  // document.getElementById('saved_file_more').innerHTML='';
  // save.innerHTML="";
  document.getElementById("close1").click();
  setTimeout(function () {
    caller();
  }, 100);
});

document.getElementById("submit3").addEventListener("click", function () {
  this.style.border = "none";
  this.style.outline = "none";
  var si = document.getElementById("gitskillinc").value.replace(" or ", " OR ");
  var city = document.getElementById("city").value.replace(" or ", " OR ");
  var link =
    "https://www.google.com/search?q=site:github.com+%22joined%20on%22%20-intitle:%22at%20master%22%20-inurl:%22tab%22%20-inurl:%22jobs.%22%20-inurl:%22articles%22";

  if (si != "") {
    si = si.trim();
    link = link + "+";

    var s = "";
    if (si.includes(",")) {
      var sub = si.split(",");
      for (var i = 0; i < sub.length; i++) sub[i] = sub[i].trim();

      for (let i = 0; i < sub.length; i++) {
        var l = "";
        if (sub[i].includes(" ")) {
          var subs = sub[i].split(" ");

          for (let j = 0; j < subs.length; j++) {
            l = l + subs[j];
            if (j != subs.length - 1) l = l + "+";
          }
        } else l += sub[i];

        if (i != sub.length - 1) s = s + "%22" + l + "%22" + "%20AND%20";
        else s = s + "%22" + l + "%22";
      }
      link += s;
    } else {
      si = si.trim();
      var st = "";
      for (let i = 0; i < si.length; i++) {
        if (si[i] == " ") {
          st += "+";
          continue;
        }
        st += si[i];
      }
      link = link + '"' + st + '"';
    }
  }

  if (city != "") {
    city = city.trim();
    link = link + "+";
    var s = "";
    if (city.includes(" OR ")) {
      var sub = city.split(" OR ");
      for (var i = 0; i < sub.length; i++) sub[i] = sub[i].trim();

      for (let i = 0; i < sub.length; i++) {
        var l = "";
        if (sub[i].includes(" ")) {
          var subs = sub[i].split(" ");

          for (let j = 0; j < subs.length; j++) {
            l = l + subs[j];
            if (j != subs.length - 1) l = l + "+";
          }
        } else l += sub[i];

        if (i != sub.length - 1) s = s + "%22" + l + "%22" + "%20OR%20";
        else s = s + "%22" + l + "%22";
      }
      link += s;
    } else {
      city = city.trim();
      var st = "";
      for (let i = 0; i < city.length; i++) {
        if (city[i] == " ") {
          st += "+";
          continue;
        }
        st += city[i];
      }
      link = link + '"' + st + '"';
    }
  }

  var ans = link;
  document.getElementById("myModal2").style.display = "block";
  document.getElementById("popup_input").style.border = "1px solid black";
  document.getElementById("popup_input").value = ans;

  document.getElementById("copy_url").addEventListener("click", function () {
    var copyText = document.getElementById("popup_input");
    document.getElementById("copy_url").disabled = true;
    copyText.select();
    document.execCommand("copy");
  });

  document.getElementById("jump_bt").addEventListener("click", function () {
    document.getElementById("go_to_link").href = ans;
    document.getElementById("go_to_link").click();
  });
});

document.getElementById("submit4").addEventListener("click", function () {
  this.style.border = "none";
  this.style.outline = "none";
  var si = document
    .getElementById("stackskillinc")
    .value.replace(" or ", " OR ");
  var city = document.getElementById("stackcity").value.replace(" or ", " OR ");

  var link =
    "https://www.google.com/search?q=site:stackoverflow.com/users%20-%22Keeping%20a%20low%20profile.";

  if (si != "") {
    si = si.trim();
    link = link + "%22+%22";

    var s = "";
    if (si.includes(",")) {
      var sub = si.split(",");
      for (var i = 0; i < sub.length; i++) sub[i] = sub[i].trim();

      for (let i = 0; i < sub.length; i++) {
        var l = "";
        if (sub[i].includes(" ")) {
          var subs = sub[i].split(" ");

          for (let j = 0; j < subs.length; j++) {
            l = l + subs[j];
            if (j != subs.length - 1) l = l + "+";
          }
        } else l += sub[i];

        if (i == 0) s = s + l + "%22" + "%20AND%20";
        else if (i != sub.length - 1) s = s + "%22" + l + "%22" + "%20AND%20";
        else s = s + "%22" + l + "%22";
      }
      link += s;
    } else {
      si = si.trim();
      var st = "";
      for (let i = 0; i < si.length; i++) {
        if (si[i] == " ") {
          st += "+";
          continue;
        }
        st += si[i];
      }
      link = link + '"' + st + '"';
    }
  }

  if (city != "") {
    city = city.trim();
    if (si != "") link = link + "+%22";
    else {
      link = link + "%22+%22";
    }

    var s = "";
    // var l="";
    if (city.includes(" OR ")) {
      var sub = city.split(" OR ");
      for (var i = 0; i < sub.length; i++) sub[i] = sub[i].trim();

      for (let i = 0; i < sub.length; i++) {
        var l = "";
        if (sub[i].includes(" ")) {
          var subs = sub[i].split(" ");

          for (let j = 0; j < subs.length; j++) {
            l = l + subs[j];
            if (j != subs.length - 1) l = l + "+";
          }
        } else l += sub[i];

        if (i == 0) s = s + l + "%22" + "%20OR%20";
        else if (i != sub.length - 1) s = s + "%22" + l + "%22" + "%20OR%20";
        else s = s + "%22" + l + "%22";
      }
      link += s;
    } else {
      city = city.trim();
      var st = city.split(" ");
      st = st.join("+");
      link = link + st + "%22";
    }
  }
  if (city == "" && si == "") link += "%22";

  link += "-%220%20*%20reputation%22%3E%3Ci%20class=";
  var ans = link;
  document.getElementById("myModal2").style.display = "block";
  document.getElementById("popup_input").style.border = "1px solid black";
  document.getElementById("popup_input").value = ans;

  document.getElementById("copy_url").addEventListener("click", function () {
    var copyText = document.getElementById("popup_input");
    document.getElementById("copy_url").disabled = true;
    copyText.select();
    document.execCommand("copy");
  });

  document.getElementById("jump_bt").addEventListener("click", function () {
    document.getElementById("go_to_link").href = ans;
    // alert(ans);
    document.getElementById("go_to_link").click();
  });
});

document.getElementById("submit5").addEventListener("click", function () {
  this.style.border = "none";
  this.style.outline = "none";
  var si = document
    .getElementById("twitterskillinc")
    .value.replace(" or ", " OR ");
  var city = document
    .getElementById("twittercity")
    .value.replace(" or ", " OR ");
  var se = document
    .getElementById("twitterskillexc")
    .value.replace(" or ", " OR ");
  var link =
    "https://www.google.com/search?q=site:twitter.com%20-inurl:(search|favorites|status|statuses|jobs)%20-intitle:(job|jobs)%20-recruiter%20-HR%20-careers";

  if (si != "") {
    si = si.trim();
    link = link + "+%22";
    var s = "";
    if (si.includes(",")) {
      var sub = si.split(",");
      for (var i = 0; i < sub.length; i++) sub[i] = sub[i].trim();
      for (let i = 0; i < sub.length; i++) {
        var l = "";
        if (sub[i].includes(" ")) {
          var subs = sub[i].split(" ");
          for (let j = 0; j < subs.length; j++) {
            l = l + subs[j];
            if (j != subs.length - 1) l = l + "+";
          }
        } else l += sub[i];

        if (i == 0) s = s + l + "%22" + "%20AND%20";
        else if (i != sub.length - 1) s = s + "%22" + l + "%22" + "%20AND%20";
        else s = s + "%22" + l + "%22";
      }
      link += s;
    } else {
      si = si.trim();
      var st = "";
      for (let i = 0; i < si.length; i++) {
        if (si[i] == " ") {
          st += "+";
          continue;
        }
        st += si[i];
      }
      link = link + '"' + st + '"';
    }
  }

  if (city != "") {
    city = city.trim();
    if (si != "") link = link + "+%22";
    else link = link + "%22+%22";

    var s = "";
    if (city.includes(" OR ")) {
      var sub = city.split(" OR ");
      for (var i = 0; i < sub.length; i++) sub[i] = sub[i].trim();

      for (let i = 0; i < sub.length; i++) {
        var l = "";
        if (sub[i].includes(" ")) {
          var subs = sub[i].split(" ");

          for (let j = 0; j < subs.length; j++) {
            l = l + subs[j];
            if (j != subs.length - 1) l = l + "+";
          }
        } else l += sub[i];

        if (i == 0) s = s + l + "%22" + "%20OR%20";
        else if (i != sub.length - 1) s = s + "%22" + l + "%22" + "%20OR%20";
        else s = s + "%22" + l + "%22";
      }
      link += s;
    } else {
      city = city.trim();
      var st = "";
      for (let i = 0; i < city.length; i++) {
        if (city[i] == " ") {
          st += "+";
          continue;
        }
        st += city[i];
      }
      link = link + '"' + st + '"';
    }
  }

  if (se != "") {
    link = link + "-%22";
    se = se.trim();
    link = link + se;
    link += "%22";
  }
  var ans = link;
  document.getElementById("myModal2").style.display = "block";
  document.getElementById("popup_input").style.border = "1px solid black";
  document.getElementById("popup_input").value = ans;

  document.getElementById("copy_url").addEventListener("click", function () {
    var copyText = document.getElementById("popup_input");
    document.getElementById("copy_url").disabled = true;
    copyText.select();
    document.execCommand("copy");
  });

  document.getElementById("jump_bt").addEventListener("click", function () {
    document.getElementById("go_to_link").href = ans;
    document.getElementById("go_to_link").click();
  });
});

document.getElementById("submit6").addEventListener("click", function () {
  this.style.border = "none";
  this.style.outline = "none";
  var city = document.getElementById("xingjob").value.replace(" or ", " OR ");
  var si = document
    .getElementById("xingskillinc")
    .value.replace(" or ", " OR ");
  var exc = document
    .getElementById("xingskillexc")
    .value.replace(" or ", " OR ");
  var link = "https://www.google.com/search?q=site:xing.com/profile/";
  if (city != "") {
    city = city.trim();
    link = link + "%20intitle:%22";

    var s = "";
    if (city.includes(" OR ")) {
      var sub = city.split(" OR ");
      for (var i = 0; i < sub.length; i++) sub[i] = sub[i].trim();

      for (let i = 0; i < sub.length; i++) {
        var l = "";
        if (sub[i].includes(" ")) {
          var subs = sub[i].split(" ");

          for (let j = 0; j < subs.length; j++) {
            l = l + subs[j];
            if (j != subs.length - 1) l = l + "+";
          }
        } else l += sub[i];

        if (i == 0) s = s + l + "%22" + "%20OR%20";
        else if (i != sub.length - 1) s = s + "%22" + l + "%22" + "%20OR%20";
        else s = s + "%22" + l + "%22";
      }
      link += s;
    } else {
      city = city.trim();
      var st = "";
      for (let i = 0; i < city.length; i++) {
        if (city[i] == " ") {
          st += "+";
          continue;
        }
        st += city[i];
      }
      link = link + '"' + st + '"';
    }
  }

  if (si != "") {
    si = si.trim();
    link = link + "+%22";

    var s = "";
    if (si.includes(",")) {
      var sub = si.split(",");
      for (var i = 0; i < sub.length; i++) sub[i] = sub[i].trim();

      for (let i = 0; i < sub.length; i++) {
        var l = "";
        if (sub[i].includes(" ")) {
          var subs = sub[i].split(" ");

          for (let j = 0; j < subs.length; j++) {
            l = l + subs[j];
            if (j != subs.length - 1) l = l + "+";
          }
        } else l += sub[i];

        if (i == 0) s = s + l + "%22" + "%20AND%20";
        else if (i != sub.length - 1) s = s + "%22" + l + "%22" + "%20AND%20";
        else s = s + "%22" + l + "%22";
      }
      link += s;
    } else {
      si = si.trim();
      var st = "";
      for (let i = 0; i < si.length; i++) {
        if (si[i] == " ") {
          st += "+";
          continue;
        }
        st += si[i];
      }
      link = link + '"' + st + '"';
    }
  }

  if (exc != "") {
    exc = exc.trim();
    link = link + "-%22" + exc + "%22";
  }

  var ans = link;

  document.getElementById("myModal2").style.display = "block";

  document.getElementById("popup_input").style.border = "1px solid black";
  document.getElementById("popup_input").value = ans;

  document.getElementById("copy_url").addEventListener("click", function () {
    var copyText = document.getElementById("popup_input");
    document.getElementById("copy_url").disabled = true;
    copyText.select();
    document.execCommand("copy");
  });

  document.getElementById("jump_bt").addEventListener("click", function () {
    document.getElementById("go_to_link").href = ans;
    // alert(ans);
    document.getElementById("go_to_link").click();
  });
});

function caller() {
  var file = localStorage.getItem("file");

  if (file != null) {
    file = file ? file.split(",") : [];

    if (file.length > 0) {
      document.getElementById("saved_file").style.display = "block";
      var node = document.getElementById("saved_file").lastElementChild;

      document.getElementById("saved_file").innerHTML = "";
      document.getElementById("saved_file").appendChild(node);
      node = document.getElementById("saved_file_more").lastElementChild;

      document.getElementById("saved_file_more").innerHTML = "";
      document.getElementById("saved_file_more").appendChild(node);

      document.getElementById("saved").style.display = "none";
    }

    for (var i = 0; i < file.length; i++) {
      var a = document.createElement("button");
      var a1 = document.createElement("a");
      a1.innerHTML =
        "<i id=" +
        i +
        ' class="fas fa-times-circle" style="color: rgba(41, 19, 0, 0.6);"></i>';
      a1.id = i + "a1";
      a1.style.float = "right";
      a1.style.marginRight = "101.5px";
      a1.style.display = "inline";
      a1.style.borderBottom = "1px solid grey";

      a1.onmouseover = function () {
        document.getElementById(this.id[0]).style.color = "red";
        document.getElementById("a" + this.id[0]).style.textDecoration =
          "line-through";
      };
      a1.onmouseleave = function () {
        document.getElementById("a" + this.id[0]).style.textDecoration = "none";
        document.getElementById(this.id[0]).style.color =
          "rgba(41, 19, 0, 0.6)";
      };

      a1.onclick = function () {
        file = localStorage.getItem("file");
        file = file ? file.split(",") : [];
        var A = [];
        var id = this.id;
        // alert(id)
        var pid = "";
        for (let as = 0; as < id.length; as++) {
          if (!isNaN(id[as]))
            pid += id[as];
          else
            break;
        }
        // if(x=='a0' || x=='a1' || x=='a2')
        // {
        pid = parseInt(pid);
        // alert(pid)
        for (var j = 0; j < file.length; j++) {
          if (j == pid) continue;
          else A.push(file[j]);
        }

        if (A.length == 0) localStorage.removeItem("file");
        else localStorage.setItem("file", A);

        localStorage.removeItem(file[pid]);

        setTimeout(function () {
          caller();
        }, 10);
      };
      a.id = "a" + i;
      a.innerHTML = file[i];
      a.style.height = "20px";
      a.style.backgroundColor = "white";
      a.style.paddingLeft = "0px";
      a.style.marginTop = "0px";
      a.style.color = "rgba(41, 19, 0, 0.6)";
      a.style.marginLeft = "0";
      a.style.textAlign = "left";
      a.style.fontSize = "15px";
      a.style.width = "100%";
      a.onmouseover = function () {
        this.style.color = "#291300";
      };
      a.onmouseleave = function () {
        this.style.color = "rgba(41, 19, 0, 0.6)";
      };
      a.onclick = function () {
        var x = this.id;
        var p = "";
        for (let as = 0; as < x.length; as++) {
          if (!isNaN(x[as])) p += x[as];
        }
        // if(x=='a0' || x=='a1' || x=='a2')
        // {
        p = parseInt(p);
        // alert(p);
        // alert(this.id);
        var f = localStorage.getItem("file");
        f = f ? f.split(",") : [];
        var link = localStorage.getItem(f[p]);
        document.getElementById("go_to_link").href = link;
        document.getElementById("go_to_link").click();
        // }
      };

      a.style.border = "none";
      a.style.outline = "none";
      a.style.marginRight = "0px";
      a.style.borderBottom = "1px solid grey";
      var div = document.createElement("div");
      div.appendChild(a);
      div.appendChild(a1);
      div.style.display = "flex";

      if (i < 2) document.getElementById("saved_file").prepend(div);
      else {
        document.getElementById("saved_file_more").prepend(div);
      }

      document.getElementById("saved_file").classList.remove("save");
      document.getElementById("saved_file").style.paddingtop = "0px";
    }
  }
  if (file == null) {
    document.getElementById("saved_file").style.display = "none";
    document.getElementById("saved").style.display = "block";
  }
}
caller();

document.getElementById("saved_more").addEventListener("click", function () {
  document.getElementById("saved_more").style.display = "none";
  document.getElementById("saved_file_more").style.display = "block";
});

document.getElementById("saved_less").addEventListener("click", function () {
  document.getElementById("saved_more").style.display = "block";
  document.getElementById("saved_file_more").style.display = "none";
});

var b0 = document.getElementById("b0");
b0.onmouseover = function () {
  this.style.color = "#2f4054";
};
b0.onmouseleave = function () {
  this.style.color = "#A0A0A0";
};
var b1 = document.getElementById("b1");
b1.onmouseover = function () {
  this.children[0].style.color = "#2f4054";
  this.style.color = "#2f4054";
};
b1.onmouseleave = function () {
  this.children[0].style.color = "#A0A0A0";
  this.style.color = "#A0A0A0";
};
var b2 = document.getElementById("b2");
b2.onmouseover = function () {
  this.style.color = "#2f4054";
};
b2.onmouseleave = function () {
  this.style.color = "#A0A0A0";
};
var b3 = document.getElementById("b3");
b3.onmouseover = function () {
  this.style.color = "#2f4054";
};
b3.onmouseleave = function () {
  this.style.color = "#A0A0A0";
};
var b4 = document.getElementById("b4");
b4.onmouseover = function () {
  this.style.color = "#2f4054";
};
b4.onmouseleave = function () {
  this.style.color = "#A0A0A0";
};
