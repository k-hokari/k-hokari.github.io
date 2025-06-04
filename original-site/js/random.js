function moveAnimation(){
    $(".randomScroll").each(function(){ // 各 .randomScroll を処理
        var randomElm = $(this);
        var children = randomElm.children().toArray(); // 子要素を配列で取得
        var elemPos = randomElm.offset().top - 50;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();

        // まだ処理していない要素だけに限定するためのフラグ
        if (!randomElm.hasClass("done")) {
            if (scroll >= elemPos - windowHeight) {
                randomElm.addClass("done"); // 処理済みにする

                // 最初に全て非表示に（opacity: 0）
                $(children).css("opacity", 0);

                // ランダムに1つずつ表示する処理
                showRandomOneByOne(children, 500); 
            }
        }
    });
}

// ランダムに1つずつ表示する関数
function showRandomOneByOne(childrenArray, delay){
    var invisibleChildren = childrenArray.filter(function(child) {
        return $(child).css("opacity") == "0";
    });

    if (invisibleChildren.length === 0) return;

    var rnd = Math.floor(Math.random() * invisibleChildren.length);
    var selected = $(invisibleChildren[rnd]);

    selected.addClass("fadeUp");

    setTimeout(function(){
        showRandomOneByOne(childrenArray, delay); // 次を表示させる
    }, delay);
}

$(window).on("scroll load", function () {
    moveAnimation();
});