angular.module('deformExamples', ['angularDeforms', 'validator', 'validator.rules'])

.run(['$builder', function($builder) {
    // register new custom component on inputs section
    return $builder.registerComponent('name', {
      group: 'Default',
      label: 'User',
      icon: 'glyphicon glyphicon-user',
      required: false,
      arrayToText: true,
      showcaseTemplate: "<i class='{{icon}}'></i><span>{{label}}</span>",
      template: "<div class='form-group'><label for='{{formName+index}}' class='col-md-4 control-label' ng-class='{'fb-required':required}'>{{label}}</label><div class='col-md-8'><input type='hidden' ng-model='inputText' validator-required='{{required}}' validator-group='{{formName}}'/><div class='col-sm-6' style='padding-left: 0;'><input type='text' ng-model='inputArray[0]' class='form-control' id='{{formName+index}}-0'/><p class='help-block'>First name</p></div><div class='col-sm-6' style='padding-left: 0;'><input type='text' ng-model='inputArray[1]' class='form-control' id='{{formName+index}}-1'/><p class='help-block'>Last name</p></div></div></div>",
      popoverTemplate: "<form><div class='form-group'><label class='control-label'>Label</label><input type='text' ng-model='label' validator='[required]' class='form-control'/></div><div class='checkbox'><label><input type='checkbox' ng-model='required' />Required</label></div><hr/><div class='form-group'><input type='submit' ng-click='duplicate()' class='btn btn-primary' value='Save'/><input type='button' ng-click='cancel()' class='btn btn-default' value='Cancel'/><input type='button' ng-click='remove()' class='btn btn-danger' value='Delete'/></div></form>"
    });
  }
])

.config(['$validatorProvider', function($validatorProvider) {
  // adds custom validaions from point sections
  $validatorProvider.register( 'maxPointsInOption', {
    validator: function(value, scope, element, attrs, $injector) {
      values = scope.$parent.options.map(function(o){return o.value})
      max = Math.max.apply(null, values);
      return max >= 100
    },
    error: "Al menos una opción debe tener el 100% de los puntos"
  });
  // adds custom validaions from point sections
  $validatorProvider.register( 'totalPoints', {
    invoke: 'submit',
    validator: function(value, scope, element, attrs, $injector){
      values = scope.$parent.options.map(function(o){return o.value})
      total = values.reduce(function(memo, num){
        return memo+num
      });
      return total >= 100
    },
    error: "La suma de los porcentajes de las alternativas debe ser a lo menos del 100%"
  });
}])

.controller('DemoController', ['$scope', '$builder', function($scope, $builder) {
    // var checkbox, textbox;
    // textbox = $builder.addFormObject('default', {
    //   id: 'textbox',
    //   component: 'textInput',
    //   label: 'Name',
    //   description: 'Your name',
    //   placeholder: 'Your name',
    //   required: true,
    //   editable: false
    // });
    // checkbox = $builder.addFormObject('default', {
    //   id: 'checkbox',
    //   component: 'checkbox',
    //   label: 'Pets',
    //   description: 'Do you have any pets?',
    //   options: ['Dog', 'Cat']
    // });
    // $builder.addFormObject('default', {
    //   component: 'sampleInput'
    // });
    // $scope.form = $builder.forms['default'];
    // $scope.input = [];
    // $scope.defaultValue = {};
    // $scope.defaultValue[textbox.id] = 'default value';
    // $scope.defaultValue[checkbox.id] = [true, true];

    // $scope.submit = function() {
    //   return $validator.validate($scope, 'default').success(function() {
    //     return console.log('success');
    //   }).error(function() {
    //     return console.log('error');
    //   });
    // };

    $scope.$on($builder.broadcastChannel.selectInput, function() {
      $('a[data-target="#options"]').tab('show')
    });

  }
]);
