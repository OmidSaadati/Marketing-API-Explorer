<div id='preview-dialog' style="display:none">
  <table class='table mini-table'>
    <tr>
      <td>Account ID*</td>
      <td>
       <div>
        <input id='account_id'  name='account_id'>
       </div>
      </td>
    </tr>
    <tr>
      <td>
      <div>
      Creative spec
      </div>
       <div>
         e.g., act_123456<br>
         Either specify a creative spec <br>
         OR<br>
         specify an ad group or ad creative ID
       </div>
      </td>
      <td>
        <div>
          <textarea id='creative' class='form_input' name='creative'></textarea>
        </div>
        <div>
          e.g., {"type":25,"action_spec":{"action.type":"like","object.domain":"http://www.myfbse.com"}}
        </div>
      </td>
    </tr>
    <tr>
      <td>AdGroup <br>(AdCreative) ID*</td>
      <td>
          <input id='adgroup_id'  name='adgroup_id'>
      </td>
    </tr>
    <tr>
      <td>
        <button id='b_call_ad_api_preview'>Go!</button>
      </td>
      <td>
        <div class='progress' id='progress-preview'>
          <img src='images/ajax-loader.gif' />
        </div>
      </td>
    </tr>
    <tr>
      <td>cURL Request</td>
      <td><textarea class='area-tall' id='request' readonly='true'></textarea></td>
    </tr>
    <tr>
      <td>Response</td>
      <td><textarea class='area-tall' id='response' readonly='true'></textarea></td>
    </tr>
    <tr>
      <td>Preview</td>
      <td>
        <div id='unit-preview'/>
      </td>
    </tr>
  </table>
</div>
