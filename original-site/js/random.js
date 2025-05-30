// // 動きのきっかけの起点となるアニメーションの名前を定義
// function moveAnimation(){
//     //スクロールしたらランダムに出現	
//     var randomElm2 = $(".randomScroll");//親要素取得
//     var randomElm2Child = $(randomElm2).children();	//親の子要素を取得
//     randomScrollAnime();
//     function randomScrollAnime(){
//         var elemPos = $(".randomScroll").offset().top-50;//要素より、50px上まで来たら
//         var scroll = $(window).scrollTop();
//         var windowHeight = $(window).height();
//         if (scroll >= elemPos - windowHeight){
//             if(randomElm2Child.length >0 ){ //配列数以上であれば処理をおこなう
//                 var rnd = Math.floor(Math.random() * randomElm2Child.length);//配列数から表示する数値をランダムで取得
//                 var moveData ="fadeUp";//アニメーション名＝CSSのクラス名を指定
//                 if(animeFlag){//スクロールする度に動作するのでアニメーションが終わるまで処理をさせないようにする
//                     animeFlag = false;//アニメーション処理が終わるまで一時的にfalseにする
//                     $(randomElm2Child[rnd]).addClass(moveData);//アニメーションのクラスを追加
//                     setTimeout(function(){
//                         animeFlag = true;//次の処理をおこなうためにtrueに変更
//                         randomScrollAnime();//自身の処理を繰り返す
//                     },500);	//0.5秒間隔で。※ランダムのスピード調整はこの数字を変更させる
//                     randomElm2Child.splice(rnd,1);//アニメーション追加となった要素を配列から削除
//                 }
//             }
//         }else{
//             animeFlag = true;
//         }
        
//     }
// }
    
// var animeFlag = true;//スクロールする度に動作するのでアニメーションが終わるまで処理をさせないようにするための定義
    
// // 画面をスクロールをしたら動かしたい場合の記述
//     $(window).scroll(function (){
//         moveAnimation();/* アニメーション用の関数を呼ぶ*/
//     });// ここまで画面をスクロールをしたら動かしたい場合の記述

// // 画面が読み込まれたらすぐに動かしたい場合の記述
//     $(window).on('load', function(){
//         moveAnimation();/* アニメーション用の関数を呼ぶ*/
//     });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

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
                showRandomOneByOne(children, 500); // 0.3秒ごとに表示
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