window.fbAsyncInit = function () {
  FB.init({
    appId: '6350929420',
    channelUrl: 'https://www.myfbse.com/smp/channel.html',
    status: true,
    cookie: true,
    oauth: true,
    xfbml: true
  });

  // additional code.
  FB.XFBML.parse();

  // add event handlers
  smp.setupPage();

  // if you are logged out this is not called as you refresh the page!
  FB.Event.subscribe('auth.statusChange',
    function(response) {
      if(response.authResponse) {
        smp.handleLoginResponse(response);
      } else {
        smp.handleLogoutResponse(response);
      }
    }
  );
};

var smp = new Object();
// init event handlers
smp.setupPage = function (){
   $('#b_login').click(this.login);
   $('#b_redownload').click(this.redownload);
   $('#b_logout').click(this.logout);
   $('#b_create_ad').click(this.createAd);
   $('#b_edit_ad').click(this.generateEdit);
   $('#b_stats').click(this.generateStats);
   $('#b_crv').click(this.generateCrv);
   $('#b_reach').click(this.generateReach);
   $('#b_preview').click(this.generatePreview);
   $('#b_action').click(this.generateAction);
   $('#b_call_ad_api').click(this.callAdApi);
   $('#b_call_ad_api_edit').click(this.callAdApiEdit);
   $('#b_call_ad_api_stats').click(this.callAdApiStats);
   $('#b_call_ad_api_crv').click(this.callAdApiCrv);
   $('#b_call_ad_api_reach').click(this.callAdApiReach);
   $('#b_call_ad_api_action').click(this.callAdApiAction);
   $('#b_call_ad_api_preview').click(this.callAdApiPreview);
   $('#account_id').change(this.populateCampaigns);
   $('#campaign_id').change(smp.updateCreateForm);
   $('#ad-dialog .form_input').keyup(smp.updateCreateForm);
   $('#ad-edit-dialog .form_input').keyup(this.updateEditRequest);
   $('#ad-stats-dialog .form_input').keyup(this.updateStatsRequest);
   $('#ad-crv-dialog .form_input').keyup(this.updateCrvRequest);
   $('#reach-dialog .form_input').keyup(this.updateReachRequest);
   $('#action-dialog .form_input').keyup(this.updateActionRequest);
   $('#preview-dialog .form_input').keyup(this.updatePreviewRequest);
   $('logout').addClass('hidden');
   $('.content').addClass('hidden');
}

// LOGOUT
smp.logout = function (){
  FB.logout(function (response) {
  });
};

// LOGIN
smp.login = function (){
  FB.login(function (response) {
  }, {scope: 'read_insights,manage_pages,ads_management'}
  );
};

smp.redownload= function(){
  // clear cache
  localStorage.clear();
  smp.initPage();
}

smp.callAdApiCrv = function() {
  smp.callAdApiStatsBase('#ad-crv-dialog');
}

smp.callAdApiStats = function() {
  smp.callAdApiStatsBase('#ad-stats-dialog');
}

smp.callAdApiStatsBase = function(selector) {
  $(selector + ' #response').val('');
  $(selector + ' #progress-indicator').show();
  
  var entity = $(selector + ' #entity_id').val();
  var connection = $(selector + ' #connection').val();

  FB.api(entity + '/' + connection,
      'get',
      smp.requestObject,
      function(response){
        $(selector + ' #response').val(JSON.stringify(response));
        $(selector + ' #progress-indicator').hide();
        }
      );
}

smp.callAdApiReach = function() {
  $('#reach-dialog #response').val('');

  var adobject_id = $('#reach-dialog #adgroup_id').val();
  var params = {};
  if(!adobject_id) {
    adobject_id = $('#reach-dialog #account_id').val();
    if(adobject_id && adobject_id.indexOf('act_') != 0){
      alert('Account ID must start with act_');
      return;
    }
    params = smp.requestObject;
  }
  $('#progress-reach').show();

  FB.api(adobject_id + '/reachestimate',
      'get',
      params,
      function(response) {
        $('#reach-dialog #response').val(JSON.stringify(response));
        $('#progress-reach').hide();
      });
}

