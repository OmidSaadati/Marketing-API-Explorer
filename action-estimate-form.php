<div id='action-dialog' style="display:none">
  <table class='table mini-table'>
    <tr>
      <td>Account ID*</td>
      <td>
       <div>
        <input id='account_id'  name='account_id'>
       </div>
       <div>
       e.g., act_123456
       </div>
      </td>
    </tr>
    <tr>
      <td>Acion spec*</td>
      <td>
        <div>
          <textarea id='action_spec' class='form_input' name='action_spec'></textarea>
        </div>
        <div>
          e.g., {"action.type":"like","object.domain":"http://www.myfbse.com"}
        </div>
      </td>
    </tr>
    <tr>
      <td>cURL Request</td>
      <td><code><pre><textarea class='area-tall' id='request' readonly='true'></textarea></pre></code></td>
    </tr>
    <tr>
      <td>
        <button id='b_call_ad_api_action'>Go!</button>
      </td>
      <td>
        <div class='progress' id='progress-action'>
          <img src='images/ajax-loader.gif' />
        </div>
      </td>
    </tr>
    <tr>
      <td>Response</td>
      <td><code><pre><textarea class='area-tall' id='response' readonly='true'></textarea></pre></code></td>
    </tr>
  </table>
</div>
