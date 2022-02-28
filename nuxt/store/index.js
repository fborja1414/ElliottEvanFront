export const state = () => ({
  globals: {
    restrictShop: false,
    shopPassword: '',
    shopPasswordAccepted: false
  },
  landing: Object,
  archive: Object,
  projects: Object,
  journal: Object,
  shop: Object,
  about: Object,
  showLanding: true,
  updateSection: "",
  windowWidth: 0,
  projectPage: false
});

export const mutations = {
  saveLanding(state, object) {
    state.landing = object;
  },
  saveArchive(state, object) {
    object = object.entries.map(entry => {
      // normalize entry type names
      if (entry.type == "Project") {
        entry.type = "project";
      } else if (entry.type == "Pages/journal-entry") {
        entry.type = "journal";
      } else if (entry.type == "Product") {
        entry.type = "product";
      }

      return entry;
    });

    // collapse adjacent journal entries into on object
    for (let i = 0; i < object.length; i++) {
      const currentEntry = object[i];

      if (currentEntry.type == "journal") {
        // get the indicies to splice
        let startIndex, endIndex;
        startIndex = endIndex = i;
        let nextEntry = object[endIndex + 1];

        while (nextEntry && nextEntry.type == "journal") {
          endIndex++;
          nextEntry = object[endIndex + 1];
        }

        // reconstitute a new object and splice
        const slicedEntries = object.slice(startIndex, endIndex);
        const startDate = new Date(slicedEntries[0]?.date);
        const endDate = new Date(slicedEntries[slicedEntries.length - 1]?.date);
        let title = `${startDate.getMonth() +
          1}.${startDate.getDate()}–${endDate.getMonth() +
          1}.${endDate.getDate()}.${endDate
          .getFullYear()
          .toString()
          .substr(2, 2)}`;

        let collapsedObj = {
          title: title,
          slug: "journal/" + title,
          date: slicedEntries[slicedEntries.length - 1]?.date,
          type: "journal",
          images: slicedEntries.map(entry => entry.images[0]),
          rawEntries: slicedEntries
        };

        object.splice(startIndex, endIndex - startIndex + 1, collapsedObj);
      }
    }

    // filter and store all entries
    state.archive = object;
    state.projects = object.filter(entry => entry.type == "project");
    state.journal = object.filter(entry => entry.type == "journal");
    state.shop = object.filter(entry => entry.type == "product");
  },

  saveAbout(state, object) {
    state.about = {
      aboutText: object.aboutText,
      contactEmail: object.contactEmail,
      instagramLink: object.instagramLink
    }
  },

  saveGlobals(state, object) {
    state.globals.restrictShop = object.restrictShop
    state.globals.shopPassword = object.shopPassword
  },

  updateWidth(state, widthNumber) {
    state.windowWidth = widthNumber;
  },

  updateLanding(state, value) {
    state.showLanding = value
  },

  updateSection(state, navSection) {
    state.updateSection = navSection
  },

  updatePasswordAccepted(state, value) {
    state.globals.shopPasswordAccepted = value
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { app, $config }) {
    const landing = await app.$axios.$get(`${$config.kirbyUrl}/landing.json`);
    const glob = await app.$axios.$get(`${$config.kirbyUrl}/glob.json`);

    commit("saveLanding", landing);
    commit("saveArchive", glob);
    commit("saveAbout", glob);
    commit("saveGlobals", glob);
  }
};