smp.callAdApiPreview = function() {
  $('#preview-dialog #response').val('');

  var account_id = $('#preview-dialog #account_id').val();
  if(account_id && account_id.indexOf('act_') != 0) {
      alert('Account ID must start with act_');
      return;
  }

  var connection = '';
  var adgroup_id = $('#preview-dialog #adgroup_id').val();
  if(!adgroup_id) {
    connection = account_id + '/generatepreviews';
  } else {
    connection = adgroup_id + '/previews';
  }

  params = smp.requestObject;

  $('#progress-preview').show();

  // fetch css
  FB.api(account_id + '/adpreviewscss',
      'get',
      {},
      function(response) {
        if(response && response.result) {
          $('head').html(
            $('head').html() + '<style type="text/css">' + response.result + '</style>');

        // fetch ad unit preview
        FB.api(connection,
         'get',
         params,
         function (response1) {
           $('#progress-preview').hide();
           if(response1.data && response1.data[0].body) {
             $('#preview-dialog #response').val(response1.data[0].body);
             $('#unit-preview').html(response1.data[0].body);
           } else {
             $('#preview-dialog #response').val(JSON.stringify(response1));
           }
         });
        } else {
           $('#progress-preview').hide();
        }
      });
}

smp.callAdApiAction = function() {
  $('#action-dialog #response').val('');

  var account_id = $('#action-dialog #account_id').val();
  if(account_id && account_id.indexOf('act_') !=  0) {
      alert('Account ID must start with act_');
      return;
  }

  params = smp.requestObject;
  $('#progress-action').show();

  FB.api(account_id + '/actionestimate',
      'get',
      params,
      function (response) {
        $('#action-dialog #response').val(JSON.stringify(response));
        $('#progress-action').hide();
      });
}

smp.callAdApiEdit = function() {
  $('#ad-edit-dialog #resposne').val('');
  $('#progress-ad-edit').show();

  var adgroup_id = $('#adgroup').val();
  FB.api(adgroup_id + "",
      'post',
      smp.requestObject,
      function(response) {
        $('#ad-edit-dialog #response').val(JSON.stringify(response));
        $('#progress-ad-edit').hide();
        if(response && !response.error) {
          var adgroup = response.data.adgroups[adgroup_id];
          var name = adgroup.name;
          var adgroup_status = adgroup.adgroup_status;
          $('#' + response.id + ' td:eq(2)').text(name);
          $('#' + response.id + ' td:eq(3)').text(smp.displayStatus(adgroup_status));
        }
      });
}

smp.callAdApi = function() {
  $('#ad-dialog #response').val('');
  $('#progress-ad-create').show();

  FB.api($('#ad-dialog #account_id').val() + "/adgroups",
      'post',
      smp.requestObject,
      function(response) {
        $('#ad-dialog #response').val(JSON.stringify(response));
        $('#progress-ad-create').hide();
        if(response && !response.error) {
          var adgroup= response.data.adgroups[response.id];
          var adgroup_id = adgroup.adgroup_id;
          var adgroup_status = adgroup.adgroup_status;
          var campaign_id = adgroup.campaign_id;
          var creative_id = adgroup.creative_ids[0];
          var name = adgroup.name;
          var stats_html = ('<tr><td>' + adgroup_id + '</td>'
            + '<td>' + name + '</td>' 
            + '<td>' + smp.displayStatus(adgroup_status) + '</td>'
            + '<td>' + campaign_id + '</td>'
            + '<td>' + creative_id + '</td></tr>');
          $(stats_html).prependTo('#ads');
        }
      });
}

smp.updateCrvRequest = function() {
  smp.updateRequest(
      '#ad-crv-dialog',
      function(obj){},
      function() {
        if($('#ad-crv-dialog #entity_id').val()){
          return (
            $('#ad-crv-dialog #entity_id').val()
            + '/' + $('#ad-crv-dialog #connection').val()
            );
        } else {
          return '';
        }
      },
      'get'
      );

}

