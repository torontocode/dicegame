dice.controller('gameCtrl',['$scope', '$timeout', function($scope, $timeout){
  
  $scope.tabled     = [];
  $scope.rolled     = [];
  $scope.rollInProgress = false;
  var scoring = {'1': 50, '6': 100, 'house': 1000, '1s': 150,'2s': 200, '3s': 300, '4s': 400, '5s': 500, '6s': 600 };

  $scope.score = 0;
  function doRoll(numDice){
    return _(numDice).times(function(){
      return {value: _.random(1,6), isTriple: false, isSixOrOne: false};
    });
  }
  function noteSixAndOnes(itm){
    itm.isSixOrOne = itm.value === 1 || itm.value ===6 ? true : false;
  }
  function noteTriples(itm){
    itm.isTriple = this[itm.value] >= 3 ? true : false;
  }
  function updateValues(object, func, context){
    var obj     = _.clone(object),
        ctxt    = context || {};
    _.mapObject(obj, func, ctxt);
    return obj;
  }

  $scope.addToTable = function(die, i){
    console.log('tabled ', die, i, die.isTriple);
    if(die.isTriple){
      $scope.tabled = _.union($scope.tabled, $scope.rolled.splice(_.indexOf($scope.rolled, _.findWhere($scope.rolled, {value:die.value})),3));
      $scope.rollInProgress = false;
      $scope.score += scoring[String(die.value+'s')];
      return;
    }

    $scope.rolled.splice(i,1);
    $scope.tabled.push(die);
    $scope.score += scoring[String(die.value)];
    $scope.rollInProgress = false;
  };
  $scope.roll = function(){
    $scope.rollInProgress = true;
    $scope.rolled = _.sortBy(doRoll($scope.rolled.length||6), 'value');
    $scope.rolled = updateValues(updateValues($scope.rolled, noteTriples, _.countBy($scope.rolled, 'value')), noteSixAndOnes);
  };
}]);