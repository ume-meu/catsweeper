(function() {
  var SELECTOR_BUTTON_NEWGAME = '.button-newgame';
  var SELECTOR_BUTTON_CONTINUE = '.button-continue';
  var SELECTOR_BUTTON_LEADERBOARD = '.button-leaderboard';

  var timelineIntroScreen;

  function buildTimelines() {
    timelineIntroScreen = new TimelineMax({
      paused: false
    });

    timelineIntroScreen.staggerFrom('.screen-intro .button', 2, {
      css: {
        scale: 0
      },
      autoAlpha: 0,
      ease: Elastic.easeOut
    }, .1);
  }

  function playIntroButtons() {
    timelineIntroScreen.restart();
  }

  function reverseIntroButtons() {
    timelineIntroScreen.reverse();
  }

  function fadeToScreen(targetScreenClassName) {
    var _nameScreen;

    if (!targetScreenClassName) {
      _nameScreen = 'screen-intro';
    }

    _nameScreen = targetScreenClassName;

    var $elementTarget = $('.' + _nameScreen);
    var $elementActiveScreen = $('.active-screen');
    
    console.log('$elementTarget: ', $elementTarget);
    console.log('targetScreenClassName: ', targetScreenClassName);
    console.log('$elementActiveScreen: ', $elementActiveScreen);    
    
    return TweenMax.to($elementActiveScreen, .4, {
      autoAlpha: 0,
      y: '+=10',
      onComplete: function() {
        console.log('onComplete: ', $elementTarget);
        
        $elementActiveScreen.removeClass('active-screen');
        
        TweenMax
        .to($elementTarget, .4, {
          y: '-=10',
          autoAlpha: 1,
          className: '+=active-screen'
        });
      }
    });

  }

  // Initialize
  $(document).ready(buildTimelines);

  // Bindings
  $(document).on('click', SELECTOR_REPLAY_INTRO_BUTTONS, function(event) {
    event.preventDefault();

    if (!$('.screen-intro').hasClass('active-screen')) {
      return;
    }

    playIntroButtons();
  });

  $(document).on('click', SELECTOR_BUTTON_NEWGAME, function(event) {
    event.preventDefault();
    reverseIntroButtons();

    timelineIntroScreen.eventCallback('onReverseComplete', function() {
      fadeToScreen('screen-game');
    });
  });

  $(document).on('click', SELECTOR_BUTTON_GAME_MENU, function(event) {
    event.preventDefault();
    var tween = fadeToScreen('screen-intro');
    tween.eventCallback('onComplete', function() {
      playIntroButtons();
    });
  });
})();