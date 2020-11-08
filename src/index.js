var emailsInput = (function () {
  'use strict';

  var EmailsInput = function (args) {
    if (!args.element.constructor.name === 'HTMLInputElement') {
      throw new Error('EmailsInput requires a valid input element supplied.');
    } else {
      this.options = {
        element: args.element,
        classPrefix: args.classPrefix || 'emails-input',
        placeholderText: args.placeholderText || 'add email',
        removeContent: args.removeContent || '&Cross;',
      };
      this.wrapper = createWrapper(this);
      this.input = createInput(this);
      this.emails = [];
      init(this);
    }
  };

  function init(context) {
    context.wrapper.appendChild(context.input);
    context.options.element.setAttribute('hidden', 'true');
    context.options.element.parentNode.insertBefore(context.wrapper, context.options.element);
    initEventListeners(context);
  }

  function initEventListeners(context) {
    context.input.addEventListener('blur', function (event) {
      if (event.target.value) {
        event.preventDefault();
        context.addEmail(event.target.value);
      }
    });

    context.input.addEventListener('paste', function (event) {
      var pastedText = (event.clipboardData || window.clipboardData).getData('text');
      event.preventDefault();
      context.addEmail(pastedText);
    });

    context.input.addEventListener('keydown', function (event) {
      if ((event.target.value && event.keyCode === 188) || event.keyCode === 13) {
        event.preventDefault();
        context.addEmail(event.target.value);
      }
    });

    context.wrapper.addEventListener('click', function () {
      context.input.focus();
    });
  }

  function createWrapper(context) {
    var div = document.createElement('div');
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.overflowY = 'scroll';
    div.setAttribute('class', context.options.classPrefix + '-wrapper');

    return div;
  }

  function createInput(context) {
    var input = document.createElement('input');
    input.setAttribute('class', context.options.classPrefix + '-input');
    input.setAttribute('placeholder', context.options.placeholderText);

    return input;
  }

  function createTag(text, context) {
    var tagClass = context.options.classPrefix + '-tag';
    var invalidTagClass = tagClass + ' ' + tagClass + '-invalid';
    var tagWrapper = document.createElement('div');
    var tag = document.createElement('div');
    var closeButton = document.createElement('span');
    var isValidEmail = validateEmail(text);

    if (isValidEmail) {
      tag.setAttribute('class', tagClass);
    } else {
      tag.setAttribute('class', invalidTagClass);
    }

    closeButton.innerHTML = context.options.removeContent;
    closeButton.setAttribute('class', context.options.classPrefix + '-close');
    tag.style.float = 'left';
    tag.innerText = text;

    closeButton.addEventListener('click', function () {
      for (var i = 0; context.wrapper.childNodes.length; i++) {
        if (context.wrapper.childNodes[i] === tag) {
          context.emails.splice(i, 1);
          context.options.element.value = context.emails.join(',');
          tag.parentNode.removeChild(tag);
          break;
        }
      }
    });

    tag.appendChild(closeButton);
    tagWrapper.appendChild(tag);

    return tag;
  }

  function validateEmail(email) {
    var pattern = /\S+@\S+\.\S+/;

    return pattern.test(email);
  }

  EmailsInput.prototype.addEmail = function (input) {
    var sanitizedInput = input.replace(/\s+/g, '');
    var emails = sanitizedInput.split(',');

    if (emails[0]) {
      emails.forEach(function (value) {
        if (value) {
          var tag = createTag(value, this);
          this.wrapper.insertBefore(tag, this.input);
          this.emails.push(value);
        }
      }, this);
    }

    this.input.value = '';
    this.options.element.value = this.emails.join(',');
  };

  EmailsInput.prototype.getSourceValue = function () {
    return this.emails.join(',');
  };

  EmailsInput.prototype.getEmailCount = function () {
    return this.wrapper.childElementCount - 1;
  };

  return EmailsInput;
})();

module.exports = emailsInput;
