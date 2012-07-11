<?php include 'header.php' ?>
<div id='container'>
  <div id='ads-summary'>

    <div id='account-summary'>
      <span>Ad Accounts</span>

      <div class='info' id='account_count'></div>

      <table id='accounts' class='table big-table'>
        <thead>
          <tr><th>Ad Account ID</th><th>Name</th><th>Currency</th><th>Timezone</th></tr>
        </thead>
        <tbody class='tbody'></tbody>
      </table>
    </div>

    <div id='adgroups-summary'>
      <span>Sponsored Stories and Ads</span>

      <div class='progress' id='progress3'>
        <img src='images/ajax-loader.gif' />
      </div>

      <div class='info' id='ss_count'></div>

      <table id='ads' class='table big-table'>
        <thead>
          <tr><th>AdGroup ID</th><th>Name</th><th>Status</th><th>Campaign ID</th><th>Creative ID</th></tr>
        </thead>
        <tbody class='tbody'>
        </tbody>
      </table>
    </div>

  </div>

  <div class='left-div'>

    <div id='pages-summary'>
      <span>Pages and Places</span>

      <div class='progress' id='progress1'>
        <img src='images/ajax-loader.gif' />
      </div>
      <div class="info" id='page_count'></div>

      <table id='pages' class='table mid-table'>
        <thead>
          <tr><th>Name</th><th>Type</th><th>Fans</th><th>PTAT</th></tr>
        </thead>
        <tbody class='tbody'>
        </tbody>
      </table>
    </div>

    <div id='app-summary'>
      <span>Apps</span>

      <div class='progress' id='progress2'>
        <img src='images/ajax-loader.gif' />
      </div>
      <div class="info" id='app_count'></div>

      <table id='apps' class='table mid-table'>
        <thead>
          <tr><th>Name</th><th>Daily Active Users</th><th>Weekly Active Users</th><th>Monthly Active Users</th></tr>
        </thead>
        <tbody class='tbody'>
        </tbody>
      </table>
    </div>
  </div>


  <div class='operations'>

  <div>
    Ads API Operations
  </div>

  <div id='actions'>
    <div>
      <button id='b_create_ad'>Create an Ad</button>
    </div>
    <div>
      <button id='b_edit_ad'>Edit an Ad</button>
    </div>
    <div>
       <button id='b_stats'>Read Stats</button>
    </div>
    <div>
      <button id='b_crv'>Read CRV Stats</button>
    </div>
    <div>
      <button id='b_reach'>Read Reach Estimates</button>
    </div>
    <div>
      <button id='b_action'>Action Spec Estimates</button>
    </div>
    <div>
      <button id='b_preview'>Sponsored Stories Preview</button>
    </div>
  </div>

  </div>
</div>

<?php include 'ad-form.php' ?>
<?php include 'ad-edit-form.php' ?>
<?php include 'ad-stats-form.php' ?>
<?php include 'ad-crv-form.php' ?>
<?php include 'reach-estimate-form.php' ?>
<?php include 'ss-preview.php' ?>
<?php include 'action-estimate-form.php' ?>


<?php include 'footer.php' ?>
