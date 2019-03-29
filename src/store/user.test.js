import reducer, {
  prepareDraftForSave,
  loginAct,
  loadProfileAct,
  loadDataAct,
  setBgImageAct,
  setBgColorAct,
  setBgBlurAct,
  setBioAct,
  setPhotoAct,
  setNameAct,
  setDescriptionAct,
  setAccountAct,
  setWalletAct,
  saveDraftAct,
  saveDraftDoneAct,
  saveDraftErrorAct,
  publishAct,
  publishErrorAct,
  publishDoneAct,
  logoutAct

} from "./user"

import {dataModel} from "../constants";

import {
  TOGGLE_STYLE,
  TOGGLE_BIO_EDIT,
  TOGGLE_PHOTO_UPLOAD,
  TOGGLE_NAME_EDIT,
  TOGGLE_DESCRIPTION_EDIT,
  TOGGLE_ACCOUNT_EDIT,
  TOGGLE_WALLET_EDIT
} from "./ui";

let state = undefined;

it('1 default state', () => {
  expect(reducer(state, {})).toMatchSnapshot();
});

it('2 login', () => {
  const act = loginAct('foo');
  state = reducer(null, act);
  expect(state).toMatchSnapshot();
});

it('3 profile data loaded', () => {
  const act = loadProfileAct({foo: "bar"});
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('4 draft and public data loaded', () => {
  const act = loadDataAct(dataModel(), null);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('5 style dialog opened', () => {
  const act = {type: TOGGLE_STYLE};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('6 bg image set', () => {
  const act = setBgImageAct('foo.jpg');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('7 bg color set', () => {
  const act = setBgColorAct('red');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('8 bg blur set', () => {
  const act = setBgBlurAct(3);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('9 style dialog closed', () => {
  const act = {type: TOGGLE_STYLE};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('10 bio dialog opened', () => {
  const act = {type: TOGGLE_BIO_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('11 bio set', () => {
  const act = setBioAct("lorem ipsum dolor sit amet");
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('12 bio dialog closed', () => {
  const act = {type: TOGGLE_BIO_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('13 style dialog opened', () => {
  const act = {type: TOGGLE_STYLE};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('14 bg image set', () => {
  const act = setBgImageAct('foo.jpg');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('15 bg color set', () => {
  const act = setBgColorAct('red');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('16 bg blur set', () => {
  const act = setBgBlurAct(3);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('17 save draft clicked', () => {
  const act = saveDraftAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('18 draft not saved due to an error', () => {
  const act = saveDraftErrorAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('19 draft saved successfully', () => {
  const act = saveDraftDoneAct(prepareDraftForSave(state.draft, true));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('20 publish clicked', () => {
  const act = publishAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('21 publish not saved due to an error', () => {
  const act = publishErrorAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('22 publish saved successfully', () => {
  const act = publishDoneAct(prepareDraftForSave(state.draft, false));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('23 bio dialog opened', () => {
  const act = {type: TOGGLE_BIO_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('24 bio set', () => {
  const act = setBioAct('lorem ipsum dolor sit amet');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('25 save draft clicked', () => {
  const act = saveDraftAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('26 draft saved successfully', () => {
  const act = saveDraftDoneAct(prepareDraftForSave(state.draft, true));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('27 publish clicked', () => {
  const act = publishAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('28 publish saved successfully', () => {
  const act = publishDoneAct(prepareDraftForSave(state.draft, false));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('29 photo dialog opened', () => {
  const act = {type: TOGGLE_PHOTO_UPLOAD};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('30 image set', () => {
  const act = setPhotoAct('base64string');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('31 image set', () => {
  const act = setPhotoAct('https://fooo.bar/baz.jpg');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('32 save draft clicked', () => {
  const act = saveDraftAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('33 draft saved successfully', () => {
  const act = saveDraftDoneAct(prepareDraftForSave(state.draft, true));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('34 publish clicked', () => {
  const act = publishAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('35 publish saved successfully', () => {
  const act = publishDoneAct(prepareDraftForSave(state.draft, false));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('36 name dialog opened', () => {
  const act = {type: TOGGLE_NAME_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('37 name set', () => {
  const act = setNameAct('foo');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('38 name dialog closed', () => {
  const act = {type: TOGGLE_NAME_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('39 name dialog opened', () => {
  const act = {type: TOGGLE_NAME_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('40 name set', () => {
  const act = setNameAct('bar');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('41 save draft clicked', () => {
  const act = saveDraftAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('42 draft saved successfully', () => {
  const act = saveDraftDoneAct(prepareDraftForSave(state.draft, true));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('43 publish clicked', () => {
  const act = publishAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('44 publish saved successfully', () => {
  const act = publishDoneAct(prepareDraftForSave(state.draft, false));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('45 description dialog opened', () => {
  const act = {type: TOGGLE_DESCRIPTION_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('46 description set', () => {
  const act = setDescriptionAct('lorem ipsum dolor');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('47 description dialog closed', () => {
  const act = {type: TOGGLE_DESCRIPTION_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('48 description dialog opened', () => {
  const act = {type: TOGGLE_DESCRIPTION_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('49 description set', () => {
  const act = setDescriptionAct('foo bar baz');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('50 save draft clicked', () => {
  const act = saveDraftAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('51 draft saved successfully', () => {
  const act = saveDraftDoneAct(prepareDraftForSave(state.draft, true));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('52 publish clicked', () => {
  const act = publishAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('53 publish saved successfully', () => {
  const act = publishDoneAct(prepareDraftForSave(state.draft, false));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('54 account dialog opened', () => {
  const act = {type: TOGGLE_ACCOUNT_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('55 twitter account set', () => {
  const act = setAccountAct('twitter', 'foo');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('56 instagram account set', () => {
  const act = setAccountAct('instagram', 'bar');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('57 account dialog closed', () => {
  const act = {type: TOGGLE_ACCOUNT_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('58 account dialog opened', () => {
  const act = {type: TOGGLE_ACCOUNT_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('59 instagram account set', () => {
  const act = setAccountAct('instagram', 'bar');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('60 twitter account set', () => {
  const act = setAccountAct('twitter', 'foo');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('61 save draft clicked', () => {
  const act = saveDraftAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('62 draft saved successfully', () => {
  const act = saveDraftDoneAct(prepareDraftForSave(state.draft, true));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('63 publish clicked', () => {
  const act = publishAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('64 publish saved successfully', () => {
  const act = publishDoneAct(prepareDraftForSave(state.draft, false));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('65 wallet dialog opened', () => {
  const act = {type: TOGGLE_WALLET_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('66 bitcoin wallet set', () => {
  const act = setWalletAct('bitcoin', '13213123123');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});


it('67 ethereum wallet set', () => {
  const act = setWalletAct('ethereum', '0xqwdqw313');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('68 wallet dialog closed', () => {
  const act = {type: TOGGLE_WALLET_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('69 wallet dialog opened', () => {
  const act = {type: TOGGLE_WALLET_EDIT};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('70 bitcoin wallet set', () => {
  const act = setWalletAct('bitcoin', '13213123123');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('71 save draft clicked', () => {
  const act = saveDraftAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('72 draft saved successfully', () => {
  const act = saveDraftDoneAct(prepareDraftForSave(state.draft, true));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('73 publish clicked', () => {
  const act = publishAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('74 publish saved successfully', () => {
  const act = publishDoneAct(prepareDraftForSave(state.draft, false));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('200 logout', () => {
  const act = logoutAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});