smp.updateStatsRequest = function() {
  smp.updateRequest(
      '#ad-stats-dialog',
      function(obj){},
      function(){
      if($('#ad-stats-dialog #entity_id').val()){
        return (
          $('#ad-stats-dialog #entity_id').val()
          + '/' + $('#ad-stats-dialog #connection').val()
          );
        } else {
        return '';
        }
      },
     'get' 
    );
}

smp.updatePreviewRequest  = function() {
  smp.updateRequest(
      '#preview-dialog',
      function(obj) {},
      function() {
        if($('#preview-dialog #account_id').val()) {
          return (
            $('#preview-dialog #account_id').val() 
            + '/generatepreviews'
            );
        } else {
          return (
          $('#preview-dialog #adgroup_id').val()
          + '/previews'
          );
        }
      },
      'get'
      );
}

smp.updateActionRequest = function() {
  smp.updateRequest(
      '#action-dialog',
      function(obj) {},
      function() {
        if($('#action-dialog #account_id').val()) {
         return (
           $('#action-dialog #account_id').val()
           + '/actionestimate'
           );
         } else {
         return '';
         }
       },
       'get'
     );
}

smp.updateReachRequest = function() {
  smp.updateRequest(
      '#reach-dialog',
      function(obj){
        if($('#reach-dialog #adgroup_id').val()) {
          delete obj['currency']; 
          delete obj['targeting_spec'];
        }
      },
      function(){
       if($('#reach-dialog #adgroup_id').val()) {
       return (
         $('#reach-dialog #adgroup_id').val()
         + '/reachestimate'
         );
       } else if($('#reach-dialog #account_id').val()) {
         return (
           $('#reach-dialog #account_id').val()
           + '/reachestimate'
           );
       } else {
         return '';
       }
      },
      'get'
    );
}

smp.updateEditRequest = function() {
  smp.updateRequest(
      '#ad-edit-dialog',
      function(obj){
        obj['redownload'] = '1';
        },
      function(){
        return ($('#adgroup').val());
      } 
    );
}

smp.updateCreateForm = function() {
  smp.updateRequest(
      '#ad-dialog',
      function(obj){
        obj['campaign_id'] = $('#campaign_id').val();
        obj['redownload'] = '1';
        },
      function(){
        return ($('#ad-dialog #account_id').val() + '/adgroups');
      } 
    );
}

smp.updateRequest = function(selector, setExtra, getURI, method) {

  smp.requestObject = new Object();

  $(selector + ' .form_input').each(function(index, element) {
      if($(element).val())
        smp.requestObject[$(element).attr('id')] = $(element).val();
  });

  setExtra(smp.requestObject);

  var curl_param = "";
  if(method == 'get') {
    var count = 0;
    for(var param in smp.requestObject) {
      if(count == 0)
        curl_param += param + "=" + smp.requestObject[param]; 
      else
        curl_param += "&" + param + "=" + smp.requestObject[param]; 
      count++;
    }
  } else{
    for(var param in smp.requestObject) {
      curl_param += "-F '" + param + "=" + smp.requestObject[param] + "' ";
    }
  }

  if(method == 'get'){
    curl_param = "curl -G -d '" + curl_param 
      + (curl_param? "&" : "") + "access_token=" + smp.accessToken  + "' "
      + "'https://graph.facebook.com/" + getURI() + "'";
  } else{
    curl_param = "curl " + curl_param
      + "'https://graph.facebook.com/" + getURI()
      + "?access_token=" + smp.accessToken + "'";
  }

  $(selector + ' #request').text(curl_param);
}

smp.populateCampaigns = function() {
  $('#ad-dialog #campaign_id').children().remove();
  var account_id = $('#ad-dialog #account_id').val();
  var campaigns = JSON.parse(localStorage.getItem('adCampaigns'))[account_id];
  $.each(campaigns, function() {
      $('#ad-dialog #campaign_id').append($('<option>', {value: this.campaign_id}).text(this.campaign_id));
    });
  if(campaigns.length < 1) {
      $('#ad-dialog #campaign_id').append($('<option>', {value: ''}).text('Account has no campaign'));
  }
  smp.updateCreateForm();
}

