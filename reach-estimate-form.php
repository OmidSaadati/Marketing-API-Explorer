<div id='reach-dialog' style="display:none">
  <table class='table mini-table'>
    <tr>
      <td>Account ID*</td>
      <td>
       <div>
        <input id='account_id'  name='account_id'>
       </div>
       <div>
       e.g., act_123456<br>
       Either specify an account ID, currency, and targeting spec <br>
       OR<br>
       specify an ad group ID
       </div>
      </td>
    </tr>
    <tr>
      <td>Currency*</td>
      <td><input id='currency'  class='form_input' name='currency'></td>
    </tr>
    <tr>
      <td>Targeting spec*</td>
      <td>
        <div>
          <textarea id='targeting_spec' class='form_input' name='targeting_spec'></textarea>
        </div>
        <div>
          e.g., {"countries":["US"]}
        </div>
      </td>
    </tr>
    <tr>
      <td>AdGroup ID*</td>
      <td>
          <input id='adgroup_id'  name='adgroup_id'>
      </td>
    </tr>
    <tr>
      <td>cURL Request</td>
      <td><code><pre><textarea class='area-tall' id='request' readonly='true'></textarea></pre></code></td>
    </tr>
    <tr>
      <td>
        <button id='b_call_ad_api_reach'>Go!</button>
      </td>
      <td>
        <div class='progress' id='progress-reach'>
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
