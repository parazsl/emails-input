var el = document.querySelector('#emails');
var addButton = document.querySelector('#button-add');
var countButton = document.querySelector('#button-count');

var inputOptions = {
  element: el,
  placeholderText: 'add more people...',
  removeContent: '<img src="close.svg">',
};

var emails = new emailsInput(inputOptions);

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

addButton.addEventListener('click', function () {
  var generated = generateRandomEmail();
  emails.addEmail(generated);
});

countButton.addEventListener('click', function () {
  alert(emails.getEmailCount());
});