smp.generateDialog = function(selector) {
  return function(event, ui){
    $(selector + ' #response').val('');
    $(selector + ' #name').val('testAd');
    $(selector + ' #bid_type').val('1');
    $(selector + ' #max_bid').val('100');
    $(selector + ' #bid_info').val('');
    $(selector + ' #conversion_specs').val('');
    $(selector + ' #targeting').val('{"countries":["US"]}');
    $(selector + ' #creative').val('{"type":25,"action_spec":{"action.type":"like","object":"http://myfbse.com/smp"}}');

    $(selector + ' .form_input').keyup();
  };
}


smp.generateEditDialog = function() {
  return function(event, ui) {
    $('#ad-edit-dialog #adgroup').keyup(smp.updateEditRequest);
    smp.generateDialog('#ad-edit-dialog')(event, ui);
  }
}

smp.generateStatsBase = function(selector) {
  return function(event, ui) {
    $(selector + ' #entity_id').val('');
    $(selector + ' #start_time').val('');
    $(selector + ' #end_time').val('');
    $(selector + ' #campaign_ids').val('');
    $(selector + ' #adgroup_ids').val('');
    $(selector + ' #include_deleted').val('');
    $(selector + ' #stats_mode').val('');
    $(selector + ' #response').val('');

    $(selector + ' .form_input').keyup();
  };
}

smp.generateStatsDialog = function() {
  return function(event, ui) {
    $('#ad-stats-dialog #entity_id').keyup(smp.updateStatsRequest);
    $('#ad-stats-dialog #connection').keyup(smp.updateStatsRequest);
    $('#ad-stats-dialog #connection').val('stats');
    smp.generateStatsBase('#ad-stats-dialog')(event, ui);
  }
}

smp.generateCrvDialog = function() {
  return function(event, ui) {
    $('#ad-crv-dialog #entity_id').keyup(smp.updateCrvRequest);
    $('#ad-crv-dialog #connection').keyup(smp.updateCrvRequest);
    $('#ad-crv-dialog #connection').val('conversions');
    $('#ad-crv-dialog #aggregate_days').val('');
    $('#ad-crv-dialog #by_impression_time').val('');
    smp.generateStatsBase('#ad-crv-dialog')(event, ui);

  }
}

smp.generateCreateDialog = function() {
  return function(event, ui){
         smp.generateDialog('#ad-dialog')(event, ui);
         $('#ad-dialog #account_id').change();
  }
}

smp.generatePreviewDialog = function(event, ui) {
  $('#preview-dialog #response').val('');
  $('#preview-dialog #account_id').val('');
  $('#preview-dialog #creative').val('{"type":25,"action_spec":{"action.type":"like","object.domain":"http://www.myfbse.com"}}');
  $('#preview-dialog #adgroup_id').val('');
  $('#preview-dialog #account_id').keyup(smp.updatePreviewRequest);
  $('#preview-dialog #adgroup_id').keyup(smp.updatePreviewRequest);
  $('#preview-dialog #adgroup_id').keyup();
}

smp.generateReachDialog = function(event, ui) {
  $('#reach-dialog #response').val('');
  $('#reach-dialog #account_id').val('');
  $('#reach-dialog #adgroup_id').val('');
  $('#reach-dialog #currency').val('USD');
  $('#reach-dialog #targeting_spec').val('{"countries":["US"]}');
  $('#reach-dialog #account_id').keyup(smp.updateReachRequest);
  $('#reach-dialog #adgroup_id').keyup(smp.updateReachRequest);
  $('#reach-dialog #targeting_spec').keyup();
}

smp.generateActionDialog = function(event, ui) {
  $('action-dialog #response').val('');
  $('#action-dialog #account_id').val('');
  $('#action-dialog #action_spec').val('{"action.type":"like","object.domain":"http://www.myfbse.com"}');
  $('#action-dialog #account_id').keyup(smp.updateActionRequest);
  $('#action-dialog #action_spec').keyup();
}

smp.generateStats = function() {
  var initDialog = smp.generateStatsDialog();
  $('#ad-stats-dialog').dialog(
      {modal:true,
       title: 'Ad Stats',
       width: 550,
       open: initDialog
      }
   );
  return false;
}

