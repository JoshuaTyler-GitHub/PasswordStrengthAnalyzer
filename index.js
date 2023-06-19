const regexLowercase = /[a-z]/;
const regexUppercase = /[A-Z]/;
const regexNumbers = /\d/;
const regexSpecialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

const regexAdmin1 = /admin/i;
const regexAdmin2 = /@dmin/i;
const regexAdmin3 = /adm!n/i;
const regexAdmin4 = /@dm!n/i;

const regexGuest1 = /guest/i;
const regexGuest2 = /gue\$t/i;

const regexPassword1 = /password/i;
const regexPassword2 = /p@ssword/i;
const regexPassword3 = /p@\$\$word/i;
const regexPassword4 = /p@\$\$w0rd/i;
const regexPassword5 = /p@ssw0rd/i;
const regexPassword6 = /passw0rd/i;

const regexQwerty = /qwerty/i;

const regex123 = /123/;
const regexa1b2c3 = /a1b2c3/i;
const regex1a2b3c = /1a2b3c/i;
const regexABC = /abc/i;
const regexShift123 = /!@#/;

const regexRepeats = /(\w)\1{2,}/;

function analyzePasswordStrength(password) {
  // track multipliers
  const containsLowercase = regexLowercase.test(password);
  const containsUppercase = regexUppercase.test(password);
  const containsAlphabetNumberTrain =
    containsAlphabetNumberTrainRegex(password);
  const containsNumbers = regexNumbers.test(password);
  const containsSpecialCharacters = regexSpecialCharacters.test(password);
  const containsCommonPassword = containsCommonPasswordRegex(password);
  const containsRepeat = regexRepeats.test(password);

  // iterate
  let iterativeScore = 0;
  let previousChar = '';
  for (const i of password) {
    if (password[i] === previousChar) {
      iterativeScore--;
    } else {
      iterativeScore++;
    }
    previousChar = i;
  }

  // calculate score
  let score = Number(iterativeScore);

  // character types
  if (!containsLowercase) score *= 0.5;
  if (!containsUppercase) score *= 0.5;
  if (!containsNumbers) score *= 0.5;
  if (!containsSpecialCharacters) score *= 0.5;

  // common patterns
  if (containsAlphabetNumberTrain) score *= 0.1;
  if (containsCommonPassword) score *= 0.1;
  if (containsRepeat) score *= 0.5;
  return score;
}

function containsAlphabetNumberTrainRegex(password) {
  return (
    regex123.test(password) ||
    regexABC.test(password) ||
    regexa1b2c3.test(password) ||
    regex1a2b3c.test(password) ||
    regexShift123.test(password)
  );
}

function containsCommonPasswordRegex(password) {
  return (
    regexAdmin1.test(password) ||
    regexAdmin2.test(password) ||
    regexAdmin3.test(password) ||
    regexAdmin4.test(password) ||
    regexGuest1.test(password) ||
    regexGuest2.test(password) ||
    regexPassword1.test(password) ||
    regexPassword2.test(password) ||
    regexPassword3.test(password) ||
    regexPassword4.test(password) ||
    regexPassword5.test(password) ||
    regexPassword6.test(password) ||
    regexQwerty.test(password)
  );
}

const TEST_CASES = [
  ['password', 'low'],
  ['guest', 'low'],
  ['admin', 'low'],
  ['123456', 'low'],
  ['12345', 'low'],
  ['a1b2c3', 'low'],
  ['123456789', 'low'],
  ['Password1', 'low'],
  ['1234', 'low'],
  ['Password1!', 'low'],
  ['Password1!Password1!Password1!', 'low'],
  ['ioausfskjahdflsadh', 'low'],
  ['saufoiufIOUYIUOTGOIJGI', 'medium'],
  ['PP8e7jiqewri8gQ', 'medium'],
  ['sadfhkjlsadfhIUYIUOYIUY213784612879', 'high'],
  ['sjkadfhkjasldhfKJHLKJGHKLJG87698767@$#%^*&)(&_', 'high'],
  ['sjkadfhp@ssw0rdldhfKJHLKJGHKLJG87698767!@#$%^*&)(&_', 'low'],
  ['PP8e7jiq&ewri8gQ', 'high'],
];

function test() {
  const results = [];

  for (const testCase of TEST_CASES) {
    const [password, expected] = testCase;
    const strength = analyzePasswordStrength(password);

    let actualStrength = 'low';
    if (strength >= 5 && strength < 10) {
      actualStrength = 'medium';
    } else if (strength > 10) {
      actualStrength = 'high';
    }

    const isPassing = actualStrength === expected;
    if (!isPassing) {
      console.log(
        `Failed test case: [${password}] expected [${expected}] actual [${actualStrength}]`,
      );
    }
    results.push(`${isPassing}: ${testCase}`);
  }

  console.log('Test results: ', results);
}

test();
