$(function(){
  $(".lightbox").delay(100).fadeIn(500);
  $(".lightbox").html("<h2>Short Term Memory Test</h2>").delay(800).fadeOut();
  var app={
    cards:[1,1,2,2,3,3,4,4,5,5,6,6],
    init: function(){
      app.shuffle();
    },
  shuffle: function(){
      var random=0;
      var temp=0;
      for (i=1; i<app.cards.length; i++){
        random=Math.round(Math.random()*i);
        temp=app.cards[i];
        app.cards[i]=app.cards[random];
        app.cards[random]=temp;
      }
      app.assignedCards();
    },
    assignedCards: function(){
      $(".card").each(function(index){
        $(this).attr("data-card-value",app.cards[index]);
      });
      app.clickHandlers();
    },
    clickHandlers: function(){
      $(".card").on("click",function(){
        $(this).html("<p>" + $(this).data("cardValue") + "</p>").addClass("selected");
        app.checkMatch();
      });
    },
    checkMatch: function(){
      if($(".selected").length == 2 ){
        if($(".selected").first().data("cardValue") == $(".selected").last().data("cardValue")){
          $(".selected").each(function(){
            $(this).animate({opacity:0}).removeClass("unmatched");
          });
          $(".selected").each(function(){
            $(this).removeClass("selected");
          });
          app.checkWin();
        } else {
          setTimeout(function(){
            $(".selected").each(function(){
              $(this).html("").removeClass("selected");
            });
         },500);
        }
      }
    },
    checkWin: function(){
      if($(".unmatched").length===0){
        $(".container").html("<br> <h1 class='mes'> Well Done! </h1><br><br><input type='button' value='Retake' class='buttons' onClick='window.location.reload()'>");
      }
    }
  };
  app.init();
});
