var CELL_HEIGHT = 18;
var monarchs = [];
var monarchs_url = "http://baroque.bpulse.co.uk/index.php?title=Special:Ask/format%3Djson/link%3Dall/sort%3DAscended/order%3DASC/headers%3Dshow/searchlabel%3DJSON/class%3Dsortable-20wikitable-20smwtable/offset%3D/limit%3D50/-5B-5BCategory:English-20Monarchs-5D-5D/-3FAscended/-3FDescended/mainlabel%3D/prettyprint%3Dtrue/unescape%3Dtrue";

$(document).ready(function() {
  renderDateLabels();
});

function renderDateLabels() {
  for (var year = 1620; year < 1720; year++) {
    var year_block = $("<div class='year_block' id='y" + year + "'>");
    var year_label = $("<div class='year_label'>").text(year);
    year_label.click(function (a) { yearClick(a); });
    var month_list = $("<div class='month_list'>");
    month_list.append($("<div id='y" + year + "m1'>January</div>"));
    month_list.append($("<div id='y" + year + "m2'>February</div>"));
    month_list.append($("<div id='y" + year + "m3'>March</div>"));
    month_list.append($("<div id='y" + year + "m4'>April</div>"));
    month_list.append($("<div id='y" + year + "m5'>May</div>"));
    month_list.append($("<div id='y" + year + "m6'>June</div>"));
    month_list.append($("<div id='y" + year + "m7'>July</div>"));
    month_list.append($("<div id='y" + year + "m8'>August</div>"));
    month_list.append($("<div id='y" + year + "m9'>September</div>"));
    month_list.append($("<div id='y" + year + "m10'>October</div>"));
    month_list.append($("<div id='y" + year + "m11'>November</div>"));
    month_list.append($("<div id='y" + year + "m12'>December</div>"));

    year_block.append(year_label);
    year_block.append(month_list);

    $("#timeline").append(year_block);
  }

  getMonarchData();
}

function getMonarchData() {
  $.getJSON(monarchs_url, function(data) {
    for (var i in data.results) {
      var obj = data.results[i];
      if (obj.printouts.Ascended[0] && obj.printouts.Descended[0]) {
        monarchs[obj.fulltext] = {
          Ascended: new Date(parseInt(obj.printouts.Ascended[0].timestamp, 10) * 1000),
          Descended: new Date(parseInt(obj.printouts.Descended[0].timestamp, 10) * 1000)
        };
      }
    }
    renderMonarchRanges();
  });
}

function renderMonarchRanges() {
  $(".monarch_div").remove();
  var left = 150;
  for (var i in monarchs) {
    var ascended_year = monarchs[i].Ascended.getFullYear();
    var ascended_month = monarchs[i].Ascended.getMonth() + 1;
    var startPosition = getMonthTopPosition(ascended_year, ascended_month);

    var descended_year = monarchs[i].Descended.getFullYear();
    var descended_month = monarchs[i].Descended.getMonth() + 1;
    var endPosition = getMonthTopPosition(descended_year, descended_month) + CELL_HEIGHT;

    var monarch_div = $("<div>").text(i);
    monarch_div.css('top', startPosition);
    monarch_div.css('height', endPosition - startPosition);
    monarch_div.css('left', left);
    monarch_div.addClass('monarch_div');
    $("#timeline").append(monarch_div);
    left += 50;
  }
}

function yearClick(yearLabel) {
  $(yearLabel.target).siblings(".month_list").toggle();
  renderMonarchRanges();
}

function getMonthTopPosition(year, month) {
  if ($("#y" + year + "m" + month).is(":visible")) {
    return $("#y" + year + "m" + month).position().top;
  }
  else {
    return $("#y" + year).position().top;
  }
}