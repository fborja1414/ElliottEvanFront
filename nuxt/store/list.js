export const state = () => ({
  target: {},
  openSections: []
});

export const mutations = {
  setTarget(state, value) {
    state.target.section = value.section;
    state.target.imageIndex = value.imageIndex;
  },
  clearTarget(state) {
    state.target = {};
  },
  updateOpenSections(state, value) {
    state.openSections.push(value);
  },
  clearOpenSections(state) {
    state.openSections = [];
  },
  removeOpenSections(state, value) {
    const result = state.openSections.filter(object => object != value);
    state.openSections = result;
  }
};

export const actions = {};
