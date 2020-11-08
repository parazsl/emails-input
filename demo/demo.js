var closeImg =
  '<svg width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 .8L7.2 0 4 3.2.8 0 0 .8 3.2 4 0 7.2l.8.8L4 4.8 7.2 8l.8-.8L4.8 4 8 .8z" fill="#050038"/></svg>';
var el = document.querySelector('#emails');
var addButton = document.querySelector('#button-add');
var countButton = document.querySelector('#button-count');

var inputOptions = {
  element: el,
  placeholderText: 'add more people...',
  removeContent: closeImg,
};

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomEmail() {
  var domains = ['gmail', 'hotmail', 'yahoo', 'miro', 'me', 'aol', 'zoho', 'outlook', 'freemail', 'citromail'];
  var tlds = ['com', 'net', 'org', 'co.uk', 'nl', 'sh', 'io', 'dev', 'eu', 'hu'];
  var names = ['judy', 'bob', 'erik', 'lily', 'isabelle', 'daisy', 'ted', 'wendy', 'eva', 'henry'];
  var randomDomain = getRandomArrayElement(domains);
  var randomTld = getRandomArrayElement(tlds);
  var randomName = getRandomArrayElement(names);

  return randomName + '@' + randomDomain + '.' + randomTld;
}

document.addEventListener('DOMContentLoaded', function () {
  var emails = new emailsInput(inputOptions);

  addButton.addEventListener('click', function () {
    var generated = generateRandomEmail();
    emails.addEmail(generated);
  });

  countButton.addEventListener('click', function () {
    alert(emails.getEmailCount());
  });
});
