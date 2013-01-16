<div id='ad-edit-dialog' style="display:none">
  <table class='table mini-table'>
    <tr>
      <td>Adgroup ID*</td>
      <td><input id='adgroup' name='adgroup'></td>
    </tr>
    <tr>
      <td>Name*</td>
      <td><input id='name' class='form_input' name='name'></td>
    </tr>
    <tr>
      <td>Bid Type*</td>
      <td>
        <div>
          <input id='bid_type' class='form_input' name='bid_type'>
        </div>
        <div>
          1 (CPC), 2 (CPM), 6 (relative oCPM), 7 (absolute oCPM)
        </div>
      </td>
    </tr>
    <tr>
      <td>Bid Info</td>
      <td>
        <div>
          <input id='bid_info' class='form_input' name="bid_info">
        </div>
        <div>
          e.g., {"1":20,"30":10,"44":20,"55":50"}
        </div>
      </td>
    </tr>
    <tr>
      <td>Max Bid*</td>
      <td><input id='max_bid' class='form_input' name='max_bid'></td>
    </tr>
    <tr>
      <td>Targeting*</td>
      <td>
        <div>
          <textarea id='targeting' class='form_input' name='targeting'></textarea>
        </div>
        <div>
          e.g., {"countries":["US"]}
        </div>
      </td>
    </tr>
    <tr>
      <td>Creative*</td>
      <td>
        <div>
          <textarea id='creative' class='form_input' name='creative'></textarea>
        </div>
        <div>
          e.g., {"type":25, "action_spec":{"action.type":"like", "object":"http://myfbse.com/smp"}}
        </div>
      </td>
    </tr>
    <tr>
      <td>Conversion Spec</td>
      <td>
        <div>
          <textarea id='conversion_specs' class='form_input' name='conversion_specs'></textarea>
        </div>
        <div>
          e.g., {"action.type":"like", "page":PAGE_ID}
        </div>
      </td>
    </tr>
    <tr>
      <td>cURL Request</td>
      <td><code><pre><textarea class='area-tall' id='request' readonly='true'></textarea></pre></code></td>
    </tr>
    <tr>
      <td>
        <button id='b_call_ad_api_edit'>Go!</button>
      </td>
      <td>
        <div class='progress' id='progress-ad-edit'>
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
