'use strict';

/**
 * Show an $ amount in a specific way
 *
 * Usage:
 *   data-cc-amount-directive="amount" // The amount to pass through
 *   data-cc-amount-directive-color="false" // Default is true, if set to false, we don't add the color class
 *   data-cc-amount-directive-initial-space="false" // Default is true, if set to false, we don't add space before the dollar sign
 */
angular.module('calcentral.directives').directive('ccAmountDirective', [function() {
  var isNumber = function(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  };

  var numberWithCommas = function(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return {
    link: function(scope, element, attr) {
      // Whether to add a color class
      var directiveColor = scope.$eval(attr.ccAmountDirectiveColor);
      // Whether to add initial space
      var initialSpace = scope.$eval(attr.ccAmountDirectiveColor);

      var isColorEnabled = (typeof directiveColor !== 'undefined') ? directiveColor : true;
      var isInitialSpaceEnabled = (typeof initialSpace !== 'undefined') ? initialSpace : true;

      scope.$watch(attr.ccAmountDirective, function ccAmountWatchAction(value) {
        // Only do something when it's a number
        if (!isNumber(value)) {
          element.text('');
          return;
        }

        var text = '';
        if (value >= 0) {
          if (isInitialSpaceEnabled) {
            text += '  ';
          }
          text = '$ ' + numberWithCommas(value);
        } else {
          text = '- $ ' + numberWithCommas(value).replace('-', '');
          if (isColorEnabled) {
            element.addClass('cc-page-myfinances-green');
          }
        }
        text = text.replace(/\s/g, '\u00A0');

        element.text(text);
      });
    }
  };
}]);
