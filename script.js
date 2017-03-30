$(document).ready(function() {
  renderDateLabels();
});

function renderDateLabels() {
  for (var year = 1620; year < 1720; year++) {
    var year_block = $("<div class='year_block' id='y" + year + "'>");
    var year_label = $("<div class='year_label'>").text(year);
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
}