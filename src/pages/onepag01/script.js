events.on("ready", function () {
  $("[vw-access-button]").addClass("hide");
  $(".btn-libras").on("click", () => {
    $("[vw-access-button]").trigger("click");
  });
});
