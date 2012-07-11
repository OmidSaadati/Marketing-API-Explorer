<div id='ad-stats-dialog' style="display:none">
  <table class='table mini-table'>
    <tr>
      <td>Adgroup ID, Campaign ID, or Account ID (act_123456)*</td>
      <td><input id='entity_id' name='entity_id'></td>
    </tr>
    <tr>
      <td>Connection*</td>
      <td>
        <div>
          <input id='connection' name='connection'>
        </div>
        <div>
          stats (used with adgroup, campaign, or account ID)<br>
          adcampaignstats (used with account ID)<br> 
          adgroupstats (used with account ID)<br>
          keywordstats (used with adgroup ID)
        </div>
      </td>
    </tr>
    <tr>
      <td>Campaign IDs</td>
      <td>
        <div>
          <textarea id='campaign_ids' class='form_input' name='campaign_ids'></textarea>
        </div>
        <div>
          Array of Campaign IDs (used with adcampaignstats connection)<br>
          e.g., [12345,123123,32452345]
        </div>
      </td>
    </tr>
    <tr>
      <td>Ad Group IDs</td>
      <td>
        <div>
          <textarea id='adgroup_ids' class='form_input' name='adgroup_ids'></textarea>
        </div>
        <div>
          Array of AdGroup IDs (used with adgroupstats connection)<br>
          e.g., [2341234,4563456] 
        </div>
      </td>
    </tr>
    <tr>
      <td>Start Time</td>
      <td>
        <div>
          <input id='start_time' class='form_input' name='start_time'>
        </div>
        <div>
          datetime format, e.g., 2012-05-25 or 2012-05-25T08:12:36
        </div>
      </td>
    </tr>
    <tr>
      <td>End Time</td>
      <td>
        <div>
          <input id='end_time' class='form_input' name="end_time">
        </div>
        <div>
          datetime format, e.g., 2012-05-25 or 2012-05-25T08:12:36
        </div>
      </td>
    </tr>
    <tr>
      <td>Include Deleted?</td>
      <td>
        <div>
          <input id='include_deleted' class='form_input' name='include_deleted'>
        </div>
        <div>
          Set to true if you want stats for deleted campaigns or adgroups 
        </div>
      </td>
    </tr>
    <tr>
      <td>stats_mode</td>
      <td>
        <div>
          <input id='stats_mode' class='form_input' name='stats_mode'>
        </div>
        <div>
          Set to with_delivery if you want Stats for ad groups that have any delivery during start/end time
        </div>
      </td>
    </tr>
    <tr>
      <td>cURL Request</td>
      <td><textarea class='area-tall' id='request' readonly='true'></textarea></td>
    </tr>
    <tr>
      <td>
        <button id='b_call_ad_api_stats'>Go!</button>
      </td>
      <td>
        <div class='progress' id='progress-indicator'>
          <img src='images/ajax-loader.gif' />
        </div>
      </td>
    </tr>
    <tr>
      <td>Response</td>
      <td><textarea class='area-tall' id='response' readonly='true'></textarea></td>
    </tr>
  </table>
</div>