smp.generateCrv = function() {
  var initDialog = smp.generateCrvDialog();
  $('#ad-crv-dialog').dialog(
      {modal:true,
       title: 'Ad Conversions',
       width: 550,
       open: initDialog
      }
  );
  return false;
}

smp.generatePreview = function() {
  $('#preview-dialog').dialog(
      {modal:true,
      title:'Sponsored Stories Preview',
      width: 550,
      open: smp.generatePreviewDialog
  });
}

smp.generateReach = function() {
  $('#reach-dialog').dialog(
      {modal:true,
       title:'Reach Estimates',
       width: 550,
       open: smp.generateReachDialog
     }
  );
}

smp.generateAction = function() {
  $('#action-dialog').dialog(
      {modal:true,
       title:'Action Estimates',
       width: 550,
       open: smp.generateActionDialog
   });
}

smp.generateEdit = function(){
   var initDialog = smp.generateEditDialog();
    $('#ad-edit-dialog').dialog(
        {modal:true,
         title: 'Edit an AdGroup',
         width: 550,
         open: initDialog
         }
        );
    return false;
}


smp.createAd = function(){
  // only open if localStorage is initialized
  var adCampaignString = localStorage.getItem('adCampaigns');
  if(adCampaignString) {
    var initDialog = smp.generateCreateDialog();
    $('#ad-dialog').dialog(
      {modal: true,
       title: 'Create an Ad',
       width: 550,
       open: initDialog
     });
  }
  return false;
}

smp.handleLogoutResponse = function(response) {
  $('#logout').addClass('hidden');
  $('.content').addClass('hidden');
  $('#login').removeClass('hidden');
  $('#redownload').addClass('hidden');
}

smp.handleLoginResponse = function(response) {
  $('#logout').removeClass('hidden');
  $('.content').removeClass('hidden');
  $('#login').addClass('hidden');
  $('#redownload').removeClass('hidden');
  smp.accessToken=response.authResponse.accessToken;
  smp.initPage();
}

smp.initObjects = function() {
  var accounts = JSON.parse(localStorage.getItem('accounts'));
  var page_html = '';
  var app_html = '';
  var size = accounts.length;
  var pages_size = 0;
  var apps_size = 0;
  $.each(accounts, function() {
    var name = this.name;
    var category = this.category;
    FB.api(this.id , function(response){
      if(response && !response.error){
        if(category != 'Application' && pages_size < 10){
          // list all pages, along with ther type, fans, and PTAT.
          var fans = response.likes?response.likes : 0;
          var ptat = response.talking_about_count? response.talking_about_count :0;
          page_html += '<tr><td>' + name + '</td><td>' + category + '</td><td class="num">'
          + fans + '</td><td class="num">' + ptat + '</td></tr>';
          pages_size++;
        } else if(apps_size < 10){ 
          // apps 
          var dau = response.daily_active_users? response.daily_active_users : 0;
          var wau = response.weekly_active_users? response.weekly_active_users : 0;
          var mau = response.monthly_active_users? response.monthly_active_users: 0;
          app_html += '<tr><td>' + name + '</td><td class="num">' + dau + '</td><td class="num">' + wau +
            '</td><td class="num">' + mau + '</td></tr>';
            apps_size++;
        }
      } else{
        page_html += '<tr><td>' + name + '</td><td>0</td><td>0</td><td>' + category + '</td></tr>';
      }
      size--;
      if(size == 0) {
        var pages_show_count = (pages_size < 10? pages_size:10);
        var apps_show_count = (apps_size < 10? apps_size:10);
        $(page_html).appendTo('#pages');
        $(app_html).appendTo('#apps');
        $('#progress1').hide();
        $('#progress2').hide();
        $('#app_count').html('showing ' + apps_show_count + ' out of ' + apps_size + ' apps');
        $('#page_count').html('showing ' + pages_show_count + ' out of ' + pages_size + ' pages');
      }
    });
  });
}


