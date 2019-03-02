import reducer, {
  dataModel,
  prepareDraftForSave,
  loggedIn,
  profileLoaded,
  dataLoaded,
  bgImageSet,
  bgColorSet,
  bgBlurSet,
  bioSet,
  draftSave,
  draftNotSaved,
  draftSaved,
  publishSave,
  publishNotSaved,
  publishSaved,
  loggedOut
} from "./user"

import {TOGGLE_STYLE, TOGGLE_BIO_EDIT} from "./ui";

let state = undefined;

it('1 default state', () => {
  expect(reducer(state, {})).toMatchSnapshot();
});

it('2 login', () => {
  const act = loggedIn('foo');
  state = reducer(null, act);
  expect(state).toMatchSnapshot();
});

it('3 profile data loaded', () => {
  const act = profileLoaded({foo: "bar"});
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('4 draft and public data loaded', () => {
  const act = dataLoaded(dataModel(), null);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('5 style dialog opened', () => {
  const act = {type: TOGGLE_STYLE, payload: {affectUser: true}};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('6 bg image set', () => {
  const act = bgImageSet('foo.jpg');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('7 bg color set', () => {
  const act = bgColorSet('red');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('8 bg blur set', () => {
  const act = bgBlurSet(3);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('9 style dialog closed', () => {
  const act = {type: TOGGLE_STYLE, payload: {affectUser: true}};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('10 bio dialog opened', () => {
  const act = {type: TOGGLE_BIO_EDIT, payload: {affectUser: true}};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('11 bio set', () => {
  const act = bioSet("lorem ipsum dolor sit amet");
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('12 bio dialog closed', () => {
  const act = {type: TOGGLE_BIO_EDIT, payload: {affectUser: true}};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('13 style dialog opened', () => {
  const act = {type: TOGGLE_STYLE, payload: {affectUser: true}};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('14 bg image set', () => {
  const act = bgImageSet('foo.jpg');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('15 bg color set', () => {
  const act = bgColorSet('red');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('16 bg blur set', () => {
  const act = bgBlurSet(3);
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('17 save draft clicked', () => {
  const act = draftSave();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('18 draft not saved due to an error', () => {
  const act = draftNotSaved();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('19 draft saved successfully', () => {
  const act = draftSaved(prepareDraftForSave(state.draft, true));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('20 publish clicked', () => {
  const act = publishSave();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('21 publish not saved due to an error', () => {
  const act = publishNotSaved();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('22 publish saved successfully', () => {
  const act = publishSaved(prepareDraftForSave(state.draft, false));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('23 bio dialog opened', () => {
  const act = {type: TOGGLE_BIO_EDIT, payload: {affectUser: true}};
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('24 bio set', () => {
  const act = bioSet('lorem ipsum dolor sit amet');
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('25 save draft clicked', () => {
  const act = draftSave();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('26 draft saved successfully', () => {
  const act = draftSaved(prepareDraftForSave(state.draft, true));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('27 publish clicked', () => {
  const act = publishSave();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('28 publish saved successfully', () => {
  const act = publishSaved(prepareDraftForSave(state.draft, false));
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});

it('50 logout', () => {
  const act = loggedOut();
  state = reducer(state, act);
  expect(state).toMatchSnapshot();
});