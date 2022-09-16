import cronjob from 'node-cron';


cronjob.schedule("*/3 * * * * *", function() {
  // add service to verify pix payments
});