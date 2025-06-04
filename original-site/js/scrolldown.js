$(window).on("scroll", function () {
  const scrollY = $(this).scrollTop();
  const triggerHeight = 800; // 表示が切り替わる高さ

  const $textSpan = $(".right-deco a span");

  if (scrollY > triggerHeight) {
    $textSpan.text("TOPへ").removeClass("scroll-animate"); // 切り替わった後のテキスト
  } else {
    $textSpan.text("Scroll").addClass("scroll-animate"); // 切り替わる前のテキスト
  }
});