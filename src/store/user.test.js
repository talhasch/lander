import reducer, {
  dataModel,
  prepareDraftForSave,
  loginAct,
  loadProfileAct,
  loadDataAct,
  setBgImageAct,
  setBgColorAct,
  setBgBlurAct,
  setBioAct,
  setPhotoAct,
  saveDraftAct,
  saveDraftDoneAct,
  saveDraftErrorAct,

  publishAct,
  publishErrorAct,
  publishDoneAct,
  logoutAct

} from "./user"

import {TOGGLE_STYLE, TOGGLE_BIO_EDIT, TOGGLE_PHOTO_UPLOAD} from "./ui";

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

it('200 logout', () => {
  const act = logoutAct();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});