smp.displayStatus = function(){

  var status = new Object();
  status[1] = 'Active';
  status[3] = 'Deleted';
  status[4] = 'Pending Review';
  status[5] = 'Disapproved';
  status[8] = 'Campaign Paused';
  status[7] = 'Pending Billing Info';
  status[9] = 'AdGroup Paused';
  status[10] = 'Draft';
  return function(status_id) {
    if(status[status_id])
      return status[status_id];
    return status_id;
  }

}();

smp.initAdGroups = function() {
  var adAccounts = JSON.parse(localStorage.getItem('adAccounts'));
  var adAccountDropdown = $('#account_id');

  adAccountDropdown.children().remove();
  var displayedCount = 0;
  var totalCount = 0;
  var adaccounts_html = '';
  $.each(adAccounts, function(){
    //init account drop down
    adAccountDropdown.append($('<option>', {value: this.id}).text(this.id));

    adaccounts_html += ('<tr><td>' + this.id + '</td>'
      + '<td>' + this.name + '</td>'
      + '<td>' + this.currency + '</td>'
      + '<td>' + this.timezone_name + '</td></tr>'); 

    // build adgroup table
    var stats_html = '';
    FB.api(this.id + '/adgroups', 
      {'limit': 10},
      function(response){
      if(response && !response.error) {
        var adgroups = response.data;
        totalCount += response.count;
        displayedCount += (totalCount < 10? totalCount:10);
        console.log(JSON.stringify(totalCount));

        $.each(adgroups, function(i, e) {
          var adgroup_id = this.adgroup_id;
          var name = this.name;
          var adgroup_status = this.adgroup_status;
          var campaign_id = this.campaign_id;
          var creative_id = this.creative_ids[0];
          stats_html += ('<tr><td class="num">' + adgroup_id + '</td>'
            + '<td>' + name + '</td>'
            + '<td>' + smp.displayStatus(adgroup_status) + '</td>'
            + '<td>' + campaign_id + '</td>'
            + '<td>' + creative_id + '</td></tr>');

        });
        if(stats_html != '') {
          $(stats_html).appendTo('#ads');
          $('#progress3').hide();
          $('#ss_count').text('showing ' + displayedCount + ' out of ' + totalCount + ' ads');
        }
      }
    });
  });
  if(adaccounts_html != '') {
     $(adaccounts_html).appendTo('#accounts');
     $('#account_count').text('showing ' + adAccounts.length + ' Advertising Accounts');
  }
}

smp.initAdCampaigns = function() {
  // get ad campaigns
  var adCampaigns = localStorage.getItem('adCampaigns');
  if(!adCampaigns) {
   var adAccounts  = JSON.parse(localStorage.getItem('adAccounts'));
   var adCampaigns = new Object();
   var size = adAccounts.length;
   $.each(adAccounts, function() {
       var account_id = this.id;
       FB.api(account_id + '/adcampaigns', function(response) {
           if(response && !response.error) {
             adCampaigns[account_id] = response.data;
           }
           size--;
           if(size == 0) {
             localStorage.setItem('adCampaigns', JSON.stringify(adCampaigns));
           }
         });
     });
  } 
}

// PAGE CONTENT LOAD 
smp.initPage = function () {
  // remove table content
  $('.tbody').children().remove();
  // start progress indicators
  $('#progress1').show();
  $('#progress2').show();
  $('#progress3').show();
  // read and show users (pages, apps, places) from local cache.
  var accountsString = localStorage.getItem('accounts');
  if(!accountsString) {
    FB.api('me/accounts', function(response) {
      if(response  && !response.error){
        localStorage.setItem('accounts', JSON.stringify(response.data));
        smp.initObjects();
      }
    });
  } else{
    smp.initObjects();
  }

  // get ad accounts
  var adAccountsString = localStorage.getItem('adAccounts');
  if(!adAccountsString) {
    FB.api('me/adaccounts', function(response) {
      if(response && !response.error) {
        localStorage.setItem('adAccounts', JSON.stringify(response.data));
        smp.initAdGroups();
        smp.initAdCampaigns();
      }
    });
  } else {
    smp.initAdGroups();
    smp.initAdCampaigns();
  }
}

